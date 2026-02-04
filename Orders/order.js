const express=require('express');
const orderRoute=express.Router();
const path=require('path');
const orderModel=require("../Models/orderModel.js");
const registerModel=require("../Models/registerModel.js");
const {GeoRouting}=require("../general-api/geo-api.js");
orderRoute.get("/order-count",async(req,res,next)=>{
    const orderNo=await orderModel.find({userId:req.query.userToken});
    res.status(200).send({orderCount:orderNo.length})
})
orderRoute.post("/append",async(req,res,next)=>{
    console.log("appen",req.body)
    const date=new Date();
    date.setHours(date.getHours()+5);
    date.setMinutes(date.getMinutes()+30);
    let resObj={
        status:'',
        message:''
    }
    let routeCities=await GeoRouting(517592,req.body.destinatonAddress.pincode);
    let trackerMap=['Satrawada','Godown',...routeCities];
    // switch(req.body.village){
    //     case 'Ekambarakuppam':
    //          trackerMap= ['Satrawada','Karakandapuram','Checkpost','Ekambarakuppam'];
    //         break;
    //     case 'Pudhupet':
    //         trackerMap= ['Satrawada','Karakandapuram','Ekambarakuppam','Pudupet'];
    //         break;
    //     case 'Chindalpet':
    //          trackerMap= ['Satrawada','Karakandapuram','Ekambarakuppam','Chindalpet'];
    //          break;
    //     case 'Nagari':
    //          trackerMap= ['Satrawada','Ekambarakuppam','Pudupet','Nagari'];
    //         break;
    //    default:
    //         trackerMap= ['Home','WestStreet','Mainroad','Satrawada']
    // }
    const uniqueId=req.body.productId;
    const idAvailOrNotInCart=await orderModel.findOne({productId:uniqueId,userId:req.body.userId});
    if(!idAvailOrNotInCart){
        const addressString=req.body.destinatonAddress.address.split(' ').join('-')+' '+req.body.destinatonAddress.village.split(' ').join('-')+' '+req.body.destinatonAddress.pincode +' '+req.body.destinatonAddress.phone;
        let orderedProducts=[]
        req.body.orderDetails.map((product)=>{
            orderedProducts.push({
                productName:product.productName,
                productDes:product.productDes,
                productImg:product.productImg,
                productPrice:Number(product.productPrice),
                productId:product.productId,
                quantity:product.quantity,
            })
        })
        let appendObject={
            orderedProducts:orderedProducts,
            userId:req.body.orderDetails[0].userId,
            address:addressString,
            pincode:req.body.destinatonAddress.pincode,
            village:req.body.destinatonAddress.village,
            phone:req.body.destinatonAddress.phone,
            payOnDelivery:req.body.destinatonAddress.payOnDelivery=='Yes'?true:false,
            orderTime:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            activeTrackingIndex:0,
            trackerMap:trackerMap
        };
        const saveToOrder=await orderModel(appendObject);
        saveToOrder.save();
        const getAddress=await registerModel.findOne({_id:req.body.orderDetails[0].userId},'address');
        if(getAddress.address.length<3){
            if(!getAddress.address.includes(addressString)){
                const saveAddressInRegisterModel= await registerModel.updateOne({_id:req.body.orderDetails[0].userId},{$push:{address:addressString}});
            }
        }
        else{
            if(!getAddress.address.includes(addressString)){
                const updAddress=getAddress.address.slice(1,getAddress.address.length);
                updAddress.push(addressString);
                const saveAddressInRegisterModel= await registerModel.updateOne({_id:req.body.userId},{address:updAddress});
            }
        }
        resObj.status=200;
        resObj.message='Product Added to Order';
        res.send(resObj);
    }
    else{
        resObj.status=409;
        resObj.message='Already it is Available in Order.'
        res.send(resObj);
    }
});
orderRoute.get("/list/:userToken",async(req,res,next)=>{
    let resObj={
        status:'',
        message:''
    }
    let getOrderData=await orderModel.find({userId:req.params.userToken}).sort({orderTime:1});
    if(getOrderData){
        resObj.status=200;
        resObj.message="All the proucts"
        res.send({...resObj,getOrderData});
    }
    else{
        res.status=200;
        res.message="Products are not available."
        res.send(resObj)
    }
});
orderRoute.get("/:orderId",async(req,res,next)=>{
    let resObj={
        status:'',
        message:''
    }
    let orderDetails=await orderModel.findOne({_id:req.params.orderId});
    if(orderDetails){
        let presentTime=new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        // let calculateOrderTime=((orderDetails.orderTime.getHours()+5)*60+orderDetails.orderTime.getMinutes()+30)
        // let caluculateIndex=(presentTime.getHours()*60+presentTime.getMinutes())-calculateOrderTime;
        // let finalIndex=Math.round(caluculateIndex/30);
        // console.log(calculateOrderTime,(presentTime.getHours()*60+presentTime.getMinutes()))
        // if(finalIndex<4){
        //     orderDetails.activeTrackingIndex=finalIndex;
        // }
        // else{
        //     orderDetails.activeTrackingIndex=4;
        // }
        // console.log(presentTime,new Date(orderDetails.orderTime),'ss');
        resObj.status=200;
        resObj.message="All the proucts"
        res.status(200).send({resObj,orderDetails})
    }
    else{
        res.status=400;
        res.message="Orders are not available."
        res.send(resObj)
    }
});
orderRoute.post("/update-order-stage",async(req,res,next)=>{
    const orderId=req.body.orderId;
    const trackIndex=req.body.trackIndex;
    const updOrder=await orderModel.updateOne({_id:orderId},{$set:{activeTrackingIndex:trackIndex}});
    res.status(200).send({message:"SuccessFully updated"});
});
orderRoute.post("/specific-user-order",async(req,res,next)=>{
    console.log(req.body)
    const getSpecicOrderDetail=await orderModel.find({userId:req.body.userId,_id:req.body.orderId})
    res.status(200).send({message:"SuccessFully details send",specificUserOrder:getSpecicOrderDetail[0]});
})
module.exports=orderRoute;
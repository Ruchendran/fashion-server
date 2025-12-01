const express=require('express');
const orderRoute=express.Router();
const path=require('path');
const orderModel=require("../Models/orderModel.js");
const registerModel=require("../Models/registerModel.js");
const e = require('express');
orderRoute.get("/order-count",async(req,res,next)=>{
    const orderNo=await orderModel.find({userId:req.query.userToken});
    res.status(200).send({orderCount:orderNo.length})
})
orderRoute.post("/append",async(req,res,next)=>{
    const date=new Date();
    date.setHours(date.getHours()+5);
    date.setMinutes(date.getMinutes()+30);
    let resObj={
        status:'',
        message:''
    }
    let trackerMap=['Satrawada','Godown',req.body.village];
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
        const addressString=req.body.address.split(' ').join('-')+' '+req.body.village.split(' ').join('-')+' '+req.body.pincode+' '+req.body.payOnDelivery +' '+req.body.phone;
        let appendObject={
            productName:req.body.productName,
            productDes:req.body.productDes,
            productImg:req.body.productImg,
            productPrice:req.body.productPrice,
            productId:req.body.productId,
            userId:req.body.userId,
            quantity:req.body.quantity,
            address:addressString,
            pincode:req.body.pincode,
            village:req.body.village,
            phone:req.body.phone,
            payOnDelivery:req.body.payOnDelivery=='Yes'?true:false,
            orderTime:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            activeTrackingIndex:0,
            trackerMap:trackerMap
        };
        const saveToOrder=await orderModel(appendObject);
        saveToOrder.save();
        const getAddress=await registerModel.findOne({_id:req.body.userId},'address');
        if(getAddress.address.length<3){
            if(!getAddress.address.includes(addressString)){
                const saveAddressInRegisterModel= await registerModel.updateOne({_id:req.body.userId},{$push:{address:addressString}});
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
module.exports=orderRoute;
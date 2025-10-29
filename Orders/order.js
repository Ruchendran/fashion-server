const express=require('express');
const orderRoute=express.Router();
const path=require('path');
const orderModel=require("../Models/orderModel.js");
orderRoute.post("/append",async(req,res,next)=>{
    let resObj={
        status:'',
        message:''
    }
    const uniqueId=req.body.productId;
    const idAvailOrNotInCart=await orderModel.findOne({productId:uniqueId,userId:req.body.userId});
    if(!idAvailOrNotInCart){
        let appendObject={productName:req.body.productName,productDes:req.body.productDes,productImg:req.body.productImg,productPrice:req.body.productPrice,productId:req.body.productId,userId:req.body.userId,quantity:req.body.quantity};
        const saveToOrder=await orderModel(appendObject);
        saveToOrder.save();
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
    let getOrderData=await orderModel.find({userId:req.params.userToken});
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
        resObj.status=200;
        resObj.message="All the proucts"
        res.send({resObj,orderDetails})
    }
    else{
        res.status=400;
        res.message="Orders are not available."
        res.send(resObj)
    }
})
module.exports=orderRoute;
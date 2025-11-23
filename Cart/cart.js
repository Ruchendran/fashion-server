const express=require("express");
const cartRoute=express.Router();
const productModel=require("../Models/productModel");
const cartModel=require("../Models/cartModel.js");
cartRoute.post("/save",async(req,res,next)=>{
    const uniqueId=req.body._id;
    const getProductData=await productModel.findOne({_id:uniqueId});
    const idAvailOrNotInCart=await cartModel.findOne({productId:uniqueId,userId:req.body.userToken});
    let resObj={
        status:'',
        message:''
    }
    if(!idAvailOrNotInCart){
        let appendObject={productName:getProductData.productName,productDes:getProductData.productDes,productImg:getProductData.productImg,productPrice:getProductData.productPrice,productId:getProductData._id,userId:req.body.userToken,quantity:req.body.quantity,productFamily:req.body.productFamily}
        const saveToCart=await cartModel(appendObject);
        saveToCart.save();
        resObj.status=200;
        resObj.message='Product Added to Cart!';
        res.send(resObj);
    }
    else{
        resObj.status=200;
        resObj.message='Already it is Available in cart.'
        res.send(resObj);
    }
});
cartRoute.get("/list/:userToken",async(req,res,next)=>{
    let resObj={
        status:'',
        message:''
    }
    let getCartData=await cartModel.find({userId:req.params.userToken});
    if(getCartData){
        resObj.status=200;
        resObj.message="All the proucts"
        res.send({...resObj,getCartData});
    }
    else{
        res.status=200;
        res.message="Products are not available."
        res.send(resObj)
    }
});
cartRoute.get("/place-order",async(req,res,next)=>{
    let resObj={
        status:'',
        message:''
    }
    let orderDetails=await cartModel.findOne({productId:req.query.productId,userId:req.query.userId});
    if(orderDetails){
        resObj.status=200;
        resObj.message="All the proucts"
        res.send({resObj,orderDetails})
    }
    else{
        resObj.status=400;
        resObj.message="Orders are not available."
        res.send(resObj)
    }
});
cartRoute.delete("/delete/:productId/:userId",async(req,res,next)=>{
    console.log(req.params.productId,"sss");
    let delFromCart=await cartModel.deleteOne({productId:req.params.productId,userId:req.params.userId});
    if(delFromCart.acknowledged){
        res.status(200).send({message:"Successfullly deleted!"});
    }
    else{
        res.status(400).send({message:"Cart details not found."});
    }
});
cartRoute.get("/cart-count",async(req,res,next)=>{
    const cartCount=await cartModel.find({});
    res.status(200).send({cartCount:cartCount.length});
})
module.exports=cartRoute;
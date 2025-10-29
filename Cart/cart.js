const express=require("express");
const cartRoute=express.Router();
const productModel=require("../Models/productModel");
const cartModel=require("../Models/cartModel.js");
cartRoute.post("/save",async(req,res,next)=>{
    const uniqueId=req.body._id;
    const getProductData=await productModel.findOne({_id:uniqueId});
    const idAvailOrNotInCart=await cartModel.findOne({id:uniqueId,userId:req.body.userToken});
    let resObj={
        status:'',
        message:''
    }
    if(!idAvailOrNotInCart){
        let appendObject={productName:getProductData.productName,productDes:getProductData.productDes,productImg:getProductData.productImg,productPrice:getProductData.productPrice,productId:getProductData._id,userId:req.body.userToken,quantity:req.body.quantity}
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
cartRoute.get("/place-order/:productId",async(req,res,next)=>{
    let resObj={
        status:'',
        message:''
    }
    let orderDetails=await cartModel.findOne({productId:req.params.productId});
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
module.exports=cartRoute;
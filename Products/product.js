const express=require("express");
const productRoute=express.Router();
const path=require("path");
const productModel=require("../Models/productModel.js");
productRoute.get("",async(req,res,next)=>{
    let allProducts=await productModel.find({});
    res.send(allProducts)
});
module.exports=productRoute;
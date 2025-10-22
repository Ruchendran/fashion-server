const express=require("express");
const adminRoute=express.Router();
const productModel=require("../Models/productModel.js");
adminRoute.post("/upload",async(req,res,next)=>{
    console.group(req.body,"data");
    let appendObject={productName:req.body.prodName,productDes:req.body.prodDes,productImg:req.body.prodImg,productPrice:req.body.prodPrice,productFamily:req.body.productFamily}
    let prodVal=await productModel(appendObject);
    prodVal.save();
    res.send("Successfully added the product data ");
});
module.exports=adminRoute;
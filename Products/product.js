const express=require("express");
const productRoute=express.Router();
const path=require("path");
const productModel=require("../Models/productModel.js");
productRoute.get("/filterPrice",async(req,res,next)=>{
    let allProducts;
    let group=req.query.productFamily.slice(0,1).toUpperCase()+req.query.productFamily.slice(1,req.query.productFamily.length);
    if(group == 'All'){
       allProducts =await productModel.find({productPrice:{$lte:req.query.maxPrice ,$gte:req.query.minPrice}});
    }
    else{
        allProducts=await productModel.find({productPrice:{$lte:req.query.maxPrice ,$gte:req.query.minPrice},productFamily:group});
    }
    res.status(200).send(allProducts);
})
productRoute.get("/:productFamily",async(req,res,next)=>{
    let allProducts;
    let group=req.params.productFamily.slice(0,1).toUpperCase()+req.params.productFamily.slice(1,req.params.productFamily.length);
    if(group == 'All'){
        allProducts=await productModel.find({});
    }
    else{
        allProducts=await productModel.find({productFamily:group});
    }
    res.status(200).send(allProducts)
});
module.exports=productRoute;
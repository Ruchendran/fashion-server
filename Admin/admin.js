const express=require("express");
const adminRoute=express.Router();
const productModel=require("../Models/productModel.js");
const registerModel=require("../Models/registerModel.js");
adminRoute.post("/upload",async(req,res,next)=>{
    // console.group(req.body,"data");
    let appendObject={productName:req.body.prodName,productDes:req.body.prodDes,productImg:req.body.prodImg,productPrice:req.body.prodPrice,productFamily:req.body.productFamily,productRating:req.body.productRating}
    let prodVal=await productModel(appendObject);
    prodVal.save();
    res.send("Successfully added the product data ");
});
adminRoute.get("/get-users-list",async(req,res,next)=>{
    const usersList=await registerModel.find({});
    res.status(200).send({usersList})
});
adminRoute.delete('/registered-user/',async(req,res,next)=>{
    const userId=req.query.userId;
    const deleteUser=await registerModel.deleteOne({_id:userId});
    // console.log(userId,deleteUser);
    res.status(200).send({message:'succesfully user deleted'});
})
module.exports=adminRoute;
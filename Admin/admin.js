const express=require("express");
const adminRoute=express.Router();
const productModel=require("../Models/productModel.js");
const registerModel=require("../Models/registerModel.js");
const orderModel=require("../Models/orderModel.js");
const cartModel=require("../Models/cartModel.js");
const saveLaterModel=require("../Models/saveLaterModel.js");
adminRoute.post("/upload",async(req,res,next)=>{
    console.log(req.body,"data");
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
    const deleteOrders=await orderModel.deleteMany({userId:userId});
    const deleteCart=await cartModel.deleteMany({userId:userId});
    const deleteSaveater=await saveLaterModel.deleteMany({userId:userId});
    res.status(200).send({message:'succesfully user deleted'});
})
adminRoute.get('/get-orders-list',async(req,res,next)=>{
    const getOrdersList=await orderModel.find({}).sort({orderTime:1});
    res.status(200).send(getOrdersList)
})
adminRoute.get('/get-delivered-orders-list',async(req,res,next)=>{
    const getOrdersList=await orderModel.find({delivered:true}).sort({orderTime:1});
    res.status(200).send(getOrdersList)
})
adminRoute.get('/get-un-delivered-orders-list',async(req,res,next)=>{
    const getOrdersList=await orderModel.find({delivered:false}).sort({orderTime:1});
    res.status(200).send(getOrdersList)
})
module.exports=adminRoute;
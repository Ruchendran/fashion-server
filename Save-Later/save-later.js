const express=require('express');
const mongoose = require('mongoose');
const saveLaterRoute=express.Router();
const saveLaterModel=require("../Models/saveLaterModel");
const productsModel=require("../Models/productModel");
const cartModel = require('../Models/cartModel');
saveLaterRoute.post('/save',async(req,res,next)=>{
    const findProduct=await saveLaterModel.find({productId:req.body.productId,userId:req.body.userId});
     let statusCode;
     let message;
    if(!findProduct.length){
      const saveVal=new saveLaterModel({productId:req.body.productId,userId:req.body.userId});
      const saveProduct=await saveVal.save();
      statusCode=200;
      message="Added Successfully"
     }
     else{
        statusCode=200;
        message="Already Added in Save Later"
     }
    res.status(statusCode).send({message:message})
});
saveLaterRoute.get('/get-save-later',async(req,res,next)=>{
    const getSaveLater=await saveLaterModel.find({userId:req.query.userId});
    res.status(200).send(getSaveLater);
});
saveLaterRoute.get('/get-from-products-model',async(req,res,next)=>{
    const userToken=req.query.userId;
    const savedProducts = await saveLaterModel.aggregate([
        {
            $match: { userId: userToken }
        },
        {
        $lookup: {
                from: 'products',
                let: { localPid: "$productId" }, // Take the String productId from saveLater
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                // Convert String variable to ObjectId and compare to Product _id
                                $eq: ["$_id", { $toObjectId: "$$localPid" }]
                            }
                        }
                    }
                ],
                as: 'productInfo'
            }
        },
        {
            // 2. Flatten the array into an object
            $unwind: {
                path: "$productInfo",
                preserveNullAndEmptyArrays: true 
            }
        },
        {
        // 4. Promote productInfo to the top level and discard everything else
        $replaceRoot: { newRoot: "$productInfo" }
    }
    ]);
    let statusCode;
    let resObj={};
    if(savedProducts){
        statusCode=200;
        resObj.savedProducts=savedProducts;
    }else{
        statusCode=202;
        resObj.savedProducts=null;
    }
    res.status(statusCode).send(resObj);
})
saveLaterRoute.delete('/delete-product',async(req,res,next)=>{
    const deleteProduct=await saveLaterModel.deleteOne({userId:req.query.userId,productId:req.query.productId});
    const setFalseInCart=await cartModel.updateOne({userId:req.query.userId,productId:req.query.productId},{$set:{saveLater:false}});
    let message=''
    let statusCode=''
    if(deleteProduct.deletedCount && setFalseInCart.modifiedCount){
        message='Successfuly Deleted';
        statusCode=200;
    }
    else{
        message='Data Not Found';
        statusCode=200;
    }
    res.status(statusCode).send({message});
})
module.exports=saveLaterRoute;
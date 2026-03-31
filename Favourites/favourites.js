const express=require('express');
const favRoute=express.Router();
const favModel=require("../Models/favouriteModel");
favRoute.post('/save',async(req,res,next)=>{
    const findProduct=await favModel.find({productId:req.body.productId,userId:req.body.userId});
    let statusCode;
    let message;
    if(!findProduct.length){
        const addToFav=new favModel({userId:req.body.userId,productId:req.body.productId});
        const saveFav=await addToFav.save();
        statusCode=200;
        message="Added Successfully"
    }else{
        statusCode=200;
        message="Already Added in Favourites"
    };
    res.status(statusCode).send({message:message})
});
favRoute.delete('/delete',async(req,res,next)=>{
    let message=''
    let statusCode=''
    const deleteProduct=await favModel.deleteOne({userId:req.query.userId,productId:req.query.productId});
    if(deleteProduct.deletedCount){
         message='Successfuly Deleted';
        statusCode=200;
    }
    else{
        message='Data Not Found';
        statusCode=200;
    }
    res.status(statusCode).send({message});
});
favRoute.get('/get-all',async(req,res,next)=>{
    const getFavourites=await favModel.find({userId:req.query.userId});
    res.status(200).send(getFavourites);
});
favRoute.get('/get-fav-products',async(req,res,next)=>{
    const getAllFavProds=await favModel.aggregate([
        {$match:{userId:req.query.userId}},
        {
            $addFields: {
                convertedId: { $toObjectId: "$productId" }
            }
        },
        {
            $lookup:{
                from:'products',
                localField:'convertedId',
                foreignField:'_id',
                as:"userFavourites"
            }
        },
        {
            $unwind:"$userFavourites"
        }
    ]);
    let statusCode;
    let resObj={};
    if(getAllFavProds){
        statusCode=200;
        resObj.favProducts=getAllFavProds;
    }
    else{
        statusCode=202;
        resObj.favProducts=null;
    }
    res.status(statusCode).send(resObj);
});
favRoute.delete('/delete-all/:userId',async(req,res,next)=>{
    const deleteAllProduct=await favModel.deleteMany({userId:req.params.userId});
    let message='';
    let statusCode='';
    if(deleteAllProduct.acknowledged){
        message='Successfuly All products Deleted';
        statusCode=200;
    }
    else{
        message='Data Not Found';
        statusCode=200;
    }
    res.status(statusCode).send({message});
})
module.exports=favRoute;
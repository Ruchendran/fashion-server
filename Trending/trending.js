const exprsess=require('express');
const trendingRoute=exprsess.Router();
const trendingModel=require('../Models/trendingModel.js');  
trendingRoute.get("/get-all-products",async(req,res,next)=>{
    const trendingProducts=await trendingModel.find({});
    res.status(200).send({trendingProducts:trendingProducts});
});
module.exports=trendingRoute;
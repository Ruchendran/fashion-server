const mongoose=require("mongoose");
const trendingProductDetails=mongoose.Schema({
    productName:String,
    productDes:String,
    productImg:String ,
    productPrice:Number,
    productFamily:String,
    productRating:Number,
    starCount:Number,
    feedBackGivenUsersCount:Number,
    userStarRating:Number,
    favourite:Boolean,
    discount:Number
});
const trendingModel=mongoose.model('trending',trendingProductDetails);
module.exports=trendingModel;
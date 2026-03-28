const mongoose =require("mongoose");

const productDetails=mongoose.Schema({
    productName:String,
    productDes:String,
    productImg:String ,
    productPrice:Number,
    productFamily:String,
    productRating:Number,
    starCount:Number,
    feedBackGivenUsersCount:Number,
    userStarRating:Number,
    favourite:Boolean
});

const productModel=mongoose.model('product',productDetails);
module.exports=productModel;

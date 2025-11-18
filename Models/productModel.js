const mongoose =require("mongoose");

const productDetails=mongoose.Schema({
    productName:String,
    productDes:String,
    productImg:String ,
    productPrice:Number,
    productFamily:String,
    productRating:Number
});

const productModel=mongoose.model('product',productDetails);
module.exports=productModel;

const mongoose =require("mongoose");

const productDetails=mongoose.Schema({
    productName:String,
    productDes:String,
    productImg:String ,
    productPrice:String,
    productFamily:String
});

const productModel=mongoose.model('product',productDetails);
module.exports=productModel;

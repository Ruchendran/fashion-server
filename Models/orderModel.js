const mongoose=require('mongoose');
const orderModel=mongoose.Schema({
    userId:String,
    productName:String,
    productDes:String,
    productImg:String ,
    productPrice:String,
    productId:String,
    quantity:Number
});
const order=mongoose.model('order',orderModel);
module.exports=order;
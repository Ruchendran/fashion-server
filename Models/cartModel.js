const mongoose=require("mongoose");
const cartDetails=mongoose.Schema({
    userId:String,
    productName:String,
    productDes:String,
    productImg:String ,
    productPrice:String,
    productId:String,
    quantity:Number
});
const cartModel=mongoose.model('cart-details',cartDetails);
module.exports=cartModel;

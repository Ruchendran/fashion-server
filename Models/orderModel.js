const mongoose=require('mongoose');
const orderModel=mongoose.Schema({
    userId:String,
    productName:String,
    productDes:String,
    productImg:String ,
    productPrice:String,
    productId:String,
    quantity:Number,
    address:String,
    pincode:Number,
    village:String,
    phone:Number,
    payOnDelivery:Boolean,
    orderTime:Date,
    activeTrackingIndex:Number,
    trackerMap:Object
});
const order=mongoose.model('order',orderModel);
module.exports=order;
const mongoose=require('mongoose');
const orderModel=mongoose.Schema({
    orderedProducts:Object,
    userId:String,
    address:String,
    pincode:Number,
    village:String,
    phone:Number,
    payOnDelivery:Boolean,
    orderTime:String,
    activeTrackingIndex:Number,
    trackerMap:Object
});
const order=mongoose.model('order',orderModel);
module.exports=order;
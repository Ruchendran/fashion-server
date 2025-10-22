const mongoose=require('mongoose');
const registerData=mongoose.Schema({
    username:String,
    password:String,
    phone:Number,
    user:String  
})
const registerModel=mongoose.model('registerUser',registerData);
module.exports=registerModel;
const mongoose=require('mongoose');
const registerData=mongoose.Schema({
    userMail:String,
    password:String,
    phone:Number,
    userName:String  
})
const registerModel=mongoose.model('registerUser',registerData);
module.exports=registerModel;
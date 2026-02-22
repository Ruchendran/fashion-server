const mongoose=require("mongoose");
const saveLaterModelDetails=mongoose.Schema({
    productId:String,
    userId:String
})
const saveLaterModel=mongoose.model('save-later',saveLaterModelDetails);
module.exports=saveLaterModel;
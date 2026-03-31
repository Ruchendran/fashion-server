const mongoose=require('mongoose');
const favouriteData=mongoose.Schema({
    productId:String,
    userId:String
});
const favouriteModel=mongoose.model('favourite',favouriteData);
module.exports=favouriteModel;
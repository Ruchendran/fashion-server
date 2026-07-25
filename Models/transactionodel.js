const mongoose=require("mongoose");
const transactionSchema=mongoose.Schema({
    transactionId:String,
    totalAmount:Number,
    userId:String,
    trasactionTime:String
});
const transactionModel=mongoose.model('transactions',transactionSchema);
module.exports={transactionModel};

const { transactionModel } = require("../Models/transactionodel");

const createWorker = require("tesseract.js").createWorker;

const scanPyment=async(req,res,next)=>{
    const userId = req.body.orderDetails[0].userId;
     //order products amount.
     let orderTotalAmount = req.body.totalPrice;
    //order products amount.
    const scanImg=req.body.destinatonAddress.upiSuccessImg;
    const worker = await createWorker('eng');
    const paymentImg=await worker.recognize(scanImg);
    const paymentDetails=paymentImg.data.text.split("\n");

    //get payment amount//
    let paidTiIndex=paymentDetails.indexOf('Paid to');
    let payAmount= paymentDetails[paidTiIndex+1].split(" ").at(-1);
    if(payAmount.includes(',')){
        payAmount = payAmount.replace(",",'');
    };
    payAmount = parseInt(payAmount)
    // get transaction id.
    const transactionIdIndex=paymentDetails.indexOf('Transaction ID');
    const transId=paymentDetails[transactionIdIndex+1]
    // console.log(typeof(payAmount),payAmount,transId,orderTotalAmount);

    //payment correct
    if(orderTotalAmount == payAmount){
        const transactionDetails = await transactionModel(
            {
                transactionId:transId,
                totalAmount:payAmount,
                userId:userId,
                trasactionTime:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            }
        );
        await transactionDetails.save();
        req.body.transactionId = transId;
        next();
    }
    // payment wrong
    else{
        if(orderTotalAmount > payAmount){
             res.status(402).send({message:"U sent less than your order amount"});
        }
        else{
            res.status(402).send({message:"u sent more than ur order"})
        }
    }
    worker.terminate();
}
module.exports={scanPyment};
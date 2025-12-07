const express=require("express");
const registerRoute=express.Router();
const {Resend} =require('resend')
require('dotenv').config();
const pasKey = process.env.pas_key || 'fashion';
const resendMailKey=process.env.RESEND_MAIL_KEY
const registerModel=require("../Models/registerModel");
const jwtToken=require('jsonwebtoken');
registerRoute.post('/register',async(req,res,next)=>{
    let findUser= await registerModel.findOne({    
        userMail:req.body.userMail,
        })
    /// This is for register flow.
    if(!findUser){
        let jwtPas=jwtToken.sign(req.body.password,pasKey);
        let saveObject={
            userMail:req.body.userMail,
            password:jwtPas,
            phone:req.body.phone,
            userName:req.body.userName,
            address:[]
        }
        let saveVal=new registerModel(saveObject);
        let saveUser=await saveVal.save();
        let resObj={
            message:"Successfully added the product data",
            status:200,
            userToken:saveUser?._id
        };
        // const resend=new Resend(resendMailKey);
        // console.log(resendMailKey)
        // const {data,error}=await resend.emails.send({
        //     from: 'Fashion UI Support <support@fashion-ui.netlify.app>',
        //     to: req.body.userMail,
        //     subject: 'Season',
        //     html: '<p>Congrats you have succesfully registered.<strong>szdzxfsf</strong>!</p>'
        // });
        // if(data){
        //     console.log(data,"data")
        // }
        // if(error){
        //     console.log(error,"sss")
        // }
        res.send(resObj);
        
    }
    /// This is for login flow.
    else{
        let resObj={
            message:"User Alreaday exist.",
            status:403
        }
        res.send(resObj);
    }
});
registerRoute.post("/login",async(req,res,next)=>{
    const getUser=await registerModel.findOne({       
        userMail:req.body.userMail,
    })
    let resObj={
        message:"",
        status:''
    }
    if(getUser){
        let parsePas=jwtToken.verify(getUser.password,pasKey);
        if(req.body.password==parsePas){
            resObj.message="Loggged";
            resObj.status=200
            resObj.userToken=getUser?._id;
            resObj.user=getUser?.userName;
        }
        else{
            resObj.message="Password is wrong"
            resObj.status=400;
        }
    }
    else{
        resObj.message="User Does not exist";
        resObj.status=402
    }
    res.send(resObj)
})
registerRoute.post("/admin/verify",async(req,res,next)=>{
    const adminUser=req.body.userMail;
    if(adminUser == 'vvruchendran141594@gmail.com'){
        res.status(200).send({adminUser:true});
    }
    else{
        res.status(400).send({adminUser:false});
    }
});
registerRoute.put("/reset",async(req,res,next)=>{
    let findUser=await registerModel.find({userMail:req.body.userMail});
    if(findUser){
        let jwtPas=jwtToken.sign(req.body.password,pasKey);
        let updUserPas=await registerModel.updateOne({userMail:req.body.userMail},{password:jwtPas});
        res.status(200).send({message:"Reset password success!"});
    }
    else{
        res.status(400).send({message:'user not exist'});
    }
})
registerRoute.get("/get-address/:token",async(req,res,next)=>{
    const userAddrress=await registerModel.findOne({_id:req.params.token},'address');
    res.status(200).send(userAddrress);
});
module.exports=registerRoute;
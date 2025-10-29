const express=require("express");
const registerRoute=express.Router();
require('dotenv').config();
const pasKey = process.env.pas_key || 'fashion';
const registerModel=require("../Models/registerModel");
const jwtToken=require('jsonwebtoken');
registerRoute.post('/register',async(req,res,next)=>{
    let findUser= await registerModel.findOne({    
        username:req.body.username,
        })
    if(!findUser){
        let jwtPas=jwtToken.sign(req.body.password,pasKey);
        let saveObject={
            username:req.body.username,
            password:jwtPas,
            phone:req.body.phone,
            user:req.body.user
        }
        let saveVal=new registerModel(saveObject);
        let saveUser=await saveVal.save();
        let resObj={
            message:"Successfully added the product data",
            status:200,
            userToken:saveUser?._id
        }
        res.send(resObj);
    }
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
        username:req.body.username,
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
            resObj.user=getUser?.user;
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
module.exports=registerRoute;
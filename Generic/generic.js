const express=require('express')
const path=require('path');
const genericRoute=express.Router();
genericRoute.get('/postal/:code',async(req,res,next)=>{
    const postalCode=req.params.code;
    let url=`https://api.postalpincode.in/pincode/${postalCode}`;
    await fetch(url).then((data)=>{
        return data.json()
    }).then((val)=>{
        res.status(200).send({message:'success',postalList:val})
    }).catch((e)=>{
        res.status(400).send({message:'Api error'});
    })
});
module.exports=genericRoute;
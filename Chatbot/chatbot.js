const express=require("express");
const chatbotRoute=express.Router();
const {GoogleGenAI} =require('@google/genai');
const GEMINI_API_KEY =  process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});



chatbotRoute.post("/query-text",async(req,res,next)=>{
    const queryText=req.body.queryText;
    async function main(text) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: text,
    });
    res.status(200).send({responseText:response.text});
    };
    main(queryText);
})
module.exports=chatbotRoute;
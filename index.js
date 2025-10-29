const express=require("express");
const db=require("./db.js")
const index=express();
const port =process.env.PORT || 3000;
const cors=require("cors");
index.use(express.json());
index.use(cors());
const path=require("path");
const adminRoute=require(path.join(__dirname,'Admin','admin.js'));
const productModel=require("./Models/productModel.js");
const registerRoute=require(path.join(__dirname,'Auth','register.js'));
const productRoute=require(path.join(__dirname,'Products','product.js'));
const cartRoute=require(path.join(__dirname,'Cart','cart.js'));
const orderRoute=require(path.join(__dirname,'Orders','order.js'));
index.use("/admin",adminRoute);
index.use("/auth",registerRoute);
index.use("/products",productRoute);
index.use("/cart",cartRoute);
index.use("/order",orderRoute);
db.getStartDb();
index.listen(port,()=>{
    console.log("Server Has Been Started At 3000 local host");
});
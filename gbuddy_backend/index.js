const express= require('express');
const app=express();
const cors=require('cors');
const port =process.env.PORT || 8080;
require('dotenv').config();
const connectwithdb =require('./db');
const connection=connectwithdb.connectwithdb;
connection();
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hi");
})
app.listen(port,()=>{
    console.log(`listening to port number ${port}`);
})
const express= require('express');
const app=express();
const cors=require('cors');
const port =process.env.PORT || 8080;
require('dotenv').config();
const connectwithdb =require('./db');
const connection=connectwithdb.connectwithdb;
connection();
app.use(cors(
    {
        origin: '*'
    }

));
const user=require("./routes/users");
const notes = require("./routes/notes");
const products = require("./routes/products");
const fetch = require("./routes/fetchNotesRelated");
const razorpay=require("./routes/razorpay");
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use('/user',user.route);
app.use('/notes',notes.route);
app.use('/fetch' , fetch.route);
app.use('/products',products.route);
app.use('/api',razorpay.route);
app.listen(port,()=>{
    console.log(`listening to port number ${port}`);
})
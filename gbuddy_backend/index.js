const express= require('express');
const app=express();
const cors=require('cors');
const port =process.env.PORT || 4001;
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
app.use(express.json());
app.use('/user',user.route);
app.use('/notes',notes.route);
app.use('/products',products.route);
app.listen(port,()=>{
    console.log(`listening to port number ${port}`);
})
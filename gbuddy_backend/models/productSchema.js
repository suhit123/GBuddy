const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    title:{type:String,required:true},
    images:[{
        type:String
    }],
    description:{type:String,required:true},
    price:{
        type:Number,
        required:true,
        min:0
    },
    sellerId:{type:String,required:true},
    buyerId:{type:String}
})
module.exports=mongoose.model('product',productSchema);
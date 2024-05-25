const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({

    username : {type :String , required : true},
    email : {type :String , required : true},
    password : {type :String , required : true},

    displayname : {type :String , required : false},
    description : {type:String},
    year: {type :Number , required : false},
    profileUrl:{type:String , required : false},
    score:{type:Number , required : false , default : 0}, 
    campus : {type : String , required : false } , 
    branch : {type : String , required : false} , 
    year : {type : Number , required : false}, 
    rollnumber : {type : String , required : false} , 
    linkedin : {type : String , required : false} , 
    github : {type : String , required : false} , 
    leetcode : {type : String , required : false} , 
    semester : {type : Number , required : false} ,
    phone : {type : String , required : false},
    SavedFiles : {type : Array , required : false}
});

module.exports = mongoose.model('users',usersSchema);
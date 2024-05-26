const mongoose = require('mongoose');
const notesSchema = mongoose.Schema({
    title : {type :String , required : true},
    sem : {type :Number , required : true},
    userId:{type:String,requied:true},
    year : {type :Number , required : true},
    branch : {type :String , required : true},
    subject : {type :String , required : true},
    unit : {type :Number , required : true , enum:{
        values:[1,2,3,4,5],
        message : "Unit should be between 1 to 5"
    }},
    format : {type :String , required : true},
    description : {type:String},
    faculty : {type : String},
    documentUrl:{type:String},
    date : {type : Date,default : Date.now}
});

module.exports = mongoose.model('notes',notesSchema);
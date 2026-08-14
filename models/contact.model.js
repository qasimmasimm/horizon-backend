const { default: mongoose } = require("mongoose");

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
        minLength:5,
        maxLength:55
    },
    msg:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports=mongoose.model("Contact",schema);
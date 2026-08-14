const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model("Currency",schema);
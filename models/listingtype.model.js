const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    type:{
        type:String,
        require:true
    }
});

module.exports=mongoose.model("ListingType",schema);
const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "http://localhost:8080/upload/defaultavatar.jfif",
  },
  role:{
    type:String,
    enum:[
      "user",
      "agent",
      "admin"
    ],
    default:"user"
  }
},{timestamps:true});

module.exports=mongoose.model("User",Userschema);

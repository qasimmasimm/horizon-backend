const mongoose = require("mongoose");
require("dotenv").config()
const DB_URL = process.env.DB_URL;


async function ConnectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports=ConnectDB;

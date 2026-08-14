const mongoose = require("mongoose");
require("dotenv").config()
const DB_URL = process.env.DB_URL;


async function ConnectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected successfully");
  } catch (err) {
        console.error("DB connection failed:", err.message);
    throw err;
  }
}

module.exports=ConnectDB;

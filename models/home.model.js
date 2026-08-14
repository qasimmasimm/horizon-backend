const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  highlight: {
    type: String,
    default:"Build Your Future, One Property at a Time."
  },
  text: {
    type: String,
    default:"Your search for the perfect home starts here. Explore homes and residences in locations you'll love, with spaces made for living"
  },
  images: {
    type: [String],
    default: [
      "/images/banner1.jpg",
      "/images/banner2.jpg",
      "/images/banner3.jpg",
    ],
  },
});

module.exports=mongoose.model("Home",schema);

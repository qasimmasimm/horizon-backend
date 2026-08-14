const Home = require("../models/home.model");

class Homecontroler {
  async Create(req, res) {
    try {
      const { highlight, text } = req.body;

      const images = req.files?.length
        ? req.files.map((file) => file.path)
        : ["/images/banner1.jpg", "/images/banner2.jpg", "/images/banner3.jpg"];

      const newContent = new Home({
        highlight,
        text,
        images,
      });

      await newContent.save();

      return res.status(201).json({
        message: "Content Added Successfully",
        content: newContent,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async GetAll(req, res) {
    try {
      const get = await Home.find();
      if (!get) {
        return res.status(400).json({ message: "No hero content found " });
      }
      return res.status(200).json(get);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Interval Server Error" });
    }
  }

 async Update(req, res) {
  try {
    const { id } = req.params;
    const { highlight, text } = req.body || {};

    if (!highlight || !text) {
      return res.status(400).json({
        message: "Highlight and text are required",
      });
    }

    const images = req.files?.length
      ? req.files.map((file) => file.path)
      : [
          "/images/banner1.jpg",
          "/images/banner2.jpg",
          "/images/banner3.jpg",
        ];

    const updated = await Home.findByIdAndUpdate(
      id,
      {
        highlight,
        text,
        images,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Home content not found",
      });
    }

    return res.status(200).json({
      message: "Home content updated successfully",
      content: updated,
    });
  } catch (err) {
    console.log("Home Update Error:", err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
  async Delete(req,res){
    try{
      const {id}=req.params;
      const deleted=await Home.findByIdAndDelete(id);
      if(!deleted){
        return  res.status(400).json({message:"failed to delete content"});
      }
      return res.status(200).json(deleted);
    }catch(err){
      console.log(err);
      return res.status(500).json({message:"Interval Server Error"});
    }
  }
}

module.exports = new Homecontroler();

const Status=require("../models/propertystatus.model");

class Propertystatuscontroller{

  async Create(req, res) {
    try {
      const { type } = req.body;
      if (!type) {
        return res.status(400).json({ message: "this property is required" });
      }
      const created = await Status.create({ type });
      if (!created) {
        return res
          .status(400)
          .json({ message: "failed to create this property" });
      }
      return res.status(201).json(created);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Interval Server Error" });
    }
  }

  async GetAll(req,res){
    try{
        const get=await Status.find();
        if(!get){
            return rres.status(400).json({message:"failed to get data"})
        }
        return res.status(200).json(get)

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Interval Server Error"});
    }
  }

  async GetById(req,res){
    try{
        const {id}=req.params;
        const found=await Status.findById(id);
        if(!found){
            return res.status(400).json({message:"failed to get"})
        }
        return res.status(200).json(found)

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Interval Server Error"});
    }
  }

}

module.exports=new Propertystatuscontroller();
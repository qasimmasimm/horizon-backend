const Contact = require("../models/contact.model");

class Contactcontroller {
  async Create(req, res) {
    try {
      const { name, email, subject, msg } = req.body;

      if (!name || !email || !subject || !msg) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanSubject = subject.trim();
      const cleanMsg = msg.trim();

      if (cleanName.length < 2 || cleanName.length > 50) {
        return res.status(400).json({
          message: "Name must be between 2 and 50 characters",
        });
      }

      if (!/^[a-zA-Z\s'-]+$/.test(cleanName)) {
        return res.status(400).json({
          message: "Name contains invalid characters",
        });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        return res.status(400).json({
          message: "Please provide a valid email address",
        });
      }

      if (cleanSubject.length < 3 || cleanSubject.length > 100) {
        return res.status(400).json({
          message: "Subject must be between 3 and 100 characters",
        });
      }

      if (cleanMsg.length < 10 || cleanMsg.length > 1000) {
        return res.status(400).json({
          message: "Message must be between 10 and 1000 characters",
        });
      }

      const created = await Contact.create({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        msg: cleanMsg,
      });

      return res.status(201).json(created);
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async GetAll(req, res) {
    try {
      const find = await Contact.find().sort({ createdAt: -1 });;
      if (!find) {
        return res.status(400).json({message:"failed to get messages"});
      }
      return res.status(200).json(find)
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async Delete(req,res){
    try{
        const {id}=req.params;
        const del=await Contact.findByIdAndDelete(id);
        if(!del){
            return res.status(400).json({message:"failed to delete message"});
        }
        return res.status(200).json(del)

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
  }
}

module.exports = new Contactcontroller();

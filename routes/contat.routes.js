const messagerouter=require("express").Router();
const Contactcontroller=require("../controllers/contact.controller");
const isAdmin=require("../middleware/adminauth");
const auth=require("../middleware/auth")

messagerouter.post("/",Contactcontroller.Create);
messagerouter.get("/",auth,isAdmin,Contactcontroller.GetAll);
messagerouter.delete("/:id",auth,isAdmin,Contactcontroller.Delete);

module.exports=messagerouter;
const propertystatus=require("express").Router();
const Propertystatuscontroller=require("../controllers/propertystatus.controller");

propertystatus.post("/",Propertystatuscontroller.Create);
propertystatus.get("/",Propertystatuscontroller.GetAll);
propertystatus.get("/:id",Propertystatuscontroller.GetById);

module.exports=propertystatus;
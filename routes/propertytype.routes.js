const propertytype=require("express").Router();
const PropertyTypeController=require("../controllers/propertytype.controller");

propertytype.post("/",PropertyTypeController.Create);
propertytype.get("/",PropertyTypeController.GetAll);
propertytype.get("/:id",PropertyTypeController.GetById);

module.exports=propertytype;
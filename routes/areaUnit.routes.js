const areaUnit=require("express").Router();
const AreaUnnitController=require("../controllers/areaUnit.controller");

areaUnit.post("/",AreaUnnitController.Create);
areaUnit.get("/",AreaUnnitController.GetAll);
areaUnit.get("/:id",AreaUnnitController.GetById);

module.exports=areaUnit;
const listtype=require("express").Router();
const ListingTypecontroller=require("../controllers/listtype.controller");

listtype.post("/",ListingTypecontroller.Create);
listtype.get("/",ListingTypecontroller.GetAll);
listtype.get("/:id",ListingTypecontroller.GetById);

module.exports=listtype;
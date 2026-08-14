const currencyrouter=require("express").Router();
const Currencycontroller=require("../controllers/currency.controller");

currencyrouter.post("/",Currencycontroller.Create);
currencyrouter.get("/",Currencycontroller.GetAll);
currencyrouter.get("/:id",Currencycontroller.GetById);

module.exports=currencyrouter;
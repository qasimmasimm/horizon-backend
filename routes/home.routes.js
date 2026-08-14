const homerouter = require("express").Router();

const Homecontroler = require("../controllers/home.controller");
const upload = require("../provider/multer");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/adminauth");

homerouter.get("/", Homecontroler.GetAll);

homerouter.post( "/",  auth,  isAdmin,  upload.array("img", 3),
  Homecontroler.Create,
);

homerouter.put(
  "/:id",
  auth,
  isAdmin,
  upload.array("img", 3),
  Homecontroler.Update,
);

homerouter.delete("/:id", auth, isAdmin, Homecontroler.Delete);

module.exports = homerouter;

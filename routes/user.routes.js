const userrouter = require("express").Router();
const Usercontroller = require("../controllers/user.controller");
const upload = require("../provider/multer");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/adminauth");

userrouter.post("/register", upload.single("img"), Usercontroller.Registration);
userrouter.post("/login", Usercontroller.Login);
userrouter.get("/me", auth, Usercontroller.GetById);
userrouter.get("/", auth, isAdmin, Usercontroller.GetAll);
userrouter.put("/:id", upload.single("img"), auth, Usercontroller.Update);
userrouter.patch("/:id/role", auth, isAdmin, Usercontroller.UpdateRole);

module.exports = userrouter;

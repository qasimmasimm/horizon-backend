const postsrouter=require("express").Router();
const Postscotroller=require("../controllers/posts.controller");
const auth=require("../middleware/auth");
const upload=require("../provider/multer");

postsrouter.post("/",auth,upload.array("img", 10),Postscotroller.Create);
postsrouter.get("/",Postscotroller.GetAll);
postsrouter.get("/:id",Postscotroller.GetById);
postsrouter.put("/:id",auth,Postscotroller.Update);
postsrouter.delete("/:id",auth,Postscotroller.Delete);

module.exports=postsrouter;
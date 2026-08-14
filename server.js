const express = require("express");
require("dotenv").config();
const ConnectDB = require("./Config/db");
const morgan = require("morgan");
const cors=require("cors")

// routes imports
const postsrouter = require("./routes/posts.routes");
const userrouter = require("./routes/user.routes");
const homerouter = require("./routes/home.routes");
const propertytype = require("./routes/propertytype.routes");
const listtype = require("./routes/listtype.routes");
const areaUnit = require("./routes/areaUnit.routes");
const propertystatus = require("./routes/propertystatus.routes");
const currencyrouter = require("./routes/currency.routes");
const messagerouter = require("./routes/contat.routes");


const app = express();

app.use(
  cors({
    origin: "https://horizon-frontend-five-mu.vercel.app",
    credentials: true,
  })
);

// Built in middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use('/upload', express.static('upload'));


// API's
app.use('/auth',userrouter);
app.use("/hero",homerouter);
app.use("/msg",messagerouter);

// posts related API's
app.use("/propstatus",propertystatus)
app.use("/proptype",propertytype);
app.use("/listtype",listtype)
app.use("/areaUnit",areaUnit)
app.use("/currency",currencyrouter)
app.use("/posts", postsrouter);

// 
app.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok running",
        message: "Backend is running"
    });
});

// Keep this LAST
app.use((req, res) => {
    return res.status(404).json({
        message: "route not found"
    });
});
// Server Connection

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  try {
    ConnectDB();
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.log("failed to run server");
  }
});

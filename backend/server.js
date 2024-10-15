const express=require("express");
const app=express();
const jwt=require("jsonwebtoken")
const cors=require("cors");
const bcrypt=require("bcrypt")
const upload = require("./multer")
const dbconnect=require("./dbconfig/dbconnect")
const router=require("./routes/routes")
const path=require("path")
app.use(cors())
app.use(express.json())

app.use("/tasks",router)


//upar se image ka url ayega... ab serve the static file from uploads folder and assets directory
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/assets",express.static(path.join(__dirname,"assets")));


//test api
// app.get("/ping",(req,res)=>{
//     res.send("pong")
// })

dbconnect();
app.listen(4000,()=>{
    console.log("server started");
    
})
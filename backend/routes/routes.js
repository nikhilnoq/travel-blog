const { createstory, getallstory, updatestory, deletestory, updatefav, searchstory, filterbydate } = require("../controllers/contentcontrollers")
const { createuser, loginuser, getuser } = require("../controllers/usercontrollers")
const authcheck = require("../middlewares/auth")
const upload = require("../multer")
const fs=require("fs")
const path=require("path")

const router=require("express").Router()
// router.get("/",(req,res)=>{
//     res.send("hello")
// })
router.post("/signup",createuser)

router.post("/login",loginuser)

router.get("/getuser",authcheck,getuser)

router.post("/imageupload",upload.single("image"),async(req,res)=>{
    try{

        if(!req.file){
            return res.status(500).json({
                msg:"no image uploaded",
                success:false
            })
        }
        const imageurl=`http://localhost:4000/uploads/${req.file.filename}`

        return res.status(200).json({
            msg:"image uploaded",
            imageurl:imageurl
        })
    }catch(err){
        return res.status(500).json({
            msg:"err in image catch"
            ,error:err
        })
    }
})

//delete an image from uploads folder

router.delete("/deleteimg",async(req,res)=>{
    const {imageurl}=req.query

    console.log(imageurl);
    

    if(!imageurl){
        return res.status(400).json({
            msg:"image parameter is required" 
        })
    }
    try{
        //extract the filename from imageurl
        const filename=path.basename(imageurl)
console.log(filename);


        //define file path
        const filepath=path.join(__dirname,'..','uploads',filename)

        console.log(filepath);
        
        if(fs.existsSync(filepath)){
            fs.unlinkSync(filepath)
            return res.status(200).json({
                msg:"image deleted success"
              
            })
        }else{
            return res.status(500).json({
                msg:"image not found"
                
            })
        }
    }catch(err){
        return res.status(500).json({
            msg:"err in deleteimage catch",error:err
        })
    }
})


//upar se image ka url ayega... ab serve the static file from uploads folder and assets directory
// app.use("/uploads",express.static(path.join(__dirname,"uploads")));
// app.use("/assets",express.static(path.join(__dirname,"assets")));


router.post("/addstory",authcheck,createstory)

router.get("/getstory",authcheck,getallstory)

router.put("/editstory/:uid",authcheck,updatestory)

router.delete("/deletestory/:uid",authcheck,deletestory)

router.put("/updatefav/:uid",authcheck,updatefav)


//search though backend
router.get("/search",authcheck,searchstory)

//filter stories by date range
router.get("/filterbydate",authcheck,filterbydate)

module.exports=router
const mongoose=require("mongoose")

require("dotenv").config()

const dbconnect=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("db conected");
        
    })
    .catch((err)=>{
        console.log("err in db connection",err);
        
    })
}

module.exports=dbconnect
const mongoose=require("mongoose")

const usermodel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    pass:{
        type:String,
        required:true,

    },
    createdat:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("usermodel",usermodel)
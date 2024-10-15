const mongoose=require("mongoose")

const contentmodel=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    story:{
        type:String,
        required:true,
    },
    visitedlocation:{
        type:[String],
        default:[],
        required:true
    },
    isfav:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodel",
        required:true
    },
    createdon:{
        type:Date,
        default:Date.now
    },
    imageurl:{
        type:String,
        required:true,
        //default:"https://www.campervannewzealand.co.nz/assets/img/blog/444.png",
    },
    visiteddate:{
        type:Date,
        required:true
    }

})

module.exports=mongoose.model("contentmodel",contentmodel)


const contentmodel=require("../models/contentschema")
const path=require("path")
const fs=require("fs")
const { options } = require("../routes/routes")
const createstory=async(req,res)=>{
    try{

        const {title,story,visitedlocation,imageurl,visiteddate}=req.body
         const {id}=req.user;

         if(!title || !story || !visitedlocation || !imageurl || !visiteddate){
            return res.status(500).json({
                msg:"all fields necessary",
                success:false,
                
               })
         }

         const parsedvisiteddate=new Date(parseInt(visiteddate))
    
         const newtravelstory=await contentmodel.create({title,story,visitedlocation,user:id,imageurl,visiteddate:parsedvisiteddate})
                                                 //    .populate("usermodel")

         if(!newtravelstory){
            return res.status(500).json({
                msg:"err in creating story",
                success:false,
               
               })
         }
    
         return res.status(200).json({
            msg:"story created",
            success:true,
           story:newtravelstory
           })
    }catch(err){
       return res.status(500).json({
        msg:"err in createstory catch",
        success:false,
        error:err
       })
    }
}

const getallstory=async(req,res)=>{
    try{
        const {id}=req.user;
        
        const allstories=await contentmodel.find({user:id}).sort({isfav:-1});
        

        return res.status(200).json({
            msg:"all stories",
            success:true,
          stories:allstories
           })

    }catch(err){
        return res.status(500).json({
            msg:"err in getallstory catch",
            success:false,
            error:err
           }) 
    }
}


const updatestory=async(req,res)=>{
    try{
const {uid}=req.params
const {title,story,visitedlocation,imageurl,visiteddate}=req.body
const {id}=req.user;

if(!title || !story || !visitedlocation || !imageurl || !visiteddate){
   return res.status(500).json({
       msg:"all fields necessary",
       success:false,
       
      })
}

const parsedvisiteddate=new Date(parseInt(visiteddate))


//find the travelstory by id and ensure it belongs to authenticated user
const travelstory=await contentmodel.findOne({_id:uid,user:id})

if(!travelstory){
    return res.status(500).json({
        msg:"post not found ya fir se login kro",
        success:false,
        
       })  
}

//const newtravelstory=await contentmodel.create({title,story,visitedlocation,user:id,imageurl,visiteddate:parsedvisiteddate})
 
const placeholderimgurl=`https://localhost:8000/assets/1727956520913.jpg`;

travelstory.title=title
travelstory.story=story
travelstory.visitedlocation=visitedlocation
travelstory.imageurl=imageurl || placeholderimgurl
travelstory.visiteddate=parsedvisiteddate


await travelstory.save();

return res.status(200).json({
    msg:"update sucessful",
    success:true,
    story:travelstory
   })  



    }catch(err){
        return res.status(500).json({
            msg:"error in updatestory catch",
            success:false,
            error:err
           })  
    }
}



const deletestory=async(req,res)=>{
    const {uid}=req.params
    const {id}=req.user

    try{
//find the travelstory by id and ensure it belongs to authenticated user
const travelstory=await contentmodel.findOne({_id:uid,user:id})

if(!travelstory){
    return res.status(500).json({
        msg:"post not found ya fir se login kro",
        success:false,
        
       })  
}

  await travelstory.deleteOne({_id:uid,user:id})

  //extract the filename from imageurl
const imageurl=travelstory.imageurl
const filename=path.basename(imageurl)


//define the file path

const filepath=path.join(__dirname,'uploads',filename)

//delete the omage from uplods folder
fs.unlink(filepath,(err)=>{
    if(err){
        console.error("failed to delete image from uploads folder",err);
        //optionally we could still respond sucess status here
        //this can be not trated as critical error
    }
})


 // Use fs.promises.unlink to delete the image asynchronously
//  try {
//     await fs.unlink(filepath);
//     console.log("Image deleted successfully");
// } catch (err) {
//     console.error("Failed to delete image from uploads folder", err);
//     // You could choose to continue without throwing here if the file deletion isn't critical
// }

return res.status(200).json({
    msg:"deleted travel story",
    success:true,
   }) 

    }catch(err){
        return res.status(500).json({
            msg:"error in deletestory catch",
            success:false,
            error:err
           })  
    }
}


const updatefav=async(req,res)=>{
    const {uid}=req.params
    const {isfav}=req.body
    const {id}=req.user
    try{

        const travelstory=await contentmodel.findOne({_id:uid,user:id})

        if(!travelstory){
            return res.status(500).json({
                msg:"post not found ya fir se login kro",
                success:false,
                
               })  
        }
        travelstory.isfav=isfav;

        await travelstory.save();
       
            return res.status(200).json({
                msg:"updated fav",
                success:true,
                
               })  
      
        


    }
    catch(err){
        return res.status(500).json({
            msg:"error in updatefav catch",
            success:false,
            error:err
           })
    }
}

const searchstory=async(req,res)=>{
    const {query}=req.query
    const {id}=req.user
    try{
if(!query){
    return res.status(404).json({
        msg:"query is required",
        success:false,
        
       })
}

const searchres=await contentmodel.find({
    user:id,
    $or:[
        {title:{$regex:query,$options:"i"}},
        {story:{$regex:query,$options:"i"}},
        {visitedlocation:{$regex:query,$options:"i"}}
    ],  
}).sort({isfav:-1});

return res.status(200).json({
  stories:searchres,
    success:true,
   
   })

    }catch(err){
        return res.status(500).json({
            msg:"error in search catch",
            success:false,
            error:err
           })
    }
}

const filterbydate=async(req,res)=>{
    const {startdate,enddate}=req.query
//console.log(startdate,enddate);

const {id}=req.user

try{
    //conver start and end from millisrc to date objects
    const start=new Date(parseInt(startdate))
    const end=new Date(parseInt(enddate))


    // console.log(start,end);
    
    const filterstories=await contentmodel.find({
    user:id,
visiteddate:{$gte:start,$lte:end}, //if the visited date was stored in date format

    // $expr: {
    //     $and: [
    //         { $gte: [{ $dateFromString: { dateString: "$visiteddate" ,  format: "%a %b %d %Y %H:%M:%S %Z%z" } },  start] },
    //         { $lte: [{ $dateFromString: { dateString: "$visiteddate"  ,  format: "%a %b %d %Y %H:%M:%S %Z%z" } },  end] }
    //     ]
    // }
    }).sort({isfav:-1});

    return res.status(200).json({
        stories:filterstories,
        success:true,
       
       })
    
}catch(err){
    return res.status(500).json({
        msg:"error in filterbydate catch",
        success:false,
        error:err
       })
}
}
module.exports={createstory,getallstory,updatestory,deletestory,updatefav,searchstory,filterbydate}
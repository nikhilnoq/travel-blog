const jwt=require("jsonwebtoken")

const authcheck=(req,res,next)=>{
const authheader=req.headers["authorization"];
const token=authheader && authheader.split(" ")[1];

if(!token){ 
     return res.status(500).json({
    msg:"token not found in auth check",
    success:false,
})
}
jwt.verify(token,process.env.SECRET,(err,user)=>{
    if(err){
        return   res.status(500).json({
            msg:"err in token verificarion",
            success:false,
          
        })
    }
        req.user=user;
        next();
    
})
}

module.exports=authcheck
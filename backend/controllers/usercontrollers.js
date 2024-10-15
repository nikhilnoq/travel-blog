const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const usermodel=require("../models/userschema")

const createuser=async(req,res)=>{
    try{
const {name,email,pass}=req.body

if(!name || !email || !pass){
   return res.status(500).json({
        msg:"all fields required",
        success:false,
       
    }) 
}
    const prevuser=await usermodel.findOne({email})

    if(prevuser){
        return  res.status(500).json({
            msg:"user alreasy exists",
            success:false,
            
        })
    }
let hashpass;
try{
   hashpass= await bcrypt.hash(pass,10)
}catch(err){
    res.status(500).json({
        msg:"err in in hashin pass ",
        success:false,
      
    })
}

const newuser=await usermodel.create({
    name:name,
    email:email,
    pass:hashpass
})

const token=jwt.sign(
    {
       id: newuser._id
    },process.env.SECRET,
    {
        expiresIn:"72h"
    }
)


if(newuser){
   return res.status(200).json({
        msg:"user created",
        success:true,
      user:newuser,  //pass will also go so user another one
      jwttoken:token,
       //  user:{name:newuser.name,email:newuser.email,pass:newuser.pass}
    })
}
  
}

    catch(err){
     return   res.status(500).json({
            msg:"err in in catch createuser",
            success:false,
            error:err
        })
    }
}


const loginuser=async(req,res)=>{

    try{
const {email,pass}=req.body

if(!email || !pass){
    return res.status(500).json({
        msg:"all fields necessary",
        success:false,
        
    })
}

const prevuser=await usermodel.findOne({email})

if(!prevuser){
    return res.status(500).json({
        msg:"user does not exist",
        success:false,
      
    })
}

const checkpass=await bcrypt.compare(pass,prevuser.pass)

if(!checkpass){
    return res.status(500).json({
        msg:"crediantials not valid",
        success:false,
        
    })
}

const token=jwt.sign(
    {id:prevuser._id},
    process.env.SECRET,
    {
        expiresIn:"72h"
    }
)

return res.status(200).json({
    msg:"login sucessfull",
    success:true,
   user:{name:prevuser.name,pass:prevuser.pass},
jwttoken:token
})




    }catch(err){
 return res.status(500).json({
            msg:"err in in loginuser catch",
            success:false,
            error:err
        })
    }
    }

    const getuser=async(req,res)=>{
        try{
            // const user=req.user;
            // console.log(user);
            const {id}=req.user;
            // console.log(id);

            const logedinuser=await usermodel.findOne({_id:id})
            
            if(!logedinuser){
                return res.status(500).json({
                    msg:"ek baar our login kro ",
                    success:false,
                    
                })
            }

            return res.status(200).json({
                msg:"user found",
                success:true,
                user:logedinuser
            })
            
        }catch(err){
            return res.status(500).json({
                msg:"err in in getuser catch",
                success:false,
                error:err
            })
        }
    }

module.exports={createuser,loginuser,getuser }
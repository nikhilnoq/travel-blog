
import React, { useState } from 'react'
import Passwordinput from '../../component/Passwordinput'
import {useNavigate} from "react-router-dom"
import { notify, validateemail } from '../../utils/Utils';
import axiosinstance from '../../utils/axiosinstance';

const Signup = () => {

const [name,setname]=useState("")
  const [email,setemail]=useState("");
  const [pass,setpass]=useState("");
const [error,seterror]=useState("");

const navigate=useNavigate();

const handlesignup=async(e)=>{
  e.preventDefault()
  
if(!name){
  seterror("please enter your name")
  return;
}

  // if(!validateemail(email)){
  //   seterror("please enter valid email")
  ///  notify("please enter valid email","error")
  // return;
  // }

  if(!pass){
    seterror("please enter password")
    return;
  }
  seterror("");

  //login api call

   try{
    const response=await axiosinstance.post("/signup",{
      name:name,
      email:email,
pass:pass  
  })

 // console.log(response);
  
if(response.data.success && response.data.jwttoken){
  localStorage.setItem("token",response.data.jwttoken)
  navigate("/home")
}
   }catch(err){
   // console.log(err);
    
    if(!err.response.data.success){
      console.log(err.response.data.msg);
      
     seterror( err.response.data.msg)
    
    }else{
      seterror("unexpected error occured")
    }
   }
 
}

  return (
    <div className='h-screen bg-cyan-200 overflow-hidden relative'>
      
      <div className='login-ui-box right-10 -top-40'/>
      <div className='login-ui-box bg-cyan-300 -bottom-40 right-1/2'/>

       <div className='container h-screen flex items-center justify-between px-20 mx-auto gap-5 '  >
        <div className='w-2/4 h-[90vh] flex items-end bg-signup-bg-img bg-cover bg-center rounded-lg p-10 z-50 ' >
          <div className=''>
            <h4 className='text-white font-semibold text-6xl leading-[58px]'>Join on<br/>Adventures</h4>
            <p className='text-[15px] text-white leading-6 pr-7 mt-4'>
              Record Your travel With us create your account and join us on this travel blog
            </p>
          </div>
        </div>
        <div className='w-2/4 h-[75h] bg-white relative p-16 shadow-lg rounded-r-lg'>
          <form onSubmit={handlesignup}>
            <h4 className='text-2xl font-semibold mb-7'>Create Account</h4>
            <input type='text' placeholder='name' className='input-box' value={name} onChange={(e)=>{setname(e.target.value)}} />
           <br/>
            <input type='text' placeholder='email' className='input-box' value={email} onChange={(e)=>{setemail(e.target.value)}} />
           
            <br/>
            <Passwordinput value={pass} onChange={(e)=>{setpass(e.target.value)}} placeholder={"enter your password"}/>
            {error && <p className='text-red-500 text-sm '>{error}</p>}
            <button type='submit' className='btn-primary'> Create Account </button>
            <p className='text-xs text-slate-500 text-center my-4'> OR</p>
            <button type='submit' className='btn-primary btn-light' onClick={()=>{navigate("/login")}}>Login</button>
          </form>
        </div>
       </div>
    </div>
  )
}

export default Signup

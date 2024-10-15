import React, { useState } from 'react'
import Profileinfo from './cards/Profileinfo'
import { Link, useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';



const Navbar = ({userinfo,search,setsearch,onsearchnote,handleclearsearch,logedin}) => {
  

    const navigate=useNavigate()
    const token=localStorage.getItem("token")
    const onlogout=()=>{
        localStorage.clear();
        navigate("/login")
    }

const handlesearch=()=>{
  if(search){
    onsearchnote(search) 
  }
}


const onclearsearch=()=>{
  handleclearsearch()
  setsearch("");
}
  return (
    <div className='bg-white flex items-center justify-around px-6 py-2 drop-shadow-sm sticky top-0 z-10'>
      <div><img src='/Screenshot 2024-10-15 180216.png'  alt='travel-vlog' className='w-full h-[50px]'/></div>
      <div>

      </div>
      {logedin ? ( 
         <div className=' gap-8 flex '>
           {/* <button className=' p-3 border border-cyan-200 text-cyan-600 rounded-md hover:bg-cyan-400 hover:text-white'  onClick={()=>navigate("/published")}>published</button> */}
      {token && (
        <>
<div>
        <Searchbar 
        value={search}
        onChange={(e)=>{
setsearch(e.target.value)
        }}
        handlesearch={handlesearch}
        onclearsearch={onclearsearch}
        ></Searchbar>
        </div>
        <div>
        <Profileinfo userinfo={userinfo} onlogout={onlogout}/>
        </div>
        </>)}

      </div>):(
       <div className='flex items-center'>
     <button className=' p-3 border border-cyan-200 text-cyan-600 rounded-md hover:bg-cyan-400 hover:text-white'  onClick={()=>navigate("/login")}>Login</button>
     <button className=' p-3 border border-cyan-200 text-cyan-600 rounded-md hover:bg-cyan-400 hover:text-white' onClick={()=>navigate("/signup")}>signup</button>
     </div> 
      )}
     {/* <div className='flex items-center'>
    <Link to="/about" ><p className=' p-3 border border-cyan-200 text-cyan-600 rounded-md hover:bg-cyan-400 hover:text-white'>About</p></Link> 
    <Link to="/contact" ><p className=' p-3 border border-cyan-200 text-cyan-600 rounded-md hover:bg-cyan-400 hover:text-white'>Contact</p></Link> 
      </div></>) }*/}
     
     
   
    </div>
  )
}

export default Navbar

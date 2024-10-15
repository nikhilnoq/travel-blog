import React, { useState } from 'react'

const Passwordinput = ({value,onChange,placeholder}) => {

    const [show,setshow]=useState(false)
  return (
    <div className='flex items-center bg-cyan-600/5 px-5 rounded mb-3'>
      
<input 
type={show ?'text' : 'password'}
value={value}
onChange={onChange}
placeholder={placeholder || "password"}
className='w-full texr-sm bg-transparent py-3 mr-3 rounded outline-none'

/>
<span className='cursor-pointer' onClick={()=>{setshow(!show)}}>{show?"Hide":"Show"}</span>
    </div>
  )
}

export default Passwordinput

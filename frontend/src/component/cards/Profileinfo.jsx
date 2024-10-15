import React from 'react'
import { getinitials } from '../../utils/Utils';

const Profileinfo = ({userinfo,onlogout}) => {
    

   
  return (
    <div className='flex items-center gap-3'>
      <div  className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
       {getinitials(userinfo?userinfo.name:"")}
      </div>
      <div>
        <p className='text-sm font-medium'>{userinfo.name || ""}</p>
        <button className='text-sm text-slate-700 underline' onClick={onlogout}>Logout</button>
      </div> 
    </div>
  )
}

export default Profileinfo

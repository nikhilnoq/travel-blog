import moment from 'moment';
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
const Viewstory = ({type,storyinfo,onclose,oneditclick,ondeleteclick}) => {
    console.log(type,storyinfo);
    
  return (
    <div className='relative'>
       
        <div className='flex items-center justify-end'>
<div>
<div className='flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg'>
<button className='btn-small' onClick={oneditclick}>
     <MdUpdate className='text-lg'/>  Update Story
        </button>

        <button className='btn-small btn-delete' onClick={ondeleteclick}>
     <MdDelete className='text-lg'/>  Delete
        </button>

        <button className='' onClick={onclose}>
        <IoMdClose className='text-xl text-slate-400' />
          </button>


</div>
</div>
      
        </div>


        <div>
        <div className='flex-1 flex flex-col gap-2 py-4'>
            <h1 className='text-2xl text-slate-950'>
                {storyinfo && storyinfo.title}
            </h1>
        </div>
     <div className='flex items-center justify-between gap-3'>
        <span className='text-xs text-slate-950'>
            {
                storyinfo && moment(storyinfo.visiteddate).format("Do MMM YYYY")
            }
        </span>
        
        <div className='inline-flex items-center gap-2 text-[13px] text-cyan-300 bg-cyan-200/30 rounded px-2 py-1'>
        <LiaMapMarkerAltSolid className='text-sm'/>
        {
            storyinfo && storyinfo.visitedlocation.map((item,i)=>{
                storyinfo.visitedlocation.length===i+1 ?`${item}`:`${item}`
            })
        }
        </div>
     </div>
     <div>
        <img 
        src={storyinfo && storyinfo.imageurl}
        alt='image'
        className='w-full h-[300px] object-cover rounded-lg'/>

        <div className='mt-4'>
<p className='text-sm text-slate-950 leading-6 text-justify whitespace-pre-line'>{storyinfo && storyinfo.story}</p> 
        </div>
     </div>
     </div>
    </div>
  )
}

export default Viewstory

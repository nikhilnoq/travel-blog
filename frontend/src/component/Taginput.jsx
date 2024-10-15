import React, { useState } from 'react'
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { IoMdAdd } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";

// <LiaMapMarkerAltSolid />  <IoMdAdd />  <IoIosRemoveCircle />
const Taginput = ({tags,settags}) => {

const [inputvalue,setinputvalue]=useState()

const addnewtag=()=>{
 if(inputvalue.trim() !==""){
    settags([...tags,inputvalue.trim()]);
    setinputvalue("");
 }   
}

const handleinputchange=(e)=>{
setinputvalue(e.target.value)
}
const handlekeydown=(e)=>{
    if(e.key=="Enter"){
        addnewtag()
    }
}
const handleremove=(removetag)=>{
settags(tags.filter((tag)=> tag!==removetag))
}
  return (
    <div>
        <div>
           
            <div className='flex items-center gap-2 flex-wrap mt-2'>
                {
                    tags.map((tag,i)=>{
                       return  <span key={i}
                        className='flex items-center justify-center gap-2 text-sm text-cyan-600 bg-cyan-200/40 px-3 py-1 rounded'>
                           <LiaMapMarkerAltSolid className='text-sm' />
                           {tag}
                           <button onClick={()=>handleremove(tag)}>
                           <IoIosRemoveCircle />
                           </button>

                        </span>
                    })
                }
            </div>
        </div>
      <div className='flex items-center gap-3 mt-3'>
        <input 
        type='text'
        value={inputvalue}
        className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
        placeholder='Add Locations'
        onChange={handleinputchange}
        onKeyDown={handlekeydown}
        />
        <button className='w-8 h-8 flex items-center justify-center rounded border border-cyan-500 hover:bg-cyan-300 ' 
        onClick={addnewtag}>
            <IoMdAdd  className='text-2xl text-purple-300 hover:text-white'/> 
        </button>
      </div>
    </div>
  )
}

export default Taginput

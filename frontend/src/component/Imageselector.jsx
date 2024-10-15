import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";

const Imageselector = ({image,setimage,handledeleteimg}) => {
    const [previewurl,setpreviewurl]=useState(null)
const inputref=useRef()

// console.log(image,setimage);


    const onchoosefile=()=>{
        inputref.current.click()
    }

    const handleimgchange=(event)=>{
        const file=event.target.files[0]
        if(file){
            setimage(file)
            //setpreviewurl(URL.createObjectURL(file));
        }
    }
    // useEffect(() => {
    //     console.log(previewurl, image, "after state update");
    //   }, [previewurl, image]);
    
  
    const handleremoveimg=()=>{
      //  console.log(previewurl, image, setimage, "before remove button clicked");
        setpreviewurl(null)
        setimage((prevImage) => null);
       // setpreviewurl(null)
        handledeleteimg()
        inputref.current.value = ''; 
       // console.log(previewurl,image,setimage,"after remove button clicked");

    }

    useEffect(()=>{
        //if imag is prop isa string {url} set it as preview url
        if( typeof image==="string"){
            setpreviewurl(image)
        }else if(image){
            //if the image prop is file object create apreview url
            setpreviewurl(URL.createObjectURL(image));
        }else{

            //no img clear the preview url
            setpreviewurl(null)
        }
     
        return()=>{
            if(previewurl && typeof previewurl=='string' && !image){
                URL.revokeObjectURL(previewurl)
            }
                
                }
        
               
    },[image])
  return (
    <div>
   <input
   type='file'
   accept='image/*'
  ref={inputref}
   onChange={handleimgchange}
   className='hidden'  //wo file wala button hata deta h
   />
{!image ?
   <button className='flex gap-2 flex-col w-full h-[220px] items-center justify-center rounded bg-slate-100 hover:bg-slate-200 hover:delay-500 border border-slate-300'
   onClick={()=>onchoosefile()}>
    <div className='rounded-full bg-cyan-50 w-14 h-14 flex items-center justify-center border border-cyan-100' >

    <MdOutlineFileUpload  className='text-xl text-cyan-500'/>
    </div>

    <p className='text-sm text-slate-500'> Upload Image</p>
   </button>
   : (
   <div className='w-full relative'>
    <img src={previewurl} alt='selected' className='w-full h-[300px] object-cover rounded-lg'/>
    

<button className='btn-small btn-delete absolute top-2 right-2 bg-rose-200 rounded-lg' onClick={handleremoveimg}>
<CiCircleRemove className='text-lg text-red-700 hover:text-rose-200' />
</button>
</div>
   )
    }

   
    </div>
    
  
  )
}

export default Imageselector

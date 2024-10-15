import React, { useState } from 'react'
import { RiAddLargeFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import Dateselector from '../../component/Dateselector';
import Imageselector from '../../component/Imageselector';
import Taginput from '../../component/Taginput';
import moment from 'moment';
import uploadimg from '../../utils/uploadimages';
import axiosinstance from '../../utils/axiosinstance';
import { notify } from '../../utils/Utils';
const Addedittravel = ({
  storyinfo,
  type,
  onclose,
  getalltravelstories
}) => {
  console.log(storyinfo,"addedit");
  
const [title,settitle]=useState(storyinfo?.title || "")
const [story,setstory]=useState(storyinfo?.story || "")
const [storyimg,setstoryimg]=useState( storyinfo?.imageurl || null)
const [visitedlocation,setvisitedlocation]=useState(storyinfo?.visitedlocation || [])
  const [visiteddate,setvisteddate]=useState(storyinfo?.visiteddate || null);

const [error,seterror]=useState("")


  //delete thstory img and update thes story
  const handledeleteimg=async()=>{
const deleteimg=await axiosinstance.delete("/deleteimg",{
  params:{
    imageurl:storyinfo.imageurl
  }
})
if(deleteimg.data){
  const id=storyinfo._id
  let postdata={
    title,
    story,
   
    visitedlocation,
    visiteddate:visiteddate?
    moment(visiteddate).valueOf()
    :moment().valueOf()
  
  }

  //updating story
  const response=await axiosinstance.options(`/editstory/${id}`,
    postdata
  )
  setstoryimg(null)
}
  }
const addnewstory=async()=>{
try{

  let imageurl=""
  if(storyimg){
    const imgupload=await uploadimg(storyimg)

    console.log(imgupload);
    
    imageurl=imgupload.imageurl || "";

    console.log(imageurl);
    
  }

  const response=await axiosinstance.post("/addstory",{
    title,
    story,
    imageurl:imageurl || "",
    visitedlocation,
    visiteddate:visiteddate?
    moment(visiteddate).valueOf()
    :moment().valueOf()
  })

  console.log(response);
  
  if(response.data && response.data.success){
    notify("story added","success")
    //refresh the storyies
    getalltravelstories()

    //close modal
    onclose()
  }
}catch(err){
  console.log(err);
  notify(err.response.data.msg,"error")
  seterror("an error occured")
}

}
  const updatestory=async()=>{

   const id=storyinfo._id
try{
  let imageurl=""

let postdata=  {
    title,
    story,
    imageurl:storyinfo.imageurl || "",
    visitedlocation,
    visiteddate:visiteddate?
    moment(visiteddate).valueOf()
    :moment().valueOf()
  }


  if(typeof storyimg==='object'){
    //upload new img
    const imgupload=await uploadimg(storyimg)

   // console.log(imgupload);
    
    imageurl=imgupload.imageurl || "";

  //  console.log(imageurl);
    
  postdata={
    ...postdata,
    imageurl:imageurl
  }
  }

  const response=await axiosinstance.put(`/editstory/${id}`,postdata)

  console.log(response);
  
  if(response.data && response.data.success){
    notify("story updated","success")
    //refresh the storyies
    getalltravelstories()

    //close modal
    onclose()
  }
}catch(err){
  console.log(err);
  notify(err.response.data.msg,"error")
  seterror("an error occured")
}

  }

  const handleaddorupdate=()=>{
    console.log("data",{title,story,storyimg,visitedlocation,visiteddate});
    
    if(!title){
      seterror("please enter title")
      return
    }
    if(!story){
      seterror("please enter story")
      return
    }
    seterror("")

    if(type ==="edit"){
      updatestory()
    }else{
      addnewstory()
    }
   }


  return (
    <div>
   <div className='flex items-center justify-between'>
    <h5 className='text-xl font-medium text-slate-700'>
      {type=="add" ? "Add Story" :"Update Story"}
    </h5>
    <div>
      <div className='flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg'>
     
        {
          type==="add" ? ( <button className='btn-small' onClick={handleaddorupdate}>
          <RiAddLargeFill className='text-lg'/>  Add Story
             </button>)  : (<> 
             <button className='btn-small' onClick={handleaddorupdate}>
     <MdUpdate className='text-lg'/>  Update Story
        </button>

        <button className='btn-small btn-delete' onClick={onclose}>
     <MdDelete className='text-lg'/>  Delete
        </button>

             </>)
        }
        <button className='' onClick={onclose}>
        <IoMdClose className='text-xl text-slate-400' />
          </button>
          </div>
          {
            error&& (
              <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>
            )
          }
    </div>
   </div>

   <div>
    <div className='flex-1 flex flex-col gap-2 pt-4'>
      <label className='input-label'>Title</label>
      <input 
      type='text' 
      className='text-2xl text-slate-950 outline-none'
      placeholder='a day here'
      value={title}
      onChange={(e)=>{settitle(e.target.value)}}
      />

      <div className='my-3'>
        <Dateselector date={visiteddate} setdate={setvisteddate}/>
      </div>
    </div>

<Imageselector image={storyimg} setimage={setstoryimg} handledeleteimg={handledeleteimg}/>

    <div className='flex flex-col gap-2 mt-4'>
      <label className='input-label'>STORY</label>
      <textarea
      type="text"
      className='text-sm text-slate-400 outline-none bg-slate-50 rounded'
      placeholder='Your Story'
      rows={10}
      value={story}
      onChange={(e)=>{setstory(e.target.value)}}/>
    </div>
   </div>

   <div className='pt-3'>
    <label className='input-label' >VISITED LOCATIONS</label>
    <Taginput tags={visitedlocation} settags={setvisitedlocation}/>
   </div>
    </div>
  )
}

export default Addedittravel

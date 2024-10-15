import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar'
import axiosinstance from '../../utils/axiosinstance'
import { useNavigate } from 'react-router-dom'
import Travelcard from '../../component/cards/Travelcard'
import { notify } from '../../utils/Utils'
import Modal from "react-modal"
import Addedittravel from './Addedittravel'
import { RiAddLargeFill } from "react-icons/ri";
import Viewstory from '../../component/Viewstory'
import Emptypage from '../../component/Emptypage'
import { DayPicker } from 'react-day-picker'
import moment from 'moment'
import Filterinfotytle from '../../component/Filterinfotytle'
import animation from "../../assets/Animation - 1728276942726.json"
import Main from '../../showingpages/Main'



const Home = () => {

  //console.log(animation);
  
const [logedin,setlogedin]=useState(false)
const [filtertype,setfiltertype]=useState("")

  const [search,setsearch]=useState()
const navigate=useNavigate()
  const [userinfo,setuserinfo]=useState("")
const [allstories,setallstories]=useState([])

const [openedit,setopenedit]=useState({
  isshown:false,
  type:"add",
  data:null
})

const [openviewmodel,setopenviewmodel]=useState({
  isshown:false,
  data:null
})


const [daterange,setdaterange]=useState({from:null ,to:null})



useEffect(()=>{

  const token=localStorage.getItem("token")

  if(token){
    setlogedin(true)
    getuserdetails()
  }
  else{
    setlogedin(false)
  }
},[])


//handle filter travel by date range
const filterstoriesbydate=async(day)=>{

  try{
const startdate=day.from ?moment(day.from).valueOf() :null;
const enddate=day.to ?moment(day.to).valueOf():null;
console.log(startdate,enddate);

if(startdate && enddate){
    const response= await axiosinstance.get("/filterbydate",{
      params:{
        startdate,enddate
      }
    })
    console.log(response,"search");
    
    if(response.data && response.data.success){
    setfiltertype("date")
    setallstories(response.data.stories)
    
     }
 //console.log(allstories,"search");
 
    }
  } catch(err){
    console.log("an error occured please try later",err);

  }
}

//handle date range select
const handledayclick=(daterange)=>{
  if (daterange.from && daterange.to) {
    // Only proceed if both dates are selected
    setdaterange(daterange); 
    filterstoriesbydate(daterange);
  } else {
    console.log("Invalid date range selected");
  }

}




  const getuserdetails=async()=>{
try{
const response=await axiosinstance.get("/getuser");
console.log(response);

if(response.data.user && response.data.success){
  setuserinfo(response.data.user)
}
}catch(err){
  console.log(err);
  if(err.response && err.response.data && !err.response.data.success){
    localStorage.clear();
    // navigate("/login")
   // navigate("/main")
}
  }

  }

  const getalltravelstories=async()=>{
    try{
      const response=await axiosinstance.get("/getstory")
      console.log(response);
      
      if(response.data && response.data.stories)
      {
        setallstories(response.data.stories)
      }
      // if(response.data.stories===null){
      //   console.log("no stories till now");
        
        
      // }
    }catch(err){
console.log("an error occured please try later");

    }
  }


  const resetfilter=()=>{
    setdaterange({from:null,to:null})
    setfiltertype("")
    getalltravelstories();
  }

  useEffect(()=>{
    getuserdetails();
      // console.log("hello");
    getalltravelstories()
  
    
   // return ()=>{};
  },[]);

  const handledelete=async(data)=>{
    console.log(data);
    
try{

  const id=data._id;

  const response=await axiosinstance.delete(`/deletestory/${id}`)

  if(response.data && response.data.success){
    notify("story deleted","success")
    //refresh the storyies
   // setopenedit((prevState)=>({...prevState,isshown:false}))
    setopenviewmodel((prevState)=>({
      ...prevState,
      isshown:false,
     
    }))
    getalltravelstories()

   
  }
}catch(err){
 
    console.log(err);
    notify(err.response.data.msg,"error")
    // seterror("an error occured")
   
}

  }


  const handleedit=(data)=>{
    console.log(data,"handleedit");
    
    setopenedit({ isshown: true, type: "edit", data: data })
  //  console.log(openedit,"handleeditopenedit");
    
  }

  // useEffect(()=>{
  //   console.log(openedit,"handleeditopenedit");
  // },[openedit])
  //to open model
  const handleviewstory=(data)=>{

    setopenviewmodel({
      isshown:true,
      data:data
    })
  }

  //searchstory
  const onsearchstory=async(query)=>{

    try{

      const response= await axiosinstance.get("/search",{
        params:{
          query,
        }
      })
      console.log(response,"search");
      
      if(response.data && response.data.success){
      setfiltertype("search")
      setallstories(response.data.stories)
      
       }
   console.log(allstories,"search");
   
   
    } catch(err){
      console.log("an error occured please try later",err);
  
    }
  }
  
  const handleclearsearch=()=>{
    setfiltertype("")
    getalltravelstories()
  }





  const updatefav=async(storydata)=>{
  
    const storyid=storydata._id;
  console.log(storyid);
  console.log(storydata.isfav);
  
    try{
  
      const response=await axiosinstance.put(`/updatefav/${storyid}`,
        {
          isfav:!storydata.isfav
        }
      )
  
     //console.log(response);
      
      if(response.data && response.data.success){
       // notify("❤️❤️💫","success")
        getalltravelstories()
      }
  
      if(filtertype ==="search" && search){
        onsearchstory(search)
      }
      else if(filter==="date"){
        filterstoriesbydate(daterange)
      }
      else{
        getalltravelstories();
      }
  
    }catch(err){
      console.log("an error occured please try later",err);
  
    }
  
  }

  if(!logedin){
    return (
      <>
      <Navbar logedin={logedin}/>
      <Main/>
      </>
    )
  }else{
  return (
    <>
     <div>
    
    <Navbar userinfo={userinfo} search={search} setsearch={setsearch} onsearchnote={onsearchstory}  logedin={logedin} handleclearsearch={handleclearsearch}/>


  <div className='container mx-auto  py-10 '>

<Filterinfotytle
filtertype={filtertype}
filterdates={daterange}
onClear={()=>{
  resetfilter();
}}/>
   <div className='flex gap-6'>
     <div className='flex-1 '> 
     {
      //className='flex-1'
       allstories.length>0?(
 <div className='flex  gap-2 w-full justify-evenly flex-wrap'>
   {
     allstories.map((item,i)=>(
 <Travelcard item={item} 
 onEdit={()=>handleedit(item)}
 onClick={()=>handleviewstory(item)}
 onFavClick={()=>updatefav(item)}
  key={i}/>
     ))
   }
 </div>
       ):(
       <Emptypage animation={animation}  body={`add new stories`} />
       )
     }
     </div>
     <div className='w-[340px] pr-4'>
     <div className='bg-white border border-slate-200  shadow bg-slate-200/50 rounded-lg '>
  <div className='p-0'>
    <DayPicker
    captionLayout='dropdown-buttons'
    mode="range"
    selected={daterange}
    onSelect={handledayclick}
    pagedNavigation/>
  </div>
  </div>
     </div>
      
   </div>
  </div>
     </div>


     {/* //add and edit travel story modal */}
    <Modal 
    isOpen={openedit.isshown}
    onRequestClose={()=> setopenedit({ isshown: false, type: "add", data: null }) }
    style={{
      overlay:{
        backgroundColor:"rgba(0,0,0,0.2)",
        zIndex:999,
      }
    }}
appElement={document.getElementById("root")}
className="modal-box"
>
  {/* {openedit.data &&} */}
   
   <Addedittravel
   type={openedit.type}
   storyinfo={openedit.data}
   onclose={()=>{
    setopenedit({
      isshown:false,
      type:"add",

      data:null
    })
   }}
   getalltravelstories={getalltravelstories}
   />)
</Modal>

{/* {view travel story} */}
<Modal 
    isOpen={openviewmodel.isshown}
    onRequestClose={()=> setopenviewmodel({ isshown: false, type: "add", data: null }) }
    style={{
      overlay:{
        backgroundColor:"rgba(0,0,0,0.2)",
        zIndex:999,
      }
    }}
appElement={document.getElementById("root")}
className="modal-box"
>
<Viewstory type={openviewmodel.type} oneditclick={()=>{
    setopenviewmodel((prevState)=>({
      ...prevState,
      isshown:false
    }));
    handleedit(openviewmodel.data || null)}} ondeleteclick={()=>{handledelete(openviewmodel.data || null)}}
storyinfo={openviewmodel.data || null}  onclose={()=>{
  setopenviewmodel((prevState)=>({
    ...prevState,
    isshown:false,
   
  }))
 }}/>
</Modal>

 
     <button className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10'
     onClick={()=>{
      console.log("Button clicked");
      setopenedit({isshown:true,type:"add",data:null})
      
     }}>
     <RiAddLargeFill className="text-[32px] text-white" />
      {/* <MdAdd ></MdAdd> */}
     </button>
     </>
   
  )
}
}

export default Home

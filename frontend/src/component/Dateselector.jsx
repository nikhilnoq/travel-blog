import { useState } from "react";
import moment from "moment";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { SlCalender } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

//<SlCalender /> <IoMdClose />

const Dateselector = ({date,setdate}) => {

  //console.log(date,setdate);
  
  const [opendatepicker,setopendatepicker]=useState(false)
  return (
    <div>
 <button 
 className="inline-flex items-center gap-2 text-13px font-medium text-sky-600 bg-sky-200/40  hover:bg-sky-200/70 rounded px-2 py-1 cursor-pointer"
 onClick={()=>{
  setopendatepicker(true)
 }}
 
 >
  <SlCalender className="text-lg" />
  {
    date? moment(date).format("Do MMM YYYY")
    :  moment().format("Do MMM YYYY")
  }  
 </button>
 {opendatepicker && <div className="overflow-y-scroll p-5 bg-sky-50/80 rounded-lg relative pt-9 ">

<button 
className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-100  hover:bg-sky-300 absolute top-2 right-2"
onClick={()=>{
  setopendatepicker(false)
}}>
 <IoMdClose />
</button>
<DayPicker
captionLayout="dropdown-buttons"
mode="single"
selected={date}
onSelect={setdate}
pagedNavigation/>
</div>
}
    </div>
  )
}

export default Dateselector

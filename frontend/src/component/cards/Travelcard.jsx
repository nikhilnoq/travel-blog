import React from 'react'
import moment from "moment/moment"
import { FiMapPin } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
const Travelcard = ({item,onFavClick,onClick}) => {
    //console.log(item);
    const {title,imageurl,isfav,story,visiteddate,visitedlocation}=item

//console.log(title);
//console.log(onFavClick);
//console.log(onClick);

//       const handleFavClick = (e) => {
//     e.stopPropagation(); // Stop event propagation to parent div
//     onfavclick();
//   };
  return (
    <div className='border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer '>
      <img  onClick={onClick} src={imageurl} alt={title} className='w-full h-48 object-cover rounded-t-lg transition-transform duration-500 ease-in-out hover:scale-105'/>
     
     <div className="p-4" onClick={onClick}>
        <div className='flex items-center gap-3'>
            <div className='flex-1'>
                <h5 className='text-sm font-medium'>{title}</h5>
                <span className='text-xs  text-slate-500 '>
                    {visiteddate ? moment(visiteddate).format("Do MMM YYYY"):"-"}  
                </span>
            </div>
        </div>
        <p className='text-xs text-slate-600 mt-2'>{story?.slice(0,60)}</p>

<button className='w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4' 
  onClick={(e)=>{e.stopPropagation(),onFavClick()}}  >
<FaHeart className={`icon-btn ${isfav ? "text-red-500":"text-white" }`}/>
</button>

        <div className='inline-flex items-center gap-2 text-[13px]'>
            <FiMapPin  className="text-sm"/>
            {
                visitedlocation.map((item,i)=>{
                   
                    return <span key={i} className='text-blue-600 p-1 px-2 my-1 rounded-xl font-medium bg-cyan-200'>{item}</span>
                })
            }
        </div>
     </div>
    </div>
  )
}

export default Travelcard

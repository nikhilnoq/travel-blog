import React from 'react'
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const Searchbar = ({value,onChange,handlesearch,onclearsearch}) => {

 
  return (
    <div className='w-80 flex items-center  bg-slate-100 rounded-md relative'>
        <input
        type='text'
        placeholder='search'
        className='w-full text-xs bg-transparent py-[11px] pl-5 outline-none relative'
        value={value}
onChange={onChange}
/>      
{
    value && <RxCross2 className="text-xl text-slate-500 cursor-pointer hover:text-black mr-10 "
    onClick={onclearsearch}/>
}
<BsSearch className="text-black cursor-pointer absolute z-20 r-3 right-3 hover:text-black" onClick={handlesearch}/>
    </div>
  )
}

export default Searchbar

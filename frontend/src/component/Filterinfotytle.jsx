import moment from 'moment'
import React from 'react'

const Filterinfotytle = ({filtertype,filterdates,onClear}) => {

    const Daterangechip=({date})=>{
        const startdate=date?.from? moment(date.from).format("Do MMM YYYY") : "N/A"

        const enddate=date?.to? moment(date.to).format("Do MMM YYYY") : "N/A"

        return (
            <div className='flex items-center gap-2 bg-slate-100 px-3 py-2 rounded'
>
    <p className='text-xs font-medium'>
        {startdate} - {enddate}
    </p>
    <button onClick={onClear}>
        cross
    </button>
</div>        )
    }
  return( filtertype && (
    <div className='mb-5'>
        {
            filtertype==="search" ? (
                <h3 className='text-lg font-medium'>Search Results</h3>

            ):(
                <div className='flex ittms-center gap-2'>
                    <h3 className='text-lg font-medium '>Travel stories from</h3>

                    <Daterangechip date={filterdates}/>
                  </div>  
            )
        }
      
    </div>
  ))
}

export default Filterinfotytle

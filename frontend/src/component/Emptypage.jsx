import React from 'react'
import Lottie  from 'lottie-react';

const Emptypage = ({animation,body}) => {
  console.log(animation,"emppage");
  
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
           {/* Render the Lottie animation if animationData is passed */}
           {animation ? (
        <Lottie
          animationData={animation}
          loop={true} 
          style={{ height: 300, width: 300 }} // Adjust size as needed
        />
      ) : (
        <p>No animation available</p> // Fallback if no animationData is passed
      )}

      <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>{body}</p>
    </div>
  )
}

export default Emptypage

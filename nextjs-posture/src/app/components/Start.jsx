import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Start = () => {
  return (
    <div className='text-white flex flex-col items-center justify-center'>
        <div className='realtive flex flex-col items-center justify-center overflow-hidden'>
          <p className='absolute text-7xl lg:text-9xl text-center z-10 '>PERFECT POSTURE</p>
{/* Wrapper for Image and gradient */}
        <div className='relative'>
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
          
          {/* Scaled and repositioned image */}
          <Image 
            src="/woodendummy.png" 
            alt="Wooden Figure" 
            width={400} 
            height={400} 
            className='transform scale-110 translate-y-6' // move image down
          />
        </div>
      </div>

        <Link href="/pose" className='flex flex-row bg-black border rounded-3xl  gap-1 p-2'>
          <p>Start Session</p>
          <img src="/image.png" alt="Next Page Button" width={30} height={30} className="" />
        </Link>
        <div className='flex flex-row items-center w-fit pt-20'> 
          <Image unoptimized src="/scroll_down.gif" alt="Wooden Figure" className='' width={40} height={40}/> 
          <p>Scroll down to learn more about us:</p>
        </div>

      {/* uNDERHERE WE PUT A SHORT ABOUT SECTIONN WITH IMPACTFUL STATISTICS TO CATCH ATTENTION AND MAYBE A SLIDE BANNER OF SUM SORT */}

    </div>
  )
}

export default Start

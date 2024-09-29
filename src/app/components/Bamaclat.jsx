import React from 'react'
import Header from './Header'
import ThreeDModel from './3DModel'
import Image from 'next/image'
const Bamaclat = () => {
  return (
    
    <div>
      <Header/>
      <div className='flex flex-row text-white  '>
        <div id="left" className='p-4 text-4xl lg:text-7xl  flex flex-col gap-6 bg-black h-96 min-h-screen  w-1/2'>
          <div className='flex flex-row gap-2 items-center hover:underline hover:cursor-pointer hover:scale-105  hover:opacity-85'>
            <p>Start Session</p>
            <Image src="/arrow_right_bounceing.gif" width={60}  height={40} alt="" className='' />
          </div>
          <p>References</p>
          <p>Information</p>
          <p>Settings</p>
        </div>
        <div id="right" className='bg-black h-96 min-h-screen  w-1/2'>
          <ThreeDModel/>
        </div>
      </div>
    </div>
  )
}

export default Bamaclat
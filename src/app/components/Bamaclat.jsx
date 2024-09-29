import React from 'react'
import Header from './Header'
import ThreeDModel from './3DModel'
import Image from 'next/image'
import Link from 'next/link'

const Bamaclat = () => {
  return (
    
    <div>
      <Header/>
      <div className='flex flex-row text-white  '>
        <div id="left" className='p-4 text-4xl lg:text-7xl  flex flex-col gap-6 bg-black h-96 min-h-screen  w-1/2'>
          <Link href="/session" className='flex flex-row gap-2 items-center hover:underline hover:cursor-pointer hover:scale-105  hover:opacity-85'>
            <p>Start Session</p>
            <Image unoptimized src="/arrow_right_bounceing.gif" width={60}  height={40} alt="" className='' />
          </Link>
          <Link href="/references" className='flex flex-row gap-2 items-center hover:underline hover:cursor-pointer hover:scale-105  hover:opacity-85'>
            <p>References</p>
            <Image src="/ref_white.png" width={60}  height={40} alt="" className='' />
          </Link>
          <Link href="/info" className='flex flex-row gap-2 items-center hover:underline hover:cursor-pointer hover:scale-105  hover:opacity-85'>
            <p>Information</p>
            <Image src="/info_icon.png" width={55}  height={35} alt="" className='' />
          </Link>
          <Link href="/settings" className='flex flex-row gap-2 items-center hover:underline hover:cursor-pointer hover:scale-105  hover:opacity-85'>
            <p>Settings</p>
            <Image src="/gear-64.png" width={60}  height={40} alt="" className='' />
          </Link>

        </div>
        <div id="right" className='bg-black h-96 min-h-screen  w-1/2'>
          <ThreeDModel/>
        </div>
      </div>
    </div>
  )
}

export default Bamaclat
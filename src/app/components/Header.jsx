import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    <div className='bg-black text-white font-bold'>
        <div  className='flex flex-row items-center '>
            <Image src="/woodendummy.png" width={40} height={40} alt='Logo' />
            <p>PERFECT POSTURE</p>
        </div>
        <div className='bg-white h-[1px]'></div>
    </div>
  )
}

export default Header
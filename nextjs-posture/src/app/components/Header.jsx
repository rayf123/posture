import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Header = () => {
  return (
    <div className='bg-black text-white font-bold'>
        <Link href="/"className='flex flex-row items-center hover:underline  '>
            <Image src="/woodendummy.png" width={40} height={40} alt='Logo' />
            <p>PERFECT POSTURE</p>
        </Link>
        <div className='bg-white h-[1px]'></div>
    </div>
  )
}

export default Header
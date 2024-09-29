"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  const [selectedButton, setSelectedButton] = useState(''); // State to track selected button

  const handleButtonClick = (button) => {
    setSelectedButton(button); // Update selected button
  };

  return (
    <div className='flex flex-col items-center bg-black h-screen text-white'>
      <div className='p-3 py-9 h-full flex flex-col justify-between'>
        <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1 ">
          <h1 className=' text-lg lg:text-2xl font-bold text-white'>
            Posture Strictness :
          </h1>
          <button
            className={`bg-white px-1 rounded-md text-black ${selectedButton === 'Casual' ? 'bg-gray-600 text-white' : ''}`}
            onClick={() => handleButtonClick('Casual')}
          >
            Casual
          </button>
          <button
            className={`bg-white px-1 rounded-md text-black ${selectedButton === 'Average' ? 'bg-gray-600 text-white' : ''}`}
            onClick={() => handleButtonClick('Average')}
          >
            Average
          </button>
          <button
            className={`bg-white px-1 rounded-md text-black ${selectedButton === 'Strict' ? 'bg-gray-600 text-white' : ''}`}
            onClick={() => handleButtonClick('Strict')}
          >
            Strict
          </button>
        </div>

        <div className="flex flex-row gap-1 ">
          <h1 className=' text-lg lg:text-2xl font-bold text-white'>
            Break Intervals :
          </h1>
          <button
            className={`bg-white px-1 rounded-md text-black ${selectedButton === 'Casual' ? 'bg-gray-600 text-white' : ''}`}
            onClick={() => handleButtonClick('Casual')}
          >
            Casual
          </button>
          <button
            className={`bg-white px-1 rounded-md text-black ${selectedButton === 'Average' ? 'bg-gray-600 text-white' : ''}`}
            onClick={() => handleButtonClick('Average')}
          >
            Average
          </button>
          <button
            className={`bg-white px-1 rounded-md text-black ${selectedButton === 'Strict' ? 'bg-gray-600 text-white' : ''}`}
            onClick={() => handleButtonClick('Strict')}
          >
            Strict
          </button>
        </div>

        
          
        </div>
          <Link href="/pose">
            <p className="text-3xl underline">Back</p>
          </Link>
      </div>
    </div>
  );
}

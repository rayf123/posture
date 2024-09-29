import React from 'react';
import Header from './Header';
import ThreeDModel from './3DModel';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Bamaclat = () => {
  const linkVariants = {
    hidden: { opacity: 0, x: -100 },  // Start with the link off-screen to the left
    visible: (i) => ({
      opacity: 1,
      x: 0,  // Slide in to the original position
      transition: {
        delay: i * 1, // Each link will delay by 1 second (staggered effect)
        duration: 0.8,  // Slide-in duration
      },
    }),
  };

  const links = [
    { href: '/session', label: 'Start Session', imgSrc: '/arrow_right_bounceing.gif' },
    { href: '/references', label: 'References', imgSrc: '/ref_white.png' },
    { href: '/info', label: 'Information', imgSrc: '/info_icon.png' },
    { href: '/settings', label: 'Settings', imgSrc: '/gear-64.png' },
  ];

  return (
    <div>
      <Header />
      <div className="flex flex-row text-white">
        <div id="left" className="p-4 text-4xl lg:text-7xl flex flex-col gap-6 bg-black h-96 min-h-screen w-1/2">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              custom={i}  // Pass the index to the animation
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              className="flex flex-row gap-2 items-center"
            >
              <Link href={link.href} className="hover:underline hover:cursor-pointer hover:scale-105 hover:opacity-85">
                <p>{link.label}</p>
                <Image unoptimized src={link.imgSrc} width={60} height={40} alt="" />
              </Link>
            </motion.div>
          ))}
        </div>
        <div id="right" className="bg-black h-96 min-h-screen w-1/2">
          <ThreeDModel />
        </div>
      </div>
    </div>
  );
};

export default Bamaclat;

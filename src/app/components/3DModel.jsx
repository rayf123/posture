'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

function Model() {
  const geometry = useLoader(STLLoader, '/6ft_man.stl'); // Load the STL file
  const meshRef = useRef(); // Reference for the mesh
  const [hovered, setHovered] = useState(false); // Hover state
  const [active, setActive] = useState(false); // Click state

  // Animate the model to slowly rotate over time
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002; // Adjust rotation speed if needed
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onClick={() => setActive(!active)} // Toggle active state on click
      onPointerOver={() => setHovered(true)} // Set hover state on mouse over
      onPointerOut={() => setHovered(false)} // Remove hover state on mouse out
      scale={active ? 1.2 : 1} // Enlarge the model when clicked
    >
      <meshStandardMaterial color={hovered ? 'hotpink' : '#cb9b66'} /> {/* Change color on hover */}
    </mesh>
  );
}

const ThreeDModel = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, -10, 5], // Adjust camera position to focus on the front view
          fov: 75,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;

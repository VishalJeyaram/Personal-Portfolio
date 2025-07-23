// components/TexturedPlanet.js
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';

export default function TexturedPlanet({ position, size = 1, textureUrl, rotationSpeed = 0.001 }) {
  const planetRef = useRef();
  const texture = useLoader(TextureLoader, textureUrl);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={planetRef} position={position}>
      <Sphere args={[size, 32, 32]}>
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

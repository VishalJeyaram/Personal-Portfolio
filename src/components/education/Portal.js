import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Portal({ position, color, onClick }) {
  const ref = useRef();

  // simple rotate & pulse animation
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.5;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.05;
    ref.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <torusBufferGeometry args={[1.5, 0.2, 32, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.3}
      />
    </mesh>
  );
}

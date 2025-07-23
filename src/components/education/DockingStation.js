import React, { forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';

const DockingStation = forwardRef((props, ref) => {
  // simple slow spin
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]} castShadow>
      <ringBufferGeometry args={[3, 3.2, 64]} />
      <meshStandardMaterial
        color="#777"
        emissive="#333"
        emissiveIntensity={0.2}
        side={2}
      />
    </mesh>
  );
});

export default DockingStation;

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WebLine({ start, end }) {
  const ref = useRef();
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.opacity = 0.3 + 0.2 * Math.sin(clock.getElapsedTime() * 2);
    }
  });

  return (
    <line geometry={geometry}>
      <lineBasicMaterial ref={ref} color="#66ccff" transparent opacity={0.4} linewidth={1} />
    </line>
  );
}

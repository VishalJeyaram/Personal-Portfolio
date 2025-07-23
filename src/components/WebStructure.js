import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WebStructure({ count = 4, radius = 5 }) {
  const groupRef = useRef();
  const materials = useRef([]);

  const rings = useMemo(() => {
    const ringList = [];

    for (let i = 1; i <= count; i++) {
      const r = (radius / count) * i;
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2;
        const noise = (Math.random() - 0.5) * 0.3;
        const x = (r + noise) * Math.cos(angle);
        const y = (r + noise) * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, 0));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: '#88aacc',
        transparent: true,
        opacity: 0.3,
      });
      materials.current.push(material);
      ringList.push(<line key={i} geometry={geometry} material={material} />);
    }

    return ringList;
  }, [count, radius]);

  useFrame(({ clock }) => {
    materials.current.forEach((mat, i) => {
      if (mat) {
        mat.opacity = 0.3 + 0.2 * Math.sin(clock.getElapsedTime() * 1.5 + i);
      }
    });
  });

  return <group ref={groupRef}>{rings}</group>;
}

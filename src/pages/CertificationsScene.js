// src/scenes/CertificationsScene.jsx

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import StaticStars from '../components/StaticStars';
import CertificationCard from '../components/certifications/CertificationCard';
import './CertificationsScene.css';
import { CERTIFICATIONS } from '../data/certifications';

export default function CertificationsScene() {
  const sceneRef = useRef();

  // layout: 2 rows × 3 cols
  const rows = 2, cols = 3;
  const perPage = rows * cols;
  const paging = CERTIFICATIONS.slice(0, perPage); // show up to six
  const spacingX = 12, spacingY = 8, yOffset = -4;

  return (
    <div className="certifications-scene-container">
      <Canvas
        camera={{ position: [0, 0, 23], fov: 50 }}
        onCreated={({ scene }) => (sceneRef.current = scene)}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#00bfff" />
        <OrbitControls enableZoom enablePan={false} />
        <StaticStars />

        {paging.map((cert, i) => {
          const row = Math.floor(i / cols), col = i % cols;
          const x = (col - (cols - 1) / 2) * spacingX;
          const y = ((rows - 1) / 2 - row) * spacingY + yOffset;
          return (
            <CertificationCard
              key={i}
              certification={cert}
              position={[x, y, 0]}
            />
          );
        })}
      </Canvas>
    </div>
  );
}

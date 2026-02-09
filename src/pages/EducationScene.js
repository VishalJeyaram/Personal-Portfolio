// src/components/EducationScene.jsx

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneContent from '../components/education/EducationSceneContent';

export default function EducationScene() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      style={{ width: '100vw', minWidth: '320px', height: '100vh', minHeight: '600px', background: '#000' }}
    >
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />

      {/* Main scene */}
      <SceneContent openIndex={openIndex} setOpenIndex={setOpenIndex} />
    </Canvas>
  );
}


import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import StaticStars from '../components/StaticStars';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import './WorkExperienceScene.css';
import TimelineContent from '../components/work_experience/TimelineContent';


export default function WorkExperienceScene() {
  return (
    <div className="work-scene-container">
      <Canvas camera={{ position: [0, 2, 27], fov: 55 }}>

        <pointLight position={[10, 10, 10]} intensity={2} color="#00bfff" />

        <TimelineContent />

        <OrbitControls enableZoom enablePan={false} />

        <StaticStars />

        <EffectComposer multisampling={8}>
          <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
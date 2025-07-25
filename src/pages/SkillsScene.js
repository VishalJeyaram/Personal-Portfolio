// src/scenes/SkillsScene.jsx

import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Billboard, Text } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { SKILL_CATEGORIES } from '../data/skills';
import './SkillsScene.css';

function CategoryRing({ category, position, radius = 6, speed = 0.2 }) {
  const skillsGroup = useRef();
  const textures = useLoader(
    TextureLoader,
    category.skills.map(s => s.image)
  );

  useFrame(({ clock }) => {
    if (skillsGroup.current) {
      skillsGroup.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  const count = category.skills.length;
  return (
    <group position={position}>
      <Text
        position={[0, 0, 0]}
        fontSize={0.7}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#00ffff"
      >
        {category.category}
      </Text>

      <group ref={skillsGroup}>
        {category.skills.map((skill, i) => {
          const theta = (i / count) * Math.PI * 2;
          const x = radius * Math.cos(theta);
          const z = radius * Math.sin(theta);
          return (
            <Billboard
              key={skill.name}
              position={[x, 0, z]}
              follow
              lockX={false}
              lockY={false}
              lockZ={false}
            >
              <mesh>
                <planeGeometry args={[1.2, 1.2]} />
                <meshBasicMaterial
                  map={textures[i]}
                  transparent
                  toneMapped={false}
                />
              </mesh>
              <Text
                position={[0, -0.9, 0]}
                fontSize={0.25}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {skill.name}
              </Text>
            </Billboard>
          );
        })}
      </group>
    </group>
  );
}

export default function SkillsScene() {
  const total = SKILL_CATEGORIES.length;
  const cols  = 2;
  const rows  = Math.ceil(total / cols);
  const spacingX = 17;  // horizontal gap
  const spacingY = 10;   // vertical gap

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 60 }} style={{ background: '#000' }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00bfff" />

      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade />

      {SKILL_CATEGORIES.map((cat, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const x = (col - (cols - 1) / 2) * spacingX;
        const y = ((rows - 1) / 2 - row) * spacingY;
        return (
          <CategoryRing
            key={cat.category}
            category={cat}
            position={[x, y, 0]}
          />
        );
      })}

      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}

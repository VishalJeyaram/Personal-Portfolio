// src/scenes/SkillsScene.jsx

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Billboard, Stars, Text  } from '@react-three/drei';
import * as THREE from 'three';
import { SKILLS } from '../data/skills';
import './SkillsScene.css';


function SkillParticle({ texture, name, initialPos, speed }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    // advance toward camera
    group.current.position.z += speed;
    // reset when too close
    if (group.current.position.z > 10) {
      group.current.position.x = (Math.random() - 0.5) * 12;  // narrower X spread
      group.current.position.y = (Math.random() - 0.5) * 12;  // narrower Y spread
      group.current.position.z =
        -THREE.MathUtils.lerp(10, 30, Math.random());        // new closer Z range
    }
  });

  return (
    <group ref={group} position={initialPos}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        {/* icon */}
        <mesh>
          <planeGeometry args={[1.8, 1.8]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
        {/* label */}
        <Text
          position={[0, 1.3, 0]}
          fontSize={0.3}
          color="#fff"
          anchorX="center"
          anchorY="bottom"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
}

export default function SkillsScene() {
  // load all skill textures
  const textures = useLoader(
    THREE.TextureLoader,
    SKILLS.map(s => s.image)
  );

  // one particle per skill, with slower speeds
  const particles = useMemo(() => {
    return SKILLS.map((skill, i) => ({
      texture: textures[i],
      name: skill.name,
      speed: THREE.MathUtils.lerp(0.005, 0.02, Math.random()),
      initialPos: new THREE.Vector3(
        (Math.random() - 0.5) * 12,                    // X in [-6,6]
        (Math.random() - 0.5) * 12,                    // Y in [-6,6]
        -THREE.MathUtils.lerp(10, 30, Math.random())   // Z in [-10,-30]
      ),
    }));
  }, [textures]);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ background: '#000' }}>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00bfff" />

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />

      {particles.map((p, idx) => (
        <SkillParticle
          key={idx}
          texture={p.texture}
          name={p.name}
          initialPos={p.initialPos.clone()}
          speed={p.speed}
        />
      ))}

      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}
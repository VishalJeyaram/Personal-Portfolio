
import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';

const nodes = [
  { label: 'Education', content: 'Bachelor of Engineering in Computer Engineering from NUS.' },
  { label: 'Work', content: 'Software Engineer at Microtube Technologies, DXC, and Affinidi.' },
  { label: 'Projects', content: 'Tranquilio, Project Connecto, and more.' },
  { label: 'Skills', content: 'React, Node.js, Python, Three.js, Unity, AWS.' },
  { label: 'Creative Side', content: 'Storytelling, film analysis, music composition.' },
  { label: 'Interests', content: 'HCI, spatial computing, visual effects.' },
];

const toRadians = (angle) => (angle * Math.PI) / 180;
const getCoordinates = (index, total, radius) => {
  const angle = (360 / total) * index;
  return [
    radius * Math.cos(toRadians(angle)),
    radius * Math.sin(toRadians(angle)),
    0
  ];
};

function HomeCenter({ onClick }) {
  return (
    <group>
      <Text fontSize={0.7} color="white" anchorX="center" anchorY="middle">
        Vishal Jeyaram
      </Text>
      <Text
        fontSize={0.3}
        color="#00bfff"
        position={[0, -1, 0]}
        anchorX="center"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        More About Me →
      </Text>
    </group>
  );
}

function FloatingLabel({ position, label }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const scale = 1 + 0.05 * Math.sin(clock.getElapsedTime() * 2);
    if (meshRef.current) meshRef.current.scale.set(scale, scale, scale);
  });
  return (
    <Text
      position={position}
      fontSize={0.4}
      color="white"
      anchorX="center"
      anchorY="middle"
      ref={meshRef}
    >
      {label}
    </Text>
  );
}

function WebLine({ start, end }) {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 0.5,
      (start[1] + end[1]) / 2 + 1.5 + (Math.random() - 0.5) * 0.5,
      (start[2] + end[2]) / 2
    ),
    new THREE.Vector3(...end)
  );
  const points = curve.getPoints(20);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#99ccff" transparent opacity={0.5} />
    </line>
  );
}

function Scene() {
  const [zoomedOut, setZoomedOut] = useState(false);
  const cameraRef = useRef();

  useFrame(() => {
    if (zoomedOut && cameraRef.current) {
      cameraRef.current.position.z += 0.2;
      if (cameraRef.current.position.z > 10) {
        cameraRef.current.position.z = 10;
      }
    }
  });

  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 60 }} ref={cameraRef}>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <OrbitControls />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

      {!zoomedOut && <HomeCenter onClick={() => setZoomedOut(true)} />}

      {zoomedOut && (
        <>
          {nodes.map((node, i) => {
            const [x, y, z] = getCoordinates(i, nodes.length, 5);
            return (
              <group key={i}>
                <WebLine start={[0, 0, 0]} end={[x, y, z]} />
                <FloatingLabel position={[x, y, z]} label={node.label} />
              </group>
            );
          })}
        </>
      )}
    </Canvas>
  );
}

export default function AboutScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Scene />
    </div>
  );
}

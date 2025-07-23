// src/components/Spaceship.js
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Spaceship({ speed = 5, offset = 2 }) {
  const ship = useRef();
  const { camera } = useThree();

  const keys = useRef({
    forward:  false,
    backward: false,
    left:     false,
    right:    false,
  });

  useEffect(() => {
    const down = (e) => {
      switch (e.code) {
        case 'KeyW': keys.current.forward  = true; break;
        case 'KeyS': keys.current.backward = true; break;
        case 'KeyA': keys.current.left     = true; break;
        case 'KeyD': keys.current.right    = true; break;
      }
    };
    const up = (e) => {
      switch (e.code) {
        case 'KeyW': keys.current.forward  = false; break;
        case 'KeyS': keys.current.backward = false; break;
        case 'KeyA': keys.current.left     = false; break;
        case 'KeyD': keys.current.right    = false; break;
      }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup',   up);
    };
  }, []);

  useFrame((_, delta) => {
    // 1) compute movement dir in world‐space
    const dir = new THREE.Vector3();
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);

    if (keys.current.forward)  dir.add(forward);
    if (keys.current.backward) dir.sub(forward);

    const left = new THREE.Vector3().crossVectors(camera.up, forward).normalize();
    if (keys.current.left)  dir.add(left);
    if (keys.current.right) dir.sub(left);

    if (dir.lengthSq() > 0) {
      dir.normalize().multiplyScalar(speed * delta);
      camera.position.add(dir);
    }

    // 2) place the ship *in front* of the camera by `offset` units
    const shipPos = camera.position.clone().add(forward.clone().multiplyScalar(offset));
    ship.current.position.copy(shipPos);

    // 3) match the ship’s orientation to the camera
    ship.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group ref={ship}>
      {/* Nose */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.6, 16]} />
        <meshStandardMaterial 
          color="#88ccff" 
          emissive="#88ccff" 
          emissiveIntensity={0.5} 
        />
      </mesh>

      {/* Body */}
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 16]} />
        <meshStandardMaterial 
          color="#6677aa" 
          emissive="#333355" 
          emissiveIntensity={0.3} 
        />
      </mesh>
    </group>
  );
}

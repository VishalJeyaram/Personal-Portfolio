import React from 'react';
import TexturedPlanet from './TexturedPlanet';
import { useGLTF } from '@react-three/drei';

export default function PlanetCluster() {
  // load the ring model
  const { scene: saturn } = useGLTF('/models/saturn.glb');

  // an array of { x, y, z, size, textureUrl, rotationSpeed }
  const bodies = [
    // Saturn ring in center
    { type: 'ring', x:   0, y:  10, z: -90, scale: 6 },

    // Planets
    { x: -200, y:  3, z: -10, size: 3.0, texture: '/textures/earth.jpeg', speed: 0.0008 },
    { x: -140, y: -5, z: -60, size: 15.5, texture: '/textures/purple_light.png',  speed: 0.0012 },
    { x:  60, y:  6, z: -20, size: 8.8, texture: '/textures/purple.png', speed: 0.0010 },
    { x:   0,  y: -4, z: 70, size: 5.0, texture: '/textures/diamond.png', speed: 0.0007 },
    { x:   30, y:  5, z: 85, size: 4.2, texture: '/textures/green.png', speed: 0.0005 },
    { x:  140, y: -6, z: 55, size: 2.7, texture: '/textures/mars.png',  speed: 0.0015 },
    { x:  200, y:  2, z: 95, size: 40.2, texture: '/textures/avatar.jpg', speed: 0.0009 },

  ];

  return (
    <>
      {bodies.map((b, i) => {
        if (b.type === 'ring') {
          return (
            <primitive
              key={`ring-${i}`}
              object={saturn.clone()}
              position={[b.x, b.y, b.z]}
              rotation={[0, 0, 0]}
              scale={[b.scale, b.scale, b.scale]}
            />
          );
        }
        return (
          <TexturedPlanet
            key={`planet-${i}`}
            position={[b.x, b.y, b.z]}
            size={b.size}
            textureUrl={b.texture}
            rotationSpeed={b.speed}
          />
        );
      })}
    </>
  );
}

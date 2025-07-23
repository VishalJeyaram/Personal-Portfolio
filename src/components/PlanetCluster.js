// components/PlanetCluster.js
import React from 'react';
import TexturedPlanet from './TexturedPlanet';

export default function PlanetCluster() {
  return (
    <>
      <TexturedPlanet
        position={[-30, 10, -40]}
        size={3.2}
        textureUrl="/textures/earth.jpeg"
        rotationSpeed={0.0008}
      />
      <TexturedPlanet
        position={[25, -15, -60]}
        size={2.8}
        textureUrl="/textures/mars.png"
        rotationSpeed={0.0012}
      />
      {/* Add more planets here if needed */}
    </>
  );
}
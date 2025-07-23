import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import './ProjectCard.css';

export default function ProjectCard({
  initialPos,
  rotationSpeed,
  driftAmp,
  driftPhase,
  size = [2, 1],
  imageUrl,
  title,
  onClick
}) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, imageUrl);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!mesh.current) return;

    // 1) gentle drift around initialPos
    mesh.current.position.set(
      initialPos[0] + Math.sin(t + driftPhase) * driftAmp,
      initialPos[1] + Math.cos(t + driftPhase) * driftAmp,
      initialPos[2] + Math.sin(t + driftPhase * 0.5) * driftAmp
    );

    // 2) slight rocking
    mesh.current.rotation.y = 0.2 * Math.sin(t * 0.5);
  });

  return (
    <group>
      <mesh
        ref={mesh}
        scale={hovered ? [size[0] * 1.1, size[1] * 1.1, 1] : [...size, 1]}
        onPointerOver={e => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={e => { e.stopPropagation(); setHovered(false); }}
        onClick={e => { e.stopPropagation(); onClick(); }}
      >
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial map={texture} toneMapped={false} />
      </mesh>

      {hovered && (
        <Html position={[0, -size[1] / 2 - 0.2, 0]} center>
          <div className="card-title">{title}</div>
        </Html>
      )}
    </group>
  );
}

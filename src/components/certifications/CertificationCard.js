import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Edges, Text, Plane } from '@react-three/drei';
import * as THREE from 'three';

export default function CertificationCard({ certification, position }) {
  const [hovered, setHovered] = useState(false);
  const edgeRef  = useRef();
  const groupRef = useRef();
  const basePos = useRef(position);

  const texture = useLoader(THREE.TextureLoader, certification.image);

  const [imageWidth, imageHeight] = useMemo(() => {
    const img = texture.image;
    if (!img?.width || !img?.height) return [3.5, 2.2];
    const aspect = img.width / img.height;
    const defaultW = 5.5;
    return [defaultW, defaultW / aspect];
  }, [texture]);

  useFrame(({ clock }) => {
    if (!edgeRef.current || !groupRef.current) return;
    const t = clock.getElapsedTime();

    // glow edge + subtle pulse
    edgeRef.current.material.color.set(hovered ? '#00ffff' : '#007788');
    edgeRef.current.material.opacity = hovered ? 1 : 0.75;
    const pulse = hovered ? 1 + 0.015 * Math.sin(t * 3) : 1;
    groupRef.current.scale.set(pulse, pulse, pulse);

    const currentY = groupRef.current.position.y;
    const targetY  = hovered
      ? basePos.current[1] + 4.5   
      : basePos.current[1] + 4 ;       
    groupRef.current.position.y = THREE.MathUtils.lerp(currentY, targetY, 0.1);
  });

  return (
       <group
        ref={groupRef}
        position={position}
        onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
        }}
        onClick={() => window.open(certification.link, '_blank')}
       >
      <mesh>
        <boxGeometry args={[11.5, 6, 0.5]} />
        <meshStandardMaterial color="#001522" transparent opacity={0} />
        <Edges ref={edgeRef} scale={1.01} threshold={15} color="#00ffff" />
      </mesh>

      <Text
        position={[0, 2.3, 0.3]}
        fontSize={0.4}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#00ffff"
      >
        {certification.name.toUpperCase()}
      </Text>

      <Plane args={[imageWidth, imageHeight]} position={[0, -0.4, 0.3]}>
        <meshStandardMaterial
          map={texture}
          transparent
          toneMapped={false}
        />
      </Plane>
    </group>
  );
}

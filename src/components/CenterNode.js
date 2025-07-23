import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';

export default function CenterNode() {
  const sphereRef = useRef();
  const imageRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, '/profile.png');

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const pulse = 2.5 + 0.2 * Math.sin(t * 2);

    // Update sphere scale
    if (sphereRef.current) {
      sphereRef.current.scale.set(pulse, pulse, pulse);
    }

    // Update image to stay in front of sphere
    if (imageRef.current) {
      const direction = new Vector3().subVectors(camera.position, new Vector3(0, 0, 0)).normalize();
      const offset = direction.multiplyScalar(0.52); // push image further forward
      imageRef.current.position.set(offset.x, offset.y, offset.z);
      imageRef.current.lookAt(camera.position);
      imageRef.current.scale.set(pulse, pulse, pulse); // sync size
    }
  });

  return (
    <group>
      {/* Pulsating Sphere */}
      <mesh
        ref={sphereRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#88f0ff' : '#ffffff'}
          emissive={hovered ? '#00ffff' : '#222222'}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Profile Image in front of the sphere */}
      <mesh ref={imageRef}>
        <planeGeometry args={[0.88, 0.88]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthTest={false} // show image on top
        />
      </mesh>
    </group>
  );
}

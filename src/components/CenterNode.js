import React, { useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import { useNavigate } from 'react-router-dom';

export default function CenterNode() {
  const sphereRef = useRef();
  const imageRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, '/profile.png');
  const { gl, camera } = useThree();
  const navigate = useNavigate();  

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 2.5 + 0.2 * Math.sin(t * 2);
    if (sphereRef.current) sphereRef.current.scale.set(pulse, pulse, pulse);
    if (imageRef.current) {
      const dir = new Vector3()
        .subVectors(camera.position, new Vector3(0, 0, 0))
        .normalize();
      const offset = dir.multiplyScalar(0.52);
      imageRef.current.position.set(offset.x, offset.y, offset.z);
      imageRef.current.lookAt(camera.position);
      imageRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const onOver = e => {
    e.stopPropagation();
    setHovered(true);
    gl.domElement.style.cursor = 'pointer';
  };
  const onOut = e => {
    e.stopPropagation();
    setHovered(false);
    gl.domElement.style.cursor = 'auto';
  };

  const onClick = e => {
    e.stopPropagation();
    navigate('/home');
  };

  return (
    <group>
      <mesh
        ref={sphereRef}
        onPointerOver={onOver}
        onPointerOut={onOut}
        onClick={onClick}           
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#88f0ff' : '#ffffff'}
          emissive={hovered ? '#00ffff' : '#222222'}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={imageRef}>
        <planeGeometry args={[0.88, 0.88]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthTest={false}
        />
      </mesh>
    </group>
  );
}

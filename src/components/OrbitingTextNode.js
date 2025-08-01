import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function OrbitingTextNode({
  position,
  label,
  isSelected,
  onClick,
  isZoomedInRef,
  resetCompleteRef,
  angleRef,
  disableInteraction,
  disableHover
}) {
  const textRef = useRef();
  const groupRef = useRef();
  const { camera, gl, controls } = useThree();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (disableHover || disableInteraction) {
      setHovered(false);
    }
  }, [disableHover, disableInteraction]);

  const isDragging = useRef(false);
  useEffect(() => {
    const handleStart = () => (isDragging.current = true);
    const handleEnd = () => {
      isDragging.current = false;
      angleRef.current = Math.atan2(camera.position.x, camera.position.z);
    };
    gl.domElement.addEventListener('pointerdown', handleStart);
    gl.domElement.addEventListener('pointerup', handleEnd);
    return () => {
      gl.domElement.removeEventListener('pointerdown', handleStart);
      gl.domElement.removeEventListener('pointerup', handleEnd);
    };
  }, [gl, angleRef, camera.position]);

  useEffect(() => {
    if (controls) {
      controls.enablePan = false;
      controls.enableZoom = true;
      controls.enableRotate = true;
    }
  }, [controls]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = hovered
      ? 1.3 + 0.05 * Math.sin(t * 6)
      : 1 + 0.05 * Math.sin(t * 4);
    const bob = 0.1 * Math.sin(t * 2);

    if (textRef.current) {
      textRef.current.scale.set(scale, scale, scale);
      textRef.current.position.y = bob;
      textRef.current.lookAt(camera.position);
    }

    if (
      !isZoomedInRef.current &&
      resetCompleteRef.current &&
      !isDragging.current
    ) {
      angleRef.current += 0.0005;
      const radius = Math.hypot(camera.position.x, camera.position.z);
      camera.position.x = Math.sin(angleRef.current) * radius;
      camera.position.z = Math.cos(angleRef.current) * radius;
      camera.lookAt(0, 0, 0);
    }
  });

  const outward = 2.2;
  const finalPosition = position.map(c => c * outward);

  return (
    <group
      ref={groupRef}
      position={[finalPosition[0], finalPosition[1], finalPosition[2] + 0.2]}
    >
      <Text
        ref={textRef}
        font="/fonts/Orbitron-VariableFont_wght.ttf"
        fontSize={0.6}
        letterSpacing={0.05}
        color={isSelected ? '#ffffff' : hovered ? '#ccffff' : '#ffffff'}
        strokeColor={
          isSelected ? '#ffcc00' : hovered ? '#00ffff' : '#00bfff'
        }
        strokeWidth={isSelected ? 0.09 : hovered ? 0.05 : 0.03}
        outlineColor={
          isSelected ? '#ffcc00' : hovered ? '#00ffff' : '#00bfff'
        }
        outlineWidth={isSelected ? 0.03 : hovered ? 0.015 : 0.008}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
        material-transparent
        material-opacity={0.95}
        onPointerOver={e => {
          e.stopPropagation();

          gl.domElement.style.cursor = 'pointer';

          if (!disableHover) setHovered(true);
        }}
        onPointerOut={e => {
          e.stopPropagation();

          gl.domElement.style.cursor = 'auto';

          if (!disableHover) setHovered(false);
        }}
        onClick={e => {
          e.stopPropagation();
          if (!disableInteraction && onClick) onClick();
        }}
      >
        {label}
      </Text>
    </group>
  );
}

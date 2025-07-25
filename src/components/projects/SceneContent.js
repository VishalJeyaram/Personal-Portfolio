import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import projects from '../../data/projects';

export default function SceneContent({
  selectedIdx,
  setSelectedIdx,
  cameraMode,
  setCameraMode,
  onZoomOutComplete
}) {
  const projectPositions = useMemo(() => {
    const total = projects.length;
    return projects.map((_, i) => {
      const offset = 2 / total;
      const increment = Math.PI * (3 - Math.sqrt(5));
      const y = ((i * offset) - 1) + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      return [
        Math.cos(phi) * r * 8,
        y * 8,
        Math.sin(phi) * r * 8
      ];
    });
  }, []);

  const projectTextures = useLoader(
    TextureLoader,
    projects.map((p) => p.image)
  );

  const shipRef = useRef();
  const keys = useRef({ forward: false, back: false, left: false, right: false });
  const speed = 8;
  const turnSpeed = 2;

  // Keyboard listeners
  useEffect(() => {
    const down = (e) => {
      if (e.code === 'KeyW') keys.current.forward = true;
      if (e.code === 'KeyS') keys.current.back    = true;
      if (e.code === 'KeyA') keys.current.left    = true;
      if (e.code === 'KeyD') keys.current.right   = true;
    };
    const up = (e) => {
      if (e.code === 'KeyW') keys.current.forward = false;
      if (e.code === 'KeyS') keys.current.back    = false;
      if (e.code === 'KeyA') keys.current.left    = false;
      if (e.code === 'KeyD') keys.current.right   = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  function CameraZoomTo({ target, onComplete }) {
    const { camera } = useThree();
    const zoomPos = useMemo(
      () => new THREE.Vector3(...target).multiplyScalar(1.2),
      [target]
    );
    useFrame(() => {
      camera.position.lerp(zoomPos, 0.1);
      camera.lookAt(...target);
      if (camera.position.distanceTo(zoomPos) < 0.1) {
        onComplete();
      }
    });
    return null;
  }

  useFrame((state, delta) => {
    const disabled = cameraMode !== 'free';

    if (shipRef.current && !disabled) {
      if (keys.current.left)  shipRef.current.rotation.y += turnSpeed * delta;
      if (keys.current.right) shipRef.current.rotation.y -= turnSpeed * delta;
      const dir = new THREE.Vector3(0, 0, -1)
        .applyQuaternion(shipRef.current.quaternion)
        .multiplyScalar((keys.current.forward ? 1 : keys.current.back ? -1 : 0) * speed * delta);
      shipRef.current.position.add(dir);
    }

    if (shipRef.current && cameraMode === 'free') {
      const offset = new THREE.Vector3(0, 2, 10).applyQuaternion(shipRef.current.quaternion);
      state.camera.position.copy(shipRef.current.position).add(offset);
      state.camera.lookAt(shipRef.current.position);
    }
  });

  const handleProjectClick = (i) => {
    setCameraMode('zoomin');
    setSelectedIdx(i);
  };

  const disabled = cameraMode !== 'free';

  return (
    <>
      {/* Lights & starfield */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade />

      <mesh ref={shipRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
        <meshStandardMaterial color="#777" />
        <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.5, 1, 16]} />
          <meshStandardMaterial color="#aaa" />
        </mesh>
      </mesh>

      {projectPositions.map((pos, i) => {
        const hoveredScale = 1.2;
        return (
          <sprite
            key={projects[i].id}
            position={pos}
            onClick={() => !disabled && handleProjectClick(i)}
            onPointerOver={(e) => !disabled && e.object.scale.set(hoveredScale, hoveredScale, hoveredScale)}
            onPointerOut={(e) => !disabled && e.object.scale.set(0.8, 0.8, 0.8)}
          >
            <spriteMaterial
              map={projectTextures[i]}
              transparent
              opacity={disabled ? 0.8 : 0.9}
              depthTest={false}
            />
          </sprite>
        );
      })}

      {cameraMode === 'free' &&
        projectPositions.map((pos, i) => (
          <Html
            key={`label-${projects[i].id}`}
            position={[pos[0], pos[1] + 0.6, pos[2]]}
            center
            style={{ pointerEvents: 'none' }}
          >
            <div className="project-label">{projects[i].name}</div>
          </Html>
        ))}

      {cameraMode === 'zoomin' && selectedIdx != null && (
        <CameraZoomTo
          target={projectPositions[selectedIdx]}
          onComplete={() => setCameraMode('free')}
        />
      )}

      {cameraMode !== 'free' && selectedIdx != null && (
        <Html center>
          <div className="project-tooltip">
            <h3>{projects[selectedIdx].name}</h3>
          </div>
        </Html>
      )}
    </>
  );
}

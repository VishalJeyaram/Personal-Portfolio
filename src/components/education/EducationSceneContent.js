import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Html, Edges } from '@react-three/drei';
import { TextureLoader } from 'three';
import { educationData as photos } from '../../data/education';
import './EducationScene.css';

export default function SceneContent() {
  const { camera } = useThree();
  const textures   = useLoader(TextureLoader, photos.map(p => p.src));
  const refs       = useRef([]);

  // preserve each image’s aspect at 2 units tall
  const dimensions = useMemo(() => {
    const H = 2;
    return textures.map(tex => {
      const { width, height } = tex.image;
      return [(width / height) * H, H];
    });
  }, [textures]);

  // front-and-center starting index
  const frontIndex      = 3;
  const initialRotation = -Math.PI / 2 - (frontIndex / photos.length) * Math.PI * 2;

  // orbit settings
  const baseRadius    = 4;
  const speed         = 0.05;
  const radiusOffsets = photos.map((_, i) => baseRadius + Math.sin(i * 1.5) * 0.8);
  // Note: no heightOffsets—instead we'll use a fixed Y

  useFrame(({ clock }) => {
    const t      = clock.getElapsedTime();
    const camPos = camera.position;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (i / photos.length) * Math.PI * 2;
      const angle = t * speed + phase + initialRotation;
      const r     = radiusOffsets[i];

      // orbit in XZ-plane
      mesh.position.x = camPos.x + Math.cos(angle) * r;
      mesh.position.z = camPos.z + Math.sin(angle) * r;
      // fixed Y-height for all meshes
      mesh.position.y = camPos.y;      
      mesh.lookAt(camPos.x, camPos.y, camPos.z);
    });
  });

  return (
    <>
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade />
      <OrbitControls enablePan={false} enableZoom autoRotate={false} />

      {textures.map((tex, i) => {
        const [w, h] = dimensions[i];
        return (
          <mesh key={i} ref={el => (refs.current[i] = el)}>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
            <Edges scale={1.02} color="#00ffff" />

            <Html position={[0, -h / 2 - 0.2, 0]} center>
              <div className="edu-modal">
                <h2>{photos[i].title}</h2>
                <ul className="edu-modal-list">
                  {photos[i].bullets.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </Html>
          </mesh>
        );
      })}
    </>
  );
}

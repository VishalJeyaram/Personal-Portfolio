// src/components/EducationSceneContent.jsx

import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Html, Edges } from '@react-three/drei';
import { TextureLoader } from 'three';
import './EducationScene.css';

const photos = [
  {
    src: '/education_images/exchange.jpg',
    title: 'Exchange Program (2023)',
    bullets: [
      'Computer Science Exchange at University of Birmingham (Jan–Jun 2023)',
      'Activities: University of Birmingham Hindu Society (NHSF); Birmingham Tamil Society',
      'Modules: Artificial Intelligence; Internet of Things; Computer Vision & Imaging',
    ],
  },
  {
    src: '/education_images/TA.jpg',
    title: 'Teaching Assistant (2022-2023)',
    bullets: [
      'TA for CG1111A: Engineering Principles and Practices I (Aug–Nov 2022)',
      'Assisted labs: circuit construction & sensor integration',
      'Supervised final projects—autonomous robotic‐vehicle maze navigation',
      'Graded lab reports with detailed feedback',
    ],
  },
  {
    src: '/education_images/Connecto.png',
    title: 'Project Director of Connecto at NUS MedTech (2023-2024)',
    bullets: [
      'Led interdisciplinary team to build a smart IoT home system for Muscular Dystrophy patients, in collaboration with Microtube Technologies (startup)',
      'Designed an ambidextrous assistive mouse using force-sensitive resistors & joystick',
      'Conducted clinical observations at NUHS and refined design from feedback',
      'Developed a Flutter app for device control & caregiver communication',
      '4th place at NUS Medical Grand Challenge 2024',
    ],
  },
  {
    src: '/education_images/nus.jpg',
    title: "Bachelor of Engineering (Honours) in Computer Engineering\n"+ "\nSecond Major in Innovation & Design     \nNational University of Singapore (2020–2024)",
    bullets: [
      'Societies: GENUS Guitar Ensemble; NUS Stage; NUS MedTech; IDP; AeroNUS; NUS Naach; ICS; Tamil Language Society',
      'Modules: CG1111; CS1010; CS1231; MA1511; MA1512; CG1112; CS2040C; EE2026; MA1508E; CP2106; CS2113T; EG2311; CG2023; CG2271; EG2310; CS3244; CDE5311',
    ],
  },
  {
    src: '/education_images/ambassador.jpg',
    title: 'NUS Alumni Ambassador 2024 for School of Electrical and Computer Engineering (ECE)',
    bullets: [
      'Represented ECE Dept in alumni-student networking events',
      'Organized mentorship sessions & career panels',
      'Fostered engagement between current students and alumni',
    ],
  },
];

export default function SceneContent() {
  const { camera } = useThree();
  const textures   = useLoader(TextureLoader, photos.map(p => p.src));
  const refs       = useRef([]);

  // compute each plane’s [width, height] preserving original aspect at 2 units tall
  const dimensions = useMemo(() => {
    const H = 2;
    return textures.map(tex => {
      const { width, height } = tex.image;
      return [(width / height) * H, H];
    });
  }, [textures]);

  // determine how much to rotate the ring so photos[3] is front
  const frontIndex      = 3;
  const initialRotation = -Math.PI / 2 - (frontIndex / photos.length) * Math.PI * 2;

  // orbit parameters
  const baseRadius    = 4;
  const speed         = 0.05;
  const radiusOffsets = photos.map((_, i) => baseRadius + Math.sin(i * 1.5) * 0.8);
  const heightOffsets = photos.map((_, i) => 1 + Math.cos(i * 1.3) * 0.7);

  // animate orbit each frame
  useFrame(({ clock }) => {
    const t      = clock.getElapsedTime();
    const camPos = camera.position;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (i / photos.length) * Math.PI * 2;
      const angle = t * speed + phase + initialRotation;
      const r     = radiusOffsets[i];

      mesh.position.x = camPos.x + Math.cos(angle) * r;
      mesh.position.z = camPos.z + Math.sin(angle) * r;
      mesh.position.y = camPos.y + heightOffsets[i];
      mesh.lookAt(camPos.x, camPos.y, camPos.z);
    });
  });

  return (
    <>
      {/* background */}
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
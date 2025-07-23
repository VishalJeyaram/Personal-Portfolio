import React, { useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import {
  Html,
  Line,
  Sphere,
  Ring,
  Billboard
} from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { WORK_EXPERIENCE } from '../../data/workexperience';

export default function TimelineContent() {
  const [hovered, setHovered] = useState(null);
  const [open, setOpen]       = useState(null);
  const sphereRefs            = useRef([]);
  const ringRefs              = useRef([]);
  const dashOffset            = useRef(0);

  // 1) compute evenly spaced points along X
  const count   = WORK_EXPERIENCE.length;
  const spacing = 6;
  const offset  = ((count - 1) * spacing) / 2;
  const points  = WORK_EXPERIENCE.map((_, i) => [i * spacing - offset, 0, 0]);

  // 2) load each company logo
  const logoTextures = useLoader(
    THREE.TextureLoader,
    WORK_EXPERIENCE.map(job => job.logo)
  );

  // 3) animate dash offset, sphere rotation & pulse, ring rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    dashOffset.current = t * 0.5;

    sphereRefs.current.forEach((sphere, i) => {
      if (!sphere) return;
      // continuous spin
      sphere.rotation.y = -t * 0.5;
      // pulse on hover
      const pulse = hovered === i ? 1 + 0.20 * Math.sin(t * 3) : 1;
      sphere.scale.set(pulse, pulse, pulse);
    });

    ringRefs.current.forEach(ring => {
      if (ring) ring.rotation.z = t * 0.3;
    });
  });

  return (
    <>
      {/* Animated dashed timeline */}
      <Line
        points={points}
        color="#00ffff"
        lineWidth={2}
        dashed
        dashSize={0.5}
        gapSize={0.3}
        dashOffset={dashOffset.current}
      />

      {WORK_EXPERIENCE.map((job, i) => {
        const [x, y, z] = points[i];
        const isOpen     = open === i;
        const isHover    = hovered === i;

        return (
          <group key={i}>
            {/* Logo-textured, rotating, hover-pulsing sphere */}
            <Sphere
              ref={el => (sphereRefs.current[i] = el)}
              args={[1.2, 32, 32]}
              position={[x, y, z]}
              onPointerOver={() => setHovered(i)}
              onPointerOut={() => setHovered(null)}
              onClick={() => setOpen(i)}
              onPointerMove={() => (document.body.style.cursor = 'pointer')}
              onPointerLeave={() => (document.body.style.cursor = 'auto')}
            >
              <meshBasicMaterial
                map={logoTextures[i]}
                toneMapped={false}
              />
            </Sphere>

            {/* Rotating glow ring */}
            <Ring
              ref={el => (ringRefs.current[i] = el)}
              args={[1.4, 1.6, 32]}
              position={[x, y, z]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshBasicMaterial
                color="#00ffff"
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </Ring>

            {/* Company & period label */}
            <Html position={[x, -2.5, z]} center>
              <div className="work-label glow-text">
                <strong>{job.company}</strong><br />
                <small>{job.period}</small>
              </div>
            </Html>

            {/* Expanded modal */}
            {isOpen && (
              <Html position={[x, 3, z]} center>
                <div className="work-modal glow-box">
                  <button
                    className="close-btn glow-btn"
                    onClick={() => setOpen(null)}
                  >
                    Close
                  </button>
                  <h3>{job.title}</h3>
                  <ul>
                    {job.bullets.map((b, k) => (
                      <li key={k}>{b}</li>
                    ))}
                  </ul>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}
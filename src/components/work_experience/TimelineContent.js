import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import {
  Html,
  Line,
  Sphere,
  Ring,
} from '@react-three/drei';
import * as THREE from 'three';
import { WORK_EXPERIENCE } from '../../data/workexperience';
import '../../pages/WorkExperienceScene.css'

export default function TimelineContent() {
  const [hovered, setHovered] = useState(null);
  const [open, setOpen]       = useState(null);
  const sphereRefs            = useRef([]);
  const ringRefs              = useRef([]);
  const dashOffset            = useRef(0);

  const count   = WORK_EXPERIENCE.length;
  const spacing = 10;
  const offset  = ((count - 1) * spacing) / 2;
  const points  = WORK_EXPERIENCE.map((_, i) => [i * spacing - offset, 0, 0]);

  const logoTextures = useLoader(
    THREE.TextureLoader,
    WORK_EXPERIENCE.map(job => job.logo)
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    dashOffset.current = t * 0.5;

    sphereRefs.current.forEach((sphere, i) => {
      if (!sphere) return;
      sphere.rotation.y = -t * 0.5;
      const pulse = hovered === i ? 1 + 0.20 * Math.sin(t * 3) : 1;
      sphere.scale.set(pulse, pulse, pulse);
    });

    ringRefs.current.forEach(ring => {
      if (ring) ring.rotation.z = t * 0.3;
    });
  });

  return (
    <>
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

        return (
          <group key={i}>
            <Sphere
              ref={el => (sphereRefs.current[i] = el)}
              args={[2.5, 32, 32]}
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

            <Ring
              ref={el => (ringRefs.current[i] = el)}
              args={[2.9, 1.6, 32]}
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

            <Html position={[x, -5.9, z]} center>
              <div className="work-label glow-text">
                <strong>{job.company}</strong><br />
                <small>{job.period}</small>
              </div>
            </Html>

            {isOpen && (
              <Html position={[x, 6, z]} center>
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
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import StaticStars from '../components/StaticStars';
import CenterNode from '../components/CenterNode';
import WebStructure from '../components/WebStructure';
import OrbitingTextNode from '../components/OrbitingTextNode';
import WebLine from '../components/WebLine';
import PlanetCluster from '../components/PlanetCluster';
import WebStructureLabelRing from '../components/WebStructureLabelRing';
import * as THREE from 'three';
import './About.css';

const labels = [
  'Education',
  '      Work \nExperience',
  'Interests',
  'Skills',
  'Certifications',
  'Projects'
];

function getCoordinates(index, total, radius) {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = ((index * offset) - 1) + (offset / 2);
  const r = Math.sqrt(1 - y * y);
  const phi = index * increment;
  return [
    Math.cos(phi) * r * radius,
    y * radius,
    Math.sin(phi) * r * radius
  ];
}

function CameraAnimator({ target, isZoomedInRef, resetRef, resetCompleteRef, angleRef, sceneRef }) {
  const { camera } = useThree();
  const speed = 0.1;
  const defaultPos = new THREE.Vector3(0, 0, 15);

  useFrame(() => {
    if (isZoomedInRef.current && target) {
      resetCompleteRef.current = false;
      camera.position.lerp(new THREE.Vector3(...target), speed);
      camera.lookAt(0, 2.2, 0);
    } else if (resetRef.current) {
      resetCompleteRef.current = false;
      camera.position.lerp(defaultPos, speed);
      camera.lookAt(0, 0, 0);
      if (camera.position.distanceTo(defaultPos) < 0.01) {
        camera.position.copy(defaultPos);
        resetRef.current = false;
        resetCompleteRef.current = true;
        angleRef.current = Math.atan2(camera.position.x, camera.position.z);
      }
    }
    if (sceneRef.current) {
      sceneRef.current.fog = isZoomedInRef.current
        ? new THREE.Fog('#000000', 3, 11.5)
        : null;
    }
  });

  return null;
}

export default function About() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('aboutVisited');
  });

  const [showFlash, setShowFlash] = useState(false);
  const [hideScene, setHideScene] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false)

  const isZoomedInRef = useRef(false);
  const resetRef = useRef(false);
  const cameraResetCompleteRef = useRef(true);
  const angleRef = useRef(Math.atan2(0, 15));
  const [cameraTarget, setCameraTarget] = useState(null);
  const sceneRef = useRef();
  const [selectedLabel, setSelectedLabel] = useState(null);

  useEffect(() => {
    if (!loading) {
      setShowPrompt(true)
      const t = setTimeout(() => setShowPrompt(false), 5000)
      return () => clearTimeout(t)
    }
  }, [loading])

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('aboutVisited', 'true');
    }, 2500);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleZoomOut = () => {
    isZoomedInRef.current = false;
    resetRef.current = true;
    setCameraTarget(null);
    setSelectedLabel(null);
    setHideModal(false);
  };

  const handleViewMore = (label) => {
    setHideModal(true);
    setShowFlash(true);

    // hyperspace flash then navigation
    setTimeout(() => {
      if (label === 'Projects') navigate('/projects');
      else if (label.includes('Education')) navigate('/education');
      else if (label.includes('Certifications')) navigate('/certifications');
      else if (label.includes('Work')) navigate('/workexperience');
      else if (label.includes('Skills')) navigate('/skills');
    }, 800);

    // hide scene almost immediately so flash shows full-screen
    setTimeout(() => setHideScene(true), 100);

    // then clear the flash
    setTimeout(() => setShowFlash(false), 800);
  };

  const textNodes = useMemo(() => {
    return labels.map((label, i) => {
      const pos = getCoordinates(i, labels.length, 5.5);
      const worldPos = new THREE.Vector3(...pos).multiplyScalar(2.2).normalize().multiplyScalar(10);
      const target = [worldPos.x, worldPos.y, worldPos.z];
      return (
        <group key={label} position={pos}>
          <WebLine start={[0,0,0]} end={pos.map(v => -v)} />
          <OrbitingTextNode
            position={[0,0,0]}
            label={label}
            isSelected={label === selectedLabel}
            onClick={() => {
              if (!isZoomedInRef.current) {
                isZoomedInRef.current = true;
                setCameraTarget(target);
                resetRef.current = false;
                setSelectedLabel(label);
              }
            }}
            isZoomedInRef={isZoomedInRef}
            resetCompleteRef={cameraResetCompleteRef}
            angleRef={angleRef}
            disableInteraction={isZoomedInRef.current}
            disableHover={isZoomedInRef.current}
          />
        </group>
      );
    });
  }, [selectedLabel]);

  return (
    <div className="about-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-title">[ Loading.... ]</div>
          <div className="loading-bar"><div className="loading-fill" /></div>
        </div>
      )}

      {showFlash && <div className="hyperspace-flash" />}

      {!loading && (
        <>
          {showPrompt && (
            <div className="orbit-prompt">
              Click and drag to move around the 3D Space and use your mouse scroll wheel to zoom in and out
            </div>
          )}
          {!hideScene && (
            <Canvas
              camera={{ position: [0, 0, 15], fov: 50 }}
              onCreated={({ scene }) => { sceneRef.current = scene; }}
            >
              <ambientLight intensity={1} />
              <pointLight position={[10,10,10]} intensity={3} color="#00bfff" />
              <OrbitControls enableZoom enablePan={false} />
              <StaticStars />
              <WebStructure />
              {!isZoomedInRef.current && <CenterNode disableInteraction disableHover />}
              <PlanetCluster />
              {textNodes}
              <WebStructureLabelRing />
              <CameraAnimator
                target={cameraTarget}
                isZoomedInRef={isZoomedInRef}
                resetRef={resetRef}
                resetCompleteRef={cameraResetCompleteRef}
                angleRef={angleRef}
                sceneRef={sceneRef}
              />
            </Canvas>
          )}

          {selectedLabel && !hideModal && (
            <div className="zoom-modal">
              {selectedLabel === 'Interests'
                ? <h2>My apologies... This page is still being developed.</h2>
                : <h2>Would you like to learn more about my {selectedLabel}?</h2>}
              {selectedLabel !== 'Interests' && (
                <button className="portfolio-button" onClick={() => handleViewMore(selectedLabel)}>
                  View More
                </button>
              )}
              <button className="portfolio-button" onClick={handleZoomOut}>
                Close
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

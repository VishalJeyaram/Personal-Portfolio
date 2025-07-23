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
  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;
  return [x * radius, y * radius, z * radius];
}

function CameraAnimator({ target, isZoomedInRef, resetRef, resetCompleteRef, angleRef, sceneRef }) {
  const { camera } = useThree();
  const speed = 0.1;
  const defaultPos = new THREE.Vector3(0, 0, 15);

  useFrame(() => {
    if (isZoomedInRef.current && target) {
      resetCompleteRef.current = false;
      const targetVec = new THREE.Vector3(...target);
      camera.position.lerp(targetVec, speed);
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
  const textRadius = 5.5;
  const [loading, setLoading] = useState(true);
  const [showFlash, setShowFlash] = useState(false);
  const [hideScene, setHideScene] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const isZoomedInRef = useRef(false);
  const resetRef = useRef(false);
  const cameraResetCompleteRef = useRef(true);
  const angleRef = useRef(Math.atan2(0, 15));
  const [cameraTarget, setCameraTarget] = useState(null);
  const sceneRef = useRef();
  const [selectedLabel, setSelectedLabel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomOut = () => {
    isZoomedInRef.current = false;
    setCameraTarget(null);
    resetRef.current = true;
    setSelectedLabel(null);
    setHideModal(false);
  };

  const handleViewMore = (selectedLabel) => {
    setHideModal(true);
    setShowFlash(true);
    setTimeout(() => {
    if (selectedLabel === 'Projects') {
      navigate('/projects');
    } else if (selectedLabel === 'Education') {
      navigate('/education');
    } else if (selectedLabel === 'Certifications') {
      navigate('/certifications');
    }
    }, 800);

    

    setTimeout(() => {
      setHideScene(true);
    }, 100);

    setTimeout(() => {
      setShowFlash(false);
    }, 800);
  };

  const textNodes = useMemo(() => (
    labels.map((label, i) => {
      const position = getCoordinates(i, labels.length, textRadius);
      const nodeWorldPosition = new THREE.Vector3(...position.map(coord => coord * 2.2));
      const direction = nodeWorldPosition.clone().normalize();

      const targetDistance = 10.0;
      const offset = direction.multiplyScalar(targetDistance);
      const target = [offset.x, offset.y, offset.z];

      return (
        <group key={label} position={position}>
          <WebLine start={[0, 0, 0]} end={[-position[0], -position[1], -position[2]]} />
          <OrbitingTextNode 
            position={[0, 0, 0]} 
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
    })
  ), [selectedLabel, isZoomedInRef.current]);

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
          {!hideScene && (
            <Canvas
              camera={{ position: [0, 0, 15], fov: 50 }}
              onCreated={({ scene }) => { sceneRef.current = scene; }}
            >
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={3} color="#00bfff" />
              <OrbitControls enableZoom={true} enablePan={false} />
              <StaticStars />
              <WebStructure />
              {!isZoomedInRef.current && <CenterNode disableInteraction={true} disableHover={true} />}
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
              <h2>Would you like to learn more about my {selectedLabel}?</h2>
              <button className="portfolio-button" onClick={ () => handleViewMore(selectedLabel)}>View More</button>
              <button className="portfolio-button" onClick={handleZoomOut}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

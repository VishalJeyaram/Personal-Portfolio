import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import projects, { CATEGORIES } from '../data/projects';
import './ProjectsScene.css';

function getCoordinates(index, total, radius) {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = ((index * offset) - 1) + offset / 2;
  const r = Math.sqrt(1 - y * y);
  const phi = index * increment;
  return [
    Math.cos(phi) * r * radius,
    y * radius,
    Math.sin(phi) * r * radius
  ];
}

function ProjectDust({ position, texture, onClick, disabled, setHoverCursor }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (disabled) {
      ref.current.scale.set(1.2, 1.2, 1.2);
      return;
    }
    const base = 1.2, amp = 0.1;
    const pulse = base * (1 + amp * Math.sin(clock.getElapsedTime() * 3));
    const scale = hovered ? pulse * 1.5 : pulse;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <sprite
      ref={ref}
      position={position}
      onPointerOver={e => {
        e.stopPropagation();
        if (!disabled) {
          setHovered(true);
          setHoverCursor(true);
        }
      }}
      onPointerOut={e => {
        e.stopPropagation();
        if (!disabled) {
          setHovered(false);
          setHoverCursor(false);
        }
      }}
      onClick={e => {
        e.stopPropagation();
        if (!disabled) onClick();
      }}
    >
      <spriteMaterial
        map={texture}
        transparent
        opacity={hovered && !disabled ? 1 : 0.9}
        depthTest={false}
      />
    </sprite>
  );
}

function CameraRefSetter({ cameraRef }) {
  const { camera } = useThree();
  useEffect(() => { cameraRef.current = camera }, [camera, cameraRef]);
  return null;
}

function CameraAnimator({ mode, target, initialPos, onZoomOutComplete }) {
  const { camera } = useThree();
  const defaultPos = useMemo(() => initialPos.clone(), [initialPos]);
  const zoomPos = useMemo(
    () => target ? new THREE.Vector3(...target).multiplyScalar(1.1) : null,
    [target]
  );

  useFrame(() => {
    if (mode === 'zoomin' && zoomPos) {
      camera.position.lerp(zoomPos, 0.1);
      camera.lookAt(...target);
    } else if (mode === 'zoomout') {
      camera.position.lerp(defaultPos, 0.1);
      camera.lookAt(0, 0, 0);
      if (camera.position.distanceTo(defaultPos) < 0.05) {
        onZoomOutComplete();
      }
    }
  });
  return null;
}

export default function ProjectsScene() {
  const cameraRef = useRef();
  const initialCamPosRef = useRef(new THREE.Vector3(0, 0, 12));

  const [cameraMode, setCameraMode] = useState('free'); 
  const [cameraTarget, setCameraTarget] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hoverCursor, setHoverCursor] = useState(false);

  // filter state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const categoryNames = useMemo(() => Object.keys(CATEGORIES), []);
  const subOptions = useMemo(
    () => selectedCategory ? CATEGORIES[selectedCategory] : [],
    [selectedCategory]
  );

  const projectTextures = useLoader(TextureLoader, projects.map(p => p.image));
  const projectPositions = useMemo(
    () => projects.map((_, i) => getCoordinates(i, projects.length, 8)),
    []
  );

  const filteredIndices = useMemo(() => {
    return projects
      .map((p, i) => {
        // unify both singular `category` & future plural `categories`
        const cats = p.category ?? p.categories ?? [];
        if (selectedCategory && !cats.includes(selectedCategory)) return null;

        const subs = p.subCategories ?? [];
        if (selectedSubCategory && !subs.includes(selectedSubCategory)) return null;

        return i;
      })
      .filter(i => i != null);
  }, [selectedCategory, selectedSubCategory]);

  const disabled = cameraMode !== 'free';
  const showModal = cameraMode === 'zoomin';

  const handleProjectClick = idx => {
    if (cameraRef.current) initialCamPosRef.current = cameraRef.current.position.clone();
    setCameraTarget(projectPositions[idx]);
    setSelected(projects[idx]);
    setCameraMode('zoomin');
  };
  const handleZoomOutComplete = () => {
    setCameraMode('free');
    setCameraTarget(null);
    setSelected(null);
  };

  return (
    <>
      {/* Filter bar */}
      {cameraMode === 'free' && (
        <div className="filter-bar-retro">
          <label>Category</label>
          <select
            className="filter-dropdown-retro"
            value={selectedCategory}
            onChange={e => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory('');
            }}
          >
            <option value="">All</option>
            {categoryNames.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {selectedCategory && (
            <>
              <label>Subcategory</label>
              <select
                className="filter-dropdown-retro"
                value={selectedSubCategory}
                onChange={e => setSelectedSubCategory(e.target.value)}
              >
                <option value="">All</option>
                {subOptions.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </>
          )}
        </div>
      )}

      {/* 3D canvas */}
      <Canvas
        camera={{ position: initialCamPosRef.current.toArray(), fov: 100 }}
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          cursor: cameraMode === 'free' && hoverCursor ? 'pointer' : 'auto'
        }}
      >
        <CameraRefSetter cameraRef={cameraRef} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <OrbitControls enablePan={false} enableZoom={!disabled} enableRotate={!disabled} />

        {filteredIndices.map(i => (
          <ProjectDust
            key={projects[i].id}
            position={projectPositions[i]}
            texture={projectTextures[i]}
            onClick={() => handleProjectClick(i)}
            disabled={disabled}
            setHoverCursor={setHoverCursor}
          />
        ))}

        {/* Billboarded labels */}
        {cameraMode === 'free' && filteredIndices.map(i => (
          <Billboard
            key={`label-${projects[i].id}`}
            position={[
              projectPositions[i][0],
              projectPositions[i][1] + 1.0,
              projectPositions[i][2]
            ]}
            follow
          >
            <Text
              font="/fonts/Orbitron-VariableFont_wght.ttf"
              fontSize={0.3}
              color="#00ffff"
              strokeColor="#00ffff"
              strokeWidth={0.03}
              anchorX="center"
              anchorY="middle"
            >
              {projects[i].name}
            </Text>
          </Billboard>
        ))}

        {/* Camera animations */}
        {(cameraMode === 'zoomin' || cameraMode === 'zoomout') && (
          <CameraAnimator
            mode={cameraMode}
            target={cameraTarget}
            initialPos={initialCamPosRef.current}
            onZoomOutComplete={handleZoomOutComplete}
          />
        )}
      </Canvas>

      {/* Zoomed-in modal */}
      {showModal && selected && (
        <>
          <div className="project-modal-top"><h3>{selected.name}</h3></div>
          <div className="project-modal-container">
            <div className="project-modal-left">
              <h3>Tech Stack</h3>
              <ul className="project-description">
                {selected.techStack.map(t => <li key={t}>{t}</li>)}
              </ul>
              <div className="modal-links">
                {selected.website && <a href={selected.website} target="_blank" rel="noopener noreferrer">Website</a>}
                {selected.github  && <a href={selected.github}  target="_blank" rel="noopener noreferrer">GitHub</a>}
              </div>
            </div>
            <div className="project-modal-right">
              <h3>About {selected.name}</h3>
              <ul className="project-description">
                {selected.description.map((line, idx) => <li key={idx}>{line}</li>)}
              </ul>
            </div>
          </div>
          <div className="project-modal-bottom" onClick={() => setCameraMode('zoomout')}>
            <h3>Back ←</h3>
          </div>
        </>
      )}
    </>
  );
}

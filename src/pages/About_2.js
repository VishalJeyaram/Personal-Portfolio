import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './About.css';
import Education from './EducationScene';
import WorkExperience from './WorkExperienceScene';
import Certifications from './CertificationsScene';
import Projects from './Projects';
import Skills from './SkillsScene';
import Interests from './Interests';
import { useNavigate } from 'react-router-dom';

const FlyingSpaceship = React.memo(function FlyingSpaceship({
    url = "/models/tie_fighter.glb",
    speed = 0.05,
    startX = -200,
    startY = 0,
    startZ = -20,
    scale = 0.4
  }) {
    const groupRef = useRef();
    const lightRef = useRef();
    const gltf = useGLTF(url);
    const scene = useRef(gltf.scene.clone(true)); // Clone the scene
  
    useEffect(() => {
      if (scene.current) {
        scene.current.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material = child.material.clone(); // Clone material to avoid shared state
            child.material.emissive = new THREE.Color('#222222');
            child.material.emissiveIntensity = 0.6;
            child.material.toneMapped = false;
            child.material.needsUpdate = true;
          }
        });
      }
    }, []);
  
    useEffect(() => {
      if (groupRef.current) {
        groupRef.current.position.set(startX, startY, startZ);
      }
    }, [startX, startY, startZ]);
  
    useFrame(() => {
      if (groupRef.current && lightRef.current) {
        groupRef.current.position.x += speed;
        lightRef.current.position.copy(groupRef.current.position);
  
        if (groupRef.current.position.x > 300) {
          groupRef.current.position.set(startX, startY, startZ);
          lightRef.current.position.copy(groupRef.current.position);
        }
      }
    });
  
    return (
      <group
        ref={groupRef}
        rotation={[0, Math.PI / 2, 0]}
        scale={scale}
      >
        <pointLight
          ref={lightRef}
          intensity={4}
          distance={7}
          decay={1.5}
          color="#ffffff"
        />
        <primitive object={scene.current} raycast={() => null} />
      </group>
    );
  });
  

const clickSound = new Audio(process.env.PUBLIC_URL + '/click_2.mp3');
clickSound.volume = 1.0
const nodes = [
  { label: 'Education', content: 'Bachelor of Engineering in Computer Engineering from NUS. Specialized in AI, graphics, and embedded systems. Bachelor of Engineering in Computer Engineering from NUS. Specialized in AI, graphics, and embedded systems.' },
  { label: '      Work\nExperience', content: 'Worked as a Software Engineer at Microtube Technologies and interned at DXC Technology and Affinidi.' },
  { label: 'Projects', content: 'Built Tranquilio, Project Connecto, a React+Node.js bra-fitting app, and more.' },
  { label: 'Skills', content: 'Proficient in React, Node.js, Python, Three.js, MySQL, Unity, and AWS.' },
  { label: 'Certifications', content: 'Enjoy storytelling, film analysis, music composition, and building interactive media.' },
  { label: 'Interests', content: 'Interested in human-computer interaction, spatial computing, and visual effects.' },
];

const getCoordinates = (index, total, radius) => {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = ((index * offset) - 1) + (offset / 2);
  const r = Math.sqrt(1 - y * y);
  const phi = index * increment;
  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;
  return [x * radius, y * radius, z * radius];
};
function FloatingText({ position, label, onClick, sfxEnabled, isZoomedIn, isSelected }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  const outward = 2.2;
  const textPosition = position.map(coord => coord * outward);

  const handleClick = () => {
    if (!isZoomedIn) {
      if (sfxEnabled) {
        clickSound.currentTime = 0;
        clickSound.play();
      }
      onClick();
    }
  };

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const scale = hovered && !isZoomedIn
      ? 1.3 + 0.05 * Math.sin(t * 6)
      : 1 + 0.05 * Math.sin(t * 4);
    const bob = 0.1 * Math.sin(t * 2);
    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.position.y = bob;
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <group position={[textPosition[0], textPosition[1], textPosition[2] + 0.2]}>
<       Text
        ref={meshRef}
        font="/fonts/Orbitron-VariableFont_wght.ttf"
        fontSize={0.6}
        letterSpacing={0.05}
        color={
          isSelected ? '#ffffff' :
          hovered && !isZoomedIn ? '#ccffff' : '#ffffff'
        }
        strokeColor={
          isSelected ? '#ffcc00' : 
          hovered && !isZoomedIn ? '#00ffff' : '#00bfff'
        }
        strokeWidth={isSelected ? 0.08 : (hovered && !isZoomedIn ? 0.05 : 0.03)}
        outlineColor={isSelected ? '#ffcc00' : (hovered && !isZoomedIn ? '#00ffff' : '#00bfff')}
        outlineWidth={isSelected ? 0.02 : (hovered && !isZoomedIn ? 0.015 : 0.008)}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
        onPointerOver={() => !isZoomedIn && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        material-transparent
        material-opacity={0.95}
        material-ref={materialRef}
      >
        {label}
        </Text>
    </group>
  );
}

function WebLine({ start, end }) {
  const ref = useRef();
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.opacity = 0.3 + 0.2 * Math.sin(clock.getElapsedTime() * 2);
    }
  });
  return (
    <line geometry={geometry}>
      <lineBasicMaterial ref={ref} color="#66ccff" transparent opacity={0.4} linewidth={1} />
    </line>
  );
}

function WebRings({ count, radius }) {
  const groupRef = useRef();
  const materials = useRef([]);

  const rings = useMemo(() => {
    const ringList = [];

    for (let i = 1; i <= count; i++) {
      const r = (radius / count) * i;

      const points = [];
      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2;
        const noise = (Math.random() - 0.5) * 0.3; // ← stable inside useMemo
        const x = (r + noise) * Math.cos(angle);
        const y = (r + noise) * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, 0));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: '#88aacc', transparent: true, opacity: 0.3 });
      materials.current.push(material);
      ringList.push(<line key={i} geometry={geometry} material={material} />);
    }

    return ringList;
  }, [count, radius]); // ← only recalculates if props change

  useFrame(({ clock }) => {
    materials.current.forEach((mat, i) => {
      if (mat) {
        mat.opacity = 0.3 + 0.2 * Math.sin(clock.getElapsedTime() * 1.5 + i);
      }
    });
  });

  return <group ref={groupRef}>{rings}</group>;
}

function PulsingCenter({ onClick }) {
  const visualSphereRef = useRef();
  const hitboxRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();

    // Dynamic pulsing effect
    const scale = 2.5 + 0.4 * Math.sin(t * 2);
    if (visualSphereRef.current) {
      visualSphereRef.current.scale.set(scale, scale, scale);
    }

    // Update hitbox to match sphere scale
    if (hitboxRef.current) {
      hitboxRef.current.scale.set(scale, scale, scale);
    }

    // Make text always face the camera
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <group>
      {/* 🔲 Invisible hitbox for interaction */}
      <mesh
        ref={hitboxRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* ✨ Visible pulsing sphere */}
      <mesh ref={visualSphereRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#88f0ff' : '#ffffff'}
          emissive={hovered ? '#00ffff' : '#222222'}
          emissiveIntensity={1.2}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <Text
  ref={textRef}
  font="/fonts/Orbitron-VariableFont_wght.ttf" // or use Orbitron-Bold.ttf if you have it
  fontSize={0.42}
  position={[0, 0, 0]} // Slightly in front of sphere
  color="#000000"
  strokeColor="#000000"
  strokeWidth={0.05}  // ⬅️ thicker stroke
  anchorX="center"
  anchorY="middle"
  material-toneMapped={false}
>
About{'\n'}   Me
</Text>

    </group>
  );
}
let isLerpingOut = false;

function SceneContent({
  handleNodeClick,
  sfxEnabled,
  goHome,
  cameraTarget,
  isZoomedIn,
  setCameraTarget,
  setIsZoomedIn,
  selectedLabel
}) {
  const cameraGroupRef = useRef();
  const controlsRef = useRef();
  const textRadius = 7; // ✅ Ensure this is declared her

  const nodeRefs = useRef([]); // Array of refs

  useEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, nodes.length);
  }, [nodes.length]);

  useFrame(({ camera }) => {
    const defaultPosition = new THREE.Vector3(0, 0, 18);
    const defaultLookAt = new THREE.Vector3(0, 0, 0);
    if (isZoomedIn && cameraTarget) {
      const targetVec = new THREE.Vector3(...cameraTarget);
    
      const cameraOffset = new THREE.Vector3(3, 1, 4); // Move camera right, up, and back
      const lookAtOffset = new THREE.Vector3(2, 0, 2); // Shift look target right too
    
      const desiredPosition = targetVec.clone().add(cameraOffset);
      const lookAtPosition = targetVec.clone().add(lookAtOffset); // offset look direction
    
      camera.position.lerp(desiredPosition, 0.05);
      camera.lookAt(lookAtPosition);
    }
    
  
    else if (isLerpingOut) {
      camera.position.copy(defaultPosition);
      camera.lookAt(defaultLookAt);
      isLerpingOut = false; // ✅ Stop lerping once close
    }
  
    else if (cameraGroupRef.current) {
      const t = performance.now() / 1000;
      cameraGroupRef.current.rotation.y = t * 0.1;
    }
  });
  
  
  
  

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={!isZoomedIn}
        enablePan={!isZoomedIn}
        enableRotate={!isZoomedIn}
      />
      <group ref={cameraGroupRef}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <WebRings count={4} radius={5} />
        <PulsingCenter onClick={goHome} />
        {nodes.map((node, i) => {
          const [x, y, z] = getCoordinates(i, nodes.length, textRadius);

          return (
            <group
              key={i}
              position={[x, y, z]}
              ref={(el) => (nodeRefs.current[i] = el)}
            >
              <WebLine start={[0, 0, 0]} end={[-x, -y, -z]} />
              <FloatingText
              position={[0, 0, 0]}
              label={node.label}
              sfxEnabled={sfxEnabled}
              isZoomedIn={isZoomedIn}
              isSelected={selectedLabel === node.label}
              onClick={() => {
                const worldPosition = new THREE.Vector3();
                if (nodeRefs.current[i]) {
                  nodeRefs.current[i].getWorldPosition(worldPosition);
                  setCameraTarget([worldPosition.x, worldPosition.y, worldPosition.z]);
                  setIsZoomedIn(true);
                }
                handleNodeClick(node);
              }}
              />

            </group>
          );
        })}


      </group>
    </>
  );
}



function GLTFPlanet({ url, position, scale = 1 }) {
    const { scene } = useGLTF(url);
    const ref = useRef();
  
    useEffect(() => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = true;
          }
        });
      }
    }, [scene]);
  
    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.y += 0.0025; // slow rotation
      }
    })
  
    return (
      <primitive
        ref={ref}
        object={scene}
        position={position}
        scale={scale}
        raycast={() => null}
      />
    );
  }

export default function About() {
    const [selected, setSelected] = useState(null);
    const [queuedNode, setQueuedNode] = useState(null);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [sfxEnabled, setSfxEnabled] = useState(true);
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [cameraTarget, setCameraTarget] = useState(null);
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const [modalExpanded, setModalExpanded] = useState(false);
    const navigate = useNavigate();
    

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2500); // Adjust duration as needed
      return () => clearTimeout(timer);
    }, []);

    const handleGoHome = () => {
      navigate('/home');
    };


    const handleNodeClick = (node) => {
        if (selected) {
          if (sfxEnabled) {
            closeSound.currentTime = 0;
            closeSound.play();
          }
          
          setQueuedNode(node);
          setSelected(null); // Close current modal first
        } else {
          setSelected(node); // No modal open, just show it
        }
      };

      useEffect(() => {
        if (!selected && queuedNode) {
          const timeout = setTimeout(() => {
            setSelected(queuedNode);
            setQueuedNode(null);
          }, 600); // 600ms matches the animation close delay
          return () => clearTimeout(timeout);
        }
      }, [selected, queuedNode]);
      
    const audioRef = useRef(null);
    const closeSound = useMemo(() => new Audio(process.env.PUBLIC_URL + '/close_2.mp3'), []);
    closeSound.volume = 0.3;
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        if (audioEnabled) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
    }, [audioEnabled]);
    
    const buttonStyle = {
      background: '#00bfff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    };

    const renderExpandedContent = (label) => {
      const trimmedLabel = label.trim();
    
      switch (trimmedLabel) {
        case 'Education':
          return <Education />;
        case 'Work\nExperience':
          return <WorkExperience />;
        case 'Certifications':
          return <Certifications />;
        case 'Projects':
          return <Projects />;
        case 'Skills':
          return <Skills />; 
        case 'Interests':
          return <Interests />; 
        default:
          return <p>{selected?.content}</p>;
      }
    };
    
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative' }}>
        {/* 🔊 Background Audio */}
        <audio ref={audioRef} loop src="/background_2.mp3" />
        {loading && (
        <div className="loading-overlay">
          <p className="loading-text">Hello there and welcome!</p>
          <p className="loading-text">Loading...</p>
        </div>
        )}
        <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>          
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#00bfff" />
          <OrbitControls enableZoom={true} enablePan={false} />
  
          {Array.from({ length: 6 }).map((_, i) => (
            <React.Fragment key={i}>
                <FlyingSpaceship
                url="/models/spaceship1.glb"
                speed={0.2}
                startX={-200}
                startY={0}
                startZ={-20}
                scale={0.4}
                />
                <FlyingSpaceship
                url="/models/spaceship1.glb"
                speed={0.2}
                startX={-205}
                startY={-1.0}
                startZ={-10}
                scale={0.4}
                />
            </React.Fragment>
            ))}


        {/* 🪐 GLTF Planets in Background */}
        <GLTFPlanet url="/models/saturn.glb" position={[-100, 20, -90]} scale={6} />
        <GLTFPlanet url="/models/lava_planet.glb" position={[120, -30, -160]} scale={4.5} />
        <GLTFPlanet url="/models/purple_planet.glb" position={[180, 10, -40]} scale={10.5} />
        <GLTFPlanet url="/models/sun.glb" position={[-200, -60, -1000]} scale={6} />
        <GLTFPlanet url="/models/earth.glb" position={[180,-60, -40]} scale={6} />

        <SceneContent
  handleNodeClick={handleNodeClick}
  sfxEnabled={sfxEnabled}
  goHome={handleGoHome}
  cameraTarget={cameraTarget}
  isZoomedIn={isZoomedIn}
  setCameraTarget={setCameraTarget}
  setIsZoomedIn={setIsZoomedIn}
  selectedLabel={selected?.label}
/>


        
        </Canvas>
  
{selected && (
  <div className={`portal-modal ${modalExpanded ? 'expanded' : ''}`}>
    <div className="portal-content">
      {!modalExpanded && (
        <>
          <div className="modal-button-group">
            <button
              className="modal-action-button"
              onClick={() => {
                if (sfxEnabled) {
                  closeSound.currentTime = 0;
                  closeSound.play();
                }
                setSelected(null);
                setIsZoomedIn(false);
                setCameraTarget(null);
                isLerpingOut = true;
              }}
            >
              Close
            </button>

            <button
              className="modal-action-button"
              onClick={() => setModalExpanded(true)}
            >
              View More
            </button>
          </div>

          <p>{selected.content}</p>
        </>
      )}

      {modalExpanded && (
        <div className="modal-header-row">
          <button
            className="back-button"
            onClick={() => setModalExpanded(false)}
          >
            ⬅ Back
          </button>
          <h2>{selected.label}</h2>
        </div>
      )}

      {modalExpanded && renderExpandedContent(selected.label)}
    </div>
  </div>
)}




{/* 🎛️ Toggle Switches */}
<div className="sound-toggle-container">
  <label className="toggle-label">
    🔊 Music
    <input
      type="checkbox"
      checked={musicEnabled}
      onChange={() => {
        const newState = !musicEnabled;
        setMusicEnabled(newState);
        if (audioRef.current) {
          audioRef.current.muted = !newState; // ✅ mute only when disabled
        }
      }}
    />

    <span className="toggle-slider" />
  </label>

  <label className="toggle-label">
    🎵 SFX
    <input
      type="checkbox"
      checked={sfxEnabled}
      onChange={() => setSfxEnabled(!sfxEnabled)}
    />
    <span className="toggle-slider" />
  </label>
</div>
      </div>
    );
  }
  
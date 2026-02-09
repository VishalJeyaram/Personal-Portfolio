import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import StaticStars from '../components/StaticStars';
import CertificationCard from '../components/certifications/CertificationCard';
import './CertificationsScene.css';
import { CERTIFICATIONS } from '../data/certifications';

export default function CertificationsScene() {
  const sceneRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const rows = 2, cols = 3;
  const perPage = rows * cols;
  const totalPages = Math.ceil(CERTIFICATIONS.length / perPage);
  
  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const paging = CERTIFICATIONS.slice(startIndex, endIndex);
  
  const spacingX = 12, spacingY = 8, yOffset = -4;

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="certifications-scene-container">
      {totalPages > 1 && (
        <button
          className="cert-nav-btn cert-nav-btn-left"
          onClick={handlePrevious}
          aria-label="Previous page"
        >
          <span className="arrow-icon">‹</span>
        </button>
      )}

      {totalPages > 1 && (
        <button
          className="cert-nav-btn cert-nav-btn-right"
          onClick={handleNext}
          aria-label="Next page"
        >
          <span className="arrow-icon">›</span>
        </button>
      )}

      {totalPages > 1 && (
        <div className="cert-page-indicator">
          {currentPage + 1} / {totalPages}
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 23], fov: 50 }}
        onCreated={({ scene }) => (sceneRef.current = scene)}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#00bfff" />
        <OrbitControls enableZoom enablePan={false} />
        <StaticStars />

        {paging.map((cert, i) => {
          const row = Math.floor(i / cols), col = i % cols;
          const x = (col - (cols - 1) / 2) * spacingX;
          const y = ((rows - 1) / 2 - row) * spacingY + yOffset;
          return (
            <CertificationCard
              key={`${currentPage}-${i}`}
              certification={cert}
              position={[x, y, 0]}
            />
          );
        })}
      </Canvas>
    </div>
  );
}

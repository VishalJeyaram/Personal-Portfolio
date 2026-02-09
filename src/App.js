// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import LandingPage from './pages/LandingPage';
import ProjectsScene from './pages/ProjectsScene';
import EducationScene from './pages/EducationScene';
import CertificationsScene from './pages/CertificationsScene';
import WorkExperienceScene from './pages/WorkExperienceScene';
import SkillsScene from './pages/SkillsScene';
import MusicToggle from './components/MusicToggle';
import AboutThisApp from './components/AboutThisApp';
import BackToAboutButton from './components/BackToAboutButton';
import './App.css';

const PLAYLIST = [
  '/music/Love_Train.mp3',
  '/music/come_and_get_your_love.mp3',
  '/music/punk_rocker.mp3',
];

function MusicProvider({ children }) {
  const location = useLocation();
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const hasAutoStartedRef = useRef(false);

  useEffect(() => {
    if (PLAYLIST.length > 0 && !audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[0]);
      audioRef.current.volume = 0.4;
      
      // When a track ends, play the next one
      const handleEnded = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
      };
      
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current || PLAYLIST.length === 0) return;
    
    const wasPlaying = !audioRef.current.paused;
    
    audioRef.current.pause();
    audioRef.current.src = PLAYLIST[currentTrackIndex];
    audioRef.current.load();
    
    if (wasPlaying && musicEnabled) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrackIndex]); // Removed musicEnabled dependency

  useEffect(() => {
    if (
      location.pathname === '/about' &&
      !musicEnabled &&
      !hasAutoStartedRef.current
    ) {
      setMusicEnabled(true);
      hasAutoStartedRef.current = true;
    }
  }, [location.pathname, musicEnabled]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (musicEnabled) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [musicEnabled]);

  const nextTrack = () => {
    if (PLAYLIST.length === 0) return;
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const previousTrack = () => {
    if (PLAYLIST.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const showToggle = [
    '/about',
    '/projects',
    '/education',
    '/workexperience',
    '/skills',
    '/home',
    '/certifications'
  ].includes(location.pathname);

  return (
    <>
      {children}
      {showToggle && (
        <MusicToggle
          musicEnabled={musicEnabled}
          setMusicEnabled={setMusicEnabled}
          currentTrackIndex={currentTrackIndex}
          totalTracks={PLAYLIST.length}
          onNext={nextTrack}
          onPrevious={previousTrack}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <MusicProvider>
        <AboutThisApp />
        <BackToAboutButton />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectsScene />} />
          <Route path="/education" element={<EducationScene />} />
          <Route path="/certifications" element={<CertificationsScene />} />
          <Route path="/workexperience" element={<WorkExperienceScene />} />
          <Route path="/skills" element={<SkillsScene />} />
        </Routes>
      </MusicProvider>
    </Router>
  );
}

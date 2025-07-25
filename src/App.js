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

function MusicProvider({ children }) {
  const location = useLocation();
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef(null);

  // track whether we've already auto–started on /about
  const hasAutoStartedRef = useRef(false);

  // initialize audio once
  useEffect(() => {
    audioRef.current = new Audio('/music/love_train.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
  }, []);

  // auto–play the first time the user arrives on /about
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

  // play or pause whenever musicEnabled changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (musicEnabled) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [musicEnabled]);

  // only show the toggle on these routes
  const showToggle = [
    '/about',
    '/projects',
    '/education',
    '/workexperience',
    '/skills',
    '/home'
  ].includes(location.pathname);

  return (
    <>
      {children}
      {showToggle && (
        <MusicToggle
          musicEnabled={musicEnabled}
          setMusicEnabled={setMusicEnabled}
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

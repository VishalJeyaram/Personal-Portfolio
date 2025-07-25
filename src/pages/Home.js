import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Home.css';
import profilePic  from '../data/profile-nobg.png'; 

function Home() {
  const [isZooming, setIsZooming] = useState(false);
  const navigate = useNavigate();

  const handleZoomOut = () => {
    navigate('/');
  };

  return (
    <div className={`home-blank ${isZooming ? 'zoom-out' : ''}`}>
      <div className="name-top-left">Vishal Jeyaram</div>
      <div className="titles-below-name cosmic-box">
        Creative Technologist · Software Engineer · Storyteller
      </div>
      <div className="quote-below-title cosmic-box">
        “I’m more creative than I am smart. So I push myself to become smarter — to keep fueling my creative endeavours.”
      </div>
      <img src={profilePic} alt="Vishal Jeyaram" className="center-profile-pic" />

      <div className="info-after-title cosmic-box">
        Software Engineer with a track record of building secure, scalable full-stack applications in agile, DevOps-driven environments. Experienced across government, clinical, and startup domains, delivering accessible and user-centric web solutions. Driven by a passion for creating impactful technologies that solve real-world problems.
      </div>

      <div className="button-row">
        <a
          href="https://www.linkedin.com/in/vishaljeyaram/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          <img src={'/home_images/linkedin.png'} alt="GitHub" className="social-icon" />
        </a>
        <a
          href="https://github.com/VishalJeyaram"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          <img src={'/home_images/github.png'} alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </div>
  );
}

export default Home;

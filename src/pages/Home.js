import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Home.css';
import profilePic from '../assets/profile-nobg.png';

function Home() {
  const [isZooming, setIsZooming] = useState(false);
  const navigate = useNavigate();

  const handleZoomOut = () => {
    //setIsZooming(true);
    //setTimeout(() => {
      navigate('/');
    //}, 1000); // Match the CSS animation duration
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

      <button className="zoom-button" onClick={handleZoomOut}>
        Enter the Cosmos
      </button>
    </div>
  );
}

export default Home;

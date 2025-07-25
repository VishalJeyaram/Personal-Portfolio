import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import profilePic from '../data/profile.jpg'; 
import { identity } from '../data/personal_info';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="text-content">
        <h1>Hello There! <br />I'm <span className="name-highlight">{identity.name}</span></h1>
        <button onClick={() => navigate('/about')} className="portfolio-button">
          View My Portfolio
        </button>
      </div>
      <div className="image-container">
        <img src={profilePic} alt="Vishal Jeyaram" className="profile-image" />
      </div>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BackToAboutButton.css';

export default function BackToAboutButton() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/' || location.pathname === '/about') {
    return null;
  }

  return (
    <button
      className="back-button"
      onClick={() => navigate('/about')}
    >
      ← Back to Home Page
    </button>
  );
}

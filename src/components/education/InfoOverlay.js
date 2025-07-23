import React from 'react';
import './InfoOverlay.css';

export default function InfoOverlay({ experience, onClose }) {
  return (
    <div className="info-overlay">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>{experience.title}</h2>
      <h3>{experience.institution}</h3>
      <p><em>{experience.dates}</em></p>
      <ul>
        {experience.description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

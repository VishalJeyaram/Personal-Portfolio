import React from 'react';
import './Interests.css';

export default function Interests({ onBack }) {
  return (
    <div className="expanded-modal-container">
      <button className="back-button" onClick={onBack}>⬅ Back</button>
      <div className="modal-content">
        <h2>Interests</h2>
        <p>
            Interests
        </p>
      </div>
    </div>
  );
}
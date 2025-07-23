import React from 'react';
import './MusicToggle.css';

export default function MusicToggle({ musicEnabled, setMusicEnabled }) {
  return (
    <div className="sound-toggle">
      <label className="sound-label">
        <input
          type="checkbox"
          checked={musicEnabled}
          onChange={() => setMusicEnabled(!musicEnabled)}
        />
        <span className="slider" />
        <span className="label-text">MUSIC</span>
      </label>
    </div>
  );
}
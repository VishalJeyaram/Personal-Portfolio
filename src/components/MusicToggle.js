import React from 'react';
import './MusicToggle.css';

export default function MusicToggle({ 
  musicEnabled, 
  setMusicEnabled, 
  currentTrackIndex, 
  totalTracks,
  onNext,
  onPrevious 
}) {
  return (
    <div className="sound-toggle">
      <div className="music-controls">
        <button 
          className="music-nav-btn prev-btn" 
          onClick={onPrevious}
          aria-label="Previous track"
          title="Previous track"
        >
          ⏮
        </button>
        
        <label className="sound-label">
          <input
            type="checkbox"
            checked={musicEnabled}
            onChange={() => setMusicEnabled(!musicEnabled)}
          />
          <span className="slider" />
          <span className="label-text">MUSIC</span>
        </label>
        
        <button 
          className="music-nav-btn next-btn" 
          onClick={onNext}
          aria-label="Next track"
          title="Next track"
        >
          ⏭
        </button>
      </div>
      
      {totalTracks > 0 && (
        <div className="track-indicator">
          {currentTrackIndex + 1} / {totalTracks}
        </div>
      )}
    </div>
  );
}
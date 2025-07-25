import React, { useState } from 'react';
import './AboutThisApp.css';

export default function AboutThisApp() {
  const [open, setOpen] = useState(false);

  const tech = [
    'React.js',
    'React Three Fiber & Drei',
    'React Router',
    'Three.js',
    'HTML5 Audio API',
    'CSS Modules'
  ];

  const songs = [
    'Love Train (Instrumental) – The O\'Jays 1972',
  ];

  return (
    <>
      <button
        className="about-app__btn"
        onClick={() => setOpen(true)}
        aria-label="About This App"
      >
        ℹ️
      </button>

      {open && (
        <div className="about-app__overlay" onClick={() => setOpen(false)}>
          <div className="about-app__modal" onClick={e => e.stopPropagation()}>
            <h2>About This App</h2>

            <section>
              <h3>What I used to build this</h3>
              <ul>
                {tech.map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h3>Song used</h3>
              <ul>
                {songs.map(track => <li key={track}>{track}</li>)}
              </ul>
            </section>

            <button
              className="about-app__close"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

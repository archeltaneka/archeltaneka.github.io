import { useEffect, useRef, useState } from 'react';
import './landing.css';

// Preserved for the future About section; intentionally not mounted on the landing.
export default function AboutIdentity() {
  const [revealed, setRevealed] = useState(false);
  const [photo, setPhoto] = useState('/assets/img/profile.webp');
  const sequence = useRef('');
  useEffect(() => {
    ['/assets/img/profile-au.webp', '/assets/img/profile-uk.webp'].forEach(src => { new Image().src = src; });
    const onKey = event => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input, textarea, [contenteditable="true"]') || !/^[a-z]$/i.test(event.key)) return;
      sequence.current = (sequence.current + event.key.toLowerCase()).slice(-10);
      if (sequence.current.endsWith('australia')) setPhoto('/assets/img/profile-au.webp');
      if (sequence.current.endsWith('uk') || sequence.current.endsWith('london')) setPhoto('/assets/img/profile-uk.webp');
      if (sequence.current.endsWith('reset') || sequence.current.endsWith('home')) setPhoto('/assets/img/profile.webp');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <header className="about-identity">
      <div className="identity-person">
        <img className="identity-photo" src={photo} width="52" height="58" alt="Archel Taneka" />
      <div>
        <h1>
          <button className="name-reveal" aria-label="Archel Taneka — reveal Chinese name" aria-pressed={revealed} onClick={() => setRevealed(value => !value)}>
            <span className="english-name" aria-hidden="true">ARCHEL TANEKA</span>
            <span className="chinese-name" lang="zh" aria-hidden="true">陈文群</span>
          </button>
        </h1>
        <p>Product Data Scientist</p>
      </div>
      </div>
      <ul className="specialization" aria-label="Specializations">
        <li>Experimentation</li><li>Machine Learning</li><li>Product Analytics</li><li>AI</li>
      </ul>
    </header>
  );
}

import { useEffect, useRef, useState } from 'react';
import { LuArrowLeft, LuPause, LuPlay } from 'react-icons/lu';
import { about, aboutPhotos } from '../../data/about';
import { UnderwaterBackground } from '../landing/UnderwaterScene';
import { LANDING_MOTION_STYLE } from '../landing/landing-motion';
import './about.css';

function AboutIdentity() {
  const [revealed, setRevealed] = useState(false);
  const moveMask = event => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--reveal-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--reveal-y', `${event.clientY - bounds.top}px`);
  };
  return <header className="profile-identity">
    <h1 tabIndex="-1" aria-label={about.name.join(' ')}>
      <button className="profile-name" aria-label={`${about.name.join(' ')} — reveal Chinese name`} aria-pressed={revealed}
        onPointerMove={moveMask} onClick={() => setRevealed(value => !value)}>
        <span className="profile-english" aria-hidden="true">{about.name.map((name, index) => <span className={`profile-name-line profile-name-line--${index}`} key={name}>{name}</span>)}</span>
        <span className="profile-chinese" lang="zh" aria-hidden="true">{[...about.chineseName].map((character, index) => <span className={`profile-name-line profile-name-line--${index}`} key={character}>{character}</span>)}</span>
      </button>
    </h1>
    <div className="profile-profession"><p>{about.role}</p><span>{about.location}</span></div>
    <span className="sr-only" role="status">{revealed ? `Chinese name: ${about.chineseName}` : ''}</span>
  </header>;
}

export default function AboutPage({ active, onBack, paused, onToggleMotion }) {
  const [photoId, setPhotoId] = useState('default');
  const [hidden, setHidden] = useState(() => document.hidden);
  const sequence = useRef('');
  const photo = aboutPhotos[photoId];
  useEffect(() => {
    Object.values(aboutPhotos).forEach(({ src }) => { const image = new Image(); image.src = src; });
    const visibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  useEffect(() => {
    if (!active) return;
    const key = event => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing || event.target.closest('input, textarea, [contenteditable="true"]')) return;
      if (event.key === 'Escape') { event.preventDefault(); onBack(); return; }
      if (event.repeat || !/^[a-z]$/i.test(event.key)) return;
      sequence.current = (sequence.current + event.key.toLowerCase()).slice(-10);
      if (sequence.current.endsWith('australia')) setPhotoId('australia');
      if (sequence.current.endsWith('uk') || sequence.current.endsWith('london')) setPhotoId('uk');
      if (sequence.current.endsWith('reset') || sequence.current.endsWith('home')) setPhotoId('default');
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [active, onBack]);

  return <main id="about" className="underwater-stage about-page" data-intro="complete" data-motion={!active || hidden || paused ? 'paused' : 'running'} style={LANDING_MOTION_STYLE}>
    <UnderwaterBackground />
    <div className="profile-wash" aria-hidden="true" />
    <div className="profile-white-field" aria-hidden="true" />
    <div className="profile-slash" aria-hidden="true" />
    <div className="profile-fragment" aria-hidden="true" />
    <p className="profile-section-label">About <span>/ Player profile</span></p>
    <button className="profile-quick-back" onClick={onBack} aria-label="Main menu"><LuArrowLeft aria-hidden="true" /> Menu</button>
    <AboutIdentity />
    <figure className="profile-photo" aria-label="Profile photograph">
      <div className="profile-photo-frame"><img src={photo.src} alt={photo.alt} width="900" height="1200" decoding="async" style={{ objectPosition: photo.position }} /></div>
      <figcaption aria-hidden="true">A.T.S. <span>／</span> PROFILE</figcaption>
    </figure>
    <section className="profile-statement" aria-labelledby="profile-impact-heading">
      <h2 id="profile-impact-heading">Professional achievements</h2>
      {about.achievements.map(item => <article className="profile-achievement" key={item.title}>
        <header>
          <h3>{item.title}</h3>
          <p className="profile-achievement-result"><strong>{item.result}</strong><span>{item.localResult}</span></p>
          <p className="profile-achievement-metric">{item.metric}{item.lift && <strong>{item.lift}</strong>}</p>
        </header>
        <dl>
          <div><dt>Method</dt><dd>{item.method}</dd></div>
        </dl>
      </article>)}
    </section>
    <section className="profile-principles" aria-label="Professional principles">
      <dl>{about.principles.map(item => <div className="profile-principle" key={item.name}><dt>{item.name}</dt><dd>{item.detail}</dd></div>)}</dl>
    </section>
    <aside className="profile-arc" aria-labelledby="profile-arc-heading">
      <h2 id="profile-arc-heading">Target roles</h2>
      <ul className="profile-target-roles">{about.targetRoles.map(role => <li key={role}>{role}</li>)}</ul>
      <p className="profile-personal">{about.personal}</p>
    </aside>
    <footer className="profile-controls">
      <button className="profile-back" onClick={onBack}><LuArrowLeft aria-hidden="true" /> Main menu <kbd>Esc</kbd></button>
      <button className="profile-motion" onClick={onToggleMotion} aria-pressed={paused} aria-label={paused ? 'Resume animation' : 'Pause animation'}>{paused ? <LuPlay aria-hidden="true" /> : <LuPause aria-hidden="true" />} Motion {paused ? 'off' : 'on'}</button>
    </footer>
  </main>;
}

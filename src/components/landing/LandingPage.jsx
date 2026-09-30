import { useEffect, useState } from 'react';
import { LuArrowRight, LuGithub, LuLinkedin, LuMail, LuPause, LuPlay } from 'react-icons/lu';
import './landing.css';
import { LANDING_MOTION_STYLE } from './landing-motion';

const RESUME = '/assets/resume/Resume - Archel Sutanto.pdf';
const MENU = ['About', 'Experience', 'Projects', 'Skills', 'Resume'];
const CONTACTS = [
  { label: 'Email', href: 'mailto:archeltaneka@gmail.com', icon: LuMail },
  { label: 'GitHub', href: 'https://github.com/archeltaneka', icon: LuGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/archel-taneka-sutanto', icon: LuLinkedin },
];

// Fixed seeds keep the water stable across renders and menu selection changes.
const BUBBLES = Array.from({ length: 10 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  size: `${4 + (index * 7) % 10}px`,
  duration: `${18 + (index * 3) % 15}s`,
  delay: `${-((index * 7) % 29)}s`,
  drift: `${(index % 2 ? 1 : -1) * (18 + index * 2)}px`,
}));

function UnderwaterBackground() {
  return (
    <div className="landing-environment" aria-hidden="true">
      <div className="environment-light" />
      <div className="water-rays" />
      <svg className="water-surface" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
        <defs>
          <pattern id="surface-reflections" width="440" height="130" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <path d="M-40 36Q35 6 105 34T255 30T465 34M-55 80Q10 48 86 76T256 75T480 72M55 130Q140 90 230 115T410 105" />
            <path d="M55 34Q95 56 86 76M255 30Q290 50 256 75M355 30Q310 0 300-20M230 115Q208 93 200 83" />
          </pattern>
        </defs>
        <rect width="1440" height="320" fill="url(#surface-reflections)" />
      </svg>
      <div className="water-bubbles">
        {BUBBLES.map((bubble, index) => <i key={index} className="water-bubble" style={{ '--bubble-left': bubble.left, '--bubble-size': bubble.size, '--bubble-duration': bubble.duration, '--bubble-delay': bubble.delay, '--bubble-drift': bubble.drift }} />)}
      </div>
    </div>
  );
}

function NameCarousel() {
  return (
    <div className="name-carousel" aria-hidden="true">
      <div className="name-carousel-track">
        {[0, 1].map(copy => <div className="name-carousel-copy" key={copy}>{[0, 1].map(repeat => <span className="carousel-name" key={repeat}><span className="carousel-first">ARCHEL</span>{' '}<span className="carousel-last">SUTANTO</span></span>)}</div>)}
      </div>
    </div>
  );
}

function CharacterLayer() {
  return (
    <div className="character-entrance" aria-hidden="true">
      <img className="landing-character" src="/assets/img/archel-main.webp"
        srcSet="/assets/img/archel-main-small.webp 640w, /assets/img/archel-main.webp 1024w"
        sizes="(max-width: 599px) 400px, (max-width: 899px) 65vw, 55vw"
        width="1024" height="1390" alt="" fetchPriority="high" decoding="async" />
    </div>
  );
}

function ImpactCard() {
  return (
    <aside className="impact-card" aria-label="Total measured impact">
      <p className="impact-amount">$8.3M <span>/ IDR 149B+</span></p>
      <p className="impact-label">Total measured impact</p>
      <p className="impact-definition">Across incremental GBV and revenue outcomes</p>
    </aside>
  );
}

function MainMenu({ selected, onSelect, onActivate }) {
  return (
    <nav className="main-menu" aria-label="Main menu">
      <ul>
        {MENU.map((label, index) => {
          const shared = {
            className: 'menu-control',
            'aria-current': selected === index ? 'true' : undefined,
            onPointerEnter: event => { if (event.pointerType !== 'touch') onSelect(index); },
            onFocus: () => onSelect(index),
          };
          return (
            <li key={label} className={`menu-entry menu-entry-${label.toLowerCase()}`} style={{ '--entry-index': index }}>
              <div className="menu-arrival">
                {label === 'Resume' ? (
                  <a {...shared} href={RESUME} target="_blank" rel="noreferrer"><span className="menu-backing" aria-hidden="true" /><span className="menu-label">{label}</span><LuArrowRight className="menu-arrow" aria-hidden="true" /></a>
                ) : (
                  <button {...shared} onClick={() => onActivate(index)}><span className="menu-backing" aria-hidden="true" /><span className="menu-label">{label}</span><LuArrowRight className="menu-arrow" aria-hidden="true" /></button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function InteractionHints({ paused, onToggleMotion }) {
  return (
    <div className="interaction-hints">
      <button className="motion-toggle" onClick={onToggleMotion} aria-pressed={paused} aria-label={paused ? 'Resume animation' : 'Pause animation'}>{paused ? <LuPlay /> : <LuPause />}<span>Motion {paused ? 'off' : 'on'}</span></button>
    </div>
  );
}

export default function LandingPage({ introPhase = 'complete', onExperience, active = true }) {
  const [selected, setSelected] = useState(0);
  const [notice, setNotice] = useState('');
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  useEffect(() => {
    const syncVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => document.removeEventListener('visibilitychange', syncVisibility);
  }, []);
  const [interacted, setInteracted] = useState(false);
  const select = index => {
    if (introPhase === 'dive') return;
    setInteracted(true);
    setSelected(index);
  };
  const activate = index => {
    setInteracted(true);
    setSelected(index);
    if (MENU[index] === 'Experience') { onExperience?.(); return; }
    setNotice(`${MENU[index]} section coming next. Explore the resume or get in touch in the meantime.`);
  };
  return (
    <main id="home" className="landing" data-intro={introPhase} data-menu-phase={introPhase === 'complete' ? 'idle' : introPhase === 'settled' ? 'settled' : 'entry'} data-motion={paused || hidden || !active ? 'paused' : 'running'} data-interacted={interacted} style={{ ...LANDING_MOTION_STYLE, '--selection-index': selected }}>
      <a className="landing-skip" href="#landing-menu">Skip to navigation</a>
      <UnderwaterBackground />
      <div className="character-backdrop" aria-hidden="true" />
      <NameCarousel />
      <CharacterLayer />
      <ImpactCard />
      <div id="landing-menu" className="menu-position" tabIndex="-1"><MainMenu selected={selected} onSelect={select} onActivate={activate} /></div>
      <div className="landing-context">
        <p className="landing-notice" role="status" aria-live="polite">{notice}</p>
      </div>
      <footer className="landing-footer">
        <div className="contact-links" aria-label="Contact links">
          {CONTACTS.map(({ label, href, icon }) => {
            const Icon = icon;
            return <a key={label} href={href} {...(href.startsWith('https') ? { target: '_blank', rel: 'noreferrer' } : {})}><Icon aria-hidden="true" /><span>{label}</span><LuArrowRight className="contact-arrow" aria-hidden="true" /></a>;
          })}
        </div>
        <InteractionHints paused={paused} onToggleMotion={() => setPaused(value => !value)} />
      </footer>
    </main>
  );
}

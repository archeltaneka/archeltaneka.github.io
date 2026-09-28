import { useEffect, useRef, useState } from 'react';
import { LuArrowDown, LuArrowRight, LuArrowUp, LuGithub, LuLinkedin, LuMail, LuPause, LuPlay } from 'react-icons/lu';
import './landing.css';

const RESUME = '/assets/resume/Resume - Archel Sutanto.pdf';
const MENU = ['About', 'Experience', 'Projects', 'Skills', 'Resume'];
const CONTACTS = [
  { label: 'Email', href: 'mailto:archeltaneka@gmail.com', icon: LuMail },
  { label: 'GitHub', href: 'https://github.com/archeltaneka', icon: LuGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/archel-taneka-sutanto', icon: LuLinkedin },
];

// Fixed seeds keep the water stable across renders and menu selection changes.
const BUBBLES = Array.from({ length: 20 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  size: `${4 + (index * 7) % 15}px`,
  duration: `${12 + (index * 3) % 17}s`,
  delay: `${-((index * 7) % 29)}s`,
  drift: `${(index % 2 ? 1 : -1) * (18 + index * 2)}px`,
}));

function BackgroundLayers() {
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

function DiveEntrance() {
  return (
    <div className="dive-entrance" aria-hidden="true">
      <div className="dive-wash" />
      <div className="dive-ripple" />
      <div className="dive-ripple dive-ripple-outer" />
      {Array.from({ length: 16 }, (_, index) => <i className="dive-droplet" key={index} style={{ '--spray-x': `${(index - 7.5) * 9}vw`, '--spray-y': `${-35 - (index * 13) % 65}vh`, '--spray-size': `${7 + (index * 11) % 22}px`, '--spray-delay': `${(index % 4) * 35}ms` }} />)}
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

function IdentityBadge() {
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
    <header className="identity-badge">
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

function MainMenu({ selected, onSelect, onActivate, itemRefs }) {
  return (
    <nav className="main-menu" aria-label="Main menu">
      <ul>
        {MENU.map((label, index) => {
          const shared = {
            className: 'menu-control',
            'aria-current': selected === index ? 'true' : undefined,
            onPointerEnter: event => { if (event.pointerType !== 'touch') onSelect(index); },
            onFocus: () => onSelect(index),
            ref: element => { itemRefs.current[index] = element; },
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
      <div className="keyboard-hints" aria-hidden="true"><span><kbd>Enter</kbd> Select</span><span><kbd><LuArrowUp /><LuArrowDown /></kbd> Navigate</span></div>
      <button className="motion-toggle" onClick={onToggleMotion} aria-pressed={paused} aria-label={paused ? 'Resume animation' : 'Pause animation'}>{paused ? <LuPlay /> : <LuPause />}<span>Motion {paused ? 'off' : 'on'}</span></button>
    </div>
  );
}

export default function LandingPage() {
  const [selected, setSelected] = useState(0);
  const [notice, setNotice] = useState('');
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const itemRefs = useRef([]);
  const select = index => {
    setInteracted(true);
    setSelected(index);
  };
  const activate = index => {
    setInteracted(true);
    setSelected(index);
    setNotice(`${MENU[index]} section coming next. Explore the resume or get in touch in the meantime.`);
  };
  useEffect(() => {
    const onKey = event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented) return;
      const target = event.target;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (target.closest('a, button') && !target.closest('.menu-control')) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const focused = itemRefs.current.indexOf(target.closest('.menu-control'));
        const next = ((focused < 0 ? selected : focused) + (event.key === 'ArrowDown' ? 1 : -1) + MENU.length) % MENU.length;
        setSelected(next);
        setInteracted(true);
        itemRefs.current[next]?.focus({ preventScroll: false });
      } else if (event.key === 'Enter' && !target.closest('a, button')) {
        event.preventDefault();
        itemRefs.current[selected]?.click();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);
  return (
    <main id="home" className="landing" data-motion={paused ? 'paused' : 'running'} data-interacted={interacted} style={{ '--selection-index': selected }}>
      <a className="landing-skip" href="#landing-menu">Skip to navigation</a>
      <BackgroundLayers />
      <div className="character-backdrop" aria-hidden="true" />
      <NameCarousel />
      <CharacterLayer />
      <DiveEntrance />
      <IdentityBadge />
      <div id="landing-menu" className="menu-position" tabIndex="-1"><MainMenu selected={selected} onSelect={select} onActivate={activate} itemRefs={itemRefs} /></div>
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

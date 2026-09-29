import { useState } from 'react';
import { LuArrowRight, LuGithub, LuLinkedin, LuMail, LuPause, LuPlay } from 'react-icons/lu';
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
      <svg className="dive-wash" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="dive-depth" x1="720" y1="0" x2="720" y2="900" gradientUnits="userSpaceOnUse">
            <stop stopColor="#20d9eb" />
            <stop offset=".48" stopColor="#087bda" />
            <stop offset="1" stopColor="#1232b6" />
          </linearGradient>
          {/* An original uneven opening: the water moves past the viewer. */}
          <path id="dive-opening" d="M530 300C556 274 592 301 612 273C641 230 679 264 711 252C755 224 770 283 811 272C849 267 837 312 875 328C913 347 864 384 890 416C925 455 872 469 880 505C889 545 840 532 820 568C798 607 761 572 732 604C701 634 670 589 636 604C601 617 598 572 565 566C520 560 548 512 517 494C475 469 522 435 503 402C483 369 531 361 520 336C514 322 520 308 530 300Z" />
          <mask id="dive-water-mask" maskUnits="userSpaceOnUse" x="-3000" y="-2000" width="7440" height="4900">
            <rect x="-3000" y="-2000" width="7440" height="4900" fill="white" />
            <use href="#dive-opening" fill="black" />
          </mask>
        </defs>
        <g mask="url(#dive-water-mask)">
          <rect x="-3000" y="-2000" width="7440" height="4900" fill="url(#dive-depth)" />
          <g stroke="#4de5f2" strokeWidth="65" strokeLinecap="round" opacity=".7">
            <path d="M290-200C470 60 286 149 423 327S344 674 470 1100" />
            <path d="M980-200C846 56 1031 143 943 307S1070 600 955 1100" />
          </g>
          <g stroke="#b1f5fb" strokeLinecap="round">
            <path d="M510-100C455 39 586 101 541 202S609 327 558 398" strokeWidth="46" />
            <path d="M769-100C872 70 739 121 824 239S787 352 851 394" strokeWidth="32" />
            <path d="M636 539C568 627 676 675 603 786S670 921 625 1000" strokeWidth="48" />
            <path d="M863 521C929 603 830 662 902 754S864 955 971 1040" strokeWidth="27" />
          </g>
        </g>
        <use href="#dive-opening" stroke="#4de5f2" strokeWidth="64" />
        <use href="#dive-opening" stroke="#b1f5fb" strokeWidth="34" />
      </svg>
      {Array.from({ length: 22 }, (_, index) => <i className="dive-droplet" key={index} style={{
        '--spray-left': `${12 + (index * 31) % 78}%`,
        '--spray-top': `${20 + (index * 23) % 72}%`,
        '--spray-x': `${(index % 2 ? 1 : -1) * (14 + index * 2)}vw`,
        '--spray-y': `${-45 - (index * 13) % 55}vh`,
        '--spray-size': `${12 + (index * 11) % 42}px`,
        '--spray-delay': `${(index % 4) * 35}ms`,
      }} />)}
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

export default function LandingPage() {
  const [selected, setSelected] = useState(0);
  const [notice, setNotice] = useState('');
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const select = index => {
    setInteracted(true);
    setSelected(index);
  };
  const activate = index => {
    setInteracted(true);
    setSelected(index);
    setNotice(`${MENU[index]} section coming next. Explore the resume or get in touch in the meantime.`);
  };
  return (
    <main id="home" className="landing" data-motion={paused ? 'paused' : 'running'} data-interacted={interacted} style={{ '--selection-index': selected }}>
      <a className="landing-skip" href="#landing-menu">Skip to navigation</a>
      <BackgroundLayers />
      <div className="character-backdrop" aria-hidden="true" />
      <NameCarousel />
      <CharacterLayer />
      <DiveEntrance />
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

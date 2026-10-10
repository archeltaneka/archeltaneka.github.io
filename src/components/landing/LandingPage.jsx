import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LuArrowRight, LuGithub, LuLinkedin, LuMail, LuPause, LuPlay } from 'react-icons/lu';
import './landing.css';
import useCompactLayout from '../../hooks/useCompactLayout';
import BuoyantIdentity from './BuoyantIdentity';
import UnderwaterScene from './UnderwaterScene';
import DesktopRecommendation from './DesktopRecommendation';
import { about } from '../../data/about';
import { LANDING_MOTION_STYLE, COMPACT_LANDING_STYLE } from './landing-motion';

const RESUME = '/assets/resume/Resume - Archel Sutanto.pdf';
const MENU = ['About', 'Experience', 'Projects', 'Skills', 'Resume', 'Contact'];
const CONTACTS = [
  { label: 'Email', href: 'mailto:archeltaneka@gmail.com', icon: LuMail },
  { label: 'GitHub', href: 'https://github.com/archeltaneka', icon: LuGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/archel-taneka-sutanto', icon: LuLinkedin },
];

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

function Nameplate() {
  return (
    <header className="landing-nameplate">
      <h1>{about.name.join(' ')}</h1>
    </header>
  );
}

function SectionLabel({ selected }) {
  const label = useRef(null);
  useLayoutEffect(() => {
    let active = true;
    const fit = () => {
      if (!active) return;
      const element = label.current;
      // Measure at a fixed size so every section spans the viewport after rotation.
      element.style.fontSize = '100px';
      element.style.fontSize = `${window.innerHeight * 100 / element.scrollWidth}px`;
    };
    fit();
    document.fonts.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => { active = false; window.removeEventListener('resize', fit); };
  }, [selected]);
  return <p ref={label} className="landing-section-label" aria-hidden="true">
    <span className="landing-section-number">{String(selected + 1).padStart(2, '0')}</span>{' '}
    <span>{MENU[selected]}</span>
  </p>;
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
                {label === 'Resume' || label === 'Contact' ? (
                  <a {...shared} href={label === 'Resume' ? RESUME : '#landing-contact'} target={label === 'Resume' ? '_blank' : undefined} rel="noreferrer"><span className="menu-backing" aria-hidden="true" /><span className="menu-label">{label}<span className="menu-label-accent" aria-hidden="true">{label}</span></span></a>
                ) : (
                  <button {...shared} onClick={() => onActivate(index)}><span className="menu-backing" aria-hidden="true" /><span className="menu-label">{label}<span className="menu-label-accent" aria-hidden="true">{label}</span></span></button>
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

export default function LandingPage({ introPhase = 'complete', onAbout, onExperience, onProjects, onSkills, active = true }) {
  const compact = useCompactLayout();
  const contactLink = useRef(null);
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
    if (MENU[index] === 'About') { onAbout?.(); return; }
    if (MENU[index] === 'Skills') { onSkills?.(); return; }
    if (MENU[index] === 'Projects') { onProjects?.(); return; }
    if (MENU[index] === 'Experience') { onExperience?.(); return; }
    setNotice(`${MENU[index]} section coming next. Explore the resume or get in touch in the meantime.`);
  };
  return (
    <main id="home" className="landing" data-intro={introPhase} data-menu-phase={introPhase === 'complete' ? 'idle' : introPhase === 'settled' ? 'settled' : 'entry'} data-motion={paused || hidden || !active ? 'paused' : 'running'} data-interacted={interacted} style={{ ...(compact ? COMPACT_LANDING_STYLE : LANDING_MOTION_STYLE), '--selection-index': selected }}>
      <a className="landing-skip" href="#landing-menu">Skip to navigation</a>
      <UnderwaterScene />
      {!compact && <SectionLabel selected={selected} />}
      {!compact && <CharacterLayer />}
      <Nameplate />
      <BuoyantIdentity compact={compact} paused={paused || hidden || !active || introPhase !== 'complete'} />
      <div id="landing-menu" className="menu-position" tabIndex="-1"><MainMenu selected={selected} onSelect={select} onActivate={activate} /></div>
      <div className="landing-context">
        <p className="landing-notice" role="status" aria-live="polite">{notice}</p>
      </div>
      <footer className="landing-footer">
        <div id="landing-contact" className="contact-links" aria-label="Contact links">
          {CONTACTS.map(({ label, href, icon }) => {
            const Icon = icon;
            return <a ref={label === 'Email' ? contactLink : undefined} key={label} href={href} {...(href.startsWith('https') ? { target: '_blank', rel: 'noreferrer' } : {})}><Icon aria-hidden="true" /><span>{label}</span><LuArrowRight className="contact-arrow" aria-hidden="true" /></a>;
          })}
        </div>
        <InteractionHints paused={paused} onToggleMotion={() => setPaused(value => !value)} />
      </footer>
      <DesktopRecommendation compact={compact} active={active} introPhase={introPhase} returnFocusRef={contactLink} />
    </main>
  );
}

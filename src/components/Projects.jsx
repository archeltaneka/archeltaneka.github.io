import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuChevronLeft, LuChevronRight, LuPause, LuPlay } from 'react-icons/lu';
import { projectData } from '../data/portfolio';
import { UnderwaterBackground } from './landing/UnderwaterScene';
import { LANDING_MOTION_STYLE } from './landing/landing-motion';
import MainMenuButton from './scene/MainMenuButton';
import ProjectPersona from './projects/ProjectPersona';
import TechnologyMatrix, { TechnologyCategories } from './projects/TechnologyMatrix';
import './projects/projects.css';

export default function Projects({ active = true, present = active, onBack }) {
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [view, setView] = useState('select');
  const [swapping, setSwapping] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [highlight, setHighlight] = useState({ y: 0, height: 76 });
  const [pageStarts, setPageStarts] = useState([0]);
  const root = useRef(null);
  const roster = useRef(null);
  const measurements = useRef(null);
  const rows = useRef([]);
  const heading = useRef(null);
  const swapTimer = useRef(null);
  const focusTimer = useRef(null);
  const project = projectData[displayed];
  const instant = reduced || paused;
  const pageIndex = Math.max(0, pageStarts.findLastIndex(start => start <= selected));
  const pageStart = pageStarts[pageIndex];
  const pageEnd = pageStarts[pageIndex + 1] ?? projectData.length;
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', sync); document.removeEventListener('visibilitychange', visibility); clearTimeout(swapTimer.current); clearTimeout(focusTimer.current); };
  }, []);
  useLayoutEffect(() => {
    if (!present || view !== 'select') return;
    // Measure real copy, including wrapping and loaded fonts. Pagination stays
    // independent of project count, device breakpoints and title length.
    const measure = () => {
      const available = roster.current.clientHeight;
      if (!available) return;
      const starts = [0];
      let used = 0;
      [...measurements.current.children].forEach((row, index) => {
        const height = row.getBoundingClientRect().height;
        if (index > starts.at(-1) && used + height > available) {
          starts.push(index);
          used = 0;
        }
        used += height;
      });
      setPageStarts(previous => previous.join(',') === starts.join(',') ? previous : starts);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(roster.current);
    [...measurements.current.children].forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, [present, view]);
  useLayoutEffect(() => {
    const measure = () => {
      const row = rows.current[selected];
      if (row) setHighlight({ y: row.offsetTop, height: row.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    rows.current.forEach(row => row && observer.observe(row));
    return () => observer.disconnect();
  }, [selected, pageStart, pageEnd, active, view]);
  const choose = index => {
    const next = (index + projectData.length) % projectData.length;
    setSelected(next);
    clearTimeout(swapTimer.current);
    if (instant) { setDisplayed(next); setSwapping(false); return; }
    setSwapping(true);
    swapTimer.current = setTimeout(() => { setDisplayed(next); setSwapping(false); }, view === 'details' ? 120 : 80);
  };
  const openDetails = (index = selected) => {
    clearTimeout(swapTimer.current);
    clearTimeout(focusTimer.current);
    setSelected(index);
    setDisplayed(index);
    setSwapping(false);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'instant' });
    focusTimer.current = setTimeout(() => heading.current?.focus({ preventScroll: true }), instant ? 0 : 720);
  };
  const closeDetails = () => {
    clearTimeout(focusTimer.current);
    setView('select');
    focusTimer.current = setTimeout(() => {
      rows.current[selected]?.focus({ preventScroll: true });
      rows.current[selected]?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }, instant ? 0 : 300);
  };
  const actions = [['caseStudy', 'View case study'], ['github', 'GitHub'], [project.demo ? 'demo' : 'live', 'Live demo']].filter(([key]) => project[key]);
  return (
    <main ref={root} id="projects" className="project-compendium underwater-stage" data-view={view} data-swapping={swapping} data-instant={instant} data-motion={paused || hidden || !active ? 'paused' : 'running'} style={LANDING_MOTION_STYLE}>
      <MainMenuButton onClick={() => { clearTimeout(focusTimer.current); onBack?.(); }} />
      <UnderwaterBackground />
      <div className="projects-wash" aria-hidden="true" />
      <header className="projects-toolbar">
        <h1 className="sr-only" tabIndex="-1">Projects</h1>
        <button onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? <LuPlay aria-hidden="true" /> : <LuPause aria-hidden="true" />}Motion {paused ? 'off' : 'on'}</button>
      </header>
      <div className="projects-environment-title" aria-hidden="true">PROJECTS</div>
      <div className="projects-blue-wedge" aria-hidden="true" />
      <svg className="project-persona-diamond" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className="persona-diamond-desktop" d="M76 26 98 64 76 102 54 64Z" />
        <path className="persona-diamond-mobile" d="M50 1 99 50 50 99 1 50Z" />
      </svg>
      <div className="project-art-anchor"><ProjectPersona project={projectData[selected]} active={present} paused={!active || paused || hidden} /></div>
      <section className="project-selection" aria-label="Project selection" inert={view !== 'select'} aria-hidden={view !== 'select'}>
        <div className="project-roster" ref={roster}>
          <div className="project-roster-measure" ref={measurements} aria-hidden="true" inert>
            {projectData.map(item => <div key={item.id} className="project-choice">
              <span className="project-choice-category">{item.category}</span><span className="project-choice-name">{item.name}</span><LuArrowRight aria-hidden="true" />
            </div>)}
          </div>
          <div className="project-selection-highlight" aria-hidden="true" style={{ transform: `translateY(${highlight.y}px)`, height: highlight.height }}>
            <span className="project-selection-card">
              <svg viewBox="0 0 36 52" fill="none"><path d="M2 2h32v48H2z" /><path d="m18 11 10 15-10 15L8 26Z" /><path d="M8 7h7M21 45h7M18 18v16M13 26h10" /></svg>
            </span>
          </div>
          {projectData.map((item, index) => <button key={item.id} ref={el => { rows.current[index] = el; }} className="project-choice" hidden={index < pageStart || index >= pageEnd} data-selected={selected === index} onMouseEnter={() => choose(index)} onClick={() => openDetails(index)}>
            <span className="project-choice-category">{item.category}</span><span className="project-choice-name">{item.name}</span><LuArrowRight aria-hidden="true" />
          </button>)}
        </div>
        <div className="project-list-footer">
          <nav className="project-list-pages" aria-label="Project list pages">
            <button aria-label="Previous project page" disabled={pageStarts.length === 1} onClick={() => choose(pageStarts[(pageIndex - 1 + pageStarts.length) % pageStarts.length])}><LuChevronLeft aria-hidden="true" /></button>
            <span aria-live="polite">{pageStart + 1}–{pageEnd} / {projectData.length}</span>
            <button aria-label="Next project page" disabled={pageStarts.length === 1} onClick={() => choose(pageStarts[(pageIndex + 1) % pageStarts.length])}><LuChevronRight aria-hidden="true" /></button>
          </nav>
        </div>
      </section>
      <section className="project-details" aria-label="Project details" inert={view !== 'details'} aria-hidden={view !== 'details'}>
        <div className="project-header-plane">
          <div className="project-metadata project-dependent">
            <div className="project-category"><span>Category</span><strong>{project.category}</strong></div>
            <div className="project-heading"><h2 ref={heading} tabIndex="-1" className="project-detail-name">{project.name}</h2></div>
          </div>
          <div className="project-technology-band">
            <div className="project-dependent"><TechnologyCategories technologies={project.technologies} /></div>
          </div>
        </div>
        <div className="project-detail-content project-dependent">
          <TechnologyMatrix technologies={project.technologies} />
          <p className="project-purpose">{project.description}</p>
          <div className="project-actions">{actions.map(([key, label]) => <a key={key} href={project[key]} target="_blank" rel="noopener noreferrer">{label}<LuArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in new tab)</span></a>)}</div>
        </div>
        <nav className="project-detail-nav" aria-label="Switch project">
          <button onClick={() => choose(selected - 1)} aria-label="Previous project"><LuChevronLeft aria-hidden="true" /><span>Previous</span></button>
          <span>{String(selected + 1).padStart(2, '0')} / {String(projectData.length).padStart(2, '0')}</span>
          <button onClick={() => choose(selected + 1)} aria-label="Next project"><span>Next</span><LuChevronRight aria-hidden="true" /></button>
        </nav>
        <button className="project-return" onClick={closeDetails}><LuArrowLeft aria-hidden="true" />Project list</button>
      </section>
      <p className="project-ai-note">AI-generated artwork. For illustration only.</p>
      <div className="sr-only" role="status" aria-live="polite">{project.name}{view === 'details' ? ', project details' : ', selected'}</div>
    </main>
  );
}

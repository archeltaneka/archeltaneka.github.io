import { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuChevronUp, LuPause, LuPlay } from 'react-icons/lu';
import { experienceEntries as experienceData } from '../../data/portfolio';
import ExperienceArtwork from './ExperienceArtwork';
import MainMenuButton from '../scene/MainMenuButton';
import { UnderwaterBackground } from '../landing/UnderwaterScene';
import { SCENE_MOTION } from '../scene/scene-motion';
import { LANDING_MOTION_STYLE } from '../landing/landing-motion';
import '../landing/landing.css';
import './experience.css';
import './experience-shell.css';

// Compact highlights reflect the user-confirmed career and education claims.
function recordAchievement(item) {
  if (item.id === 'tiket') return { value: '$8.3M (IDR 149B+)', label: 'Total measured impact' };
  if (item.id === 'nottingham') return { value: 'First class honours', label: '' };
  if (item.id === 'monash') return { value: item.indicatorLabel, label: 'Completion' };
  if (item.id === 'binus') return { value: 'GPA 3.74', label: '' };
  return { value: 'Weekly forecasting', label: 'Demand planning' };
}

export default function ExperiencePage({ onBack, active = true, onInteraction }) {
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [preview, setPreview] = useState(null);
  const interactionTimer = useRef(null);
  const previewEntry = id => {
    setPreview(id);
    onInteraction?.(true);
    clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => onInteraction?.(false), SCENE_MOTION.interaction * 1000);
  };
  useEffect(() => () => clearTimeout(interactionTimer.current), []);
  const experience = experienceData.find(item => item.id === selected) ?? experienceData[0];

  useEffect(() => {
    const syncVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => document.removeEventListener('visibilitychange', syncVisibility);
  }, []);
  return (
    <main className="underwater-stage experience-page" data-effective={selected ?? ""} data-paused={paused} data-intro="complete" data-motion={paused || hidden || !active ? 'paused' : 'running'} style={LANDING_MOTION_STYLE}>
      <MainMenuButton className="experience-back" onClick={onBack} />
      <UnderwaterBackground />
      <div className="experience-graphic-backdrop" aria-hidden="true"><span /><i /></div>
      <header className="experience-header">
        <div className="experience-header-controls">
          <button className="experience-motion" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <LuPlay aria-hidden="true" /> : <LuPause aria-hidden="true" />} Motion {paused ? 'off' : 'on'}</button>
        </div>
        <div className="experience-status-graphic"><h1 tabIndex="-1">Experience</h1><p>Career / Education <span aria-hidden="true">↗</span></p></div>
      </header>
      <div className="experience-selector" aria-label="Work and education">
        <ol>
          {experienceData.map((item, index) => <li key={item.id} data-record={item.id}>
            {(index === 0 || item.kind !== experienceData[index - 1].kind) && <h2 className="experience-category" aria-label={item.kind === 'Work' ? 'Career records' : 'Education records'}>{item.kind === 'Work' ? 'Experience' : 'Education'}</h2>}
            <button id={`experience-choice-${item.id}`} className="experience-choice" data-active={selected === item.id} data-preview={preview === item.id}
              aria-expanded={selected === item.id} aria-controls={selected === item.id ? `experience-details-${item.id}` : undefined}
              onPointerMove={event => { if (event.pointerType !== 'touch' && preview !== item.id) previewEntry(item.id); }}
              onPointerLeave={() => previewEntry(null)}
              onFocus={() => previewEntry(item.id)} onBlur={() => previewEntry(null)}
              onClick={() => { previewEntry(item.id); setSelected(current => current === item.id ? null : item.id); }}>
              <span className="experience-choice-wedge"><img className="experience-choice-logo" src={item.logo} alt="" /></span>
              <span className="experience-choice-company">{item.company}</span>
              <span className="experience-choice-slash" aria-hidden="true" />
              <span className="experience-choice-role">{item.role}</span>
              <span className="experience-choice-stat experience-choice-stat--achievement">
                <strong>{recordAchievement(item).value}</strong>
                {recordAchievement(item).label && <span>{recordAchievement(item).label}</span>}
                <i aria-hidden="true" />
              </span>
              <span className="experience-choice-stat experience-choice-stat--years">
                <strong>{item.date.match(/\d{4}/g)?.join('–')}</strong>
                <span>Years</span>
                <i aria-hidden="true" />
              </span>
              <span className="experience-choice-mark" aria-hidden="true">{selected === item.id ? <LuChevronUp /> : <LuChevronDown />}</span>
            </button>
            {selected === item.id && (
              <article id={`experience-details-${experience.id}`} className="experience-details" aria-labelledby={`experience-choice-${experience.id}`}>
                <div className="experience-role" key={experience.id}>
                  <h2>{experience.company}</h2>
                  <p className="experience-role-name">{experience.role}</p>
                  <p className="experience-meta">{experience.date}<span>{experience.location}</span></p>
                  <p className="experience-focus">{experience.focus}</p>
                </div>
                <div className="experience-outcomes" key={`${experience.id}-outcomes`}>
                  {experience.metrics.length ? <dl>{experience.metrics.map(metric => <div className="experience-metric" key={metric.label}>
                    <dt>{metric.label}</dt><dd>{metric.value}</dd><dd className="experience-metric-detail">{metric.detail}</dd>
                  </div>)}</dl> : <><h3>{experience.kind === 'Education' ? 'Academic experience' : 'Operational data science'}</h3><ul className="experience-contributions">{experience.achievements.map(item => <li key={item}>{item}</li>)}</ul></>}
                </div>
              </article>
            )}
          </li>)}
        </ol>
      </div>
      <ExperienceArtwork experience={experience} />
      <footer className="experience-footer">
        <p className="experience-selection-status" role="status">{selected ? `${experience.company} expanded` : 'Select an experience to view details'}</p>
      </footer>
    </main>
  );
}

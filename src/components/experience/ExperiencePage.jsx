import { useEffect, useRef, useState } from 'react';
import { LuArrowLeft, LuArrowRight, LuCheck, LuPause, LuPlay } from 'react-icons/lu';
import { experienceEntries as experienceData } from '../../data/portfolio';
import ExperienceArtwork from './ExperienceArtwork';
import './experience.css';

export default function ExperiencePage({ onBack }) {
  const [selected, setSelected] = useState(experienceData[0].id);
  const [preview, setPreview] = useState(null);
  const [paused, setPaused] = useState(false);
  const buttons = useRef([]);
  const heading = useRef(null);
  const effective = preview ?? selected;
  const experience = experienceData.find(item => item.id === effective);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  function handleKeyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); onBack(); }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const current = experienceData.findIndex(item => item.id === effective);
      const next = (current + (event.key === 'ArrowDown' ? 1 : -1) + experienceData.length) % experienceData.length;
      setPreview(experienceData[next].id);
      buttons.current[next]?.focus();
    }
  }
  return (
    <main className="experience-page" data-effective={effective} data-paused={paused} onKeyDown={handleKeyDown}>
      <div className="experience-plane" aria-hidden="true" />
      <header className="experience-header">
        <div className="experience-header-controls">
        <button className="experience-back" onClick={onBack}><LuArrowLeft aria-hidden="true" /> Main menu <kbd>Esc</kbd></button>
        <button className="experience-motion" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <LuPlay aria-hidden="true" /> : <LuPause aria-hidden="true" />} Motion {paused ? 'off' : 'on'}</button>
        </div>
        <h1 ref={heading} tabIndex="-1">Experience</h1>
      </header>
      <div className="experience-selector" aria-label="Work and education" onPointerLeave={() => setPreview(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPreview(null); }}>
        <ol>
          {experienceData.map((item, index) => <li key={item.id}>
            <button ref={element => { buttons.current[index] = element; }} className="experience-choice" data-active={effective === item.id} aria-pressed={selected === item.id}
              onPointerEnter={event => { if (event.pointerType !== 'touch') setPreview(item.id); }}
              onFocus={() => setPreview(item.id)} onClick={() => { setSelected(item.id); setPreview(null); }}>
              <img className="experience-choice-logo" src={item.logo} alt="" />
              <span className="experience-choice-identity"><span className="experience-choice-company">{item.company}</span><span className="experience-choice-role">{item.role}</span><span className="experience-choice-period">{item.date}</span></span>
              <span className="experience-choice-indicator"><strong>{item.indicator}</strong><span>{item.indicatorLabel}</span></span>
              {preview === item.id && preview !== selected && <span className="experience-preview-label">Preview</span>}
              <span className="experience-choice-mark" aria-hidden="true">{selected === item.id ? <LuCheck /> : <LuArrowRight />}</span>
            </button>
          </li>)}
        </ol>
      </div>
      <article className="experience-details" aria-label={`${experience.company} role details`}>
        <div className="experience-role" key={experience.id}>
          <h2>{experience.company}</h2>
          <p className="experience-role-name">{experience.role}</p>
          <p className="experience-meta">{experience.date}<span>{experience.location}</span></p>
          <p className="experience-focus">{experience.focus}</p>
          <p className="experience-memory-caption">{experience.reflectionKind === 'logo' ? `${experience.company} · company identity` : `${experience.company} · photographic memory`}</p>
        </div>
        <div className="experience-outcomes" key={`${experience.id}-outcomes`}>
          {experience.metrics.length ? <dl>{experience.metrics.map(metric => <div className="experience-metric" key={metric.label}>
            <dt>{metric.label}</dt><dd>{metric.value}</dd><dd className="experience-metric-detail">{metric.detail}</dd>
          </div>)}</dl> : <><h3>{experience.kind === 'Education' ? 'Academic experience' : 'Operational data science'}</h3><ul className="experience-contributions">{experience.achievements.map(item => <li key={item}>{item}</li>)}</ul></>}
        </div>
      </article>
      <ExperienceArtwork experience={experience} />
      <footer className="experience-footer">
        <p className="experience-key-hint">↑ ↓ Explore <span>Enter Select</span></p>
        <p className="experience-selection-status" role="status">{preview && preview !== selected ? `Previewing ${experience.company}` : `${experience.company} selected`}</p>
      </footer>
    </main>
  );
}

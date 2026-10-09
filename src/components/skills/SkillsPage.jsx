import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SiPython, SiR, SiScikitlearn, SiPytorch, SiTensorflow, SiPostgresql, SiPandas, SiNumpy, SiFastapi, SiDocker, SiGithubactions } from 'react-icons/si';
import { LuActivity, LuBrainCircuit, LuChartColumn, LuCodeXml, LuDatabase, LuNetwork, LuWrench, LuGitBranch, LuSearch, LuWorkflow } from 'react-icons/lu';
import { skillCategories } from '../../data/skills';
import MainMenuButton from '../scene/MainMenuButton';
import RecruitingActions from '../RecruitingActions';
import { UnderwaterBackground } from '../landing/UnderwaterScene';
import { LANDING_MOTION_STYLE } from '../landing/landing-motion';
import useCompactLayout from '../../hooks/useCompactLayout';
import SkillsCharacter from './SkillsCharacter';
import './skills.css';

const categorySymbols = { code: LuCodeXml, network: LuNetwork, brain: LuBrainCircuit, database: LuDatabase, chart: LuChartColumn, wrench: LuWrench };

const icons = { python: SiPython, r: SiR, scikit: SiScikitlearn, pytorch: SiPytorch, tensorflow: SiTensorflow, postgres: SiPostgresql, pandas: SiPandas, numpy: SiNumpy, tableau: LuChartColumn, fastapi: SiFastapi, docker: SiDocker, github: SiGithubactions, database: LuDatabase, branches: LuGitBranch, workflow: LuWorkflow, search: LuSearch, activity: LuActivity, chart: LuChartColumn };

export default function SkillsPage({ active, onBack }) {
  const compact = useCompactLayout();
  const [selectedCategory, setSelectedCategory] = useState('programming');
  const [hidden, setHidden] = useState(() => document.hidden);
  const root = useRef(null);
  const panel = useRef(null);
  const effectiveId = selectedCategory;
  const category = skillCategories.find(item => item.id === effectiveId);
  const previousCategory = useRef(effectiveId);
  useLayoutEffect(() => {
    const changed = previousCategory.current !== effectiveId;
    previousCategory.current = effectiveId;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!changed || !active || hidden || preference.matches) return;
    // Selection owns only category changes. The route coordinator owns entry,
    // so settling a route can never restart the tool-list entrance.
    const tracks = [...panel.current.querySelectorAll('.skills-tool')].map((element, index) =>
      element.animate({ opacity: [0, 1], transform: ['translate(-28px,7px)', 'none'] }, {
        duration: 240, delay: index * 32, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards',
      }));
    const stop = () => tracks.forEach(track => track.cancel());
    preference.addEventListener('change', stop);
    return () => { stop(); preference.removeEventListener('change', stop); };
  }, [effectiveId, active, hidden]);
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  const handleKey = event => {
    if (!active || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Escape') { event.preventDefault(); onBack(); return; }
    if (event.key === 'Enter' && event.target.closest('.skills-heading')) {
      event.preventDefault(); panel.current?.focus({ preventScroll: window.matchMedia('(min-width: 900px)').matches }); return;
    }
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    // Keep ordinary scrolling available once the tool panel is focused.
    if (panel.current?.contains(event.target) || event.target.closest('.skills-guide')) return;
    event.preventDefault();
    const focusedId = event.target.closest('.skills-category')?.id.replace('skill-category-', '');
    const index = skillCategories.findIndex(item => item.id === (focusedId ?? selectedCategory));
    const next = skillCategories[(index + (event.key === 'ArrowDown' ? 1 : -1) + skillCategories.length) % skillCategories.length];
    setSelectedCategory(next.id);
    root.current.querySelector(`#skill-category-${next.id}`)?.focus({ preventScroll: true });
  };
  return <main ref={root} id="skills" className="underwater-stage skills-page" data-intro="complete" data-motion={hidden || !active ? 'paused' : 'running'} data-category={effectiveId} style={LANDING_MOTION_STYLE} onKeyDown={handleKey}>
    <MainMenuButton className="skills-back" onClick={onBack} />
    <UnderwaterBackground />
    <div className="skills-environment-wash" aria-hidden="true" />
    <div className="skills-white-field" aria-hidden="true" />
    <div className="skills-corner-shard" aria-hidden="true" />
    <div className="skills-watermark" aria-hidden="true">SKILLS</div>
    <header className="skills-heading"><h1 tabIndex="-1">Skills <span>/ Toolkit</span></h1></header>
    <nav className="skills-selector" aria-label="Skill categories">
      <ol>{skillCategories.map(item => {
        const CategorySymbol = categorySymbols[item.symbol];
        return <li key={item.id} className="skills-row" style={{ '--category-accent': item.accent }}>
        <button id={`skill-category-${item.id}`} type="button" className="skills-category" aria-pressed={selectedCategory === item.id} aria-controls="skills-tool-panel" data-active={effectiveId === item.id} data-committed={selectedCategory === item.id}
          onPointerEnter={event => { if (event.pointerType !== 'touch') setSelectedCategory(item.id); }}
          onFocus={() => setSelectedCategory(item.id)} onClick={() => setSelectedCategory(item.id)}>
          <span className="skills-category-mark" aria-hidden="true"><CategorySymbol /></span>
          <span className="skills-category-label">{item.label}</span>
          <span className="skills-category-indicator" aria-hidden="true">{selectedCategory === item.id ? '+' : '·'}</span>
        </button>
      </li>;
      })}</ol>
    </nav>
    <section ref={panel} id="skills-tool-panel" className="skills-tools" tabIndex="-1" aria-labelledby="skills-tool-heading">
      <h2 id="skills-tool-heading" className="sr-only">{category.label} toolkit</h2>
      <dl key={effectiveId}>{category.tools.map((tool, index) => {
        const Icon = icons[tool.icon];
        return <div className="skills-tool" key={tool.name} style={{ '--tool': index }}>
          <dt>{tool.type}</dt><dd><span className="skills-tool-icon" aria-hidden="true"><Icon /></span><span>{tool.name}</span></dd>
        </div>;
      })}</dl>
      <RecruitingActions />
    </section>
    <p className="sr-only" role="status">{skillCategories.find(item => item.id === selectedCategory).label} selected</p>
    {!compact && <SkillsCharacter />}
    <footer className="skills-guide">
      <p>Which toolkit do you want to inspect?</p>
      <div className="skills-guide-rule"><span>Guide</span></div>
    </footer>
  </main>;
}

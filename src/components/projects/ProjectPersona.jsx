import { useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COMPACT_QUERY } from '../../hooks/useCompactLayout';
import ProjectIllustration from './ProjectIllustration';
import { projectCategoryPhrases } from '../../data/portfolio';
import './project-persona.css';

const motionPreference = '(prefers-reduced-motion: reduce)';
const readReducedMotion = () => window.matchMedia(motionPreference).matches;
const subscribeReducedMotion = notify => {
  const media = window.matchMedia(motionPreference);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const serverReducedMotion = () => true;

const layerOrder = ['body', 'core', 'shards', 'energy'];
const entrance = {
  opacity: [0, 1, 1],
  x: [52, -3, 0],
  scale: [.94, 1.02, 1],
};
const settled = { opacity: 1, x: 0, scale: 1 };
const exit = instant => ({
  opacity: 0, x: instant ? 0 : 20, scale: instant ? 1 : .98,
  transition: { duration: instant ? 0 : .14, ease: 'easeOut' },
});

function PersonaArtwork({ project, instant }) {
  const [entered, setEntered] = useState(false);
  const persona = project.persona;
  const layers = persona?.mode === 'layers'
    ? layerOrder.filter(name => persona.layers?.[name]).map(name => [name, persona.layers[name]])
    : persona?.image ? [['body', persona.image]] : [];

  return <motion.div
    className="project-persona-entry"
    data-project={project.id}
    data-entered={entered || instant}
    initial={instant ? false : { opacity: 0, x: 52, scale: .94 }}
    animate={entered || instant ? settled : entrance}
    onAnimationComplete={() => setEntered(true)}
    exit="exit"
    variants={{ exit }}
    transition={{ duration: instant || entered ? 0 : .6, times: [0, .72, 1], ease: [.16, 1, .3, 1] }}
  >
    {layers.length ? layers.map(([name, src]) => (
      <div key={name} className={`project-persona-layer project-persona-layer--${name}`}>
        <div className={`project-persona-idle project-persona-idle--${name}`}>
          <picture>
            <source media={COMPACT_QUERY} srcSet={src.replace(/\.webp$/, '-compact.webp')} />
            <img src={src} alt="" draggable="false" decoding="async" />
          </picture>
        </div>
      </div>
    )) : <ProjectIllustration project={project} />}
    {projectCategoryPhrases[project.category] && <div className="project-persona-phrase">
      {projectCategoryPhrases[project.category].map((line, lineIndex) => <span className="persona-phrase-line" key={line}>
        {[...line].map((letter, index) => <span className="persona-phrase-letter" key={index} style={{ '--letter-phase': `${-(index + lineIndex * 5) * .095}s` }}>{letter === ' ' ? '\u00a0' : letter}</span>)}
      </span>)}
    </div>}
  </motion.div>;
}

/** Decorative artwork. Layer files must share identical canvas dimensions and padding. */
export default function ProjectPersona({ project, active = true, paused = false }) {
  const reduced = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
  const instant = Boolean(reduced || paused);
  return (
    <div className="project-persona" aria-hidden="true" data-paused={paused}>
      <AnimatePresence mode="wait" custom={instant}>
        {active && <PersonaArtwork key={project.id} project={project} instant={instant} />}
      </AnimatePresence>
    </div>
  );
}

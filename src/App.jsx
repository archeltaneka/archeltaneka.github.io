import { useCallback, useEffect, useState } from 'react';
import Projects from './components/Projects';
import ExperiencePage from './components/experience/ExperiencePage';
import LandingPage from './components/landing/LandingPage';
import PageLoadDiveTransition from './components/landing/PageLoadDiveTransition';
import useSceneNavigation from './components/scene/useSceneNavigation';
import { SCENE_STYLE } from './components/scene/scene-motion';
import './components/scene/scene-motion.css';

// Easter Egg: Console Log
console.log(`%c
    █▀▀█ █░█ █▀▀ █▀▀▄ █▀▀█ ▀▀█▀▀ ░░ █░░ █▀▀ █▀▀ █░░█ █▀▀█ █▀▀█ 
    █▄▄█ █▀▄ █▀▀ █░░█ █▄▄█ ░░█░░ ░░ █░░ █▀▀ █░░ █▀▀█ █▄▄▀ █▄▄█ 
    ▀░░▀ ▀░▀ ▀▀▀ ▀░░▀ ▀░░▀ ░░▀░░ ░░ ▀▀▀ ▀▀▀ ▀▀▀ ▀░░▀ ▀░▀▀ ▀░░▀
%c
If you can read this, then congrats! You're not a typical HR guy.
There's nothing to see here actually, but the fact that you can see this means we might talk within the same frequency.

Here's a little extra context beyond the resume:
- Nationality: Indonesian.
- MBTI: ISTJ.
- Blood type: O
- Zodiac: Taurus
- Hobbies: Listening to music, watching tech reviews on YouTube, gym.
- Sports I played: Table tennis, fencing.

Now tell your hiring manager I care about both signal and implementation.
`,
  "color: #E6E6FA; font-weight: bold;",
  "color: #6594B1; font-style: italic;");

function App() {
  const { root, route, transition, phase, navigate, interaction } = useSceneNavigation();
  // Lives above navigation: a full document reload is the only normal replay.
  const [introPhase, setIntroPhase] = useState(() =>
    ['#experience', '#projects'].includes(window.location.hash) || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'complete' : 'dive');
  const revealLanding = useCallback(() => setIntroPhase(phase => phase === 'dive' ? 'landing' : phase), []);
  const settleLanding = useCallback(() => setIntroPhase(phase => phase === 'landing' ? 'settled' : phase), []);
  const completeDive = useCallback(() => setIntroPhase('complete'), []);

  // Web page title change easter egg
  useEffect(() => {
    // Fallback to a string if document.title is empty at mount
    const originalTitle = document.title || "My Portfolio";

    const handleBlur = () => {
      document.title = "Still reviewing data science candidates?";
    };

    const handleFocus = () => {
      document.title = originalTitle;
    };
    const handleVisibility = () => {
      if (document.hidden) handleBlur();
      else handleFocus();
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <>
      <div ref={root} className="portfolio-scene" data-scene-state={phase} data-transitioning={Boolean(transition)} style={SCENE_STYLE}>
        <div className="portfolio-route" data-scene="home" hidden={transition ? ![transition.from, transition.to].includes('home') : route !== 'home'} data-incoming={transition?.to === 'home'} inert={Boolean(transition) || route !== 'home'}>
          <LandingPage onProjects={() => { setIntroPhase('complete'); navigate('projects'); }} introPhase={introPhase} active={route === 'home' && !transition} onExperience={() => { setIntroPhase('complete'); navigate('experience'); }} />
        </div>
        <div className="portfolio-route" data-scene="experience" hidden={transition ? ![transition.from, transition.to].includes('experience') : route !== 'experience'} data-incoming={transition?.to === 'experience'} inert={Boolean(transition) || route !== 'experience'}>
          <ExperiencePage active={route === 'experience' && !transition} onInteraction={interaction} onBack={() => navigate('home')} />
        </div>
        <div className="portfolio-route" data-scene="projects" hidden={transition ? ![transition.from, transition.to].includes('projects') : route !== 'projects'} data-incoming={transition?.to === 'projects'} inert={Boolean(transition) || route !== 'projects'}>
          <Projects active={route === 'projects' && !transition} onBack={() => navigate('home')} />
        </div>
        {transition && <div className="scene-crossing" aria-hidden="true"><i className="scene-blade scene-blade--blue" /><i className="scene-blade scene-blade--white" /><i className="scene-blade scene-blade--ink" /></div>}
      </div>
      {introPhase !== 'complete' && <PageLoadDiveTransition onReveal={revealLanding} onSettle={settleLanding} onComplete={completeDive} />}
    </>
  );
}

export default App;

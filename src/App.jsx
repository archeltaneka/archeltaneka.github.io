import { useCallback, useEffect, useState } from 'react';
import Projects from './components/Projects';
import AboutPage from './components/about/AboutPage';
import SkillsPage from './components/skills/SkillsPage';
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
  const [aboutPaused, setAboutPaused] = useState(false);
  // Lives above navigation: a full document reload is the only normal replay.
  const [introPhase, setIntroPhase] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'complete' : 'dive');
  const revealLanding = useCallback(() => setIntroPhase(phase => phase === 'dive' ? 'landing' : phase), []);
  const settleLanding = useCallback(() => setIntroPhase(phase => phase === 'landing' ? 'settled' : phase), []);
  const completeDive = useCallback(() => setIntroPhase('complete'), []);

  // Development only: dispatch new Event('portfolio:replay-intro') from the console.
  // Route changes never subscribe to or reset the document-entry state.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const replay = () => {
      if (route === 'home' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setIntroPhase(current => current === 'complete' ? 'dive' : current);
    };
    window.addEventListener('portfolio:replay-intro', replay);
    return () => window.removeEventListener('portfolio:replay-intro', replay);
  }, [route]);

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
      <div ref={root} className="portfolio-scene" data-scene-state={phase} data-transitioning={Boolean(transition)} data-returning={transition?.to === 'home'} style={SCENE_STYLE}>
        <div className="portfolio-route" data-scene="home" hidden={transition ? ![transition.from, transition.to].includes('home') : route !== 'home'} data-incoming={transition?.to === 'home'} inert={Boolean(transition) || route !== 'home'}>
          <LandingPage onAbout={() => { setIntroPhase('complete'); navigate('about'); }} onSkills={() => { setIntroPhase('complete'); navigate('skills'); }} onProjects={() => { setIntroPhase('complete'); navigate('projects'); }} introPhase={introPhase} active={route === 'home' && !transition} onExperience={() => { setIntroPhase('complete'); navigate('experience'); }} />
        </div>
        <div className="portfolio-route" data-scene="experience" hidden={transition ? ![transition.from, transition.to].includes('experience') : route !== 'experience'} data-incoming={transition?.to === 'experience'} inert={Boolean(transition) || route !== 'experience'}>
          <ExperiencePage active={route === 'experience' && !transition} onInteraction={interaction} onBack={() => navigate('home')} />
        </div>
        <div className="portfolio-route" data-scene="projects" hidden={transition ? ![transition.from, transition.to].includes('projects') : route !== 'projects'} data-incoming={transition?.to === 'projects'} inert={Boolean(transition) || route !== 'projects'}>
          <Projects present={route === 'projects' || transition?.to === 'projects'} active={route === 'projects' && !transition} onBack={() => navigate('home')} />
        </div>
        <div className="portfolio-route" data-scene="skills" hidden={transition ? ![transition.from, transition.to].includes('skills') : route !== 'skills'} data-incoming={transition?.to === 'skills'} inert={Boolean(transition) || route !== 'skills'}>
          {(route === 'skills' || transition?.to === 'skills' || transition?.from === 'skills') && <SkillsPage active={route === 'skills' && !transition} onBack={() => navigate('home')} />}
        </div>
        <div className="portfolio-route" data-scene="about" hidden={transition ? ![transition.from, transition.to].includes('about') : route !== 'about'} data-incoming={transition?.to === 'about'} inert={Boolean(transition) || route !== 'about'}>
          {(route === 'about' || transition?.to === 'about' || transition?.from === 'about') && <AboutPage paused={aboutPaused} onToggleMotion={() => setAboutPaused(value => !value)} active={route === 'about' && !transition} onBack={() => navigate('home')} />}
        </div>
        {transition?.from === 'home' && !transition.paused && <div className="scene-water-lead" aria-hidden="true" />}
      </div>
      {introPhase !== 'complete' && <PageLoadDiveTransition onReveal={revealLanding} onSettle={settleLanding} onComplete={completeDive} />}
    </>
  );
}

export default App;

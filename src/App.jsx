import { useCallback, useEffect, useRef, useState } from 'react';
import ExperiencePage from './components/experience/ExperiencePage';
import LandingPage from './components/landing/LandingPage';
import PageLoadDiveTransition from './components/landing/PageLoadDiveTransition';

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
  const [route, setRoute] = useState(() => window.location.hash === '#experience' ? 'experience' : 'home');
  const [routePhase, setRoutePhase] = useState('idle');
  const routeTimer = useRef(null);
  const navigate = useCallback((destination, push = true) => {
    clearTimeout(routeTimer.current);
    if (push) window.history.pushState(null, '', destination === 'experience' ? '#experience' : '#home');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setRoutePhase('exiting');
    routeTimer.current = setTimeout(() => {
      setRoute(destination);
      setRoutePhase('entering');
      window.scrollTo({ top: 0, behavior: 'instant' });
      routeTimer.current = setTimeout(() => {
        setRoutePhase('idle');
        if (destination === 'home') document.querySelector('.menu-entry-experience button')?.focus({ preventScroll: true });
      }, reduced ? 0 : 650);
    }, reduced ? 0 : 180);
  }, []);
  useEffect(() => {
    const syncRoute = () => navigate(window.location.hash === '#experience' ? 'experience' : 'home', false);
    window.addEventListener('popstate', syncRoute);
    return () => { window.removeEventListener('popstate', syncRoute); clearTimeout(routeTimer.current); };
  }, [navigate]);
  // Lives above navigation: a full document reload is the only normal replay.
  const [introPhase, setIntroPhase] = useState(() =>
    window.location.hash === '#experience' || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'complete' : 'dive');
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
      <div className="portfolio-route" hidden={route !== 'home'} data-phase={routePhase} inert={routePhase === 'exiting' ? true : undefined}>
        <LandingPage introPhase={introPhase} active={route === 'home'} onExperience={() => { setIntroPhase('complete'); navigate('experience'); }} />
      </div>
      {route === 'experience' && <div className="portfolio-route" data-phase={routePhase} inert={routePhase === 'exiting' ? true : undefined}><ExperiencePage onBack={() => navigate('home')} /></div>}
      {introPhase !== 'complete' && <PageLoadDiveTransition onReveal={revealLanding} onSettle={settleLanding} onComplete={completeDive} />}
    </>
  );
}

export default App;

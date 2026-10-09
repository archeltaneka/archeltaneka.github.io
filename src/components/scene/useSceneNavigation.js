import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { COMPACT_QUERY } from '../../hooks/useCompactLayout';
import { experienceArt, reflectionSource } from '../experience/experience-art';
import { experienceEntries } from '../../data/portfolio';
import { playScene, SCENE_MOTION } from './scene-motion';

const readRoute = () => ['about', 'experience', 'projects', 'skills'].includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'home';
const idleState = route => route === 'about' ? 'ABOUT_IDLE' : route === 'skills' ? 'SKILLS_IDLE' : route === 'home' ? 'MAIN_MENU_IDLE' : route === 'projects' ? 'PROJECTS_IDLE' : 'STATS_IDLE';
let assets;
function preloadExperience() {
  if (window.matchMedia(COMPACT_QUERY).matches) return Promise.resolve();
  assets ??= Promise.allSettled([experienceArt.character, experienceArt.mirror.mask,
    ...experienceEntries.map(reflectionSource).filter(Boolean)].map(src => {
    const image = new Image();
    image.src = src;
    return image.decode();
  }));
  return assets;
}

export default function useSceneNavigation() {
  const root = useRef(null);
  const current = useRef(readRoute());
  const busy = useRef(false);
  const hasNavigated = useRef(false);
  const lastDestination = useRef(readRoute());
  const queuedHistory = useRef(null);
  const [route, setRoute] = useState(readRoute);
  const [transition, setTransition] = useState(null);
  const [phase, setPhase] = useState(() => idleState(readRoute()));
  const navigate = useCallback((to, push = true) => {
    if (busy.current) {
      if (!push) queuedHistory.current = to;
      return;
    }
    if (to === current.current) return;
    busy.current = true;
    hasNavigated.current = true;
    setPhase(to === 'about' ? 'MAIN_MENU_SELECT_ABOUT' : current.current === 'about' ? 'ABOUT_EXIT' : to === 'skills' ? 'MAIN_MENU_SELECT_SKILLS' : current.current === 'skills' ? 'SKILLS_EXIT' : to === 'experience' ? 'MAIN_MENU_SELECT_EXPERIENCE' : to === 'projects' ? 'MAIN_MENU_SELECT_PROJECTS' : current.current === 'projects' ? 'PROJECTS_EXIT' : 'STATS_EXIT');
    setTransition({ from: current.current, to, push, paused: root.current?.querySelector(`[data-scene="${current.current}"] main`)?.dataset.motion === 'paused' });
  }, []);
  useEffect(() => {
    preloadExperience();
    const sync = () => navigate(readRoute(), false);
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, [navigate]);
  useLayoutEffect(() => {
    if (!transition) return;
    let disposed = false;
    let animation;
    let frame;
    const timers = [];
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = preference.matches || transition.paused;
    const commitUrl = () => {
      if (transition.push && queuedHistory.current === null) window.history.pushState(null, '', `#${transition.to}`);
    };
    let committed = false;
    let finished = false;
    const commit = () => { if (!committed) { committed = true; commitUrl(); } };
    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      commit();
      current.current = transition.to;
      busy.current = false;
      setRoute(transition.to);
      setPhase(idleState(transition.to));
      setTransition(null);
      const queued = queuedHistory.current;
      queuedHistory.current = null;
      // History is the latest intent; ordinary repeated clicks are deliberately discarded.
      if (queued !== null && queued !== transition.to) navigate(queued, false);
    };
    const run = () => {
      if (disposed) return;
      window.scrollTo({ top: 0, behavior: 'instant' });
      animation = playScene(root.current, transition.to, reduced, transition.from);
      if (reduced) commit();
      else timers.push(setTimeout(() => {
        commit();
        setPhase(transition.to === 'home' ? 'MAIN_MENU_RETURN' : transition.to === 'experience' ? 'STATS_ENTER' : `${transition.to.toUpperCase()}_ENTER`);
      }, (transition.from === 'home' ? (SCENE_MOTION.forwardNavigation + SCENE_MOTION.rippleSeparation) / 2 : SCENE_MOTION.reveal) * 1000));
      animation.controls.then(finish);
    };
    // Incoming art stays hidden until decoded; selection feedback is already visible.
    const start = () => {
      if (disposed) return;
      if (document.hidden) finish();
      else frame = requestAnimationFrame(run);
    };
    if (document.hidden) queueMicrotask(finish);
    else if (transition.to === 'experience') preloadExperience().then(start);
    else start();
    const skip = () => { if (preference.matches || document.hidden) finish(); };
    preference.addEventListener('change', skip);
    document.addEventListener('visibilitychange', skip);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      animation?.restore();
      preference.removeEventListener('change', skip);
      document.removeEventListener('visibilitychange', skip);
    };
  }, [transition, navigate]);
  useEffect(() => {
    if (transition) return;
    const target = route === 'about' ? '.profile-identity h1' : route === 'skills' ? '.skills-heading h1' : route === 'experience' ? '.experience-header h1' : route === 'projects' ? '.projects-toolbar h1' : lastDestination.current === 'about' ? '.menu-entry-about button' : lastDestination.current === 'skills' ? '.menu-entry-skills button' : lastDestination.current === 'projects' ? '.menu-entry-projects button' : '.menu-entry-experience button';
    if (route !== 'home') lastDestination.current = route;
    // Do not steal initial focus from the main menu's page-entry sequence.
    if (route !== 'home' || hasNavigated.current) root.current.querySelector(target)?.focus({ preventScroll: true });
  }, [route, transition]);
  const interaction = useCallback(active => {
    if (!busy.current && current.current === 'experience') setPhase(active ? 'STATS_INTERACTION' : 'STATS_IDLE');
  }, []);
  return { root, route, transition, phase, navigate, interaction };
}

import { animateMini as animate } from 'framer-motion';

// Seconds throughout. All navigation choreography and interaction timings live here.
export const SCENE_MOTION = Object.freeze({
  forward: { anticipation: .10, geometry: .22, reveal: .32, art: .38, title: .43, rows: .47, labels: .66, total: .86 },
  back: { details: 0, rows: .06, art: .15, geometry: .24, reveal: .32, character: .39, menu: .46, labels: .65, total: .80 },
  navigationScale: 1.5,
  stagger: .035,
  reduced: .12,
  interaction: .35,
  reflection: .24,
  detail: .23,
  detailDelay: .12,
});
export const SCENE_STYLE = {
  '--reflection-duration': `${SCENE_MOTION.reflection}s`,
  '--detail-duration': `${SCENE_MOTION.detail}s`,
  '--detail-delay': `${SCENE_MOTION.detailDelay}s`,
};
const snap = [.16, 1, .3, 1];
const cut = [.65, 0, .9, .35];

export function playScene(root, destination, reduced, source = destination === 'home' ? 'experience' : 'home') {
  // Projects uses a short route crossing; its internal 720ms expansion owns the main choreography.
  if (destination === 'projects' || source === 'projects') {
    const incoming = root.querySelector(`[data-scene="${destination}"]`);
    const outgoing = root.querySelector(`[data-scene="${source}"]`);
    const duration = reduced ? 100 : 340;
    const tracks = [
      incoming.animate([{ opacity: 0, transform: 'translateX(28px)', clipPath: 'inset(0)' }, { opacity: 1, transform: 'translateX(0)', clipPath: 'inset(0)' }], { duration, fill: 'both', easing: 'ease-out' }),
      outgoing.animate([{ opacity: 1 }, { opacity: 0 }], { duration: duration * .7, fill: 'both' }),
    ];
    return { controls: Promise.allSettled(tracks.map(track => track.finished)), restore: () => tracks.forEach(track => track.cancel()) };
  }
  const sequence = [];
  const originals = new Map();
  const home = '[data-scene="home"]';
  const stats = '[data-scene="experience"]';
  const incoming = destination === 'experience' ? stats : home;
  const outgoing = destination === 'experience' ? home : stats;
  const mobile = window.matchMedia('(max-width: 900px)').matches;
  const distance = mobile ? 36 : 100;
  const add = (selector, frames, at, duration, ease = snap, stagger = 0) => {
    // Explicit transform strings avoid per-element transform measurement and stay
    // on the compositor. Targets are wrappers without intrinsic design transforms.
    const { x, y, rotate, scale, skewY, ...properties } = frames;
    if (x || y || rotate || scale || skewY) {
      const count = Math.max(...[x, y, rotate, scale, skewY].filter(Boolean).map(values => values.length));
      const value = (values, index, fallback) => values?.[Math.min(index, values.length - 1)] ?? fallback;
      const px = value => typeof value === 'number' ? `${value}px` : value;
      properties.transform = Array.from({ length: count }, (_, i) =>
        `translate3d(${px(value(x, i, 0))}, ${px(value(y, i, 0))}, 0) rotate(${value(rotate, i, 0)}deg) skewY(${value(skewY, i, 0)}deg) scale(${value(scale, i, 1)})`);
    }
    root.querySelectorAll(selector).forEach((element, index) => {
      if (!originals.has(element)) originals.set(element, element.getAttribute('style'));
      sequence.push([element, properties, { at: at + index * stagger, duration, ease }]);
    });
  };
  const total = reduced ? SCENE_MOTION.reduced : SCENE_MOTION[destination === 'experience' ? 'forward' : 'back'].total;
  if (reduced) {
    add(incoming, { opacity: [0, 1], clipPath: ['inset(0%)', 'inset(0%)'] }, 0, total);
    add(outgoing, { opacity: [1, 0] }, 0, total);
  } else {
    // Reveal underneath the moving diagonal blades; keep the full-page mask static
    // so both live compositions do not need repainting on every frame.
    const reveal = SCENE_MOTION[destination === 'experience' ? 'forward' : 'back'].reveal;
    add(incoming, { opacity: [0, 1], clipPath: ['inset(0%)', 'inset(0%)'] }, reveal, .02);
    const dir = destination === 'experience' ? -1 : 1;
    add('.scene-blade--blue', { x: [`${-dir * 130}%`, '0%', `${dir * 130}%`], rotate: [-13, -9, -7] }, .14, .51);
    add('.scene-blade--white', { x: [`${-dir * 150}%`, '0%', `${dir * 150}%`], y: ['18%', '0%', '-16%'] }, .20, .44);
    add('.scene-blade--ink', { x: [`${-dir * 150}%`, `${dir * 150}%`] }, .28, .32);
    if (destination === 'experience') {
      const t = SCENE_MOTION.forward;
      add(`${home} .menu-entry-experience .menu-control`, { x: [12, 3, 15], scale: [1.12, 1.16, 1.135] }, 0, .12);
      add(`${home} .menu-arrival`, { x: [0, distance * 9], y: [0, -distance * 1.6], opacity: [1, 0] }, t.anticipation, .28, cut, .018);
      add(`${home} .character-entrance`, { x: [0, 8, -distance * 7], y: [0, 3, distance * 1.4], scale: [1, 1.01, 1.12] }, .04, .40, cut);
      add(`${home} .name-carousel`, { x: [0, -distance * 3], y: [0, distance * 2] }, .13, .30, cut);
      add(`${home} .character-backdrop`, { x: [0, -distance * 8], skewY: [0, -14] }, .16, .32, cut);
      add(`${home} .impact-card, ${home} .landing-footer`, { x: [0, -80], opacity: [1, 0] }, .08, .20);
      add(`${stats} .experience-graphic-backdrop`, { x: [distance * 4, 0], y: [-60, 0] }, t.geometry, .39);
      add(`${stats} .experience-art-entrance`, { x: [distance * 4, -3, 0], y: [-30, 2, 0], scale: [1.045, 1, 1] }, t.art, .37);
      add(`${stats} .experience-status-graphic h1, ${stats} .experience-status-graphic p`, { x: [distance * 2, 0], opacity: [0, 1] }, t.title, .28, snap, .035);
      add(`${stats} .experience-selector > ol > li`, { x: [-distance * 3, 3, 0], opacity: [0, 1] }, t.rows, .24, snap, SCENE_MOTION.stagger);
      add(`${stats} .experience-header-controls, ${stats} .experience-footer`, { y: [12, 0], opacity: [0, 1] }, t.labels, .18);
    } else {
      const t = SCENE_MOTION.back;
      add(`${stats} .experience-details, ${stats} .experience-footer`, { x: [0, -45], opacity: [1, 0] }, t.details, .15);
      add(`${stats} .experience-selector > ol > li`, { x: [0, -distance * 6], opacity: [1, 0] }, t.rows, .22, cut, .022);
      add(`${stats} .experience-header`, { y: [0, -80], opacity: [1, 0] }, .11, .21);
      add(`${stats} .experience-art-entrance`, { x: [0, distance * 5], y: [0, -65], scale: [1, 1.06] }, t.art, .33, cut);
      add(`${stats} .experience-graphic-backdrop`, { x: [0, -distance * 8], y: [0, 90] }, t.geometry, .30, cut);
      add(`${home} .character-backdrop, ${home} .name-carousel`, { x: [-distance * 3, 0], opacity: [0, 1] }, t.reveal, .30);
      add(`${home} .character-entrance`, { x: [-distance * 3, 2, 0], y: [25, -2, 0], scale: [1.06, 1, 1] }, t.character, .36);
      add(`${home} .menu-arrival`, { x: [distance * 4, -3, 0], y: [-25, 1, 0], opacity: [0, 1] }, t.menu, .24, snap, .023);
      add(`${home} .impact-card, ${home} .landing-footer`, { y: [10, 0], opacity: [0, 1] }, t.labels, .15);
    }
  }
  // Native tracks own their styles until cleanup. Unlike the full renderer,
  // mini does not queue a MotionValue render that can overwrite restored styles
  // after cancellation (notably a normal exit followed by paused re-entry).
  const pace = reduced ? 1 : SCENE_MOTION.navigationScale;
  const tracks = sequence.map(([element, properties, { at, ...options }]) =>
    animate(element, properties, { ...options, duration: options.duration * pace, delay: at * pace }));
  // An empty native track preserves the phase duration without per-frame JS.
  const clock = root.animate([], { duration: total * pace * 1000 });
  const controls = Promise.allSettled([...tracks.map(track => track.finished), clock.finished]);
  return {
    controls,
    restore() {
      tracks.forEach(track => track.cancel());
      clock.cancel();
      originals.forEach((style, element) => {
        if (style === null) element.removeAttribute('style');
        else element.setAttribute('style', style);
      });
    },
  };
}

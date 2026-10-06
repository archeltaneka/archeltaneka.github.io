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
  if (destination === 'skills' || source === 'skills') return playSkills(root, destination, source, reduced);
  if (destination === 'projects' || source === 'projects') {
    return playProjects(root, destination, source, reduced);
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

// The project crossing shares the underwater stage: move its individual planes,
// keeping artwork opaque instead of dissolving two complete pages together.
function playProjects(root, destination, source, reduced) {
  const incoming = root.querySelector(`[data-scene="${destination}"]`);
  const outgoing = root.querySelector(`[data-scene="${source}"]`);
  const tracks = [];
  const snap = 'cubic-bezier(.16, 1, .3, 1)';
  const exit = 'cubic-bezier(.65, 0, .9, .35)';
  const add = (scope, selector, frames, delay, duration, easing = snap, stagger = 0) => {
    const elements = selector ? scope.querySelectorAll(selector) : [scope];
    elements.forEach((element, index) => tracks.push(element.animate(frames, {
      delay: delay + Math.min(index, 7) * stagger, duration, easing, fill: 'both',
    })));
  };
  if (reduced) {
    add(incoming, null, { opacity: [0, 1], clipPath: ['inset(0)', 'inset(0)'] }, 0, 120);
    add(outgoing, null, { opacity: [1, 0] }, 0, 120);
  } else {
    const forward = destination === 'projects';
    const distance = window.matchMedia('(max-width: 767px)').matches ? 60 : 100;
    // A short opaque cut exposes the new water stage while each plane settles.
    add(incoming, null, { opacity: [0, 1], clipPath: ['inset(0)', 'inset(0)'] }, 280, 1);
    add(outgoing, null, { opacity: [1, 0] }, 280, 1);
    if (forward) {
      add(outgoing, '.menu-arrival', { translate: ['0 0', '80vw -16vh'] }, 50, 290, exit, 15);
      add(outgoing, '.character-entrance', { translate: ['0 0', '-65vw 15vh'] }, 20, 310, exit);
      add(outgoing, '.name-carousel, .character-backdrop', { translate: ['0 0', '-45vw 10vh'] }, 60, 260, exit);
      add(outgoing, '.impact-card, .landing-footer', { opacity: [1, 0] }, 0, 160);
      add(incoming, '.projects-environment-title', { translate: ['-100% 15%', '0 0'] }, 260, 380);
      add(incoming, '.project-roster', { translate: [`-${distance}% 8%`, '0 0'] }, 310, 390);
      add(incoming, '.project-roster > .project-choice:not([hidden])', { translate: ['-40px 0', '0 0'] }, 340, 280, snap, 24);
      add(incoming, '.project-art-anchor', { translate: [`${distance}% -8%`, '0 0'] }, 290, 490);
      add(incoming, '.project-details', { translate: ['-60px 12px', '0 0'] }, 310, 390);
      add(incoming, '.projects-toolbar, .project-list-footer, .project-ai-note', { opacity: [0, 1] }, 580, 180);
    } else {
      add(outgoing, '.project-selection, .project-details, .projects-environment-title', { translate: ['0 0', '-100vw 12vh'] }, 0, 300, exit);
      add(outgoing, '.project-art-anchor', { translate: ['0 0', '70vw -12vh'] }, 30, 290, exit);
      add(outgoing, '.projects-toolbar, .project-ai-note', { opacity: [1, 0] }, 0, 140);
      add(incoming, '.character-backdrop, .name-carousel', { translate: ['-40vw 8vh', '0 0'] }, 270, 360);
      add(incoming, '.character-entrance', { translate: ['-60vw 12vh', '0 0'] }, 290, 450);
      add(incoming, '.menu-arrival', { translate: ['65vw -12vh', '0 0'] }, 340, 310, snap, 22);
      add(incoming, '.impact-card, .landing-footer', { opacity: [0, 1] }, 610, 170);
    }
  }
  return {
    controls: Promise.allSettled(tracks.map(track => track.finished)),
    restore: () => tracks.forEach(track => track.cancel()),
  };
}

// Skills keeps the shared route lifecycle, with separate native tracks for its
// white field, selector, tools and future artwork. Milliseconds in this track.
function playSkills(root, destination, source, reduced) {
  const incoming = root.querySelector(`[data-scene="${destination}"]`);
  const outgoing = root.querySelector(`[data-scene="${source}"]`);
  const tracks = [];
  const snap = 'cubic-bezier(.16,1,.3,1)';
  const cut = 'cubic-bezier(.65,0,.9,.35)';
  const add = (scope, selector, frames, delay, duration, easing = snap, stagger = 0) => {
    (selector ? scope.querySelectorAll(selector) : [scope]).forEach((el, index) => {
      tracks.push(el.animate(frames, { delay: delay + index * stagger, duration, easing, fill: 'both' }));
    });
  };
  if (reduced) {
    add(incoming, null, { opacity: [0,1], clipPath: ['inset(0)','inset(0)'] }, 0, 120);
    add(outgoing, null, { opacity: [1,0] }, 0, 120);
  } else {
    add(incoming, null, { opacity: [0,1], clipPath: ['inset(0)','inset(0)'] }, 280, 1);
    add(outgoing, null, { opacity: [1,0] }, 280, 1);
    if (destination === 'skills') {
      add(outgoing, '.menu-arrival', { translate: ['0 0','80vw -16vh'] }, 50, 290, cut, 15);
      add(outgoing, '.character-entrance', { translate: ['0 0','-65vw 15vh'] }, 20, 310, cut);
      add(outgoing, '.name-carousel, .character-backdrop', { translate: ['0 0','-45vw 10vh'] }, 60, 260, cut);
      add(outgoing, '.impact-card, .landing-footer', { opacity: [1,0] }, 0, 160);
      add(incoming, '.skills-white-field', { translate: ['45vw -65vh','0 0'] }, 250, 410);
      add(incoming, '.skills-corner-shard', { translate: ['20vw -40vh','0 0'] }, 270, 380);
      add(incoming, '.skills-watermark', { translate: ['-45vw 30vh','0 0'] }, 300, 410);
      add(incoming, '.skills-row', { translate: ['-38vw 0','0 0'] }, 320, 280, snap, 28);
      add(incoming, '.skills-tools', { translate: ['-60px 16px','0 0'], opacity: [0,1] }, 430, 300);
      add(incoming, '.skills-tool', { translate: ['-30px 0','0 0'] }, 470, 230, snap, 30);
      add(incoming, '.skills-character-anchor', { translate: ['45vw 30vh','0 0'] }, 370, 420);
      add(incoming, '.skills-heading, .skills-guide', { opacity: [0,1], translate: ['0 10px','0 0'] }, 610, 180);
    } else {
      add(outgoing, '.skills-tools, .skills-guide, .skills-heading', { opacity: [1,0], translate: ['0 0','-30px 0'] }, 0, 170);
      add(outgoing, '.skills-row', { translate: ['0 0','-40vw 0'] }, 40, 240, cut, 18);
      add(outgoing, '.skills-white-field, .skills-corner-shard', { translate: ['0 0','45vw -80vh'] }, 70, 290, cut);
      add(outgoing, '.skills-character-anchor', { translate: ['0 0','50vw 30vh'] }, 50, 270, cut);
      add(incoming, '.character-backdrop, .name-carousel', { translate: ['-40vw 8vh','0 0'] }, 270, 360);
      add(incoming, '.character-entrance', { translate: ['-60vw 12vh','0 0'] }, 290, 450);
      add(incoming, '.menu-arrival', { translate: ['65vw -12vh','0 0'] }, 340, 310, snap, 22);
      add(incoming, '.impact-card, .landing-footer', { opacity: [0,1] }, 610, 170);
    }
  }
  return { controls: Promise.allSettled(tracks.map(track => track.finished)), restore: () => tracks.forEach(track => track.cancel()) };
}

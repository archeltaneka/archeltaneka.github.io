// Navigation uses one water reveal for every section. Local interaction timings
// remain independent so switching pages does not change any in-page animation.
export const SCENE_MOTION = Object.freeze({
  navigation: .42,
  forwardNavigation: .56,
  reveal: .21,
  rippleSeparation: .28,
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

// Overlapping, filled circles expose the actual next page through the current
// one. On return, those openings contract around the outgoing section.
// All subpaths share one winding, so
// intersecting ripples merge instead of cutting holes into each other.
function waterFrames(width, height, returning) {
  const origins = returning
    ? [[.73, .08, 0], [.22, .98, .06], [1.04, .72, .13]]
    : [[.27, .45, 0], [.84, .06, .07], [.08, .98, .12]];
  return Array.from({ length: 25 }, (_, index) => {
    const progress = index / 24;
    const expansion = returning ? 1 - progress : progress;
    const path = origins.map(([x, y, delay]) => {
      const cx = x * width, cy = y * height;
      const radius = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy));
      const r = Math.max(0, (expansion - delay) / (1 - delay)) * radius;
      return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
    }).join(' ');
    return { clipPath: `path('${path}')`, offset: progress };
  });
}

export function playScene(root, destination, reduced, source = destination === 'home' ? 'experience' : 'home') {
  const incoming = root.querySelector(`[data-scene="${destination}"]`);
  const outgoing = root.querySelector(`[data-scene="${source}"]`);
  const duration = (reduced ? SCENE_MOTION.reduced : source === 'home' ? SCENE_MOTION.forwardNavigation : SCENE_MOTION.navigation) * 1000;
  const tracks = [];
  if (reduced) {
    // Motion off and reduced motion never expand a mask or displace content.
    const reveal = incoming.animate({ opacity: [0, 1], clipPath: ['inset(0)', 'inset(0)'] }, { duration, fill: 'both' });
    reveal.id = 'scene-navigation-fade-in';
    const hide = outgoing.animate({ opacity: [1, 0] }, { duration, fill: 'both' });
    hide.id = 'scene-navigation-fade-out';
    tracks.push(reveal, hide);
  } else {
    const returning = destination === 'home';
    const surface = returning ? outgoing : incoming;
    const leadingWater = source === 'home' ? root.querySelector('.scene-water-lead') : null;
    const delay = leadingWater ? SCENE_MOTION.rippleSeparation * 1000 : 0;
    if (leadingWater) {
      const lead = leadingWater.animate(waterFrames(root.clientWidth, window.innerHeight, false), {
        duration: delay, easing: 'cubic-bezier(.45, 0, .55, 1)', fill: 'both',
      });
      lead.id = 'scene-navigation-water-lead';
      tracks.push(lead);
    }
    const reveal = surface.animate(waterFrames(root.clientWidth, window.innerHeight, returning), {
      duration: duration - delay, delay, easing: 'cubic-bezier(.45, 0, .55, 1)', fill: 'both',
    });
    reveal.id = 'scene-water-reveal';
    tracks.push(reveal);
  }
  // A shared native clock also makes deterministic capture and cancellation
  // independent of page contents. No inline styles survive cancellation.
  const clock = root.animate([], { duration });
  clock.id = 'scene-navigation-clock';
  tracks.push(clock);
  return {
    controls: Promise.allSettled(tracks.map(track => track.finished)),
    restore: () => tracks.forEach(track => track.cancel()),
  };
}

// One timeline for the SVG crossing, landing arrivals and ambient handoff (ms).
export const LANDING_MOTION = Object.freeze({
  reveal: 620,
  settle: 1100,
  complete: 1250,
  character: 480,
  menu: 420,
  stagger: 18,
  accent: 440,
  background: 380,
  float: 5200,
  light: 12500,
  rays: 16500,
  surface: 10500,
  selection: 6800,
});

export const LANDING_MOTION_STYLE = Object.fromEntries(
  Object.entries(LANDING_MOTION).map(([name, duration]) => [`--motion-${name}`, `${duration}ms`]),
);

export const COMPACT_LANDING_MOTION = Object.freeze({ ...LANDING_MOTION, reveal: 400, settle: 720, complete: 850 });
export const COMPACT_LANDING_STYLE = Object.fromEntries(
  Object.entries(COMPACT_LANDING_MOTION).map(([name, duration]) => [`--motion-${name}`, `${duration}ms`]),
);

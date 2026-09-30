// One timeline for the SVG crossing, landing arrivals and ambient handoff (ms).
export const LANDING_MOTION = Object.freeze({
  reveal: 400,
  settle: 780,
  complete: 980,
  character: 480,
  menu: 420,
  stagger: 18,
  accent: 440,
  background: 380,
  decoration: 460,
  float: 6000,
  light: 18000,
  rays: 23000,
  surface: 15000,
  ribbon: 52000,
  selection: 6800,
});

export const LANDING_MOTION_STYLE = Object.fromEntries(
  Object.entries(LANDING_MOTION).map(([name, duration]) => [`--motion-${name}`, `${duration}ms`]),
);

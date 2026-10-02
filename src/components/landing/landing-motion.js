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
  float: 5200,
  light: 12500,
  rays: 16500,
  surface: 10500,
  ribbon: 52000,
  selection: 6800,
});

export const LANDING_MOTION_STYLE = Object.fromEntries(
  Object.entries(LANDING_MOTION).map(([name, duration]) => [`--motion-${name}`, `${duration}ms`]),
);

# Project Persona

`src/components/projects/ProjectPersona.jsx` renders decorative artwork inside the
existing Projects art anchor. Selection uses the canonical project ID; Framer
Motion's `AnimatePresence` waits for a 140ms exit before mounting the latest
selection. The 600ms entrance moves from +52px and .94 scale through a small
1.02 overshoot, then settles. No loading timer or image dimensions affect layout.
Opening project details retains the same artwork instance.

Independent CSS wrappers keep idle movement separate from the entrance transform:
body floats 6px over 4.6s; core pulses to 1.04 over 2.8s; shards drift by at most
5px/1.5 degrees over 5.6s; energy varies opacity over 4s. Layer fades start at
0/80/120/180ms and finish within the entrance. Idle starts after 600ms.
The motion toggle, document visibility, inactive route, and live reduced-motion
preference are respected. Resuming motion does not replay the selection entrance.
Artwork is hidden from assistive technology and never intercepts pointer input.

## ExperimentOS single-image artwork

ExperimentOS uses the supplied transparent 1145×1374 PNG at
`public/assets/projects/experimentos/experimentos-persona.png`. The temporary SVG
and its embedded text have been removed. No background, frame, filter, or extra
effect is applied. The existing layer-capable renderer remains unchanged in
structure; ExperimentOS renders only one body image.

The selection view sizes this portrait independently of the old placeholder
slot: `min(54vw, 94svh)` wide, offset 4% right and 9% below the anchor. At
768–1199px it uses 60vw, 10% right and 3% below. Intrinsic aspect ratio is
preserved. This keeps the chest visible while allowing the cloak and rightmost
extremities to leave the stage. Detail and mobile views retain existing sizing.

The image is configured on the canonical ExperimentOS record:

```js
persona: {
  mode: 'image',
  image: '/assets/projects/experimentos/experimentos-persona.png',
},
```

For separated layers:

```js
persona: {
  mode: 'layers',
  layers: {
    body: '/assets/projects/experimentos/body.webp',
    core: '/assets/projects/experimentos/core.webp',
    shards: '/assets/projects/experimentos/shards.webp',
    energy: '/assets/projects/experimentos/energy.webp',
  },
},
```

All layer exports must share the same canvas size, proportions, and transparent
padding. Do not trim each layer independently. Optional layers may be omitted.
The canvas can be portrait or landscape: every image uses `object-fit: contain`
and the same bottom-right alignment. Body/core/shards/energy is the stacking
order. No placeholder text is rendered for ExperimentOS.
Projects without `persona` retain their existing illustration fallback.

## Validation

Run `npm run lint` and `npm run build`. With Vite running, run:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node scripts/check-project-persona.mjs
```

The browser check covers selection, idle, fixed bounds, pause/resume, live reduced
motion, seven responsive sizes, layer alignment and independent tracks, and rapid
switching. Its layer test modifies only the browser's development module instance;
it never writes canonical project data. Captures go to `/tmp/project-persona-*.png`.
The existing `scripts/check-projects.mjs` checks the surrounding interface.
Mobile keeps the existing smaller, subdued illustration behind the project list.

### Final artwork verification — 2026-10-04

Lint, production build, Project Persona and Projects browser suites passed.
Reviewed captures at 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024,
390×844 and 320×568. The PNG has 50.4% fully transparent pixels and transparent
corners; visual review found no baked checkerboard/background. The chest stays
visible and the artwork preserves its aspect ratio without obscuring roster text.
Entrance/reselection, exact 6px/4.6s idle, stable layout bounds, pointer pass-through,
pause/resume and reduced motion passed. Existing landing and retained identity
checks passed, covering all four easter eggs. Connected Browser was unavailable;
checks used local headless Chromium. Captures remain in `/tmp/project-persona-*.png`.

### Selection spacing refinement

The desktop roster now uses 46% of the viewport instead of 58%, and the shared
selection art anchor moves inward by 10vw. At 768–1199px the roster uses 52%
and the art moves inward by 5vw, preserving room for longer titles to wrap.
Short desktop viewports use a 54% roster. Mobile layout and artwork motion are
unchanged. Lint/build and both Projects browser suites passed after this change.

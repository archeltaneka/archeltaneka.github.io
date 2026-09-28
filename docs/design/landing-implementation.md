# Underwater landing menu

The approved underwater refinement is implemented on `feat/underwater-landing`, created from `master` with prior uncommitted work preserved. It builds on the illustrated landing approved on 2026-09-27 and the underwater direction approved on 2026-09-28. Only the landing is mounted; existing Hero, Navbar, Projects, Impact, Timeline, Skills, Footer, and factual portfolio data remain preserved.

## Reference translation

`docs/references/img/main_pause_menu.png` informs the underwater atmosphere and asymmetric menu composition. Earlier inspection of the 7.56-second `docs/references/video/main_pause_menu.mp4` covered opening and idle movement. The current implementation uses original CSS/SVG surface reflections, rays, and bubbles, with a bright turquoise top descending through cobalt to navy. The supplied transparent character remains closely beside the angled five-option menu. A decorative ARCHEL SUTANTO ribbon scrolls vertically at the far left over a white background that extends toward the character. Follow-up sizing doubles the ribbon type to 176/124/62px on desktop/tablet/mobile; ARCHEL is grey and SUTANTO black. The identity card is enlarged 1.5×, constrained to the viewport with portrait/name wrapping below 360px. No game artwork, logos, icons, audio, or type assets ship.

## Files and responsibilities

- `src/components/landing/LandingPage.jsx`: fixed bubble seeds, background and dive layers, decorative name ribbon, unchanged supplied character, identity badge with specialization, menu state, keyboard navigation, contacts, and motion toggle.
- `src/components/landing/landing.css`: scoped underwater composition, responsive layout, selection geometry, entrance and idle animation, pause, and reduced motion.
- `src/App.jsx`: mounts the landing and preserves console and window/tab-title easter eggs.
- `src/index.css`: global background and scrollbar styles; legacy section styles remain available.
- `docs/assets/archel_main.png`: archived prior illustration. `docs/assets/archel-main-source.png`: latest user-supplied source copied from dist before building. `docs/assets/archel-main-cutout.png`: built-in image-editor cleanup of its baked checkerboard.
- `public/assets/img/archel-main.webp` and `archel-main-small.webp`: updated transparent 1024px and 640px derivatives of the latest cutout, with cleanup prompt and source recorded in provenance sidecars. The surrounding water uses sampled hair blue (#002bb8) with a mobile-specific position.
- `scripts/check-landing.mjs`: landing interaction, motion, and viewport regression checks using externally installed Playwright.
- `.impeccable/surfaces/src-app-jsx.md`, `DESIGN.md`, and `.impeccable/design.json`: current direction contract, extracted tokens, and synchronized component/motion documentation.

## Interaction and motion

ABOUT is selected initially. Hover and focus select; click or Enter activates. Arrow Up/Down wrap through the five entries and move real DOM focus. Normal Tab navigation remains available. Arrow handling does not intercept other links or editable controls. Menu input cancels remaining menu-arrival choreography. About, Experience, Projects, and Skills announce coming-next status; their destination pages remain out of scope. The Resume menu anchor opens the existing PDF. Separate View PDF and Download controls are removed. Contact links retain real destinations.

The approximately 1.15-second dive entrance uses a wash, expanding ripples, and droplets alongside visible character/badge descent and staggered menu arrival. Content does not fade in, and decorative layers never intercept input. Character descent lasts 1150ms, badge descent 950ms, and menu arrival 900ms with 35ms stagger. Selection transitions take 190ms. Ripple and droplet tails can extend slightly beyond the main wash.

Idle motion includes an 8-second alternating character float, a 3.2-second selection pulse, 34-second name scroll, 13-second surface drift, 16-second ambient-light drift, 21-second ray drift, and twenty deterministically seeded bubbles rising on 12–28-second cycles. Bubble travel uses `max(120svh, 1100px)` so bubbles cross the stage. The character floats from −4px to 7px and rotates ±0.3 degrees. No continuous JavaScript animation loop is required.

Pause freezes every descendant and pseudo-element animation, including the entrance and selected backing. The splash wrapper becomes transparent while paused without removing its animation state, so resuming a completed entrance does not replay it. Reduced motion disables all landing animation and transitions, hides the entrance and motion toggle, and leaves static bubbles. Mobile retains the animated layers unless paused or reduced motion is requested.

All four easter eggs remain: hover/click/keyboard Chinese-name reveal; typing `australia`, `uk`/`london`, and `reset`/`home` changes the badge portrait; console output; and tab/window title changes. The supplied illustration stays separate from the original portrait and preloaded alternates.

## Responsive strategy

Desktop uses overlapping layers with character left, menu close beside it, identity above, and status/contact below right. The specialization bullets are inside the identity badge at every size. Short desktops compact navigation. At 900–1199px the badge narrows and menu shifts slightly right. At 600–899px the character crops left, menu occupies the right, and the name ribbon narrows. Below 600px, identity, menu, status, and contacts use document flow; the character crops right behind the menu and a softly masked blue scrim protects text. The ribbon narrows again, contact links wrap, and keyboard hints disappear. Short screens scroll rather than losing content.

## Reproducible verification

```sh
bun run lint
bun run build
bun run dev --host 127.0.0.1 --port 5173
PLAYWRIGHT_MODULE=/tmp/portfolio-browser/node_modules/playwright/index.mjs node scripts/check-landing.mjs --capture
git diff --check
```

`PORTFOLIO_URL` overrides the default development URL. Playwright is separate from runtime dependencies. The older `scripts/check-portfolio.mjs` targets the preserved, unmounted multi-section design.

The landing suite covers selection, wrapping focus, activation, pointer/touch interaction, early input, real PDF/contact URLs, all four easter eggs, pause/resume, and reduced motion. Viewport coverage is 1440×900, 1536×864, 1280×720, 1024×768, 900×600, 768×1024, 600×800, 390×844, 375×667, 320×568, 844×390, and 640×450. Menu targets must remain at least 44px high and within the viewport. Evidence lives under `.impeccable/review/landing/`.

For this refinement, the implementation agent reports passing lint/build, the twelve-viewport browser suite, all easter eggs, resume access, early input, pause, and reduced motion. The added pause/resume regression passed without replaying the completed splash. Standalone animation verification confirmed bubbles actually rise. These are implementation verification results; the independent finish-review verdict is recorded separately after documentation is reviewed. Detector palette/type advisories against the old documentation are advisory and addressed by this documentation refresh.

## Remaining scope

About, Experience, Projects, and Skills destinations intentionally remain unimplemented in this visual system. Existing factual qualifications and metric definitions stay intact in source. Browser automation targets Chromium; Safari/Firefox and real-device touch review remain additional coverage, not completed checks. This task does not deploy or publish remotely.

---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: ["src/components/landing/LandingPage.jsx","src/components/landing/landing.css","src/index.css"]
---

# Underwater landing menu

Mode: Experience. A professional portfolio landing for recruiters, hiring managers, and collaborators. Identity, specialization, resume, and contact are immediately available. Other destination sections are intentionally unmounted and preserved in source.

The user approved implementation of the underwater refinement on 2026-09-28, building on the illustrated-menu composition approved on 2026-09-27. The approved refinement replaces abstract character-paper geometry with a lighter turquoise water surface, reflections, rays, and darker water below. The follow-up asset replacement uses the blue-haired illustration supplied at `dist/assets/img/archel-main.png`, with its baked checkerboard removed and a matching royal-blue water field. The former Decision Journal composition does not govern this landing.

## Direction contract

THESIS: A full-viewport underwater navigation scene with the oversized original character closely beside an angled five-option menu.

OWN-WORLD: Bright turquoise surface reflections descend through cobalt to deep navy. Cyan labels and a white selected wedge retain navigation contrast. Original CSS/SVG water, rays, and bubbles provide atmosphere. Self-hosted Antonio display and upright Inter support; no copied game assets.

STORY: Identify Archel Taneka as a Product Data Scientist. The identity badge contains Experimentation, Machine Learning, Product Analytics, and AI bullets. Explore menu selection; Resume alone opens the real PDF, while Email, GitHub, and LinkedIn remain live. About, Experience, Projects, and Skills announce coming-next destinations through a polite status region. Separate View PDF and Download links are removed.

FIRST VIEWPORT: White angular background to the left of the character, bright surface light above the water, dark blue below; a doubled-size vertical scrolling name at far left with grey ARCHEL and black SUTANTO; pure-white identity badge with a black border, enlarged 1.5× and shifted left over the carousel; character and menu close together; contacts and keyboard/motion hints below right. On mobile, the character crops to the right behind a readable left menu while identity, status, and contacts use document flow.

FORM: A roughly 1.15-second nonblocking dive wash, ripples, and droplets accompany character/badge descent and staggered menu arrival. Content stays visible with no entrance fade. Menu input cancels its remaining arrival choreography. Idle motion includes an 8-second character float, rising bubbles, 3.2-second selected-wedge pulse, 34-second vertical name scroll, and independent surface/light/ray drift. Pause stops every descendant and pseudo-element animation; hiding the splash with opacity preserves state and avoids replay after completion when motion resumes. Reduced motion disables animation/transitions and entrance, leaves sparse static bubbles, and hides the unnecessary pause control.

FINISH: Persist the shipped design in DESIGN.md and its synchronized sidecar, preserve raster provenance, and record the independent finish review separately. This contract does not itself claim a review verdict.

## Reference evidence

`docs/references/img/main_pause_menu.png` supplies composition and underwater atmosphere reference. Earlier inspection of `docs/references/video/main_pause_menu.mp4` covered the 7.56-second opening/idle clip; exact easing is not inferred as fact. Reference media are never shipped. The latest supplied source is preserved unchanged in `docs/assets/archel-main-source.png`; the transparent cleanup is `docs/assets/archel-main-cutout.png`. Shipping `public/assets/img/archel-main.webp` and `archel-main-small.webp` derive from this cutout with updated provenance. The prior master `docs/assets/archel_main.png` remains archived. Hair color sampled at #002bb8 anchors the lower water gradient.

## Preservation

All four easter eggs remain: Chinese-name reveal, keyboard portrait changes, console output, and tab/window title changes. The badge uses the original portrait and alternates; the supplied illustration stays dominant. Existing section components and factual portfolio data remain unchanged. Refinement branch: `feat/underwater-landing`, created from `master` with the prior uncommitted work preserved.

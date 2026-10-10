# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers evaluating Archel Taneka Sutanto for data science roles.

## Product Purpose

Within 20–30 seconds, visitors should understand who Archel is, his specialization, his strongest professional outcomes, and how to access projects and his resume.

## Positioning

Product Data Scientist specializing in experimentation, causal inference, and product machine learning. The user confirmed this positioning on 2026-09-25. Professional outcomes at tiket.com provide the leading evidence.

## Capabilities and Constraints

- Preserve React, Vite, Tailwind CSS, and Framer Motion in the existing portfolio.
- Preserve professional impact, public projects, experience, education, skills, resume access, and contact links.
- Preserve all four easter eggs: Chinese name reveal, keyboard-triggered profile photo changes, console output, and window/tab title changes.
- Use the Persona-inspired interaction model primarily for navigation and presentation; readability and usability take priority.
- Reference screenshots are analysis material only. Do not recreate copyrighted artwork, logos, characters, icons, or game assets.

## Evidence on Hand

- `src/components/Impact.jsx`: existing professional outcome claims, including incremental GBV, annual revenue impact, and revenue uplift. Keep these metric types distinct; do not invent or aggregate claims.
- `src/components/Projects.jsx`: project descriptions, evaluation results, repository links, and demos.
- `src/components/Timeline.jsx`: professional and education history.
- `public/assets/resume/Resume - Archel Sutanto.pdf`: existing resume.
- `public/assets/img/`: existing profile and project imagery.
- `docs/references/img/`: 14 UI reference screenshots supplied by the user.

## Product Principles

- Make professional evidence and next actions immediately discoverable.
- Keep exploration optional; critical content must not depend on hidden interactions.
- Preserve factual qualifications and metric definitions.
- Translate reference principles into an original identity.

## Confirmed landing update — 2026-09-29

The user requested a compact “Total measured impact” card showing $8.3M / IDR 149B+. Keep its GBV/revenue qualifier; this is not a pure revenue claim. The old identity card, specializations, and two name/photo easter eggs are reserved for the future About section in AboutIdentity.jsx. Console/title easter eggs remain active. Remove custom keyboard navigation while retaining native accessible controls.

## Confirmed landing update — 2026-10-10

The user replaced the landing $8.3M headline with “Archel Taneka Sutanto” and removed the scrolling name carousel. The landing now presents the name as one visible heading on desktop and compact layouts. This supersedes the landing financial-card requirement above; professional outcome claims elsewhere are preserved.

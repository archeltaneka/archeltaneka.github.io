# Experience — work and education

Updated 2026-09-30 on the existing branch. Home and the initial dive are unchanged.

## Data and interaction

`experienceEntries` in `src/data/portfolio.js` normalizes the existing work and education records. Five entries share the same selector, detail view and reflection state: tiket.com, Sayurbox, Monash, Nottingham and Binus. Existing titles/dates remain canonical. Education indicators show degrees, documented completion and Nottingham's First-class Honours; no GPA is invented. Monetary aggregates remain omitted.

Hover/focus previews an entry; leaving restores the committed entry. Click, tap or Enter commits; Up/Down explores all five entries. Escape/Main Menu returns without replaying the dive. Hash navigation and browser history remain supported. Reduced motion removes entrance and idle animation and uses a short reflection crossfade.

## Visual interpretation

Reference-only files `docs/references/experience/status_item.png` and `status_screen.png` were inspected, never shipped. The follow-up strengthens their composition through compact angular rows with original organization logos, identity metadata and factual right-hand indicators; black inactive rows, a white selected row, cyan accents and a cyan-to-royal-blue background. Existing Antonio/Inter fonts remain. Tablet/mobile reflow instead of shrinking desktop. Details and outcomes precede artwork on mobile.

## Reflection implementation

The earlier disabled mirror implementation is superseded. `public/assets/img/experience/mirror-glass.svg` traces the actual glass in the original character's 1132×1389 coordinate system. Its lower edge follows the overlapping fingers. A shared proportional canvas aligns the photograph with the existing illustrated frame and hand. This leaves the master artwork unchanged, without stretching the incompatible separate front-facing frame.

`ExperienceArtwork` renders preloaded local images inside that mask with configurable object-position. The photograph uses object-fit: cover, restrained color treatment, a 280ms opacity/scale transition and a 300ms cyan wash. Only the reflection changes; the original illustrated frame and fingers remain visible outside the mask. Reduced motion uses opacity only. Optional separately aligned frame/glare/foreground support remains in the component.

Tiket, Monash, Nottingham and Binus use their real local photographs. `sayurbox.webp` is still absent: its existing logo is used with contain sizing and a visible “company identity” caption, not represented as a photograph. Replace reflectionImage and remove reflectionKind: 'logo' when the photo is supplied.

The supplied `mirror-mask.png` masks the whole ornament rather than the glass, and the separate `mirror-frame.png` has different perspective. Neither is shipped. The new code-native SVG mask replaces the incompatible mask, preserving the actual frame/fingers already in `archel-stats.webp`.

## Review and verification

Independent Impeccable screenshot review found the new masking convincing on desktop/mobile, with no visible frame or finger bleed, and found the reference hierarchy substantially closer. Its mobile Operations indicator spacing finding was addressed by reducing mobile indicator type. Earlier fixes preserved: uninterrupted mobile metadata contrast, outcomes before artwork, explicit Preview labels, pause-safe details and non-scrolling overflow clipping.

Run `bun run lint`, `bun run build`, `git diff --check` and `PLAYWRIGHT_MODULE=/tmp/portfolio-browser/node_modules/playwright/index.mjs node scripts/check-experience.mjs`. Browser coverage includes five entries, local education-image loading, hover reversal, commitment, keyboard/history, motion pause, actual touch input, reduced motion and seven viewport sizes. Captures live under `.impeccable/review/experience/`.

Remaining content limitation: Sayurbox photograph missing; GPA not supplied. No other portfolio section is implemented by this change.

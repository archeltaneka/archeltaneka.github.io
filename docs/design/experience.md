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

## Status-menu shell — 2026-10-01

This supersedes the earlier water-background and hover-preview description. The selected reference is `docs/references/experience/status_screen.png`. `experience-shell.css` supplies an edge-to-edge white field, restrained cyan upper-left fragments, a large abstract lavender polygon, translucent medium-blue overlap, and an uneven cobalt lower field. Background height follows the viewport rather than expanded record content. Existing Antonio and Inter fonts and organization logos are reused.

The five canonical records form one compact black menu, with angular logo wedges, category ribbons and a taller white selection displaced horizontally by 12px (9px on small screens). Rows contain identity, role and dates only. Details appear after the complete menu, directly over the cobalt field. Click/tap/Enter toggles details; hover and focus do not select. No custom arrow-key or Escape shortcuts were introduced. Initial details remain closed, retaining the existing interaction contract.

The original `experience.css`, `ExperienceArtwork.jsx`, `experience-art.js`, assets, mirror mask and reflection switching were untouched by this shell change. Their existing desktop positioning and mobile flow are retained. The background occupies a separate lower stacking context, so it cannot cover the artwork. Mobile retains compact angular rows and selected information before the existing artwork. Motion-off and reduced-motion handling remain available.

### Underwater background follow-up — 2026-10-01

The user replaced the flat white/cobalt background requirement with Landing's underwater environment. Experience now renders the same exported `UnderwaterBackground`: pale turquoise surface, deeper blue water, moving surface reflections, drifting rays/light and ten rising bubbles. The angular selector and title ribbon remain. Shared motion durations, pause/visibility controls and reduced-motion rules apply unchanged. The character/mirror implementation and placement are unchanged. Static shell background polygons were removed rather than covering the water animation.

### Updated illustration — 2026-10-02

The user supplied a new 1536×1024 character canvas. Its WebP preserves native dimensions and transparency; intrinsic image dimensions and the mirror canvas now match it. The reflection viewport and SVG glass trace follow the new glass contour, excluding the illustrated frame, gems and fingers. Selection logic, photographs, underwater background and external artwork positioning remain unchanged. The wider source naturally renders shorter at the existing width.

The supplied standalone frame (1261×1247) and mask (1024×1536, covering the ornament silhouette) do not share the character canvas or glass boundary. The implementation retains the frame already drawn into the updated illustration and uses a canvas-aligned visible-glass trace rather than stretching those separate assets over the hand.

### Career status rows and corner composition — 2026-10-02

The follow-up moves the menu inward and enlarges the desktop illustration to 68vw, anchored to the page's bottom-right with intentional right-edge cropping. This changes only its outer placement; the shared character/mirror canvas and reflection alignment remain intact.

Each desktop row reads logo, organization, identity-colored slash, role/degree, cyan achievement underline, then yellow year underline. These are decorative status bars, not numerical progress indicators. Highlights use recorded payment conversion, weekly forecasting, Monash completion, First Class Honours and BINUS teaching-assistant work. No GPA or combined monetary claim is invented. Canonical dates remain in expanded details; the rows derive year ranges from those dates.

Expanded content now follows its clicked button inside the same list item, superseding the previous after-menu layout. Mobile wraps the status information into two readable rows, retains a contained diagonal separator, and displays the larger artwork after the list. Click/tap collapse, reflection switching, pause and reduced motion are retained.

### Full illustration and viewport fit — 2026-10-02

The desktop composition now contains the complete illustration within the right-side viewport instead of enlarging it beyond the screen edge. At widths above 900px and heights of at least 650px, the page uses one viewport, compact selection rows, and four-column metrics inside inline details. The selected row already supplies the organization/title, so duplicate headings are visually omitted in the compact detail panel. A bounded, scrollable detail region protects access if content or text sizing exceeds the available height. Small/mobile screens retain natural scrolling to preserve readable text and all records.

The compact desktop selector also has an overflow fallback within its allocated space, keeping the footer and final record separate at short heights. The title band starts to the right of the row content. Standard desktop layouts fit without page scrolling; mobile/short-screen content remains reachable rather than being clipped.

### Larger artwork with softened cutoff — 2026-10-02

The user requested a 1.5× size increase and a less obvious half-body cut. Desktop artwork now uses 67.5vw (1.5× the preceding 45vw), retaining its responsive height-derived limit at the same ratio and resting on the lower edge. Mobile artwork likewise grows from 100% to 150% of its available width with intentional side cropping. A CSS alpha fade on only the character image softens its bottom 22% into the underwater environment. The source artwork, mirror mask and reflection layers remain unchanged and sharp. Desktop viewport sizing and inline selection behavior are retained.

### Strip containment and white-grey backdrop — 2026-10-02

Tightened role/achievement spacing and reserved at least 6% of desktop rows (8% on mobile) before the diagonal right edge. Stat underlines are slightly shorter to account for their skew. Browser regression coverage checks each yellow underline against the strip's conservative 95% boundary at all seven viewport sizes.

Added independent white-grey clipped geometry behind the character: a white angular field, muted grey abstract shadow, diagonal band and fine white slash. The lower field fades into the existing underwater environment. This backdrop does not modify the character image, mirror or reflection behavior. The reference file was present locally despite the attachment-read error.

### Confirmed row highlights — 2026-10-02

The user explicitly set tiket.com's highlight to `$8.3M (IDR 149B+)` / `Total measured impact`, Nottingham to `First class honours`, and BINUS to `GPA 3.74`. This supplies the previously missing GPA. Sayurbox and Monash highlights remain unchanged. The tiket.com total retains the same mixed-outcome meaning as Landing (incremental GBV and revenue outcomes); it is not labeled total revenue. Detailed metric definitions remain unchanged.

## Scene motion — 2026-10-02

This update preserves both existing compositions and the click-to-expand records on `feat/experience-click-details`. The 5.789s supplied `status_screen_animation.mp4` was inspected at 8fps. It shows rapid Stats selection changes, followed by the list leaving before the character and large diagonal geometry. It does not show the forward Main-to-Stats entrance; that sequence interprets the same principles with portfolio assets. No reference assets ship.

`App.jsx` now keeps the existing screens mounted inside one scene. `components/scene/useSceneNavigation.js` owns explicit selection, crossing, entrance, idle, interaction, exit and return states; `scene-motion.js` owns Framer Motion's DOM timeline and its constants. The old route fade/slide was removed. Inline animation styles are restored on cleanup. Only milestones update React; frame-by-frame movement stays in the animation engine.

Base choreography (before the navigation pace multiplier) lasts 860ms forward, with selection at 0ms, evacuation at 100ms, diagonal reveal at 320ms, artwork at 380ms, title at 430ms, rows at 470ms plus 35ms stagger, then labels at 660ms. The independently authored return lasts 800ms: details, rows, character, geometry, then Main background, character and menu. Both screens coexist during the crossing. Below 900px, travel distance drops to 36% and secondary decorative loops stop. The existing mobile layout remains intact.

Images and glass mask decode ahead of the first crossing. Hash history commits at the incoming reveal; repeated clicks are ignored, while browser Back/Forward during motion queues the latest destination. Both scenes are inert during navigation, and focus moves to the Stats heading or back to the Main Experience button after completion. Full reload still plays the existing page-entry dive; route navigation never replays it. Reduced motion and the source screen's pause control use a 120ms opacity handoff without spatial sweeps. Hiding the document or enabling reduced motion during a crossing completes it and cleans up the timeline.

Hover movement and keyboard focus highlight the row only. Mirror reflections follow the clicked selection; click/Enter/Space retains the existing disclosure behavior. Layout movement under a stationary pointer does not trigger a different preview. Reflection changes use the existing exact SVG mask, independent image positions, a directional reveal, and a short glare pass. The frame is baked into the supplied character image, so it remains untouched and aligned. There is no independently moving mirror frame or pointer parallax. Stats idle uses 4.7/6.2/7.8/9.1-second asymmetric layers with 1–3px drift and a 1.015 reflection scale; hidden screens and motion pause stop ambient work.

### Tuning

- `SCENE_MOTION.forward` and `.back` in `src/components/scene/scene-motion.js`: phase positions and total duration, in seconds. Layer travel distances/easing live in `playScene` in the same file.
- `SCENE_MOTION.navigationScale`: 1.5× normal navigation duration (1.29 seconds forward, 1.20 seconds back), applied equally to tracks and phase milestones. Reduced motion stays at 120ms.
- `SCENE_MOTION.stagger`, `.reflection`, `.detail`, `.detailDelay`, `.interaction`, `.reduced`: row spacing, reflection/detail response, interaction-state window, and reduced-motion duration.
- `src/components/scene/scene-motion.css`: Stats idle periods/amplitudes and reflection zoom. Keep the mirror mask/frame alignment out of motion tuning.
- `src/components/landing/landing-motion.js`: retained Main idle and page-entry timing.

Run `PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node scripts/verify-motion.mjs` for the five functional suites. The runner keeps Vite and the browser checks in one lifetime. Add `check-scene-visual` for desktop/mobile recordings, interruption checks and the retained About name/photo harness. Recordings and screenshots are under `.impeccable/review/scene-motion/`.

### Transition performance — 2026-10-02

Mirror photographs use separate proportional derivatives capped at 960px, shared by preload and rendering; canonical full-size originals remain available. Scene transitions retain their existing choreography but use native animation tracks to avoid late style restoration and an empty native clock instead of a JavaScript progress track. Selection anticipation is entirely interpolated; no phase-specific translate/opacity override snaps off at the phase boundary.

# About / Player Profile — 2026-10-07

Implemented only About on `feat/persona-inspired-portfolio-improvements`. The current Home, Experience, Projects and Skills code and browser captures supplied the design authority; archived Decision Journal instructions do not describe the running site.

## Files and architecture

Created:

- `src/components/about/AboutPage.jsx`: screen, local identity component, semantic content groups, photo commands, visibility handling and controls.
- `src/components/about/about.css`: scoped original composition and responsive rules.
- `src/components/about/about-motion.js`: cancellable native animation tracks using the existing scene lifecycle and easing.
- `src/data/about.js`: editable identity, statement, principles, Current Arc and photo metadata.
- `public/assets/img/about/profile.webp`, `profile-au.webp`, `profile-uk.webp`: proportional 900×1200 derivatives of existing original photographs.
- `scripts/check-about.mjs`: browser regression coverage and screenshot capture.
- This implementation report.

Modified: `src/App.jsx`, `src/components/landing/LandingPage.jsx`, `src/components/scene/useSceneNavigation.js`, `src/components/scene/scene-motion.js`. These changes connect About to the menu, hash/history, route focus, transition dispatch and session-lifetime About pause state. Other screen compositions are unchanged.

## Information architecture

1. Archel Taneka Sutanto; Product Data Scientist; Melbourne, Australia.
2. Three-sentence statement connecting user behaviour, analytics, experimentation, machine learning and applied AI; compact 3+ years context.
3. BUILD: data products, ML systems and applied AI. MEASURE: experiments, metrics and causal thinking. UNDERSTAND: users, product behaviour and business context.
4. CURRENT ARC: Master of Data Science / Monash University; exploring agentic AI and experimentation; building ExperimentOS AI.
5. One small personal detail: listening to music, supported by the existing portfolio console copy.

The degree wording follows the explicit About brief. Canonical education data is unchanged; About makes no claim that the degree remains in progress. Monash location/school and ExperimentOS name reuse canonical data.

## Composition and visual grammar

An original white identity plane breaks diagonally into blue water. Three staggered name lines make SUTANTO dominant; the original photograph cuts across the right boundary with a separate angled caption. The principle words step diagonally down the left, the statement occupies the central blue region, and Current Arc anchors the lower right. There are no cards, ratings, progress bars or repeated career/project lists.

The design reuses Antonio and Inter, cobalt/royal blue, cyan, near-black, white, native underwater layers, hard-edged geometry and the existing motion easing. It extends the graphic vocabulary without reproducing another game menu or borrowing the sibling screens' selector/list layouts.

## Motion and navigation

- Entry: 800ms maximum authored track. Menu/character leave in opposing directions; blue and white planes sweep; ARCHEL slides with a small overshoot; photo arrives from the other side; TANEKA and SUTANTO lock in; profession, statement and principles reveal; Current Arc settles last.
- Return: approximately 780ms, reversing the identity/photo directions and restoring the menu. Escape, visible controls and touch all use the shared coordinator; no reload or dive replay.
- Direct `#about` loads show content immediately and skip the initial dive.
- Idle: existing underwater light/rays/bubbles plus one small 9-second fragment drift. Text and photo remain stable. Pausing or hiding the tab stops CSS animation; unmounting removes About work and keyboard listeners.
- Reduced motion: 120ms opacity-only route crossing, no overshoot/sweeps/idle, motion toggle hidden. Mid-transition preference/visibility changes retain coordinator cancellation behavior.

## Photo and easter eggs

The original photographs remain intact. Sized WebP derivatives avoid decoding 12–20MP originals for the profile panel. They retain the same aspect ratio; CSS crops the frame deliberately. All three are preloaded when About mounts. `australia`, `uk`/`london`, and `reset`/`home` switch the photo; modified keys, editable targets, composition and key repeat are ignored. The photo resets on leaving About because the screen unmounts.

Pointer movement drives a Chinese-name reveal mask. The name button also supports Enter, Space and touch as a full-name toggle with an announced state. Existing console and tab/window title easter eggs remain unchanged.

## Responsive and accessibility

Desktop uses viewport-height composition with display type bounded by both width and height. Tablet uses document flow, a shared identity/photo opening and readable content columns; decoration is constrained to the photo region. Mobile uses an intentional single reading sequence, a shorter right-offset photo, preserved diagonal principle alignment and an early Menu control. Short/zoomed screens scroll normally.

Real text, one named h1, semantic sections and definition lists, descriptive photo alt text, decorative aria-hidden elements, 44px controls, native buttons and visible focus are retained. Route focus moves to the About heading and returns to the About menu item. No essential content depends on hover or secret commands.

## Impeccable critique and refinement

Two isolated assessments reviewed the first implementation: design review and technical/detector evidence. Design verdict: an original Player Profile in the same visual system, rather than a generic decorated portfolio page. Initial heuristic assessment: 16/24, with error-prevention/recovery/help and efficiency categories marked not applicable. The mechanical detector returned zero findings; screenshot review still identified real defects.

The refinement resolved desktop identity/BUILD collisions, tablet cyan/text contrast interference, and the 1024px statement/photo overlap. It enlarged supporting copy, shortened the mobile image, added early mobile return access, matched Main menu/Motion ordering, and preserved pause state across About revisits. The final score was not reassessed; the initial score must not be presented as a final rating.

Questions skipped: the user already requested a full refinement pass within the supplied scope; no further design decision or permission was needed. No injected browser detector overlay was claimed. In-app browser discovery returned no available browser; local Chromium provided visual and interaction evidence instead.

## Validation

Lint, production build and whitespace checks passed. Browser coverage includes 1920×1080, 1440×900, 1280×800, 1024×768, 768×1024, 390×844, 320×568 and 844×390. Checks cover content-region separation and horizontal overflow, direct About load, route entry/exit, history, focus restoration, unmounting, all four easter eggs, pause persistence, reduced motion and touch. Entry captures sample 140/320/460/650ms. Shared navigation smoke coverage exercises Experience, Projects and Skills return paths.

Captures are saved under `/tmp/about-review`. Run with `PLAYWRIGHT_MODULE`, optional `CHROMIUM_PATH`, `PORTFOLIO_URL` and `ABOUT_CAPTURE_DIR` for the local environment. No cross-browser or assistive-technology-device testing is claimed.

Impeccable reported pre-existing DESIGN.md/design.json drift. Neither file was regenerated as part of About.

## Professional Achievements update

The central biography is replaced with the three supplied professional achievements and their complete Problem and Method descriptions. The latest revision removes all disclosures and nested scrolling. An asymmetric desktop composition gives achievements the full-height central column, identity/principles the left, and photo/Current Arc the right. The heading is “Professional achievements.” Each metric keeps its original meaning: incremental GBV with CVR lift, annual revenue impact, or revenue uplift.

All achievement text is visible without interaction and fits the tested desktop viewports. Tablet/mobile use normal document flow rather than shrinking or hiding the copy. The underwater overlay is darker behind the upper achievement text for contrast. The original photo, name reveal, navigation and motion controls are retained. Browser checks assert all Problem/Method descriptions are visible without clicks and the central section has no inner scrolling.

## Compact achievements refinement

Removed the Problem paragraphs and shortened each method to its core technique. Large dollar outcomes lead each record, with smaller IDR equivalents and preserved metric definitions. Payment's 4.8% CVR lift remains prominent. No disclosures or inner scrolling were reintroduced.

## Name mask and Target Roles update

The Mandarin layer now follows the three-line name composition and inherits its responsive sizes. A complementary radial mask removes English letters inside the cursor reveal, while clipping shows the Mandarin layer in the same area. No opaque rectangular backing is needed. Keyboard/touch full reveal hides the English layer entirely; leaving hover restores the unmasked original name when the toggle is off.

Current Arc is replaced with Target Roles: Product Data Scientist, Data Scientist, Data Analyst, and Machine Learning Engineering. Role copy is centralized in `about.targetRoles`. The existing personal detail remains below it. Browser checks include role count/heading, the English mask, full-reveal opacity, and Mandarin line count alongside the existing responsive and interaction checks.

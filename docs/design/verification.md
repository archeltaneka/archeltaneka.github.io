# Portfolio verification

## Resume pointer fix — 2026-09-28

The footer's transparent contact row intercepted Resume clicks at 1536×864 with normal motion enabled. Reduced motion hid the motion control and changed the footer height, so earlier reduced-motion viewport checks missed it. Footer wrappers now pass through pointer input; their links and buttons remain interactive. A regression test first reproduced the blocked pointer target, then passed after the fix, using a real mouse click and confirming a new tab with a successful PDF response. The complete 12-viewport suite, motion controls, all four easter eggs, lint, and build pass.

## White left field and larger identity — 2026-09-28

Added the white left background, doubled name carousel type (176/124/62px) with grey ARCHEL and black SUTANTO, and enlarged identity card dimensions and typography by 1.5×. Small screens constrain its width and wrap below 360px. Lint/build and all 12 viewport/easter-egg checks passed. Additional browser checks verified exact carousel sizes/colors, card containment, and no card/menu overlap on desktop; desktop, compact desktop, mobile, and narrow captures were visually inspected. Strengthened mobile menu shading to preserve contrast over the white illustration.

## Follow-up illustration replacement — 2026-09-28

Replaced the landing WebP derivatives using the new `dist/assets/img/archel-main.png` source, preserved outside build output. Removed its baked checkerboard with the built-in image editor; prompt and provenance are recorded in the asset sidecars. Matched surrounding water to sampled hair blue (#002bb8). Lint/build and the complete 12-viewport landing suite passed, including all four easter eggs and motion controls. Desktop, mobile, and tablet captures were visually checked with the new asset. Earlier no-raster-change statements below describe the preceding redesign only.

## Underwater landing — 2026-09-28

Current mounted surface: `src/components/landing/LandingPage.jsx` and `landing.css` on `feat/underwater-landing`. The Decision Journal verification below is historical and applies to the preserved, unmounted section components.

Run `bun run lint`, `bun run build`, and the current landing browser suite:

```sh
PLAYWRIGHT_MODULE=/tmp/portfolio-browser/node_modules/playwright/index.mjs node scripts/check-landing.mjs --capture
```

The temporary Playwright installation is external to the project; use another installed module via `PLAYWRIGHT_MODULE` if needed. `PORTFOLIO_URL` defaults to `http://127.0.0.1:5173`.

Verified after the underwater redesign:

- Lint, production build, and `git diff --check` passed.
- Landing browser suite passed at 1440×900, 1536×864, 1280×720, 1024×768, 900×600, 768×1024, 600×800, 390×844, 375×667, 320×568, 844×390, and 640×450. No horizontal document overflow or browser exceptions; menu controls fit with at least 44px target height.
- All four easter eggs passed: hover/tap Chinese-name reveal, keyboard photo sequences, console output, and blur/focus title change.
- Native Resume menu link and PDF response passed; no duplicate PDF controls remain. Other four menu destinations retain their existing coming-next status behavior.
- Keyboard selection, early entrance interaction, contacts, touch controls, reduced motion, and pause passed. A regression check confirms resuming idle motion does not replay the completed splash.
- Additional browser motion inspection confirmed bubbles move upward and pausing stops every running animation. Entrance snapshots at 300ms, 700ms, and 1800ms are in `.impeccable/review/landing/`, alongside desktop, mobile, tablet, narrow, and landscape captures.
- Connected browser unavailable; verification used standalone Chromium/Playwright.
- No image assets were regenerated or modified. Existing transparent WebP derivatives of the supplied illustration are retained.
- Independent finish review found no material visual/code issues across all nine supplied captures. Its sole documentation finding was corrected; the reviewer scored that persistence fix resolved and returned `ship`.

Run `bun install --frozen-lockfile`, `bun run lint`, and `bun run build`.

## Browser checks

Start `bun run dev --host 127.0.0.1`. The browser test is intentionally separate from runtime dependencies. Install Playwright into a temporary directory if it is not already available:

```sh
bun add --cwd /tmp/portfolio-browser playwright
node /tmp/portfolio-browser/node_modules/playwright/cli.js install chromium
PLAYWRIGHT_MODULE=/tmp/portfolio-browser/node_modules/playwright/index.mjs node scripts/check-portfolio.mjs --capture
```

`PORTFOLIO_URL` optionally overrides the default local URL. Omit `--capture` for interaction-only checks. The script checks current-section navigation, project disclosure and live-demo access, PDF response, menu Escape/focus and close-on-navigation, reduced-motion scroll behavior, console/title/name/photo easter eggs, browser exceptions, and document overflow across 320–1536px. Captures and results are written to `.impeccable/review/` (gitignored).

Visually inspect the captured desktop, mobile, and comp-size opening view against the approved mockup. A transformed photo can extend beyond its frame's bounding rectangle while remaining correctly clipped; use document overflow and the actual capture to distinguish that from horizontal page overflow.

## Tool limitations

Impeccable's build-phase plate decoder accepts PNG but rejected the repository's original WebP photo. The original photo remains WebP as required by project conventions. Visual review and the independent comp-diff remain the fidelity evidence; do not claim that the build-phase gate passed. Coarse grid region matching can label moved text as missing; assess the accompanying crops and actual rendered UI.

No generated portrait or mockup pixels are shipped. Existing images have provenance sidecars. The detector reported only the supporting Inter font as overused; it was retained to match the approved readable body typography, with Antonio defining the display voice.

## Final result — 2026-09-25

- `bun run lint`, `bun run build`, and `git diff --check`: passed.
- Saved browser suite: passed, no page exceptions, no horizontal document overflow at 1536, 1440, 1280, 1024, 900, 899, 768, 599, 390, 375, and 320px.
- All four easter eggs, mobile menu dismissal/focus, project disclosure, resume PDF, active navigation including Contact at the document bottom, shared indicator alignment, reduced motion, and 200% equivalent reflow: passed.
- Fresh finish review: SHIP after the reviewer scored the 320px overflow and shared navigation indicator fixes resolved. The final Contact edge-case correction was also reviewed and its regression test passes.
- Original image provenance scan: 17 WebP assets, zero missing sidecars.
- `DESIGN.md` and `.impeccable/design.json`: created from the implementation and validated.

The automated comp-diff reported 65% similarity before the final functional fixes. The independent visual review judged the selected composition faithfully represented and the grid-based score overly sensitive to moved text. The build is a responsive implementation of the approved composition, not a claim of pixel-identical reproduction.

## Pool-dive entrance — 2026-09-29

Replaced thin ripples with an original SVG water sheet, uneven cyan foam, streaks, and 22 bubbles. The sequence clears at 1200ms, replays on load/reload, and hides on menu input or keyboard focus. No reference pixels or new dependencies are shipped.

Lint, production build, and the existing 12-viewport landing suite passed. Additional desktop/mobile checks verified two reloads each, completed foreground opacity, and reduced-motion removal. Timed captures at 0/350/700/1250ms were inspected on desktop and mobile. Browser connection was unavailable; local headless Chromium was used. Console/title easter eggs passed; name/photo easter eggs remain unchanged in the previously unmounted AboutIdentity component. The design detector reported advisory palette/type-ramp findings; the new water colors are documented in DESIGN.md and its sidecar.

## Page-entry water transition — 2026-09-30

Implemented on `feat/underwater-landing`, retaining the existing landing composition and content.

### Reference and construction

Inspected `docs/references/img/main_pause_menu_transition.png` and the opening two seconds of `docs/references/video/main_pause_menu.mp4` at eight sampled frames per second. The reference crosses its water surface rapidly, approximately half a second: large cobalt regions, uneven cyan boundaries, elongated pale foam, and detached droplets obscure the scene before the menu settles. These principles informed the choreography; no reference image, video, tracing, or extracted asset is shipped.

`PageLoadDiveTransition` uses three overlapping original SVG water sheets, pale foam ribbons, twelve original droplet paths, an opaque submerged layer, and an irregular expanding SVG mask. Translation, rotation, unequal X/Y scaling, opposing directions and staggered velocities create the camera-crossing effect. There is no canvas, raster animation, new dependency, progress indicator, asset-readiness gate, or per-frame JavaScript loop. Local water colors do not change the established landing tokens.

### Timeline

| Time | Behavior |
| --- | --- |
| 0ms | Near-black blue viewport; application mounts underneath. |
| 0–200ms | First cyan water enters; opposing sheet follows. |
| 150–650ms | Water expands, foam crosses the camera, droplets grow and exit. |
| 643–800ms | Fully covered deep-blue submerged beat. |
| 800ms | Existing landing animations resume from their paused first frame; the uneven opening begins expanding. |
| 800–1260ms | Water clears past the viewport edges while landing arrivals continue. |
| 1260ms | Overlay unmounts, timers/listeners are removed. |

App owns the monotonic `dive → landing → complete` state above menu state. Existing character, impact-card, menu, and ambient animation definitions remain intact. The earlier landing-local foreground splash was removed to avoid two competing water effects. The handoff and removal use two cleanup-safe deadlines started by a single requestAnimationFrame callback, aligning them with the first rendered frame. They do not depend on animation events. React StrictMode effect cleanup cancels that callback and clears both timers.

A full reload replays the entry. Menu interactions never remount the overlay. There is no localStorage/sessionStorage flag. The current site has placeholder destination buttons, not a client router; the state is positioned above those controls and should remain above any future router.

The overlay is decorative, aria-hidden, and ignores pointer hit-testing. Pointer-down, key-down, or keyboard focus dismisses it immediately without cancelling the user's event. Hiding the document also completes it, avoiding a stale intro on return. Reduced motion skips mounting entirely and disables landing animation through its existing media rule; changing the preference during entry completes it immediately.

### Responsive treatment

Fixed positioning covers the viewport independently of the landing's minimum height or scroll position. Oversized SVG extents and mask bounds prevent edge gaps. Portrait screens use a wider cropped water field, earlier opposing surge, and smaller droplets. Inspection covered 1440×900, 2560×1080, 768×1024, 390×844, and 844×390 at eight times from 0–1250ms.

### Impeccable critique and refinement

Two independent assessments reviewed design and implementation. Design review found a coherent water crossing with convincing depth, cyan/cobalt contrast, a useful quiet submerged beat, and responsive coverage. It identified a slow initial entrance and overly repeated scalloped boundaries. Refinements moved the initial sheets closer to the viewport, accelerated the initial surge, added an uneven curl and longer sweep to the contour, narrowed the far cyan edge, and removed the near sheet's continuous outline. No extra particles were added.

The mechanical detector returned 39 advisories and no non-advisory findings. Three transition findings concern deliberate local droplet/foam colors (`#51dbe8`, `#c1faff`, `#bafaff`); the remainder concern existing console/landing palette and type values. Existing page styling was preserved. Final contact sheets confirmed earlier visible water and less repetitive contours, with full submerged coverage at all five aspect ratios.

Questions skipped: the user explicitly requested critique followed by refinement and supplied the motion direction and preservation constraints.

### Verification

- `bun run lint`, `bun run build`, and `git diff --check` passed.
- `scripts/check-page-load-dive.mjs` passed against development and production: initial entry, paused landing, overlapping handoff, overlay removal, no menu replay, full-refresh replay, keyboard dismissal, initial reduced motion, and preference changes.
- `scripts/check-landing.mjs` passed its existing 12-viewport suite: menu selection, early input, native keyboard access, real resume popup/PDF retrieval, contacts, touch, pause/resume, reduced motion, and console/title easter eggs. Its old `.dive-wash` assertion now checks that the entry overlay is absent after resume.
- An isolated development browser harness mounted the unchanged `AboutIdentity` component and verified Chinese-name hover plus Australia/London/reset photo sequences. These two interactions remain reserved for the future About section, as in the existing site.
- Visual evidence: sampled CSS animation states, including desktop/mobile/tablet/ultrawide/landscape. A delayed first paint initially let mount-time deadlines expire before animation began. Starting the deadlines from one requestAnimationFrame fixed this: a subsequent live Chromium trace recorded surge/spray start and end events, the landing phase during the reveal, and complete cleanup. No real-device frame-rate claim is made.

Run lifecycle checks with `PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node scripts/check-page-load-dive.mjs`. Set `PORTFOLIO_URL` to test a production preview. No Playwright dependency was added to the application.

## Water surface and lighting refinement — 2026-10-02

Follow-up: increased Landing character buoyancy to -12/+9px with a 5.2-second cycle, and Experience illustration travel to -8/+2px. Bubbles now rise in 11–20 seconds with varied 4–15px sizes and independent sideways sway. Shared surface/light/ray cycles are now 10.5/12.5/16.5 seconds with broader movement. This supersedes the quieter values below. Lint, build, landing checks across 12 viewports, menu-motion checks, scene visual checks, and desktop/mobile loop sampling all passed. Reviewed captures for readable navigation and covered background edges; pause, reduced motion, hidden-tab behavior, and all four retained easter eggs passed.

Strengthened the existing shared water tracks with gentle reflection stretch and shimmer, shifting overhead glow, and rays pivoting around their surface source. Existing 15/18/23-second timings remain independent and return to neutral; transforms and opacity avoid per-frame layout or gradient repainting.

Validation: lint, production build, and diff whitespace checks passed. The existing landing suite passed all 12 viewport sizes, motion controls, native access, and console/title easter eggs. The scene visual suite passed desktop/mobile navigation, hidden-tab suspension, preference interruption, and the retained AboutIdentity name/photo eggs. A temporary browser probe sampled each water layer at four cycle phases on desktop/mobile and both routes, confirming visible changes, matching loop endpoints, pause, and reduced motion. Neutral/ripple screenshots were visually reviewed. The Impeccable detector reported only advisories for existing colors and typography.

## Unified menu entry and subtle idle — 2026-09-30

Supersedes the earlier 1260ms dive followed by long landing arrivals. The complete sequence now takes 980ms from its first rendered frame: water burst, reveal at 400ms, final settling from 780ms, then idle at 980ms. `landing-motion.js` centralizes shared timing and CSS variables. Existing CSS orchestration was retained to keep the native pause control, reduced-motion handling and SVG transition on one clock; no dependency was added.

Independent wrapper transforms animate the character, background, name ribbon, impact card and menu with short stagger and fast, non-bouncing easing. Completed entry tracks retire permanently. Idle starts at neutral on separate children: character buoyancy within 4px, separate slow light/reflection/ray cycles, ten sparse bubbles, and 1–2px selection-backing drift. Menu text and hit targets do not drift. Document visibility pauses ambient work; user pause/resume and reduced-motion preferences remain authoritative.

Inspected the reference at twelve frames per second through its entry and sampled its idle composition. Checked eight animation states at desktop, ultrawide, tablet, mobile portrait and landscape. No supplied reference media or new artwork is shipped. Impeccable motion review prompted stronger vertical reveal, sparse bubbles and lower character amplitude; its detector returned advisory findings only. Timing checks identified and resolved a final-row settling overlap by shortening arrivals and retiring entry tracks before idle.

Validation: lint, build, the existing landing/entry regression suites, and the new `scripts/check-menu-motion.mjs`. The new test covers ENTRY → SETTLED → IDLE, bounded entry durations, no remaining arrival at idle, sparse particles, character float amplitude, no hover replay, pause/resume, hidden-document suspension and reduced-motion toggling without entrance replay. Browser checks target functionality and sampled motion; no physical-device 60 FPS certification is claimed.

## Experience click disclosures and shared underwater scene — 2026-10-01

Experience and Landing now render the same `UnderwaterScene` component, including water colors, white background geometry, scrolling name ribbon, reflections, light, rays, and bubbles. Each mounted scene has its own SVG pattern ID. Experience uses Landing's six-second character float and the same ambient timing, pause, hidden-document suspension, and reduced-motion rules.

Experience starts with all rows collapsed. Clicking a row expands its details immediately below that row; clicking again collapses it. Hover and focus do not select content. Custom arrow/Escape navigation and shortcut hints are removed; native button focus and activation remain. The illustration fits its full canvas beside desktop content and below the roster on smaller screens.

Validation: lint, production build, and `git diff --check` passed. The updated Experience regression suite passed at seven viewport sizes, including full illustration containment, click/tap disclosures, no hover/focus selection, no custom shortcuts, browser history, paused ambient motion, reduced motion, and exact computed background/idle-style comparison with Landing. Desktop and mobile screenshots were visually reviewed. Landing's twelve-viewport suite passed, including console/title easter eggs and Resume access. The isolated retained AboutIdentity harness passed Chinese-name hover and Australia/London/reset photo sequences. These two identity eggs remain reserved for the future About page. Independent code review found no correctness or regression issues. The design detector reported advisory palette/type-ramp findings for the existing visual system.

### Experience left field follow-up — 2026-10-01

The user's follow-up replaces Experience's white left field and ribbon backing with the existing navy color, with pale-blue/cyan ribbon lettering. Landing retains its white field; shared water layers and idle timing remain identical. The three requested replacement PNGs were missing from `docs/assets/experience/` and were not available as readable attachments, so the existing artwork remains until those files are supplied.

### Experience status-menu shell — 2026-10-01

Replaced only the Experience background and selection shell, following `docs/references/experience/status_screen.png`. The new scoped stylesheet supplies independent white/cyan/lavender/cobalt geometry, category ribbons, organization wedges, and taller white selected rows. Selected information follows the complete menu without splitting it. Background composition stays anchored to viewport height when details expand.

Lint, production build, and diff whitespace checks passed. Experience browser checks passed at 1920, 1440, 1280, 844, 768, 390 and 320px, including all reflection selections, click/tap disclosure, no hover/focus selection, history, motion pause and reduced motion. Desktop and mobile captures were visually inspected in two rounds; the second confirmed the cobalt field correction. Landing's 12-viewport suite passed, including console/title easter eggs. The retained AboutIdentity harness passed Chinese-name hover and Australia/London/reset keyboard photo sequences.

`experience.css` matched the pre-task copy byte-for-byte; no changes were made to ExperienceArtwork, art configuration, canonical data, or artwork assets. The design detector flagged a height transition, which was removed; its remaining palette/type advisories refer to the pre-existing landing design contract rather than the explicitly requested status-screen palette.

### Updated Experience artwork — 2026-10-02

Converted the updated user illustration to WebP at native 1536×1024 with alpha intact; updated intrinsic dimensions, mirror canvas, glass trace and reflection viewport. Lint/build and seven-viewport Experience checks passed, including all five selections, local reflection loading, pause, reduced motion, touch and history. Desktop 1440px and mobile 390px screenshots were inspected for glass alignment and intact frame/hand. The standalone frame/mask remain source references because their proportions and silhouette differ from the glass in the illustration.

### Landing → Experience transition stall — 2026-10-02

Reproduced a first-entry stall in local headless Chromium: the baseline performance probe recorded a 335ms long task. A browser rendering trace identified approximately 248ms of WebP decode work; the active tiket.com mirror image was 8064×6048 (48.8 megapixels). Monash and Nottingham also used 12–16MP sources. A clipping-only experiment did not improve performance and was reverted.

Added proportional reflection-only WebP derivatives with a maximum dimension of 960px and wired both the preloader and rendered mirror images to the same resolver. Original photographs, character artwork, mirror mask, placement and switching logic remain unchanged. Removed the separate phase-specific `translate: -5px` and opacity rules that snapped off while the timeline was still running; the existing interpolated selection animation remains responsible for feedback.

The next matched performance probe reduced the worst first-entry long task from 335ms to 61ms; a subsequent forward crossing had no long tasks. This is local Chromium evidence, not a promise of device-independent frame rate. A regression test failed against the original oversized images and independent selection translate, then passed after both fixes. It now runs in the default motion verification suite.

Extended paused-navigation recording exposed an intermittent stale-style re-entry failure. The choreography now uses the installed Framer Motion `animateMini` native tracks with the same explicit offsets/durations, plus an empty native clock track. This avoids queued MotionValue rendering after original inline styles have been restored. Regression coverage includes a normal exit followed by paused entry and checks that the Back control remains onscreen. Final local performance probe: first forward long task 57ms (baseline 335ms); later forward/back had no long tasks and 33.4ms p95 frame intervals. The production JS bundle also fell from 320.76kB to 265.66kB by avoiding the full animation renderer in this route coordinator.

### Project Compendium — 2026-10-03

Added project selection and in-place details as an extension of the existing underwater design. Canonical data supplies descriptions, technology roles, available links, and explicit null-date fallbacks. Original geometric placeholders reserve the `project.illustration` replacement path; no final illustrations or reference assets are shipped. See [Project Compendium](project-compendium.md) for scope, tokens, timings, keyboard access, and mobile behavior. `DESIGN.md` and the pre-existing sidecar drift remain unchanged.

Lint, production build, and diff whitespace checks passed. `check-projects.mjs` passed at 1440, 1200, 1024, 768, 390, and 320px, including navigation/history, reduced motion, retained artwork DOM, Enter on the focused row, and return focus. Experience passed seven viewports; Landing passed twelve, including console/title easter eggs; scene visual checks passed desktop/mobile and the retained AboutIdentity name/photo eggs. Independent review issues with focused-row Enter, mobile focus scrolling, and stable mobile artwork geometry were resolved. Captures are in `.impeccable/review/projects/`. The optional requestAnimationFrame probe was throttled with zero samples; no sampled performance or live FPS claim follows from it.

Deterministic CSS timeline captures at 100, 250, 450, and 720ms confirmed the list exit, diagonal header entrance, staggered information reveal, and retained opaque artwork. Rapid repeated detail switching resolved to the latest project. The detector’s height-transition warning was removed; remaining type-ramp advisories refer to the existing landing contract.

### Compendium layout refinement — 2026-10-03

Centered category labels and tightened project rows (62px desktop minimum, 68px mobile). Replaced the duplicate red keyboard outline with a focused-name underline; the selection retains its single red upper stroke. Added an original cyan/navy card marker to the shared measured highlight, with a restrained 2.8-second float that respects pause and reduced motion. No game icon was copied.

Raised and shortened the desktop detail plane, preserving a clear gap above the technical content. Desktop/laptop viewports at least 1024px wide and 700px tall use compact detail spacing; short, mobile, and zoomed layouts keep natural document scrolling for readability. Expanded the Projects browser suite with a 1280×720 viewport and checks for viewport fit and action/footer separation.

### Detail header and affinity-band refinement — 2026-10-03

Removed all project durations. Grouped gray category and black project-name typography at the quarter-width origin, with a restrained overlap. Moved technology categories into a taller royal-blue header band sharing that origin, separated the matrix below, and introduced alternating navy/lavender checkerboard technology cells (alternating rows on mobile). Desktop fit and band/panel separation are covered by the Projects suite.

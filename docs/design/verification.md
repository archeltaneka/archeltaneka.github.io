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

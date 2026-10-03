# Project Compendium — 2026-10-03

The Project Compendium extends the existing underwater portfolio with a project selection view and an in-place details view. It is an ordinary extension of the current visual system described in `DESIGN.md`, not a redesign. Its implementation is scoped to `Projects.jsx`, the components in `src/components/projects/`, canonical project data, and the existing route integration. Landing and Experience retain their compositions.

## Visual system

The surface reuses `UnderwaterBackground`, shared motion variables, and the established Antonio display / Inter body fonts. Condensed category labels and a large decorative PROJECTS title sit beside upright project names, descriptions, and technology labels. The selected row uses a measured white backing, cyan category tile, red top rule, and visible arrow. The details header uses a white angled plane above a dark technology panel.

| Scoped token | Source or value | Purpose |
| --- | --- | --- |
| `--projects-blue-deep` | `--navy` | Dark foreground and stage accents |
| `--projects-blue` | `--cobalt` | Category type and hover states |
| `--projects-cyan` | `--cyan` | Selection, icons, focus and actions |
| `--projects-white` | `--white` | Selected backing, header and body text |
| `--projects-text-muted` | `--muted` | Supporting labels |
| `--projects-blue-bright` | `#154bea` | Local wedge and header edge |
| `--projects-red` | `#eb3552` | Selection rule and row focus |
| `--projects-panel` | `#061632df` | Translucent control and technology surfaces |

These local additions do not replace the global design contract. Pre-existing drift in `.impeccable/design.json` is outside this task; both that file and `DESIGN.md` remain unchanged.

## Content and artwork

`projectData` in `src/data/portfolio.js` is the canonical source for ExperimentOS AI, Cherébowl, Joint Intent & Slot Detection, and DAG-nabit. The UI reads each project's name, category, description, technology entries, and available links from that data. Existing case-study facts remain in the same records; public project results are separate from professional business outcomes.

Project durations are omitted from both the current data model and the interface at the user’s request. Technology roles are a curated architecture snapshot: core means fundamental to the architecture or primary implementation; used means meaningfully used; support means supporting infrastructure, tooling, or observability. The matrix includes an accessible role label and a visible legend rather than proficiency scores.

No final project illustrations are supplied. `ProjectIllustration` renders an original geometric SVG placeholder and an explicit “Illustration to follow” caption. Replace a placeholder by setting `project.illustration` to the approved transparent asset URL; the component supports WebP or PNG, with WebP preferred under repository conventions. The illustration fits proportionally against the right/bottom of its existing anchor. Existing `project.image` thumbnails are separate fields and are not silently substituted. Artwork is decorative and hidden from assistive technology; the surrounding UI carries the project identity. No reference artwork, logos, characters, icons, or extracted reference assets are shipped.

## Interaction and timing

Clicking or tapping a project row changes selection. “View project details” opens the selected project. Hover provides feedback without changing selection. Previous and Next wrap through all four projects within the details view. Only available case-study, GitHub, and demo links render; external links announce their new-tab behavior.

The measured selection backing moves over 180ms. Project content switches after 80ms in selection and 120ms in details, while artwork and dependent text use short opacity/transform transitions. Opening details removes the selection view, brings in the angled header after a 220ms delay, and reveals metadata, technology categories, matrix, purpose, and actions in sequence. The last 160ms reveal begins at 560ms and completes at 720ms. The artwork retains the same DOM anchor between selection and details; its container transforms instead of remounting.

Keyboard behavior is scoped to the active Projects surface. Up/Down browse and focus rows in selection. Enter on a focused project row opens that row, even if focus and selection differ. Left/Right switch projects in details; Escape returns to selection. Native Tab access and visible focus remain available alongside explicit onscreen buttons. Inactive views are `inert` and hidden from assistive technology, and a polite status region announces the displayed project.

Opening details resets document scroll and focuses the details heading after 720ms using `preventScroll`, preserving the mobile header position. Returning restores focus to the selected row after 300ms and scrolls it into view with nearest alignment. Pending focus timers are cleared when leaving. With Motion off or reduced motion, selection changes and focus handoffs are immediate and CSS transitions/animations are disabled. Ambient motion also pauses while the document is hidden or Projects is inactive. `#projects`, main-menu navigation, and browser history use the existing route shell.

## Responsive behavior

Desktop places the roster on the left and artwork on the right. At 768–1199px the roster and details content widen and row type becomes more compact. Below 768px, selection fills the available width, metadata stacks, the technology matrix becomes one column, and previous/next controls span the lower content area. Keyboard hints are hidden on mobile, while all actions remain available as touch controls.

Mobile artwork uses a stable 350px-high anchor at `top: 560px`; opening details translates it upward and scales it without changing those base geometry values. This avoids an anchor jump during the view change. The page scrolls naturally for long details, and heading focus does not scroll the user past the header. Return focus brings the chosen row back into view.

## Verification and limits

- `bun run lint`, `bun run build`, and `git diff --check` passed.
- `scripts/check-projects.mjs` passed at widths 1440, 1200, 1024, 768, 390, and 320px, covering navigation/history, reduced motion, retained artwork DOM, Enter on the focused row, and return focus.
- `scripts/check-experience.mjs` passed seven viewports. `scripts/check-landing.mjs` passed twelve viewports, including console/title easter eggs. `scripts/check-scene-visual.mjs` passed desktop/mobile checks and the retained AboutIdentity name/photo easter eggs.
- Three issues raised in independent review were resolved: Enter opening the focused row, mobile focus scrolling, and stable mobile artwork geometry.

Project screenshots are stored in the `.impeccable/review/projects/` directory. These checks establish tested behavior and captured appearance. An optional requestAnimationFrame motion probe was throttled and returned zero samples, so it provides no sampled performance or live FPS evidence. No such performance claim is made.

Deterministic captures at 100, 250, 450, and 720ms confirmed the authored CSS choreography and opaque retained artwork. Rapid repeated detail switching resolved to the latest requested project. These timeline samples do not measure device frame rate.

The revised detail header groups a gray, slanted category with a closely overlapping black project name, starting one quarter across the desktop plane. A taller royal-blue band holds the technology categories directly beneath that group. The technology panel follows with additional separation and alternating dark-navy/lavender cells; mobile uses alternating rows.

# Skills / Toolkit — 2026-10-06

Implemented only Skills on `feat/persona-inspired-portfolio-improvements`, following the user's instruction to retain the current branch. Home, Experience, Projects, the initial dive and reserved About easter eggs retain their existing designs.

## Composition and evidence

Static authority: `docs/references/skill/equip_screen.png`. Original HTML/CSS polygons reproduce the 33%-width selector, 8% top offset, approximately 8.35vh row height, 36.4% tool-list origin, 13.7% list top, broad angular white foreground and detached top-right shard. White/black selected rows, navy labels, cyan monochrome tool icons, condensed Antonio display type and lower-right guide preserve the reference's visual grammar. Inter supplies supporting copy. Labels are somewhat wider to accommodate professional function names. Six categories and three/four tools intentionally leave more whitespace than the reference's ten characters and five slots. No content was invented to fill it.

The six-second MP4's metadata was inspected. The browser plugin had no connected browser, and the user prohibited extracting frames. Consequently, video playback and direct motion-reference comparison were **not completed**. Entrance timings are deliberately authored using the existing scene architecture, not claimed as measured reference timings. No screenshot, game artwork, video, proprietary font or Persona icon is imported into production.

## Files and architecture

Created:
- `src/data/skills.js`: single category/tool dataset, including internal source annotations.
- `src/components/skills/SkillsPage.jsx`: selection state, semantic selector, tool list, guide and background composition.
- `src/components/skills/SkillsCharacter.jsx`: independent artwork slot.
- `src/components/skills/skills.css`: scoped desktop/mobile geometry and interaction styles.
- `scripts/check-skills.mjs`: functional, viewport, input and motion regressions.
- `docs/design/skills.md`: this implementation and critique record.

Modified:
- `src/components/Skills.jsx`: compatibility export replaces the unused duplicated legacy grid.
- `src/App.jsx`: Skills scene, conditional mounting and direct-link intro exemption.
- `src/components/landing/LandingPage.jsx`: existing Skills button callback.
- `src/components/scene/useSceneNavigation.js`: hash route, scene phases and focus restoration.
- `src/components/scene/scene-motion.js`: Skills entrance/return tracks.
- `scripts/check-landing.mjs`: replace obsolete “Skills coming next” assertion with route/return assertions.

## Taxonomy and sources

| Category | Tools | Evidence |
|---|---|---|
| Programming | Python, SQL, R | Existing PDF resume; project records |
| Machine learning | scikit-learn, PyTorch, TensorFlow, CatBoost | Resume; portfolio payment recommendation and hotel entity matching; NLP project |
| AI / LLM | LangGraph, RAG / pgvector, Phoenix | ExperimentOS AI description and technologies |
| Data & databases | PostgreSQL, pandas, NumPy, SQLAlchemy | ExperimentOS AI, Cherébowl and Mobiles Dataset Analysis |
| Visualization | Power BI, Tableau, Matplotlib | Resume; original Skills.jsx for Matplotlib |
| Engineering | FastAPI, Docker, GitHub Actions, OpenTelemetry | ExperimentOS AI and Cherébowl; resume |

OpenAI/Ollama were omitted because no unambiguous evidence was found. The legacy “LLama” name with an Ollama logo was insufficient. This is a curated toolkit, not an exhaustive resume transcription. No proficiency, percentages or experience duration claims were added. Installed react-icons supply monochrome logos; generic function icons cover unavailable brands. No icon downloads or new dependencies.

## Interaction and motion

Programming is the initial committed category on entry. Mouse hover temporarily previews a category and leaving the selector restores the committed choice. Click/tap commits. The white row shows current preview; the plus marker and aria-pressed identify the committed choice. The guide explains this distinction. Arrow keys advance from the focused category, wrap through the list, and commit. Enter activates the focused category and focuses its tools, scrolling into view on small screens. Escape and the prominent white Main menu button return without reloading. The button has a back arrow, cyan border, and touch-sized target; the Escape shortcut is a separate keyboard hint. Footer controls retain native arrow behavior.

Row selection extends/retracts in 170ms. Tools enter diagonally with a 32ms stagger and 240ms duration. Scene entry uses the existing native animation coordinator: Home planes exit, incoming scene cuts at 280ms, the white field/shard sweep down from upper right, rows slide from the left, tools arrive, the artwork wrapper enters from lower right, and guide settles by approximately 790ms. Return retracts those layers and restores the existing Home choreography. The initial water/dive component is untouched and does not replay.

Idle uses only existing underwater reflections, rays and bubbles. Text and white foreground stay stable. Motion off and document visibility pause ambient work; content changes remain readable. Reduced motion disables idle and category movement and uses a 120ms route opacity change. Inactive Skills unmounts.

## Character replacement

`SkillsCharacter` reserves a lower-right box (51% stage width, 78% height), with independent clipping, z-index and entrance wrapper. The current decoration is only faint corner markers and a small label. Replace `<SkillsCharacter />` with `<SkillsCharacter src="/assets/skills/archel-skills.png" />` using an original transparent image. The image uses `object-fit: contain` and bottom-right positioning; adjust that component's crop rules only if the supplied composition requires it. No illustration was generated. The slot is decorative and hidden from assistive technology.

## Responsive and accessibility

Desktop keeps reference anchors at 1920×1080, 1440×900 and 1280×800. Below 900px, selector/tools form readable columns, the character slot is hidden and the stage fills at least the viewport. Below 600px, categories and tools stack in document flow, the watermark is removed and controls follow at the bottom. Short landscape views scroll. Long tool names wrap instead of clipping.

Native buttons, visible focus outlines/underlines, aria-pressed, aria-controls, semantic dl/dt/dd, labeled tool region and committed-selection status support keyboard and assistive technology. Icons and polygons are decorative. Entry focuses the Skills heading; return restores the Home Skills control. Essential content is available by click, touch or keyboard.

## Impeccable critique and refinement

Method: two isolated assessments, `/root/skills_design_critique` (visual/source) and `/root/skills_technical_critique` (detector/source). Screenshots were captured by local Chromium because no native browser was connected; no live detector overlay was presented. No ignore list was applied. Questions skipped: the user explicitly requested critique followed by implementation refinements within the supplied design brief.

Initial visual review identified tablet underfill, an oversized watermark and intrusive placeholder. Technical review identified invisible tool entrances after Motion off, focus-relative arrow behavior and mobile Inspect scrolling. Refinements scoped stage sizing/color, filled tablet height, reduced/lowered the desktop watermark, removed it on phones, replaced the placeholder card with faint markers, clarified preview/commit guidance, corrected keyboard behavior and preserved readable paused content. A subsequent motion regression exposed a tool entrance replay when the route settled; native category-change tracks now run only when the effective category changes, while the route coordinator exclusively owns page entry. Narrow-screen checks also prompted long-name wrapping.

The visual reviewer scored the tablet, watermark, placeholder and listed keyboard fixes resolved. Preview-versus-commit was partially resolved by explicit instructions; the remaining distinction is intentional per the requested interaction model. Row heights remain faithful; additional whitespace from six categories and deferred artwork was accepted under the brief.

The detector ran once on Skills components and integration markup: two advisory colors in the existing App console easter egg, neither a rendered Skills issue. Output: `/tmp/skills-detector.json`. Existing DESIGN.md / .impeccable/design.json drift was observed and left unchanged; the current component styles and explicit user reference govern this extension.

## Validation

Lint, production build and whitespace checks passed. Skills checks cover seven viewport classes and all six categories, mouse preview restoration, committed selection, focused-row arrows, Enter, Escape, touch, direct hash entry, history, return focus, unmounting, motion pause, reduced motion and no dive replay. Review screenshots are under `/tmp/skills-review/`. Native entrance tracks were captured at 140/320/460/650ms; a regression confirms the tool entrance does not replay after route settling. The technical reviewer confirmed the final category-animation lifecycle and cleanup by source inspection.

Home passed its 12-size suite with console/title eggs. Experience and Projects passed their seven-size suites. The isolated retained AboutIdentity harness passed name-hover and keyboard-photo eggs; those remain reserved for the future About route as before. Experience test-generated baseline images were restored; review artifacts from unrelated sections are not part of this change.

Remaining: supply original character artwork and verify/tune entrance and idle timing against actual MP4 playback. Static layout and implemented motion were inspected separately; exact reference motion fidelity is not claimed.

## Category symbols and reference color sequence

Category initials are replaced with decorative SVG code, network, brain/circuit, database, chart and wrench symbols from the installed Lucide icon set. Their accent wedges follow the first six reference rows: light blue, magenta, royal blue, gray, red and yellow. The selected row uses the reference's red upper/right stroke. Category labels remain the accessible names.

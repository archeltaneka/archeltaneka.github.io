---
name: Archel Taneka — Underwater Landing
description: An original underwater portfolio main menu with luminous surface light and deep blue water.
colors:
  navy: "#061632"
  cobalt: "#083da6"
  cyan: "#8bffff"
  hair-blue: "#002bb8"
  white: "#f5fcff"
  muted: "#c1e6ff"
  left-field: "#ffffff"
  carousel-first: "#808080"
  carousel-last: "#000000"
typography:
  display:
    fontFamily: "Antonio, sans-serif"
    fontSize: "clamp(54px, 5.7vw, 88px)"
    fontWeight: 700
    lineHeight: 1.07
    letterSpacing: "-.035em"
  title:
    fontFamily: "Antonio, sans-serif"
    fontSize: "37.5px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-.025em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  specialization:
    fontFamily: "Inter, sans-serif"
    fontSize: "16.5px"
    fontWeight: 600
    lineHeight: 1.5
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "11px"
spacing:
  contact-gap: "clamp(16px, 2.5vw, 38px)"
  hint-gap: "24px"
components:
  menu-control:
    textColor: "{colors.cyan}"
    typography: "{typography.display}"
    padding: "0 18px 8px 12px"
  menu-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    typography: "{typography.display}"
  impact-card:
    backgroundColor: "{colors.left-field}"
    textColor: "{colors.navy}"
    padding: "10px 13px"
    width: "240px"
  contact-link:
    textColor: "{colors.white}"
  motion-toggle:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
---

# Design System: Archel Taneka — Underwater Landing

## Overview

**Creative North Star: "Underwater Main Menu"**

The underwater main menu moves from a bright turquoise surface through cobalt water to deep navy. Reflections, drifting rays, rising bubbles, and the original transparent character establish depth. Condensed, tilted navigation carries the expressive energy; upright supporting text keeps identity, specialization, resume access, and contact readable.

This document describes the landing mounted by `src/App.jsx`, grounded in `src/components/landing/` and the approved `.impeccable/surfaces/src-app-jsx.md` contract. Existing section components and factual data remain preserved but unmounted. The former Decision Journal documentation remains archived and does not govern this surface.

**Key Characteristics:**

- Bright surface reflections descend into a deep blue underwater stage.
- The original transparent illustration sits closely beside oversized angled navigation.
- A vertical name ribbon occupies the far left; identity and specialization share a compact badge.
- A visible, nonblocking dive entrance settles into float, bubble, light, and selection motion.

## Colors

Luminous cyan and cool white distinguish foreground controls from a water column that darkens toward the bottom. Frontmatter records the reused landing tokens; the sidecar records the atmospheric gradient. Legacy theme tokens in `src/index.css` do not define the active landing.

### Primary

- **Cobalt** provides the blue accent and identity-badge focus outline. The environment transitions through several brighter and darker blues to make water depth readable. A localized royal-blue field sampled from the illustration hair blends its lower silhouette into the water; this field follows the right-cropped character on mobile.

### Secondary

- **Luminous cyan** identifies unselected menu labels and the selected backing's offset edge.

### Neutral

- **Midnight navy** supplies the stage base, selected menu type, and identity text.
- **Cool white** supplies the identity badge, selected menu backing, contact text, and focus outlines.
- **Pale blue** supports destination notices and interaction hints.

## Typography

**Display Font:** self-hosted Antonio, sans-serif fallback, bold only.
**Body Font:** self-hosted Inter, sans-serif fallback, regular/semibold/bold.

The narrow display face makes the menu dominant without increasing supporting copy density. Frontmatter display describes desktop menu labels; title describes the identity name; body describes the status notice. Specialization is a compact, wrapping bullet list inside the identity badge.

**The Upright Support Rule.** Rotate expressive menu entries, but keep identity and supporting paragraphs upright.

Menu entries are uppercase with individual rotations between −4 and −9 degrees. Mobile menu size is `clamp(36px, 10.8vw, 60px)`; screens at least 1600px wide use `clamp(88px, 5.4vw, 108px)`. The decorative vertical name ribbon uses Antonio at 176px on desktop, 124px on tablet, and 62px on mobile, exactly twice its former size. ARCHEL is grey and SUTANTO is black. The Chinese-name layer uses a sans-serif fallback suitable for its characters.

## Layout

Desktop uses a viewport-height layered stage (`100svh`, minimum 760px), an oversized transparent character at left, and a menu beginning at 46% from the left and 29% from the top. The far-left ribbon is 210px wide. The impact card sits at top 5%, left 3%, at 240px wide and approximately 107px tall—half the former desktop identity card dimensions. It displays the user-supplied $8.3M / IDR 149B+ figure with a GBV/revenue qualifier. The character fills the stage height with proportional cover cropping, positioned at top -5% with 110% height to keep both edges covered during its float animation. The status region occupies the lower right above contacts. There is no centered card container.

At 900–1199px, the impact card stays 240px wide, the character occupies 53% width, and the menu begins at left 47%, top 38%. At desktop heights of 800px or less, the stage minimum becomes 800px and navigation tightens. At 1600px and above, menu type grows.

At 600–899px, the stage minimum is 900px; the character crops beyond the left boundary, the menu begins at left 49%, top 34%, and the ribbon narrows to 140px. Below 600px, the stage uses document flow with 24px 24px 20px padding. The compact impact card stays above the left menu, the illustration fills the stage height and crops beyond its right edge, and status/contact follow below. The ribbon narrows to 70px. Custom keyboard navigation and its hints have been removed; contact links wrap and all controls remain available. Short screens can scroll.

## Elevation & Depth

Depth comes from the bright surface, translucent reflections and rays, rising outlined bubbles, the transparent illustration, and darker lower water. The cyan offset layer belongs specifically to the selected menu silhouette, not to a general card-shadow system. Mobile unselected menu text uses `0 2px 12px #07133480`; selected type removes that shadow. A softly masked mobile blue scrim protects readability. A white angular field fills the area left of the character and joins the white name ribbon. The water remains on the right.

## Shapes

Tilted typography and asymmetric selection polygons sit within fluid water forms. The menu backing is a clipped quadrilateral with its cyan layer offset by 7px on both axes. The impact card is a compact pure-white rectangle with a 1px black border. Irregular foam edges, rising bubbles, and curved surface reflections carry the aquatic character. Avoid replacing the menu silhouette with rounded cards.

## Components

### Main menu

Five entries—About, Experience, Projects, Skills, Resume—form the primary navigation. Hover and native focus update the current entry. Custom arrow navigation and page-level Enter activation are removed; native Tab navigation and activation of focused links/buttons remain. Selection uses navy text, a white backing, cyan offset edge, a revealed arrow, and outward scale/translation. Desktop selection scales to 1.12; mobile to 1.06. A visible focus outline remains distinct from selection.

Resume is the sole PDF access control in the landing menu and uses a native anchor opening the existing PDF. There are no separate View PDF or Download links. The other four entries remain buttons that announce their coming-next destination through a polite status region; no destination pages are implemented.

### Impact card and reserved About identity

The landing card displays `$8.3M / IDR 149B+`, labelled “Total measured impact,” with “Across incremental GBV and revenue outcomes” clarifying the mixed metric types. It is not described as total revenue. The white card retains the thin black outline and overlaps the left carousel.

The prior identity card—portrait, name, role, specialization bullets, Chinese-name reveal, and keyboard photo sequences—is preserved in `src/components/landing/AboutIdentity.jsx` for the future About section. It is intentionally unmounted, so those two easter eggs are not active on the landing. Console and title easter eggs remain active. The supplied character assets remain unchanged.

### Contact and supporting controls

The footer passes pointer input through empty space overlapping the menu; its anchors and buttons remain interactive. Email, GitHub, and LinkedIn use native text links with line icons and minimum hit heights of 44px. Hover turns contact text cyan and nudges the arrow. A focus-visible skip link reaches navigation. Motion on/off is a text button with pause/play icon and pressed state. The repeated ARCHEL SUTANTO ribbon is decorative and hidden from assistive technology.

### Motion

A shared 980ms entry pushes through original SVG water sheets, elongated pale foam and twelve droplets. The irregular reveal begins at 400ms, followed by independently staggered character, menu, background, ribbon and impact-card arrivals. At 780ms the composition enters its final settling interval; at 980ms the overlay unmounts and idle starts. Entry uses fast, non-bouncing transform easing, without a content fade. Timing is centralized in `src/components/landing/landing-motion.js`, shared by React deadlines and CSS custom properties. Deadlines begin on the first rendered frame. The sequence replays only on full load/reload. Existing selection feedback remains unchanged.

Idle animation has a 5.2-second character cycle starting and ending at neutral, with vertical travel from -12px to 9px, horizontal travel within 5px, and rotation within .45deg. Experience uses a smaller asymmetric 7.8-second illustration float, with vertical travel from -8px to 2px and rotation within .2deg. The selected backing drifts 1–2px over 6.8 seconds while text stays stationary. The existing name ribbon scrolls over 52 seconds. Ten deterministic bubbles rise with 11–20-second cycles, sizes from 4–15px, and independently timed 7px sideways sway. No per-frame JavaScript loop is used.

Surface reflections stretch and shimmer with 22px maximum horizontal travel and opacity from .36 to .6. The overhead glow shifts within 2.4% and varies from .7 to full opacity; rays pivot at their surface source within 2 degrees. Their independent 10.5-, 12.5- and 16.5-second cycles meet at neutral. Only transforms and opacity animate, with oversized bounds covering the stage edges. Both Landing and Experience use these shared tracks.

**The Interruptible Water Rule.** Keep content immediately usable, and let visitors stop every animated layer.

Pointer, keyboard or focus input dismisses the entry without consuming the event. Pause and document visibility suspend ambient work. Reduced motion skips the overlay and disables all landing animations/transitions. Completed entrance tracks are removed, so turning motion back on cannot replay them. Entry and idle transforms live on separate layers and meet at neutral to avoid a jump.

## Do's and Don'ts

### Do:

- Do use the supplied original illustration and the original identity portrait with its alternate photos.
- Do keep supporting text upright, readable, and clear of illustration and menu silhouettes.
- Do preserve visible keyboard focus, native resume/contact links, and reduced-motion support.
- Do keep console/title easter eggs active and retain the name/photo interactions in AboutIdentity for the future About section.
- Do keep the landing-only scope explicit and preserve existing section components and factual data.

### Don't:

- Don't ship reference game artwork, logos, characters, or icons.
- Don't hide essential access behind hover or a blocking opening sequence.
- Don't present the unbuilt menu destinations as completed pages.
- Don't apply the archived Decision Journal palette or component rules to this landing.

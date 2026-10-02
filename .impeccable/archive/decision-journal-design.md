---
name: Archel Taneka Sutanto — Decision Journal
description: An editorial portfolio for product data science and measurable decisions.
colors:
  ink: "#101d35"
  paper: "#f5f3eb"
  cobalt: "#1357d6"
  aqua: "#6be5db"
  muted: "#4c5c70"
  on-dark-muted: "#bfccdf"
  rule: "#b9c0c5"
  primary-hover: "#0842b0"
  white: "#ffffff"
  skills-surface: "#e7e9e5"
  dark-rule: "#526076"
  evidence-rule: "#627085"
typography:
  display:
    fontFamily: "Antonio, sans-serif"
    fontSize: "clamp(86px, 12.1vw, 206px)"
    fontWeight: 700
    lineHeight: 0.91
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Antonio, sans-serif"
    fontSize: "clamp(38px, 4.4vw, 68px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(21px, 2.2vw, 34px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  button: "2px"
spacing:
  page-gutter: "clamp(24px, 3.3vw, 64px)"
  section-block: "90px"
  section-block-mobile: "60px"
  detail-gap: "44px"
  columns: "40px"
  actions: "20px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "16px 30px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "16px 30px"
  button-outline-hover:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "16px 30px"
  button-light-hover:
    backgroundColor: "{colors.aqua}"
  navigation:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "72px"
  project-disclosure:
    textColor: "{colors.ink}"
    padding: "25px 0"
  career-disclosure:
    textColor: "{colors.muted}"
  business-metric:
    textColor: "{colors.aqua}"
---

# Design System: Archel Taneka Sutanto

## Overview

**Creative North Star: "Decision Journal"**

Decision Journal combines warm paper and midnight navy planes with condensed display type, upright reading text, and precise cobalt geometry. Turquoise marks selected evidence and contact emphasis. The result is editorial, direct, and grounded in professional work.

Flat surfaces, thin rules, and typographic hierarchy keep detailed evidence readable. Motion follows navigation or interaction state; content is visible immediately, and reduced-motion preferences remove transitions.

**Key Characteristics:**

- Condensed display typography with upright, readable body text.
- Warm paper and navy surfaces with cobalt geometry and turquoise emphasis.
- Ruled indexes and optional native disclosures.
- Short directional motion and visible keyboard focus.

## Colors

The palette pairs warm paper with midnight navy, using electric cobalt for direction and turquoise for emphasis. Frontmatter values are normative and map to the implemented stylesheet.

### Primary

- **Cobalt:** primary actions, links, focus on light surfaces, and the diagonal seam. The deeper primary-hover tone signals pointer interaction.

### Secondary

- **Aqua:** selected business metrics, emphasis on navy, dark-surface hover states, and dark-surface focus.

### Neutral

- **Ink / Paper:** principal dark and light planes and their contrasting text.
- **Muted / On-dark-muted:** supporting reading text on the corresponding surface.
- **Rule / Dark-rule / Evidence-rule:** fine dividers separating index entries and evidence.
- **Skills-surface:** quiet gray-green background for the categorized tool index.
- **White:** primary button lettering and selection text.

## Typography

**Display Font:** Antonio, sans-serif fallback, self-hosted WOFF2 at weight 700.
**Body Font:** Inter, sans-serif fallback, self-hosted WOFF2 at weights 400, 500, 600, and 700. Font loading uses swap; synthetic faces are disabled.

The condensed display face creates identity and section hierarchy. Upright Inter carries roles, metrics, controls, and all longer reading text. The hierarchy is fluid rather than a fixed modular ratio.

- **Display:** large two-line name; desktop English lettering is horizontally scaled to 90%, returning to its natural width below 600px.
- **Headline:** uppercase section headings. The contact heading uses its own larger fluid scale.
- **Title:** project names, with smaller responsive sizes.
- **Body:** case descriptions use the frontmatter role; other reading blocks vary from 15–18px with 1.5–1.7 line height. Long descriptions cap at 65–70ch.
- **Label:** uppercase case labels. Identity and section-index labels use lighter weights and wider tracking.
- **Metrics:** bold Inter with tabular numerals in hero evidence; the hero lead value scales from 84–176px on desktop.

**The Upright Reading Rule.** Keep body copy and factual evidence upright; reserve condensed typography for identity and headings.

## Layout

Use the fluid page gutter and generous section rhythm in frontmatter. The desktop hero is a 60/40 split with a clipped paper plane and cobalt diagonal seam; it shifts to 59/41 between 900px and 1199px. This is the approved landing-page expression, not a mandatory grid for every future surface.

Section headings and contact content use two columns. Open project details pair an image column (42%) with narrative; impact explanations use three equal columns. Experience uses a category rail (23%) and a date/content split (25%/remaining width). Thin rules establish rhythm without enclosing every item.

- **1800px and wider:** tune the hero identity proportions and increase introductory spacing.
- **900–1199px:** compact navigation, controls, and hero evidence spacing.
- **899px and narrower:** collapse navigation into a two-column disclosure menu, reduce header height from 72px to 66px, stack hero introduction and evidence, replace the diagonal with a cobalt top border, stack project details and career groups, and use the smaller section rhythm.
- **599px and narrower:** order identity, role/actions, portrait, then evidence; use a 220px portrait frame. Stack section headings, impact explanations, timeline entries, skills categories, and contact content. Buttons have a 52px minimum height and 13px 17px padding.

The layout supports a 320px minimum body width. Anchor scroll offsets account for the sticky header (96px desktop, 88px below 900px). Print styles expose disclosure content and remove navigation and action furniture.

## Elevation & Depth

Surfaces are flat; broad tonal planes, rules, and the diagonal seam convey depth. The mobile navigation overlay alone uses a restrained shadow (`0 14px 24px #101d3524`). Do not add ambient card shadows to the content indexes.

## Shapes

Favor square planes and crisp rules. Buttons soften only slightly with the frontmatter radius. The active navigation indicator is one shared paper parallelogram, skewed by −20 degrees behind upright labels. The hero's cobalt seam is clipped geometry; the portrait remains rectangular.

## Components

### Buttons

Confident typographic controls, with a 60px desktop minimum height, bold 16px Inter, and a 24px icon gap. Primary uses cobalt with white text; outlined uses a cobalt stroke on the light surface; light uses paper on navy. Hover changes the surface and shifts arrow icons right by 3px. Color transitions use 180ms; icon motion uses the standard easing.

Keyboard focus uses a 3px cobalt outline offset by 5px; on navy regions it changes to aqua. Text links use underline on hover and generally maintain a 44px minimum height.

### Navigation

Sticky navy header with an Antonio wordmark, upright section links, and persistent resume access. Active links carry `aria-current="location"`; one shared angled paper indicator slides between measured link bounds over 240ms. The desktop indicator starts 14px below the header top. Hovered inactive links turn aqua.

Below 900px, a Menu/Close button exposes the two-column navigation. It reports `aria-expanded`; selection closes the menu, and Escape closes it and restores focus to the trigger. A skip link becomes visible on focus.

### Project index

Native `details`/`summary` rows combine a condensed ordinal, title, short description, and arrow. A bottom rule separates entries. Hover turns the title cobalt; open state turns the summary cobalt and rotates the arrow 180 degrees. Expanded content presents the existing image, Problem/Method/Result, a plain wrapping technology list, and project links. These are disclosure rows, not cards or pills.

### Career disclosures

Dates and role/institution remain visible. Native details expose responsibilities or study details with readable line spacing and browser-native keyboard operation. Summary text is semibold ink with vertical padding.

### Evidence and skill indexes

Hero evidence uses a large tabular metric, aqua underline, contextual explanation, and ruled secondary measures. Professional impact rows pair aqua business metrics with clearly labeled Problem/Method/Decision & outcome. Skills are plain wrapping lists under category labels on the gray-green plane.

### Optional identity interactions

The name is a real button supporting hover and activation; Chinese lettering fades in over 200ms. Original and alternate WebP portraits support keyboard sequences and preload the alternate assets. Console and tab/window title easter eggs remain present without blocking content.

All content is visible without an entrance animation. Reduced motion disables animations and transitions and switches smooth scrolling to automatic scrolling.

## Do's and Don'ts

### Do:

- Do use the original portrait and existing WebP project imagery.
- Do keep labels, metric definitions, and reading text upright and legible.
- Do preserve native links, details/summary, visible focus, and reduced-motion behavior.
- Do preserve all four optional easter eggs: Chinese name, keyboard photos, console output, and tab/window title.

### Don't:

- Don't recreate reference game artwork, logos, characters, or icons.
- Don't hide essential content behind hover or a blocking introduction.
- Don't combine incremental GBV and revenue into an aggregate claim.
- Don't replace the flat ruled layout with generic rounded card grids.

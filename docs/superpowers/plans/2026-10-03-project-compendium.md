# Project Compendium Implementation Plan

User specification: the detailed 24-part task in this session authorizes implementation on the existing branch. Keep `feat/persona-inspired-portfolio-improvements` unchanged.

Architecture: extend the existing canonical portfolio data; replace the unmounted Projects component with a routed two-state compendium. Keep one artwork positioning wrapper mounted across selection/detail changes. Use CSS choreography and cancellable project-swap timers; retain the existing underwater background and route coordinator.

1. Add browser regression coverage for menu access, selection, detail keyboard switching, retained artwork, reduced motion, responsive reflow and history. Observe failure before implementation.
2. Extend `src/data/portfolio.js` with category, name, purpose, duration and curated technology roles. Preserve legacy factual fields and DAG-nabit; missing dates remain explicitly unspecified.
3. Implement Projects, replaceable ProjectIllustration and scoped CSS. Use native buttons/links, focus transfer, role legend and accessible icon labels. Selection 220ms; detail swap 340ms; expansion 720ms.
4. Connect Projects to App, LandingPage and scene navigation without changing existing Experience choreography.
5. Verify lint/build, dedicated Projects browser checks and existing landing/experience/easter-egg checks. Inspect desktop/mobile captures and motion samples, fix findings, document results.

Review risks: rapid repeated input; changing motion preference mid-transition; long names at 320px; focus escaping inactive panels; page/history navigation while timers are active. No new dependencies, final illustrations, fictional metrics or unsupported technologies.

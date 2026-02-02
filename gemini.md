# Portfolio Website

Personal portfolio website for Archel Taneka Sutanto, a data scientist showcasing projects, skills, and professional timeline.

## Tech Stack

- **Framework**: React 19.2 + Vite 7.2 (`package.json:17-18`, `package.json:26`)
- **Styling**: Tailwind CSS 4.1 with custom theme (`src/index.css:1-22`)
- **Animations**: Framer Motion 12.27 (`package.json:16`)
- **Icons**: react-icons (`package.json` dependencies)
- **Linting**: ESLint 9 with react-hooks/refresh plugins (`eslint.config.js`)

## Project Structure

```
src/
├── components/          # React components
│   ├── App.jsx         # Root component, loading state orchestration
│   ├── Hero.jsx        # Landing section with interactive name reveal
│   ├── Navbar.jsx      # Fixed navigation with mobile menu
│   ├── Projects.jsx    # Project showcase with 3D deck UI
│   ├── Skills.jsx      # Tech stack grid with hover effects
│   ├── Timeline.jsx    # Scroll-linked education/experience
│   ├── Footer.jsx      # Contact section with CTA
│   ├── LoadingScreen.jsx   # Initial load animation
│   └── FluidCursor.jsx     # WebGL cursor effect (desktop only)
├── hooks/
│   └── use-FluidCursor.js  # WebGL fluid simulation logic
├── main.jsx            # App entry point
└── index.css           # Tailwind theme + global styles

public/assets/
├── img/                # Project and profile images (webp)
├── icon/               # Favicon
└── resume/             # PDF resume
```

## Essential Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Production build -> dist/
npm run lint      # ESLint check
```

## Key Conventions

- **Colors**: Custom CSS theme variables (`src/index.css:5-14`)

- **Responsive**: Mobile-first with `md:`/`lg:` Tailwind prefixes; explicit mobile detection via `window.innerWidth` checks in components

- **Images**: Use WebP format; preload critical images in `App.jsx:38-68`

## Additional Documentation

- **Design Guidelines**: See `.gemini/docs/` for design guidelines.

## Important
When you work on a new feature or bug fixes, create a git branch first from the `master` branch. Then work on the feature/bug fix in that branch for the remainder of this session.

## Dont's
- Don't remove the easter eggs on the website. These easter eggs are:
    - Chinese name reveal upon cursor hover on English name
    - Profile photo change upon keyboard event
    - Console log output
    - Web title change when the user switches between tab/window
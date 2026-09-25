# Archel Taneka Portfolio

Personal portfolio for Archel Taneka Sutanto, focused on product data science, machine learning, causal inference, and business-impact case studies.

## Stack

- React 19 + Vite
- Tailwind CSS 4
- Framer Motion
- react-icons
- GitHub Pages deployment

## Local Development

Use Bun 1.4.2 (the version recorded in `package.json`).

```bash
bun install --frozen-lockfile
bun run dev
```

## Quality Checks

```bash
bun run lint
bun run build
```

Commit `bun.lock` when dependencies change. Use `bun add <package>` or
`bun add --dev <package>` to add dependencies.

## Deployment

```bash
bun run deploy
```

The `predeploy` script builds the site before `gh-pages` publishes `dist/`.
To preview a production build locally, run `bun run preview` after building.

## Content Priorities

The site is structured for recruiter and hiring-manager skim behavior:

- Hero: role positioning and headline impact metrics
- Impact: professional tiket.com case studies with problem, method, decision, and result
- Projects: selected technical case studies with code and live demos
- Experience: professional timeline and education
- Skills: technical toolkit

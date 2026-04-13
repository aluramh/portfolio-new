# Portfolio Site — Agent Context

> **Purpose:** This file gives AI agents full context to resume work on this project seamlessly.

## Project Overview

Personal portfolio website for a software engineer. Clean, scroll-driven single-page design with an emerald accent theme, dark/light mode, and YAML-based content layer.

- **Framework:** Next.js 15.5.15 (App Router, static export)
- **React:** 19
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **Fonts:** Geist Sans + Geist Mono (via `geist` package)
- **Package Manager:** Yarn 4 (PnP — no `node_modules/`, uses `.pnp.cjs`)
- **Content:** All profile data lives in `content/profile.yaml`, parsed by `content/parser.ts`

## Architecture

### Content Layer
- `content/profile.yaml` — Single source of truth for all site content (name, title, bio, experience, projects, skills, social links)
- `content/parser.ts` — Reads YAML at build time using Node `fs`, exports typed `profile` object and TypeScript types (`Experience`, `Project`, `SkillGroup`)
- ⚠️ **Important:** `parser.ts` uses Node `fs` — it can ONLY be imported in **server components**. Client components receive data as props.

### Component Architecture
```
app/
├── layout.tsx          — Root layout, ThemeProvider, Geist fonts
├── page.tsx            — Assembles all sections
└── globals.css         — Tailwind + custom animations

components/
├── layout/
│   ├── navbar.tsx          — Server component, reads profile name
│   ├── navbar-client.tsx   — Client component, scroll state + theme toggle
│   └── footer.tsx          — Server component, social links
├── sections/
│   ├── hero.tsx            — Server component, stagger animation
│   ├── experience.tsx      — Server component, reads profile data
│   ├── experience-card.tsx — Client component, scroll animation
│   ├── projects.tsx        — Server component, reads profile data
│   ├── project-card.tsx    — Client component, scroll animation
│   ├── skills.tsx          — Server component, reads profile data
│   └── skills-grid.tsx     — Client component, scroll animation
├── theme-toggle.tsx        — Direct click toggle (light ↔ dark)
├── theme-provider.tsx      — next-themes wrapper
└── ui/                     — shadcn/ui primitives (mostly unused, from init)

hooks/
└── use-animate-on-scroll.ts — IntersectionObserver hook for fade-in-up animations
```

### Server/Client Split Pattern
This project uses a deliberate pattern: **server components read data, client components handle interactivity**.
- Server components import from `content/parser.ts` and pass data as props
- Client components use `"use client"` and handle scroll animations, theme toggling, etc.
- **Never import `content/parser.ts` in a `"use client"` component** — it will break the build (`fs` not available in browser)

## Design System

- **Accent color:** Emerald (CSS variable `--emerald`, used as `text-emerald`, `border-emerald`, etc.)
- **Theme:** Dark mode default, smooth transitions between light/dark
- **Typography:** Clean, minimal — Geist Sans for body, Geist Mono for code
- **Cards:** Rounded corners, subtle borders, `hover:scale-[1.01]` lift effect
- **Animations:** CSS `fade-in-up` via IntersectionObserver, hero uses stagger delays
- **Section separation:** Alternating `bg-muted/30` on even sections
- **Smooth scrolling:** `scroll-behavior: smooth` on `html`

## Key Decisions & Gotchas

1. **No `node_modules/`** — Uses Yarn PnP. Run `yarn` to install, not `npm install`.
2. **`.pnp.cjs` is committed** — This is intentional for Yarn zero-installs.
3. **Static site** — Fully pre-rendered at build time. No API routes, no dynamic data.
4. **shadcn/ui components directory** (`components/ui/`) has ~60 components from initialization but most are unused. They don't affect bundle size (tree-shaken).
5. **`public/resume.pdf`** — Placeholder file (0 bytes). Replace with actual resume.
6. **Theme toggle** — Uses direct click (not dropdown) because Radix DropdownMenu had click-handling issues in this setup.

## Common Commands

```bash
yarn dev        # Start dev server on localhost:3000
yarn build      # Production build (static)
yarn start      # Serve production build
```

## Content Updates

To update site content, edit `content/profile.yaml`. The schema:
- `name`, `title`, `location`, `bio` — Hero section
- `badge` — Small label above the name
- `experience[]` — Timeline cards (company, role, period, location, highlights, tech)
- `projects[]` — Project cards (title, description, longDescription, tech, highlights, links, featured)
- `skills[]` — Grouped skill badges (name, items[])
- `social` — Footer links (github, linkedin, email)

## Implementation History

See `docs/superpowers/plans/2026-04-12-portfolio-redesign.md` for the original implementation plan and `docs/superpowers/specs/2026-04-12-portfolio-redesign-design.md` for the design spec.

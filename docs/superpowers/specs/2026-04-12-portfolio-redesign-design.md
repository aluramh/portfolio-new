# Portfolio Redesign — Design Spec

## Overview

Clean rebuild of the portfolio site for a senior software engineer with 10 years of experience. Modern, bold SaaS-inspired design with emerald/teal accent color used sparingly against a neutral palette. No sidebar, no persistent nav links, no customization panel. Content-first, scroll-driven single page.

## Stack

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui
- CSS/Tailwind animations only (no Framer Motion)
- YAML-based content layer

## Data Layer

A single `content/profile.yaml` file serves as the source of truth for all personal data. A `content/parser.ts` module parses the YAML at build time and exports a fully typed `Profile` object. No content is hardcoded in components.

The YAML schema supports:

- `name`, `title`, `years`, `location`, `summary` (bio)
- `links` — github, linkedin, email
- `experience[]` — company, role, period, location, highlights[], tech[], logo? (optional image path)
- `projects[]` — title, description, longDescription?, highlights[], tech[], links? (github, live), image? (optional), featured? (boolean)
- `skills` — categories with name and items[]
- `meta` — site title, description, ogImage?

The `resume.pdf` file lives alongside the YAML in `content/`.

## Directory Structure

```
content/
  profile.yaml          # all personal data
  resume.pdf            # downloadable resume
  parser.ts             # YAML → typed Profile object
app/
  layout.tsx            # root layout, fonts, theme provider
  page.tsx              # composes all sections
  globals.css           # global styles
components/
  layout/
    navbar.tsx           # thin sticky top bar
    footer.tsx           # contact footer
  sections/
    hero.tsx
    experience.tsx
    projects.tsx
    skills.tsx
  ui/
    ...                  # shadcn/ui components (kept as-is)
  theme-toggle.tsx
  theme-provider.tsx
lib/
  utils.ts              # shadcn cn() helper (kept for compatibility)
```

Old components deleted: `app-sidebar.tsx`, `customization-panel.tsx`, `main-content.tsx`, `site-header.tsx`, `components/sections/*` (replaced by new ones).

## Visual Direction

- **Style:** Clean, modern SaaS feel with bold typography
- **Color:** 90% neutral (black, gray, white) with emerald/teal as a true accent — used only for badges, CTAs, active states, hover effects, and the experience timeline
- **Typography:** Geist Sans (already in project)
- **Dark mode:** Full support via existing theme provider
- **Animations:** CSS-only — subtle fade-ins on scroll (via Intersection Observer), hover elevations on cards

## Sections

### 1. Navbar

Thin, sticky bar fixed at the top.

- **Left:** Name as text, links to top of page
- **Right:** "Resume" download button + theme toggle
- **Scroll behavior:** Transparent at top, gains backdrop blur + subtle bottom border after ~50px of scroll
- **Mobile:** Same layout with tighter spacing, no hamburger menu

### 2. Hero

Full viewport height, centered content.

- Small emerald badge: "10+ years experience"
- Name — largest heading on the page
- Title — muted subtitle
- Location — small text with icon
- Bio — 1–2 sentences from YAML
- Two CTAs: "View Projects" (emerald filled, scrolls to projects) and "Get in Touch" (outline, scrolls to footer)
- Subtle CSS fade-in on load
- Generous whitespace

### 3. Experience

Vertical timeline, most recent first.

- Thin emerald vertical line on the left
- Small emerald dot connecting each entry to the line
- Each entry is a card containing:
  - Company name (bold)
  - Role title + location
  - Time period
  - 2–3 highlight bullets
  - Tech stack badges
- Cards fade in on scroll (CSS + Intersection Observer)
- Subtle hover effect (elevation or border change)

### 4. Projects

Featured + grid layout.

- One **featured project** card spanning full width at the top:
  - Title, longer description (2–3 sentences), highlight bullets, tech badges, links (GitHub/live), optional image
- **2-column grid** below with 2–4 smaller project cards:
  - Title, short description, tech badges, links, optional image
- Grid collapses to 1 column on mobile
- Cards have subtle border, hover elevation
- Fade-in on scroll
- YAML supports optional `image` field per project (e.g. company logo)

### 5. Skills

Grouped by category, curated.

- 3–4 column grid of skill groups
- Each group: category heading + skill badges/chips
- No proficiency bars or ratings
- Section heading with subtitle: "Technologies I work with regularly"
- Collapses to 2 columns (tablet) → 1 column (mobile)

### 6. Footer

Compact contact footer.

- Horizontal divider at the top
- Name on the left
- Social/contact icon buttons on the right (GitHub, LinkedIn, Email)
- Small muted copyright line at bottom
- Links use emerald on hover
- No contact form

# Portfolio "Magic" Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Layer personality (pixel portrait, multi-accent palette, Playfair + Oswald typography, restrained motion) onto the existing portfolio without breaking its structure. Add three sections: hero summary blurb (slot only), Selected Work (new), Education (new).

**Architecture:** Server components read content from `content/parser.ts`; client components handle animations (existing pattern). All content stays in `content/profile.yaml`. CSS-only animations via Tailwind 4's `@theme` + custom keyframes — no `framer-motion`. Static export preserved.

**Tech Stack:** Next.js 15 (App Router, static export) · React 19 · Tailwind CSS 4 · TypeScript · Yarn 4 PnP · `next/font/google` for Playfair Display + Oswald · existing `geist` package for Geist Sans + Mono.

---

## Spec Reference

Source spec: `docs/superpowers/specs/2026-05-04-portfolio-magic-design.md`. Read it before starting — it contains design rationale this plan does not repeat.

## Verification Notes (Project-Specific)

This codebase **has no test suite**. `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`, so `yarn build` will succeed even with type/lint errors. Per CLAUDE.md, real validation comes from:

- `yarn lint` — manually run after each task
- `yarn dev` + browser inspection — manually verify each visual task on `http://localhost:3000`
- Editor TypeScript output — for type errors that `yarn build` swallows

Do **not** add a test framework — the spec explicitly forbids new dependencies.

Each task below ends with a **Verify** step listing the exact command(s) and what to look for.

## File Structure

**Created:**
- `components/portrait.tsx` — client component, pixel-art body+arm with wave animation
- `components/sections/selected-work.tsx` — server, renders cards from `profile.selectedWork`
- `components/sections/selected-work-card.tsx` — client, count-up + hover lift
- `components/sections/education.tsx` — server, two-card layout
- `lib/accents.ts` — `Accent` type + `accentClasses()` mapping to Tailwind class strings
- `public/portrait/pixel_me_body.png` — sprite asset
- `public/portrait/pixel_me_arm.png` — sprite asset (independently positioned for wave)

**Modified:**
- `app/layout.tsx` — load Playfair Display + Oswald via `next/font/google`
- `app/globals.css` — multi-accent palette tokens (light + dark), dot-grid background, sheen + wave keyframes, reduced-motion gating
- `app/page.tsx` — add `<SelectedWorkSection />` and `<EducationSection />` to section order
- `content/profile.yaml` — append `selected_work` and `education` blocks
- `content/parser.ts` — add `Accent`, `SelectedWork`, `Education` types; extend `Profile`; add snake→camel mapping
- `components/sections/hero.tsx` — visual rebuild (Playfair name, Oswald eyebrow, Portrait, sheen, summary slot)
- `components/sections/experience.tsx` — minor: Playfair section heading
- `components/sections/experience-card.tsx` — Playfair company, Oswald metadata, accent-cycled tech tags
- `components/sections/skills.tsx` — minor: Playfair section heading
- `components/sections/skills-grid.tsx` — accent cycling per group, accent-tinted badges
- `components/layout/navbar-client.tsx` — Playfair italic brand, Oswald uppercase Resume label
- `components/layout/footer.tsx` — Playfair italic name

**NOT touched:** `resume.md`, `next.config.mjs`, `package.json`, `tsconfig.json`, `components/ui/*`, `lib/utils.ts`.

---

## Task 1: Load Playfair Display + Oswald fonts

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace the font imports + body styling**

Open `app/layout.tsx`. Replace the entire file content with:

```tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display, Oswald } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/content/parser"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-eyebrow",
})

export const metadata: Metadata = {
  title: profile.meta.siteTitle,
  description: profile.meta.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${oswald.variable}`}
    >
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

The two new variables (`--font-display`, `--font-eyebrow`) become available as Tailwind utilities via `globals.css` in Task 2.

- [ ] **Step 2: Verify**

Run: `yarn lint`
Expected: clean (or pre-existing warnings only — no new errors).

Run: `yarn dev`, open `http://localhost:3000`, open DevTools → Network tab, reload. Confirm two new font requests for `Playfair Display` (one regular 400 italic, one 800 normal) and `Oswald` (400 + 700) load from `fonts.googleapis.com`. The page should look unchanged visually since nothing uses these fonts yet.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(layout): load Playfair Display + Oswald fonts"
```

---

## Task 2: Extend palette + dot grid + motion keyframes in globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/globals.css` entirely**

This task makes the largest single CSS change. Replace the whole file with:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  /* Cream / warm-light backdrop */
  --background: oklch(0.974 0.011 89);
  --foreground: oklch(0.18 0.01 60);

  --card: oklch(0.99 0.005 89);
  --card-foreground: oklch(0.18 0.01 60);
  --popover: oklch(0.99 0.005 89);
  --popover-foreground: oklch(0.18 0.01 60);

  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.92 0.01 89);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.92 0.01 89);
  --muted-foreground: oklch(0.5 0.02 60);
  --accent: oklch(0.92 0.01 89);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.86 0.012 89);
  --input: oklch(0.86 0.012 89);
  --ring: oklch(0.6 0.015 89);
  --radius: 0.625rem;

  /* Multi-accent palette (light mode — darker tones for contrast on cream) */
  --emerald: oklch(0.55 0.15 163);
  --emerald-foreground: oklch(0.99 0.005 89);
  --emerald-muted: oklch(0.93 0.05 163);

  --amber: oklch(0.50 0.13 65);
  --amber-foreground: oklch(0.99 0.005 89);
  --amber-muted: oklch(0.95 0.06 85);

  --blue: oklch(0.50 0.20 260);
  --blue-foreground: oklch(0.99 0.005 89);
  --blue-muted: oklch(0.93 0.06 260);

  --pink: oklch(0.50 0.20 0);
  --pink-foreground: oklch(0.99 0.005 89);
  --pink-muted: oklch(0.94 0.06 0);

  /* Dot-grid color (light mode) */
  --grid-dot: rgba(0, 0, 0, 0.05);
}

.dark {
  /* Charcoal backdrop — explicitly NOT near-black */
  --background: oklch(0.225 0.005 264);
  --foreground: oklch(0.985 0 0);

  --card: oklch(0.26 0.008 264);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.225 0.005 264);
  --popover-foreground: oklch(0.985 0 0);

  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.30 0.008 264);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.30 0.008 264);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.30 0.008 264);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.32 0.008 264);
  --input: oklch(0.32 0.008 264);
  --ring: oklch(0.45 0.008 264);

  /* Multi-accent palette (dark mode — vibrant tones for contrast on charcoal) */
  --emerald: oklch(0.696 0.145 163);
  --emerald-foreground: oklch(0.99 0 0);
  --emerald-muted: oklch(0.27 0.06 163);

  --amber: oklch(0.78 0.15 75);
  --amber-foreground: oklch(0.18 0 0);
  --amber-muted: oklch(0.27 0.06 75);

  --blue: oklch(0.66 0.18 260);
  --blue-foreground: oklch(0.99 0 0);
  --blue-muted: oklch(0.27 0.07 260);

  --pink: oklch(0.70 0.20 0);
  --pink-foreground: oklch(0.99 0 0);
  --pink-muted: oklch(0.27 0.07 0);

  /* Dot-grid color (dark mode) */
  --grid-dot: rgba(255, 255, 255, 0.07);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --color-emerald: var(--emerald);
  --color-emerald-foreground: var(--emerald-foreground);
  --color-emerald-muted: var(--emerald-muted);
  --color-amber: var(--amber);
  --color-amber-foreground: var(--amber-foreground);
  --color-amber-muted: var(--amber-muted);
  --color-blue: var(--blue);
  --color-blue-foreground: var(--blue-foreground);
  --color-blue-muted: var(--blue-muted);
  --color-pink: var(--pink);
  --color-pink-foreground: var(--pink-foreground);
  --color-pink-muted: var(--pink-muted);

  --font-display: var(--font-display);
  --font-eyebrow: var(--font-eyebrow);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-background text-foreground;
    background-image: radial-gradient(circle at 1px 1px, var(--grid-dot) 1px, transparent 0);
    background-size: 20px 20px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}

/* Scroll-triggered fade-in (existing) */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
.animate-on-scroll { opacity: 0; }
.animate-on-scroll.is-visible { animation: fade-in-up 0.6s ease-out forwards; }

/* Hero stagger (existing) */
.hero-stagger > * {
  opacity: 0;
  animation: fade-in-up 0.6s ease-out forwards;
}
.hero-stagger > *:nth-child(1) { animation-delay: 0ms; }
.hero-stagger > *:nth-child(2) { animation-delay: 100ms; }
.hero-stagger > *:nth-child(3) { animation-delay: 200ms; }
.hero-stagger > *:nth-child(4) { animation-delay: 300ms; }
.hero-stagger > *:nth-child(5) { animation-delay: 400ms; }
.hero-stagger > *:nth-child(6) { animation-delay: 500ms; }

/* Sheen sweep across the hero italic accent */
@keyframes sheen-sweep {
  0%, 80%   { background-position: 100% 0; }
  90%       { background-position: -100% 0; }
  100%      { background-position: -100% 0; }
}
.text-sheen {
  background: linear-gradient(
    90deg,
    var(--emerald) 0%,
    var(--emerald) 30%,
    var(--foreground) 50%,
    var(--emerald) 70%,
    var(--emerald) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: sheen-sweep 6s ease-in-out infinite;
}

/* Pixel portrait wave */
@keyframes portrait-wave {
  0%, 80%, 100% { transform: rotate(0); }
  85%           { transform: rotate(-20deg); }
  90%           { transform: rotate(20deg); }
  95%           { transform: rotate(0); }
}
.portrait-arm {
  transform-origin: top center;
  animation: portrait-wave 8s ease-in-out infinite;
}

/* Reduced motion: pause sheen + wave; keep fades short and snappy */
@media (prefers-reduced-motion: reduce) {
  .text-sheen { animation: none; -webkit-text-fill-color: var(--emerald); color: var(--emerald); }
  .portrait-arm { animation: none; }
  .animate-fade-in-up,
  .animate-on-scroll.is-visible,
  .hero-stagger > * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}

/* Alternating section bg (existing) */
section:nth-child(even) {
  @apply bg-muted/30;
}
```

Key changes from old file:
- `--background` switched from white to **cream** in light mode and from very-dark to **charcoal** in dark mode
- `--amber`, `--blue`, `--pink` palette tokens added (with `-foreground` and `-muted` variants for each)
- `--grid-dot` token defined per mode
- `body` gets a `radial-gradient` dot-grid background applied site-wide
- New keyframes: `sheen-sweep`, `portrait-wave`
- `prefers-reduced-motion` block disables decorative motion and short-circuits all fade animations

- [ ] **Step 2: Verify**

Run: `yarn lint`
Expected: clean.

Run: `yarn dev`, open `http://localhost:3000`. Verify:
- Light mode shows a cream/warm background with a subtle dot pattern (not pure white)
- Toggle to dark mode → charcoal bg with white dot pattern (not near-black)
- Existing emerald accents still emerald (palette token migration preserved hue)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(theme): multi-accent palette, dot grid, sheen + wave keyframes"
```

---

## Task 3: Add `lib/accents.ts` utility

**Files:**
- Create: `lib/accents.ts`

This util maps an `Accent` value to the Tailwind class strings used by accent-aware components. Keeps Tailwind's class detector happy (it only sees full literal class names) while letting components vary by accent.

- [ ] **Step 1: Create `lib/accents.ts`**

```typescript
export type Accent = "emerald" | "amber" | "blue" | "pink"

export interface AccentClasses {
  text: string
  bg: string
  bgMuted: string
  border: string
  borderMuted: string
  stripe: string
}

const TABLE: Record<Accent, AccentClasses> = {
  emerald: {
    text: "text-emerald",
    bg: "bg-emerald",
    bgMuted: "bg-emerald-muted",
    border: "border-emerald/30",
    borderMuted: "border-emerald/15",
    stripe: "bg-emerald",
  },
  amber: {
    text: "text-amber",
    bg: "bg-amber",
    bgMuted: "bg-amber-muted",
    border: "border-amber/30",
    borderMuted: "border-amber/15",
    stripe: "bg-amber",
  },
  blue: {
    text: "text-blue",
    bg: "bg-blue",
    bgMuted: "bg-blue-muted",
    border: "border-blue/30",
    borderMuted: "border-blue/15",
    stripe: "bg-blue",
  },
  pink: {
    text: "text-pink",
    bg: "bg-pink",
    bgMuted: "bg-pink-muted",
    border: "border-pink/30",
    borderMuted: "border-pink/15",
    stripe: "bg-pink",
  },
}

export const ACCENT_CYCLE: readonly Accent[] = ["emerald", "amber", "blue", "pink"]

export function accentClasses(accent: Accent): AccentClasses {
  return TABLE[accent]
}

export function accentByIndex(index: number): Accent {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length]
}
```

- [ ] **Step 2: Verify**

Run: `yarn lint`
Expected: clean. (No imports yet — pure type/data module.)

- [ ] **Step 3: Commit**

```bash
git add lib/accents.ts
git commit -m "feat(lib): add accent → Tailwind class mapping util"
```

---

## Task 4: Extend `content/parser.ts` with new types

**Files:**
- Modify: `content/parser.ts`

- [ ] **Step 1: Replace `content/parser.ts` entirely**

```typescript
import { readFileSync } from "fs"
import { join } from "path"
import { parse } from "yaml"
import type { Accent } from "@/lib/accents"

export type { Accent }

export interface ProfileLink {
  github: string
  linkedin: string
  email: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  logo?: string
  highlights: string[]
  tech: string[]
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Meta {
  siteTitle: string
  description: string
  ogImage?: string
}

export interface SelectedWork {
  title: string
  company: string
  description: string
  stat: string
  statValue?: number
  statLabel: string
  tags: string[]
  accent: Accent
}

export interface Education {
  school: string
  shortName?: string
  location: string
  degree: string
  year: string
  note?: string
}

export interface Profile {
  meta: Meta
  name: string
  title: string
  years: number
  location: string
  summary: string
  links: ProfileLink
  experience: Experience[]
  skills: SkillGroup[]
  selectedWork: SelectedWork[]
  education: Education[]
}

interface RawSelectedWork {
  title: string
  company: string
  description: string
  stat: string
  stat_value?: number
  stat_label: string
  tags: string[]
  accent: Accent
}

interface RawEducation {
  school: string
  short_name?: string
  location: string
  degree: string
  year: string
  note?: string
}

interface RawProfile extends Omit<Profile, "selectedWork" | "education"> {
  selected_work?: RawSelectedWork[]
  education?: RawEducation[]
}

const filePath = join(process.cwd(), "content", "profile.yaml")
const fileContents = readFileSync(filePath, "utf8")
const raw = parse(fileContents) as RawProfile

export const profile: Profile = {
  ...raw,
  selectedWork: (raw.selected_work ?? []).map((sw) => ({
    title: sw.title,
    company: sw.company,
    description: sw.description,
    stat: sw.stat,
    statValue: sw.stat_value,
    statLabel: sw.stat_label,
    tags: sw.tags,
    accent: sw.accent,
  })),
  education: (raw.education ?? []).map((e) => ({
    school: e.school,
    shortName: e.short_name,
    location: e.location,
    degree: e.degree,
    year: e.year,
    note: e.note,
  })),
}
```

Snake-case keys come from YAML; camel-case keys go to consumers. The mapping is targeted (two arrays, six fields) — not a generic snake-to-camel converter.

- [ ] **Step 2: Verify**

Run: `yarn lint`
Expected: clean. (TS errors at this stage are silent — we'll catch them through editor at edit time and through `yarn dev` runtime if mappings break.)

Run: `yarn dev`, open `http://localhost:3000`. Page should still render (we haven't added YAML data yet, so `selectedWork` and `education` arrays are empty). No runtime errors in console.

- [ ] **Step 3: Commit**

```bash
git add content/parser.ts
git commit -m "feat(parser): add SelectedWork + Education types, snake→camel mapping"
```

---

## Task 5: Append content to `content/profile.yaml`

**Files:**
- Modify: `content/profile.yaml`

- [ ] **Step 1: Append to the bottom of `content/profile.yaml`**

Add this content after the existing `skills:` block. Do not modify any existing content.

```yaml

selected_work:
  - title: "Enterprise change management at scale"
    company: "Atlassian"
    description: "Deployment freeze scheduling, experiment management, and cross-product change awareness."
    stat: "500K+"
    stat_value: 500000
    stat_label: "seats across 55+ organizations"
    tags: [TypeScript, React, Statsig]
    accent: emerald

  - title: "Test Summary Report agent"
    company: "NatWest · via Atlassian Rovo"
    description: "Rovo AI agent that auto-populates governance-critical TSRs by querying Jira via JQL."
    stat: "hours → minutes"
    stat_label: "TSR production time"
    tags: [Rovo, AI/LLM, Jira, JQL]
    accent: amber

  - title: "Real-time vessel tracking platform"
    company: "Ocean Freight Exchange"
    description: "Full-stack vessel tracking + subscription billing; work contributed to the company's Series A."
    stat: "$3.3M"
    stat_value: 3300000
    stat_label: "Series A · 72K+ vessels"
    tags: [Full-Stack, Real-Time, Chargebee]
    accent: pink

education:
  - school: "Southern Methodist University"
    short_name: "SMU"
    location: "Dallas, TX"
    degree: "M.S. Computer Science"
    year: "May 2016"

  - school: "Instituto Tecnológico de Monterrey"
    short_name: "ITESM"
    location: "Monterrey, MX"
    degree: "B.S. Digital Systems and Robotics Engineering"
    year: "June 2016"
    note: "Dual-degree partnership with SMU"
```

- [ ] **Step 2: Verify**

Run: `yarn dev`, open `http://localhost:3000`. Page still renders unchanged (data loaded but no component reads it yet). No console errors. If YAML is malformed, the page will fail to compile — fix indentation if so.

- [ ] **Step 3: Commit**

```bash
git add content/profile.yaml
git commit -m "content: add selected_work and education blocks"
```

---

## Task 6: Pixel portrait assets + `Portrait` component

**Files:**
- Create: `public/portrait/pixel_me_body.png`
- Create: `public/portrait/pixel_me_arm.png`
- Create: `components/portrait.tsx`

- [ ] **Step 1: Download the sprites from alexram.dev**

Run from project root:

```bash
mkdir -p public/portrait
curl -L -A "Mozilla/5.0" -o /tmp/old-site.html https://www.alexram.dev/
# extract the two image asset URLs
grep -oE '/_next/static/image/assets/images/pixel_me_(body|arm)\.[a-z0-9]+\.png' /tmp/old-site.html | sort -u
```

Copy the two URLs that print (they will look like `/_next/static/image/assets/images/pixel_me_body.<hash>.png` and `/_next/static/image/assets/images/pixel_me_arm.<hash>.png`). Then download each:

```bash
# replace <PATH> with each path printed by the grep above
curl -L -A "Mozilla/5.0" -o public/portrait/pixel_me_body.png "https://www.alexram.dev<PATH-FOR-BODY>"
curl -L -A "Mozilla/5.0" -o public/portrait/pixel_me_arm.png  "https://www.alexram.dev<PATH-FOR-ARM>"
```

If the live site no longer serves these (or the asset paths have changed), open `https://www.alexram.dev/` in a browser, find the body + arm sprite via DevTools, and save them manually as `pixel_me_body.png` and `pixel_me_arm.png` in `public/portrait/`.

Verify both files exist and are non-zero bytes:

```bash
ls -la public/portrait/
# both files should be > 1KB
```

- [ ] **Step 2: Create `components/portrait.tsx`**

```tsx
"use client"

interface PortraitProps {
  /** Container width in px. Height scales by sprite aspect ratio. */
  size?: number
  className?: string
}

export function Portrait({ size = 120, className = "" }: PortraitProps) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: size,
        height: Math.round(size * (160 / 120)),
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/portrait/pixel_me_body.png"
        alt=""
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/portrait/pixel_me_arm.png"
        alt=""
        className="portrait-arm absolute inset-0 w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}
```

- The `aria-hidden="true"` is intentional: the portrait is decorative; the hero name is the textual identity.
- The `.portrait-arm` class on the second `<img>` activates the keyframe animation defined in Task 2's globals.css.
- Sizes default to 120×160; consumer can override.

- [ ] **Step 3: Verify**

Run: `yarn lint`
Expected: clean.

The component is built but not rendered yet. Quick smoke-check by adding `<Portrait />` temporarily to `app/page.tsx`'s `<main>` (then removing it before commit):

```tsx
// inside <main>
<Portrait />
```

Run: `yarn dev`, browse to `/`. You should see the pixel sprite. The arm should wave once ~7s after page load (keyframe at 80%-100% of an 8s cycle). Remove the temporary insertion before committing.

- [ ] **Step 4: Commit**

```bash
git add public/portrait/ components/portrait.tsx
git commit -m "feat(portrait): pixel sprites + waving arm component"
```

---

## Task 7: `SelectedWorkCard` client component (count-up + hover)

**Files:**
- Create: `components/sections/selected-work-card.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { accentClasses } from "@/lib/accents"
import type { SelectedWork } from "@/content/parser"

const COUNT_UP_DURATION_MS = 1500

export function SelectedWorkCard({ work }: { work: SelectedWork }) {
  const ref = useAnimateOnScroll<HTMLElement>()
  const a = accentClasses(work.accent)

  return (
    <article
      ref={ref}
      className="animate-on-scroll group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`h-1 ${a.stripe} group-hover:h-1.5 transition-all duration-200`} aria-hidden="true" />

      <div className="flex flex-col gap-3 p-6">
        <Stat work={work} accentText={a.text} />
        <h3 className="font-display text-xl font-bold tracking-tight">
          {work.title}
        </h3>
        <p className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {work.company}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {work.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={`text-xs font-normal ${a.bgMuted} ${a.border} ${a.text}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  )
}

function Stat({ work, accentText }: { work: SelectedWork; accentText: string }) {
  const [animatedValue, setAnimatedValue] = useState<number | null>(
    work.statValue !== undefined ? 0 : null
  )
  const [done, setDone] = useState(work.statValue === undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (work.statValue === undefined) return
    const node = containerRef.current
    if (!node) return

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setDone(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const target = work.statValue!
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / COUNT_UP_DURATION_MS)
            const eased = 1 - Math.pow(1 - t, 3)
            setAnimatedValue(Math.floor(eased * target))
            if (t < 1) {
              requestAnimationFrame(tick)
            } else {
              setDone(true)
            }
          }
          requestAnimationFrame(tick)
          observer.unobserve(node)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [work.statValue])

  const display = done || animatedValue === null
    ? work.stat
    : animatedValue.toLocaleString()

  return (
    <div ref={containerRef} className="flex flex-col">
      <span
        className={`font-display text-5xl font-extrabold tracking-tight tabular-nums ${accentText}`}
      >
        {display}
      </span>
      <span className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {work.statLabel}
      </span>
    </div>
  )
}
```

Notes:
- `tabular-nums` on the stat keeps width stable while the count-up runs.
- `Stat` lives in the same file because it's tightly coupled to the card and not reused elsewhere.
- Existing `useAnimateOnScroll` hook handles the card-level fade-in.
- IntersectionObserver fires once at 50% visibility, then disconnects.

- [ ] **Step 2: Verify**

Run: `yarn lint`
Expected: clean.

The component is unused so far — no visual change yet.

- [ ] **Step 3: Commit**

```bash
git add components/sections/selected-work-card.tsx
git commit -m "feat(selected-work): card with count-up + hover lift"
```

---

## Task 8: `SelectedWorkSection` server component

**Files:**
- Create: `components/sections/selected-work.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { profile } from "@/content/parser"
import { SelectedWorkCard } from "./selected-work-card"

export function SelectedWorkSection() {
  if (profile.selectedWork.length === 0) return null

  return (
    <section id="selected-work" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-emerald mb-3">// selected work</p>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
          Selected Work
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {profile.selectedWork.map((work) => (
            <SelectedWorkCard
              key={`${work.company}-${work.title}`}
              work={work}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `yarn lint`
Expected: clean.

Still not wired into `page.tsx` — verify there's no compile error by saving the file with the dev server running (`yarn dev`).

- [ ] **Step 3: Commit**

```bash
git add components/sections/selected-work.tsx
git commit -m "feat(selected-work): section component"
```

---

## Task 9: `EducationSection` server component

**Files:**
- Create: `components/sections/education.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { profile } from "@/content/parser"

export function EducationSection() {
  if (profile.education.length === 0) return null

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl font-extrabold tracking-tight mb-10">
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.education.map((e) => (
            <article
              key={e.school}
              className="rounded-lg border border-border/60 bg-card p-6"
            >
              {e.shortName && (
                <p className="font-eyebrow text-xs uppercase tracking-[0.15em] text-emerald mb-2">
                  {e.shortName}
                </p>
              )}
              <h3 className="font-display text-xl font-bold tracking-tight mb-2">
                {e.school}
              </h3>
              <p className="text-sm">{e.degree}</p>
              <p className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground mt-2">
                {e.year} · {e.location}
              </p>
              {e.note && (
                <p className="text-xs italic text-muted-foreground mt-3">
                  {e.note}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `yarn lint`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add components/sections/education.tsx
git commit -m "feat(education): section component"
```

---

## Task 10: Wire new sections into `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero"
import { SelectedWorkSection } from "@/components/sections/selected-work"
import { ExperienceSection } from "@/components/sections/experience"
import { SkillsSection } from "@/components/sections/skills"
import { EducationSection } from "@/components/sections/education"
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SelectedWorkSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify**

Run: `yarn dev`, open `http://localhost:3000`. Three things to confirm:

1. New "Selected Work" section appears after the hero, with three cards (emerald / amber / pink stripes).
2. New "Education" section appears after Skills with two cards (SMU + ITESM).
3. Scroll the Selected Work cards into view; the "500K+" card should count up on entry. The "$3.3M" card too. The "hours → minutes" card renders statically (no `stat_value`).

Toggle dark/light mode — both should look correct.

Hover over a card → it lifts and stripe widens.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(page): add Selected Work + Education sections"
```

---

## Task 11: Hero rebuild

**Files:**
- Modify: `components/sections/hero.tsx`

- [ ] **Step 1: Replace `components/sections/hero.tsx`**

```tsx
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portrait } from "@/components/portrait"
import { profile } from "@/content/parser"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-3xl hero-stagger flex flex-col items-center">
        <Portrait size={120} className="mb-6" />

        <p className="font-eyebrow text-xs uppercase tracking-[0.2em] text-emerald mb-4">
          Senior · Software Engineer
        </p>

        <h1 className="font-display font-extrabold tracking-tight text-5xl md:text-7xl mb-3 leading-[0.95]">
          Alejandro{" "}
          <span className="text-sheen italic font-normal">Ramirez</span>
        </h1>

        <p className="font-eyebrow text-sm uppercase tracking-[0.15em] text-muted-foreground mb-8">
          {profile.years}+ Years · Atlassian · {profile.location}
        </p>

        {profile.summary && (
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {profile.summary}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-emerald hover:bg-emerald/90 text-emerald-foreground rounded-full px-8"
          >
            <a href="#selected-work">
              View Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

Changes from current:
- Removed the calendar `Badge` (`years+ years experience`) — info now lives in the eyebrow line below the name.
- Added `<Portrait>` at top.
- Eyebrow line in Oswald uppercase (`font-eyebrow`).
- Name in Playfair Display 800 (`font-display`); surname in italic with `text-sheen` class (sheen animation).
- Metadata line in Oswald uppercase under the name.
- "View Experience" CTA renamed to "View Work" and points to `#selected-work`.

- [ ] **Step 2: Verify**

Run: `yarn lint`
Expected: clean.

Run: `yarn dev`, open `/`. Verify:
- Pixel portrait shows centered above the eyebrow
- Eyebrow line in condensed uppercase (Oswald)
- "Alejandro Ramirez" — first word in serif bold, second word in serif italic with the sheen sweep animating every ~6 seconds
- Metadata line in Oswald uppercase, muted color
- "View Work" button links to Selected Work; "Get in Touch" to Contact (footer)

Toggle dark/light mode. Both legible.

In DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Sheen should freeze (text appears in solid emerald). Wave should freeze.

- [ ] **Step 3: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat(hero): pixel portrait, Playfair name, sheen, Oswald eyebrow"
```

---

## Task 12: Experience retreat

**Files:**
- Modify: `components/sections/experience.tsx`
- Modify: `components/sections/experience-card.tsx`

- [ ] **Step 1: Replace `components/sections/experience.tsx`**

```tsx
import { profile } from "@/content/parser"
import { ExperienceCard } from "./experience-card"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
          Experience
        </h2>

        <div className="relative">
          {profile.experience.map((exp, i) => (
            <ExperienceCard key={`${exp.company}-${exp.role}`} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

(Only change: section heading uses `font-display` and `font-extrabold` instead of plain `font-bold`.)

- [ ] **Step 2: Replace `components/sections/experience-card.tsx`**

```tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { accentByIndex, accentClasses } from "@/lib/accents"
import type { Experience } from "@/content/parser"

export function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const ref = useAnimateOnScroll<HTMLDivElement>()
  const a = accentClasses(accentByIndex(index))

  return (
    <div className="relative pl-8 pb-12 last:pb-0 group">
      {/* Timeline line */}
      <div
        className="absolute left-[7px] top-2 bottom-0 w-px group-last:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)",
        }}
      />

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full bg-emerald" />

      {/* Card */}
      <div
        ref={ref}
        className="animate-on-scroll rounded-lg border border-l-2 border-border/60 border-l-emerald/40 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-sm hover:-translate-y-0.5"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
          <h3 className="font-display text-lg font-bold">{experience.company}</h3>
          <span className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {experience.period}
          </span>
        </div>

        <p className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">
          {experience.role} · {experience.location}
        </p>

        <ul className="mt-4 space-y-2">
          {experience.highlights.map((h, i) => (
            <li
              key={i}
              className="text-sm text-muted-foreground leading-relaxed flex gap-2"
            >
              <span className="text-emerald mt-1 shrink-0">•</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {experience.tech.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className={`text-xs font-normal ${a.bgMuted} ${a.border} ${a.text}`}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
```

Changes from current:
- Timeline dot: now solid emerald (was outlined).
- Timeline line: gradient (transparent → border → transparent).
- Card: added `border-l-2 border-l-emerald/40` (thin emerald accent stripe).
- Company name: `font-display` (Playfair).
- Period + role+location lines: `font-eyebrow` uppercase tracking.
- Tech tags: accent-tinted, accent cycles per role via `accentByIndex(index)`.

- [ ] **Step 3: Verify**

Run: `yarn lint`
Expected: clean.

Run: `yarn dev`, open `/`, scroll to Experience. Verify:
- Timeline dots are filled emerald
- Timeline line softly fades at top/bottom
- Each card has a thin emerald stripe on its left edge
- Company names in serif (Playfair); period/role lines in condensed uppercase (Oswald)
- Tech badges are accent-tinted (first role emerald, second amber, third blue, fourth pink, fifth emerald, sixth amber — per `accentByIndex`)
- Hover → card lifts 2px

Light mode: same layout, accents readable on cream.

- [ ] **Step 4: Commit**

```bash
git add components/sections/experience.tsx components/sections/experience-card.tsx
git commit -m "feat(experience): Playfair company, Oswald metadata, accent-cycled tech tags"
```

---

## Task 13: Skills retreat

**Files:**
- Modify: `components/sections/skills.tsx`
- Modify: `components/sections/skills-grid.tsx`

- [ ] **Step 1: Replace `components/sections/skills.tsx`**

```tsx
import { profile } from "@/content/parser"
import { SkillsGrid } from "./skills-grid"

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Skills
        </h2>
        <p className="text-muted-foreground mb-12">
          Technologies I work with regularly.
        </p>

        <SkillsGrid skills={profile.skills} />
      </div>
    </section>
  )
}
```

(Only change: heading uses `font-display` and `font-extrabold`.)

- [ ] **Step 2: Replace `components/sections/skills-grid.tsx`**

```tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { accentByIndex, accentClasses } from "@/lib/accents"
import type { SkillGroup } from "@/content/parser"

export function SkillsGrid({ skills }: { skills: SkillGroup[] }) {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {skills.map((group, i) => {
        const a = accentClasses(accentByIndex(i))
        return (
          <div key={group.name}>
            <h3
              className={`font-eyebrow text-xs uppercase tracking-[0.15em] font-bold mb-3 ${a.text}`}
            >
              {group.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className={`text-xs font-normal ${a.bgMuted} ${a.border} ${a.text}`}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

Changes:
- Group title: `font-eyebrow` uppercase, accent-colored, smaller (was `text-sm font-semibold`).
- Badges: accent-tinted using `accentClasses(accentByIndex(i))`. Same util as ExperienceCard, so visual language is cohesive.
- 8 groups × cycle of 4 = each accent appears twice (deterministic — Languages emerald, Frameworks amber, Testing blue, Feature Flags pink, Monitoring emerald, Cloud & DevOps amber, AI Engineering blue, Practices pink).

- [ ] **Step 3: Verify**

Run: `yarn lint`
Expected: clean.

Run: `yarn dev`, scroll to Skills. Verify:
- Section heading in Playfair
- 8 group columns; each with an accent-colored uppercase Oswald header
- Badges within each group share that group's accent color
- Hover does nothing extra (per spec — restraint)
- Light mode: accents visible on cream

- [ ] **Step 4: Commit**

```bash
git add components/sections/skills.tsx components/sections/skills-grid.tsx
git commit -m "feat(skills): Playfair heading, accent-cycled groups + badges"
```

---

## Task 14: Navbar + Footer retreat

**Files:**
- Modify: `components/layout/navbar-client.tsx`
- Modify: `components/layout/footer.tsx`

- [ ] **Step 1: Replace `components/layout/navbar-client.tsx`**

```tsx
"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function NavbarClient({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-14">
        <a
          href="#"
          className="font-display italic text-base tracking-tight hover:text-emerald transition-colors"
        >
          {name}
        </a>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="font-eyebrow text-xs uppercase tracking-[0.15em] gap-1.5"
          >
            <a href="/resume.pdf" download>
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
```

Changes: brand mark uses `font-display italic`; Resume button label uses `font-eyebrow` uppercase tracking.

- [ ] **Step 2: Replace `components/layout/footer.tsx`**

```tsx
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/parser"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/40 py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display italic text-sm">{profile.name}</span>

        <div className="flex items-center gap-1">
          {profile.links.github && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:text-emerald"
            >
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-emerald"
          >
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-emerald"
          >
            <a href={`mailto:${profile.links.email}`} aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
```

Changes: name in `font-display italic`; year in mono (was a sized span — now explicitly mono for the small visual flourish).

- [ ] **Step 3: Verify**

Run: `yarn lint`
Expected: clean.

Run: `yarn dev`, browse `/`. Verify:
- Navbar: name in italic serif, "Resume" button label in uppercase Oswald
- Footer: name in italic serif, year in mono
- Both modes: legible, no contrast issues

- [ ] **Step 4: Commit**

```bash
git add components/layout/navbar-client.tsx components/layout/footer.tsx
git commit -m "feat(layout): Playfair italic brand + Oswald uppercase labels"
```

---

## Task 15: Final cross-mode and accessibility verification

**Files:**
- No code changes. Smoke-test pass.

- [ ] **Step 1: Full-page check, dark mode**

Run: `yarn dev`, open `/`. With dark mode active, scroll the entire page top-to-bottom. Confirm:
- Hero portrait + name + sheen working; arm waves periodically
- Selected Work cards render with three different accents; count-ups fire on scroll into view
- Experience timeline: dots filled emerald, accent-cycled tech tags
- Skills: 8 groups, accents cycle emerald/amber/blue/pink twice
- Education: two cards
- Footer: italic name, mono year
- Dot grid visible on background throughout

- [ ] **Step 2: Full-page check, light mode**

Toggle to light mode (theme toggle in navbar). Repeat the scroll. Confirm everything is legible — no white-on-white or low-contrast issues. Accent colors still pop on cream.

- [ ] **Step 3: Reduced-motion check**

In DevTools → ⋮ menu → More Tools → Rendering → "Emulate CSS media feature `prefers-reduced-motion`" → set to `reduce`. Reload. Confirm:
- Hero name renders in solid emerald (no sheen)
- Pixel portrait arm does not wave
- Selected Work count-ups jump straight to final values (no animation)
- Scroll fade-ins happen instantly

Disable the emulation when done.

- [ ] **Step 4: Mobile viewport check**

DevTools → toggle device toolbar (`Ctrl+Shift+M`) → iPhone 14 Pro size. Scroll the full page. Confirm:
- Hero portrait + name don't overflow
- Selected Work stacks single-column (`lg:grid-cols-3` only kicks in at `≥1024px`)
- Experience cards readable
- Skills wraps to 1 column at narrow widths (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- Education stacks single-column
- Navbar layout doesn't break

- [ ] **Step 5: Build smoke-test**

```bash
yarn build
```

Expected: build succeeds. (Type/lint errors are silenced by `next.config.mjs` — verify above lint step caught them.) Confirm `out/` directory generates static pages without runtime errors.

- [ ] **Step 6: Commit nothing here, but tag the milestone if desired**

```bash
git log --oneline -16
```

Expected: 14 task commits (Tasks 1–14) on top of `95c483f spec: portfolio "magic" redesign`.

---

## Out-of-Scope Follow-Ups (Do Not Implement)

These are flagged in the spec but explicitly out of scope for this plan:

- **Hero summary blurb content** — slot is wired up; user writes the copy when ready (per `TODO.md`)
- **`public/resume.pdf` content** — placeholder file; user replaces (per `TODO.md`)
- **GitHub link** — user adds to `profile.yaml.links.github` when ready (per `TODO.md`)
- **Pixel portrait refinement** — user iterates on sprite art later
- **`AGENTS.md` content refresh** — `AGENTS.md` describes outdated `Profile` fields (`bio`, `badge`, `projects[]`); needs a follow-up update
- **CLAUDE.md** updates to mention new Selected Work / Education sections — recommended follow-up

---

## Spec Coverage Self-Check

| Spec Section | Implementing Task(s) |
|---|---|
| Visual Language → Palette | Task 2 (globals.css) |
| Visual Language → Typography | Task 1 (layout fonts), Tasks 11–14 (component usage) |
| Visual Language → Motion budget | Task 2 (keyframes), Task 6 (wave on portrait), Task 7 (count-up), Task 11 (sheen on hero name) |
| Site Structure → section order | Task 10 (page.tsx) |
| Component → Navbar | Task 14 |
| Component → Hero | Task 11 |
| Component → Selected Work | Tasks 7, 8 |
| Component → Experience | Task 12 |
| Component → Skills | Task 13 |
| Component → Education | Task 9 |
| Component → Footer | Task 14 |
| Content Layer → profile.yaml | Task 5 |
| Content Layer → parser.ts | Task 4 |
| Pixel Portrait Asset | Task 6 |
| Risk → Server/client boundary | Tasks 7 + 8 (selected-work split), Task 6 (portrait is client) |
| Risk → Font loading layout shift | Task 1 (`display: 'swap'`, restricted weights) |
| Risk → Light-mode parity | Task 2 (palette tokens for both modes), Task 15 (verification) |
| Risk → Reduced motion | Task 2 (CSS media query), Task 7 (JS fallback for count-up), Task 15 (verification) |
| Risk → AGENTS.md drift | Out-of-scope follow-up (flagged) |
| Risk → Static export | Architecture preserved; verified in Task 15 |

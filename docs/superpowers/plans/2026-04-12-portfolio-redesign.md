# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio site as a clean, scroll-driven single page with emerald accent, YAML-based content layer, and modern SaaS-inspired design.

**Architecture:** Single-page Next.js App Router site. All content flows from `content/profile.yaml` through a typed parser. Components are organized into `layout/` (navbar, footer) and `sections/` (hero, experience, projects, skills). CSS-only animations via Tailwind and Intersection Observer. Dark mode via next-themes.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS v4, shadcn/ui, next-themes, yaml (npm package), lucide-react, Geist font

---

### Task 1: Install YAML dependency and create content layer

**Files:**
- Create: `content/profile.yaml`
- Create: `content/parser.ts`

- [ ] **Step 1: Install yaml package**

Run: `yarn add yaml`
Expected: Package added to `package.json` dependencies

- [ ] **Step 2: Create `content/profile.yaml`**

Create the file with all profile data migrated from the existing `lib/profile.ts`. Adapt field names to match the spec schema:

```yaml
meta:
  siteTitle: "Your Name — Senior Software Engineer"
  description: "I build scalable, user-centric web applications."

name: "Your Name"
title: "Senior Software Engineer"
years: 10
location: "Remote • Open to relocation"
summary: >
  I build scalable, user-centric web applications. I thrive in product-focused
  teams where craftsmanship, velocity, and thoughtful DX meet.

links:
  github: "https://github.com/yourname"
  linkedin: "https://www.linkedin.com/in/yourname"
  email: "hello@yourdomain.com"

experience:
  - company: "Acme Corp"
    role: "Senior Software Engineer"
    period: "2022 — Present"
    location: "Remote"
    logo: # optional path to logo image
    highlights:
      - "Led migration to modern React architecture with performance budgets, improving Core Web Vitals across key flows."
      - "Partnered with design to roll out a component library that accelerated feature delivery by 30%."
      - "Mentored engineers, established code health guidelines, and improved on-call processes."
    tech:
      - TypeScript
      - React
      - Next.js
      - Node.js
      - PostgreSQL
      - Playwright

  - company: "Globex"
    role: "Software Engineer"
    period: "2019 — 2022"
    location: "Hybrid"
    logo:
    highlights:
      - "Built multi-tenant APIs and observability pipelines to support product growth."
      - "Introduced CI quality gates and testing strategy, reducing regressions significantly."
    tech:
      - Node.js
      - GraphQL
      - Kubernetes
      - AWS
      - Tailwind CSS

  - company: "Initech"
    role: "Full-Stack Engineer"
    period: "2016 — 2019"
    location: "On-site"
    logo:
    highlights:
      - "Delivered features across the stack while collaborating with product and stakeholders."
      - "Optimized critical paths, improving average page load by 40%."
    tech:
      - React
      - Express
      - MongoDB
      - Jest

projects:
  - title: "Realtime Analytics Dashboard"
    description: "A high-performance analytics dashboard with live updates, charting, and role-based access control."
    longDescription: >
      Designed a streaming-first architecture using WebSockets and server-sent events,
      plus a modular chart layer for extensibility. Instrumented both server and client for observability.
    featured: true
    image: # optional path to screenshot or logo
    highlights:
      - "Sub-200ms end-to-end latency for critical metrics"
      - "Feature-flagged experiments and progressive delivery"
      - "Automated accessibility checks in CI"
    tech:
      - Next.js
      - TypeScript
      - WebSockets
      - Postgres
      - Tailwind CSS
    links:
      live: "https://example.com/analytics"
      github: "https://github.com/yourname/realtime-analytics"

  - title: "Design System"
    description: "A robust design system with tokens, theming, and accessible components used across multiple products."
    longDescription: >
      Delivered tokens, theming, and guidelines to align multiple product teams.
      Shipped a documented component library with usage examples and recipes.
    featured: false
    image:
    highlights:
      - "Ship-ready components with a11y baked in"
      - "Themeable tokens and dark mode"
      - "Figma-to-code handoff improvements"
    tech:
      - Design System
      - Storybook
      - Accessibility
      - CSS Variables
    links:
      live: "https://example.com/design-system"
      github: "https://github.com/yourname/design-system"

  - title: "AI-assisted Code Review"
    description: "A lightweight AI reviewer that surfaces risky changes and suggests improvements in PRs."
    longDescription: >
      Integrated code intelligence with repository metadata to provide contextual
      recommendations and auto-suggest refactors for common pitfalls.
    featured: false
    image:
    highlights:
      - "Reduced review time while improving signal"
      - "Configurable for team conventions"
      - "Privacy-preserving processing"
    tech:
      - AI
      - TypeScript
      - Node.js
      - CI/CD
    links:
      live: "https://example.com/ai-review"
      github: "https://github.com/yourname/ai-code-review"

  - title: "Edge-rendered Marketing Site"
    description: "A fast, localized marketing site with ISR, analytics, and A/B testing support."
    longDescription: >
      Implemented localized routes and caching strategies for a global audience.
      Built a safe experimentation framework integrated with analytics.
    featured: false
    image:
    highlights:
      - "Global edge rendering with low TTFB"
      - "Locale-aware routing and content"
      - "Experimentation framework"
    tech:
      - Next.js
      - Edge
      - i18n
      - A/B Testing
    links:
      live: "https://example.com/edge-marketing"
      github: "https://github.com/yourname/edge-marketing"

  - title: "Performance Budget CLI"
    description: "A CLI to enforce Lighthouse budgets in CI with helpful diffs and recommendations."
    featured: false
    image:
    highlights:
      - "Quick setup with sensible defaults"
      - "Inline PR comments"
      - "Configurable thresholds"
    tech:
      - Node.js
      - CLI
      - Lighthouse
      - DX
    links:
      github: "https://github.com/yourname/perf-budget-cli"

  - title: "Open Source Contribution Tracker"
    description: "A dashboard to visualize contributions across orgs and repos with trend insights."
    featured: false
    image:
    highlights:
      - "Customizable visualizations"
      - "Caching and rate limit handling"
      - "Org-wide insights"
    tech:
      - Next.js
      - GitHub API
      - Charts
      - Postgres
    links:
      live: "https://example.com/oss-tracker"
      github: "https://github.com/yourname/oss-tracker"

skills:
  - name: "Languages & Frameworks"
    items:
      - TypeScript
      - JavaScript
      - Node.js
      - React
      - Next.js
      - HTML
      - CSS

  - name: "Systems & Data"
    items:
      - PostgreSQL
      - Redis
      - REST
      - GraphQL
      - Pragmatic Microservices

  - name: "Tooling & Quality"
    items:
      - Vite
      - ESLint
      - Playwright
      - Jest
      - CI/CD
      - Feature Flags

  - name: "Practices"
    items:
      - Performance
      - Accessibility
      - DX
      - Testing
      - Observability
```

- [ ] **Step 3: Create `content/parser.ts`**

```typescript
import { readFileSync } from "fs"
import { join } from "path"
import { parse } from "yaml"

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

export interface ProjectLinks {
  github?: string
  live?: string
}

export interface Project {
  title: string
  description: string
  longDescription?: string
  featured?: boolean
  image?: string
  highlights: string[]
  tech: string[]
  links?: ProjectLinks
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

export interface Profile {
  meta: Meta
  name: string
  title: string
  years: number
  location: string
  summary: string
  links: ProfileLink
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
}

const filePath = join(process.cwd(), "content", "profile.yaml")
const fileContents = readFileSync(filePath, "utf8")

export const profile: Profile = parse(fileContents) as Profile
```

- [ ] **Step 4: Verify the parser works**

Run: `cd /mnt/c/Users/alura/programming/portfolio-new && npx tsx -e "const { profile } = require('./content/parser'); console.log(profile.name, profile.experience.length, 'experiences', profile.projects.length, 'projects')"`
Expected: `Your Name 3 experiences 6 projects`

- [ ] **Step 5: Commit**

```bash
git add content/profile.yaml content/parser.ts package.json yarn.lock
git commit -m "feat: add YAML content layer with typed parser"
```

---

### Task 2: Clean up old components and unused dependencies

**Files:**
- Delete: `components/app-sidebar.tsx`
- Delete: `components/customization-panel.tsx`
- Delete: `components/main-content.tsx`
- Delete: `components/site-header.tsx`
- Delete: `components/sections/hero.tsx`
- Delete: `components/sections/about.tsx`
- Delete: `components/sections/experience.tsx`
- Delete: `components/sections/projects.tsx`
- Delete: `components/sections/skills.tsx`
- Delete: `components/sections/contact.tsx`
- Delete: `app/server-actions.ts`
- Delete: `lib/profile.ts`

- [ ] **Step 1: Delete old component files**

```bash
rm components/app-sidebar.tsx \
   components/customization-panel.tsx \
   components/main-content.tsx \
   components/site-header.tsx \
   components/sections/hero.tsx \
   components/sections/about.tsx \
   components/sections/experience.tsx \
   components/sections/projects.tsx \
   components/sections/skills.tsx \
   components/sections/contact.tsx \
   app/server-actions.ts \
   lib/profile.ts
rmdir components/sections
```

- [ ] **Step 2: Remove framer-motion dependency**

```bash
yarn remove framer-motion @emotion/is-prop-valid
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old components, server actions, and framer-motion"
```

---

### Task 3: Update globals.css with emerald accent tokens

**Files:**
- Modify: `app/globals.css`

The current CSS uses neutral shadcn defaults. We need to add emerald accent CSS custom properties and remove sidebar-specific variables.

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;

  /* Emerald accent */
  --emerald: oklch(0.596 0.145 163.225);
  --emerald-foreground: oklch(1 0 0);
  --emerald-muted: oklch(0.95 0.052 163.225);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.18 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);

  /* Emerald accent - dark mode */
  --emerald: oklch(0.596 0.145 163.225);
  --emerald-foreground: oklch(1 0 0);
  --emerald-muted: oklch(0.25 0.06 163.225);
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
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Scroll-triggered fade-in animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-on-scroll {
  opacity: 0;
}

.animate-on-scroll.is-visible {
  animation: fade-in-up 0.6s ease-out forwards;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: add emerald accent tokens and scroll animation keyframes"
```

---

### Task 4: Create scroll animation hook

**Files:**
- Create: `hooks/use-animate-on-scroll.ts`

A small hook that uses Intersection Observer to add the `is-visible` class when elements scroll into view.

- [ ] **Step 1: Create `hooks/use-animate-on-scroll.ts`**

```typescript
"use client"

import { useEffect, useRef } from "react"

export function useAnimateOnScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/use-animate-on-scroll.ts
git commit -m "feat: add useAnimateOnScroll hook with Intersection Observer"
```

---

### Task 5: Update root layout and page

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

Strip out commented-out code, clean up metadata using the profile parser:

```tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/content/parser"

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
    <html lang="en" suppressHydrationWarning>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { SkillsSection } from "@/components/sections/skills"
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: update root layout and page to use new section structure"
```

---

### Task 6: Build the Navbar

**Files:**
- Create: `components/layout/navbar.tsx`

- [ ] **Step 1: Create directory**

```bash
mkdir -p components/layout
```

- [ ] **Step 2: Create `components/layout/navbar.tsx`**

```tsx
"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { profile } from "@/content/parser"

export function Navbar() {
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
          className="text-sm font-semibold tracking-tight hover:text-emerald transition-colors"
        >
          {profile.name}
        </a>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs font-medium gap-1.5"
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

- [ ] **Step 3: Copy resume.pdf placeholder**

```bash
touch content/resume.pdf
```

Note: The user will replace this with their actual resume. We need the file to exist so the download link doesn't 404 during development.

- [ ] **Step 4: Verify the navbar renders**

Run: `yarn dev`
Open: `http://localhost:3000`
Expected: Thin bar at top with the name on the left and Resume + theme toggle on the right. Scrolling down should trigger the backdrop blur effect.

- [ ] **Step 5: Commit**

```bash
git add components/layout/navbar.tsx content/resume.pdf
git commit -m "feat: add sticky navbar with resume download and theme toggle"
```

---

### Task 7: Build the Hero section

**Files:**
- Create: `components/sections/hero.tsx`

- [ ] **Step 1: Create directory**

```bash
mkdir -p components/sections
```

- [ ] **Step 2: Create `components/sections/hero.tsx`**

```tsx
import { ArrowRight, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/parser"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-3xl animate-fade-in-up">
        <Badge
          variant="outline"
          className="mb-6 px-4 py-1.5 text-sm border-emerald/30 bg-emerald-muted text-emerald"
        >
          <Calendar className="h-3 w-3 mr-1.5" />
          {profile.years}+ years experience
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          {profile.name}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-3">
          {profile.title}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-8">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{profile.location}</span>
        </div>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {profile.summary}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-emerald hover:bg-emerald/90 text-emerald-foreground rounded-full px-8"
          >
            <a href="#projects">
              View Projects
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

- [ ] **Step 3: Verify the hero renders**

Run: `yarn dev` (if not already running)
Open: `http://localhost:3000`
Expected: Full-height centered hero with badge, name, title, location, bio, and two CTA buttons. Emerald badge and "View Projects" button use the accent color.

- [ ] **Step 4: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat: add hero section with emerald accent badge and CTAs"
```

---

### Task 8: Build the Experience section

**Files:**
- Create: `components/sections/experience.tsx`

- [ ] **Step 1: Create `components/sections/experience.tsx`**

```tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { profile } from "@/content/parser"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof profile.experience)[number]
  index: number
}) {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <div className="relative pl-8 pb-12 last:pb-0 group">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border group-last:hidden" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-emerald bg-background" />

      {/* Card */}
      <div
        ref={ref}
        className="animate-on-scroll rounded-lg border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-sm"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h3 className="font-semibold text-lg">{experience.company}</h3>
          <span className="text-sm text-muted-foreground">{experience.period}</span>
        </div>

        <p className="text-muted-foreground mb-1">
          {experience.role} · {experience.location}
        </p>

        <ul className="mt-4 space-y-2">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
              <span className="text-emerald mt-1 shrink-0">•</span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {experience.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-12">Experience</h2>

        <div className="relative">
          {profile.experience.map((exp, i) => (
            <ExperienceCard key={exp.company} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the experience section renders**

Run: `yarn dev` (if not already running)
Open: `http://localhost:3000`
Expected: Vertical timeline with emerald dots, three experience cards with company, role, period, highlights, and tech badges. Cards should fade in when scrolled into view.

- [ ] **Step 3: Commit**

```bash
git add components/sections/experience.tsx
git commit -m "feat: add experience section with vertical timeline and scroll animation"
```

---

### Task 9: Build the Projects section

**Files:**
- Create: `components/sections/projects.tsx`

- [ ] **Step 1: Create `components/sections/projects.tsx`**

```tsx
"use client"

import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/parser"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import type { Project } from "@/content/parser"

function ProjectCard({
  project,
  featured,
  index,
}: {
  project: Project
  featured: boolean
  index: number
}) {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`animate-on-scroll rounded-lg border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-sm ${
        featured ? "col-span-full" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h3 className={`font-semibold ${featured ? "text-xl" : "text-lg"} mb-2`}>
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {featured && project.longDescription
              ? project.longDescription
              : project.description}
          </p>
        </div>

        {featured && project.highlights.length > 0 && (
          <ul className="space-y-1.5">
            {project.highlights.map((h, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-emerald mt-0.5 shrink-0">•</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">
              {t}
            </Badge>
          ))}
        </div>

        {project.links && (
          <div className="flex gap-2 mt-1">
            {project.links.github && (
              <Button asChild variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
              </Button>
            )}
            {project.links.live && (
              <Button asChild variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const featuredProject = profile.projects.find((p) => p.featured)
  const otherProjects = profile.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Projects</h2>
        <p className="text-muted-foreground mb-12">
          A selection of things I&apos;ve built.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProject && (
            <ProjectCard project={featuredProject} featured={true} index={0} />
          )}
          {otherProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={false}
              index={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the projects section renders**

Run: `yarn dev` (if not already running)
Open: `http://localhost:3000`
Expected: Section heading, one full-width featured project card at top, then a 2-column grid of remaining project cards. Each card has title, description, tech badges, and link buttons. Cards fade in on scroll.

- [ ] **Step 3: Commit**

```bash
git add components/sections/projects.tsx
git commit -m "feat: add projects section with featured card and grid layout"
```

---

### Task 10: Build the Skills section

**Files:**
- Create: `components/sections/skills.tsx`

- [ ] **Step 1: Create `components/sections/skills.tsx`**

```tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { profile } from "@/content/parser"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

export function SkillsSection() {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Skills</h2>
        <p className="text-muted-foreground mb-12">
          Technologies I work with regularly.
        </p>

        <div
          ref={ref}
          className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {profile.skills.map((group) => (
            <div key={group.name}>
              <h3 className="text-sm font-semibold mb-3">{group.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the skills section renders**

Run: `yarn dev` (if not already running)
Open: `http://localhost:3000`
Expected: 4-column grid (responsive) with grouped skill badges under category headings.

- [ ] **Step 3: Commit**

```bash
git add components/sections/skills.tsx
git commit -m "feat: add skills section with grouped badge layout"
```

---

### Task 11: Build the Footer

**Files:**
- Create: `components/layout/footer.tsx`

- [ ] **Step 1: Create `components/layout/footer.tsx`**

```tsx
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/parser"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/40 py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {profile.name}
        </span>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:text-emerald">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:text-emerald">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:text-emerald">
            <a href={`mailto:${profile.links.email}`} aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <span className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify the footer renders**

Run: `yarn dev` (if not already running)
Open: `http://localhost:3000`
Expected: Thin footer with name on left, social icons in center, copyright on right. Icons turn emerald on hover.

- [ ] **Step 3: Commit**

```bash
git add components/layout/footer.tsx
git commit -m "feat: add footer with social links and emerald hover accent"
```

---

### Task 12: Move resume.pdf to public directory and verify full page

**Files:**
- Move: `content/resume.pdf` → `public/resume.pdf`

The resume needs to be served statically. Next.js serves files from `public/` at the root URL.

- [ ] **Step 1: Move resume to public/**

```bash
mv content/resume.pdf public/resume.pdf
```

- [ ] **Step 2: Full visual verification**

Run: `yarn dev` (if not already running)
Open: `http://localhost:3000`

Check each item:
- [ ] Navbar visible, transparent at top, blurs on scroll
- [ ] Resume download button works (downloads the PDF)
- [ ] Theme toggle switches between light/dark/system
- [ ] Hero section is full viewport height with centered content
- [ ] Emerald badge, name, title, location, bio, CTAs all render
- [ ] "View Projects" scrolls to projects section
- [ ] "Get in Touch" scrolls to footer
- [ ] Experience timeline renders with emerald line and dots
- [ ] Experience cards have company, role, period, highlights, tech badges
- [ ] Cards fade in on scroll
- [ ] Featured project card spans full width
- [ ] Other project cards in 2-column grid
- [ ] Project cards have title, description, tech badges, links
- [ ] Skills section shows 4 grouped columns
- [ ] Footer shows name, social icons, copyright
- [ ] Social icons turn emerald on hover
- [ ] Mobile responsive: check at 375px width

- [ ] **Step 3: Fix any visual issues found during verification**

Address any layout, spacing, color, or responsive issues discovered in step 2.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete portfolio redesign — all sections wired up"
```

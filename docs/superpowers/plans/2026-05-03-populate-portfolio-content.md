# Populate Portfolio Content — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all placeholder content in the portfolio with real data from `resume.md` and remove the Projects section.

**Architecture:** Content-only migration. Update `profile.yaml` with real data, remove the projects section from the page and parser types, fix a couple of component details (React keys, hero button target, conditional GitHub link). No new components or routes.

**Tech Stack:** YAML, TypeScript, Next.js (existing components)

---

### Task 1: Update `content/profile.yaml` — hero and links

**Files:**
- Modify: `content/profile.yaml:1-16`

- [ ] **Step 1: Replace hero and links fields**

Replace the top of `profile.yaml` with:

```yaml
meta:
  siteTitle: "Alejandro Ramirez Herrera — Senior Software Engineer"
  description: "I build scalable, user-centric web applications."

name: "Alejandro Ramirez Herrera"
title: "Senior Software Engineer"
years: 10
location: "Austin, TX"
summary: ""

links:
  github: ""
  linkedin: "https://www.linkedin.com/in/aluramh/"
  email: "aluramh@gmail.com"
```

Notes:
- `summary` left as empty string (deferred per spec)
- `github` left as empty string (not in resume.md, deferred per spec)
- `years` set to 10 (2016–2026)

- [ ] **Step 2: Commit**

```bash
git add content/profile.yaml
git commit -m "content: update hero and links with real data"
```

---

### Task 2: Update `content/profile.yaml` — experience entries

**Files:**
- Modify: `content/profile.yaml` (replace entire `experience:` block)

- [ ] **Step 1: Replace experience block**

Replace the entire `experience:` array in `profile.yaml` with:

```yaml
experience:
  - company: "Atlassian"
    role: "Forward Deployed Engineer — AI Adoption Rotation"
    period: "2025 – 2026"
    location: "Remote, Austin TX"
    logo:
    highlights:
      - "Embedded with enterprise customers to drive adoption of Atlassian's Rovo AI platform"
      - "NatWest: Led design and delivery of an automated Test Summary Report (TSR) generation agent — a governance-critical document; agent queries Jira via JQL to auto-populate test, defect, and risk data, reducing TSR production time from hours to minutes"
      - "NatWest: Built 2 additional demo Rovo agents showcasing platform AI capabilities to drive enterprise adoption"
      - "Finnair: Designed and delivered custom AI agents including an Incident Resolution Helper (automated ticket filtering and incident tracking) and an Executive Insights Summary agent (management-level reporting exported to Confluence)"
    tech:
      - Rovo
      - Jira
      - Confluence
      - AI/LLM
      - TypeScript

  - company: "Atlassian"
    role: "Senior Software Engineer"
    period: "November 2021 – Present"
    location: "Remote, Austin TX"
    logo:
    highlights:
      - "Built and shipped enterprise change management features — deployment freeze scheduling, experiment management, and cross-product change awareness — adopted by 55+ organizations and 500K+ seats"
      - "Designed event-driven architecture for a platform API migration; served as DRI across frontend, backend, and platform teams; led service deprecation reducing sprawl from 61 → 41 services"
      - "Led Selenium → Playwright migration for production E2E monitors, improving reliability from 69% → 97% and test performance by 35%; resolved 90+ flaky test issues"
      - "Led accessibility initiative achieving 81% WCAG AA compliance, unlocking an estimated 2M–7.7M potential customer seats"
      - "Drove frontend performance initiative targeting 20% improvement in P90 TTI across Atlassian Administration's highest-traffic pages"
      - "Grew PR review contributions by 44% YoY; mentored engineers across accessibility, testing, and analytics; mentored 2 summer internship cohort interns who both converted to full-time roles at Atlassian"
    tech:
      - TypeScript
      - React
      - Playwright
      - Statsig
      - Sentry
      - Datadog

  - company: "Jonajo Consulting"
    role: "Software Consultant — Ocean Freight Exchange"
    period: "July 2016 – November 2021"
    location: "Remote"
    logo:
    highlights:
      - "Led full-stack development of a real-time vessel tracking platform displaying 72,000+ vessels"
      - "Built subscription e-commerce system ($5K/seat/year via Chargebee)"
      - "Work contributed to securing a $3.3M Series A funding round"
    tech:
      - Full-Stack
      - Chargebee
      - Real-Time

  - company: "Jonajo Consulting"
    role: "Software Consultant — Register"
    period: "July 2016 – November 2021"
    location: "Remote"
    logo:
    highlights:
      - "Built scalable Node.js/AWS backend with JWT authentication"
      - "Designed and launched iOS Swift app to the App Store, targeting 300 global appliance brands and 500K+ estimated users"
    tech:
      - Node.js
      - AWS
      - Swift
      - JWT

  - company: "Jonajo Consulting"
    role: "Software Consultant — LiveObjects"
    period: "July 2016 – November 2021"
    location: "Remote"
    logo:
    highlights:
      - "Led monolith → microservices architecture migration"
      - "Implemented Spring Boot backend with OAuth2 and Salesforce API integration"
      - "Kafka POC for process optimization; Docker/Kubernetes deployments resulting in 10–20% cost savings"
    tech:
      - Spring Boot
      - Kafka
      - Docker
      - Kubernetes
      - OAuth2

  - company: "Jonajo Consulting"
    role: "Software Consultant — Ciitizen"
    period: "July 2016 – November 2021"
    location: "Remote"
    logo:
    highlights:
      - "Built authentication microservice serving 20,000+ users"
      - "Executed NoSQL → normalized SQL database migration eliminating data duplication across all microservices"
    tech:
      - Node.js
      - SQL
      - Microservices
```

- [ ] **Step 2: Commit**

```bash
git add content/profile.yaml
git commit -m "content: add real experience entries from resume"
```

---

### Task 3: Update `content/profile.yaml` — skills and remove projects

**Files:**
- Modify: `content/profile.yaml` (replace `skills:` block, delete entire `projects:` block)

- [ ] **Step 1: Delete the entire `projects:` block from `profile.yaml`**

Remove everything from `projects:` through the last project entry (lines 65–178 in current file).

- [ ] **Step 2: Replace skills block**

Replace the entire `skills:` array with:

```yaml
skills:
  - name: "Languages"
    items:
      - TypeScript
      - JavaScript
      - Java
      - Python
      - HTML/CSS

  - name: "Frameworks"
    items:
      - React
      - Spring Boot
      - Node.js
      - React Native

  - name: "Testing"
    items:
      - Playwright
      - Cypress
      - React Testing Library

  - name: "Feature Flags"
    items:
      - Statsig
      - LaunchDarkly

  - name: "Monitoring"
    items:
      - Sentry
      - Datadog
      - SignalFx

  - name: "Cloud & DevOps"
    items:
      - AWS
      - Google Cloud
      - Docker
      - Kubernetes

  - name: "AI Engineering"
    items:
      - LLM agent design
      - prompt engineering
      - Rovo
      - enterprise AI adoption

  - name: "Practices"
    items:
      - Accessibility (WCAG AA/AAA)
      - Frontend Performance
      - Technical Architecture
      - Agile/Scrum
```

- [ ] **Step 3: Commit**

```bash
git add content/profile.yaml
git commit -m "content: add real skills from resume, remove placeholder projects"
```

---

### Task 4: Remove Projects section from page and update parser types

**Files:**
- Modify: `app/page.tsx:1-21`
- Modify: `content/parser.ts:22-35, 48-59`

- [ ] **Step 1: Remove ProjectsSection from `app/page.tsx`**

Remove the `ProjectsSection` import and its usage. The file should become:

```tsx
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero"
import { ExperienceSection } from "@/components/sections/experience"
import { SkillsSection } from "@/components/sections/skills"
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Remove Project types and `projects` field from `content/parser.ts`**

Remove the `ProjectLinks` and `Project` interfaces. Remove `projects: Project[]` from the `Profile` interface. The file should become:

```ts
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
  skills: SkillGroup[]
}

const filePath = join(process.cwd(), "content", "profile.yaml")
const fileContents = readFileSync(filePath, "utf8")

export const profile: Profile = parse(fileContents) as Profile
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx content/parser.ts
git commit -m "feat: remove projects section from page and parser types"
```

---

### Task 5: Fix experience card React keys

**Files:**
- Modify: `components/sections/experience.tsx:11-13`

Now that multiple entries share the same company name ("Atlassian" x2, "Jonajo Consulting" x4), using `exp.company` as the React key will produce duplicates.

- [ ] **Step 1: Fix the key in `experience.tsx`**

Change line 12 from:

```tsx
<ExperienceCard key={exp.company} experience={exp} index={i} />
```

to:

```tsx
<ExperienceCard key={`${exp.company}-${exp.role}`} experience={exp} index={i} />
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/experience.tsx
git commit -m "fix: use company+role as experience card key to avoid duplicates"
```

---

### Task 6: Update hero section — fix button target and handle empty summary

**Files:**
- Modify: `components/sections/hero.tsx:38-48, 34-36`

The hero has a "View Projects" button pointing to `#projects`, which no longer exists. Also, the summary will be empty — it should not render an empty `<p>` tag.

- [ ] **Step 1: Update hero button and conditionally render summary**

In `components/sections/hero.tsx`, change the "View Projects" button to point to `#experience`:

```tsx
<a href="#experience">
  View Experience
  <ArrowRight className="ml-2 h-4 w-4" />
</a>
```

And wrap the summary paragraph in a conditional so it doesn't render when empty:

```tsx
{profile.summary && (
  <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
    {profile.summary}
  </p>
)}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "fix: update hero button to target experience, hide empty summary"
```

---

### Task 7: Handle empty GitHub link in footer

**Files:**
- Modify: `components/layout/footer.tsx:13-22`

The GitHub link is empty string (deferred). It should not render a broken link.

- [ ] **Step 1: Conditionally render GitHub link**

In `components/layout/footer.tsx`, wrap the GitHub button in a conditional:

```tsx
{profile.links.github && (
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
)}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/footer.tsx
git commit -m "fix: conditionally render GitHub link when URL is provided"
```

---

### Task 8: Verify build and visual check

**Files:** None (verification only)

- [ ] **Step 1: Run the build**

```bash
yarn build
```

Expected: Build succeeds with no errors. No references to removed `ProjectsSection` or `Project` types.

- [ ] **Step 2: Start dev server and visually verify**

```bash
yarn dev
```

Open `http://localhost:3000` and verify:
- Hero shows "Alejandro Ramirez Herrera", "Senior Software Engineer", "Austin, TX"
- No summary paragraph rendered (empty)
- "View Experience" button scrolls to experience section
- 6 experience cards display in order (Atlassian FDE, Atlassian SWE, then 4 Jonajo entries)
- Both Atlassian cards show "Atlassian" as company name
- All 4 Jonajo cards show "Jonajo Consulting" with client name in role
- No Projects section visible
- 8 skill groups with correct items
- Footer shows LinkedIn and Email links, no GitHub icon
- Resume download button in navbar still present

- [ ] **Step 3: Commit any fixes if needed, then stop dev server**

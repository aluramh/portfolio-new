# Populate Portfolio with Resume Data

**Date:** 2026-05-03
**Source of truth:** `resume.md` (never modify without explicit permission)

## Overview

Replace all placeholder content in the portfolio site with real data from `resume.md`. Remove the standalone Projects section. Everything renders through the existing component architecture — no new pages or routes.

## Changes

### 1. Update `content/profile.yaml`

**Hero fields:**
- `name`: "Alejandro Ramirez Herrera"
- `title`: "Senior Software Engineer"
- `location`: "Austin, TX"
- `summary`: leave blank (deferred — see TODO.md)
- `links.email`: "aluramh@gmail.com"
- `links.linkedin`: "https://www.linkedin.com/in/aluramh/"
- `links.github`: TBD — not in resume.md, omit or leave placeholder until user provides

**Experience — 6 standalone entries, chronological (newest first):**

The two Atlassian roles are rendered as separate standalone cards that both show "Atlassian" as the company. The shared company name and overlapping dates make the relationship self-evident — no special grouping or component logic needed.

1. **Atlassian — Forward Deployed Engineer, AI Adoption Rotation**
   - Period: 2025–2026
   - Location: Remote, Austin TX
   - Highlights: NatWest TSR agent, NatWest demo agents, Finnair Incident Resolution + Executive Insights agents
   - Tech: derived from context (Rovo, Jira, Confluence, AI/LLM)

2. **Atlassian — Senior Software Engineer**
   - Period: November 2021 – Present
   - Location: Remote, Austin TX
   - Highlights: Change management features (55+ orgs, 500K+ seats), platform API migration (61→41 services), Selenium→Playwright migration (69%→97% reliability), accessibility initiative (81% WCAG AA), frontend performance initiative (20% P90 TTI improvement), PR review growth (44% YoY), mentorship
   - Tech: derived from resume (TypeScript, React, Playwright, etc.)

3. **Jonajo Consulting — Ocean Freight Exchange**
   - Period: July 2016 – November 2021
   - Location: Remote
   - Highlights: Real-time vessel tracking (72K+ vessels), subscription e-commerce ($5K/seat/year via Chargebee), contributed to $3.3M Series A
   - Tech: derived from context

4. **Jonajo Consulting — Register**
   - Period: July 2016 – November 2021
   - Location: Remote
   - Highlights: Node.js/AWS backend with JWT auth, iOS Swift app launched to App Store, targeting 300 brands and 500K+ users
   - Tech: Node.js, AWS, Swift

5. **Jonajo Consulting — LiveObjects**
   - Period: July 2016 – November 2021
   - Location: Remote
   - Highlights: Monolith→microservices migration, Spring Boot + OAuth2 + Salesforce API, Kafka POC, Docker/Kubernetes, 10–20% cost savings
   - Tech: Spring Boot, Kafka, Docker, Kubernetes

6. **Jonajo Consulting — Ciitizen**
   - Period: July 2016 – November 2021
   - Location: Remote
   - Highlights: Auth microservice (20K+ users), NoSQL→SQL migration eliminating data duplication
   - Tech: Node.js, SQL

**Skills — 7 groups, mirroring resume.md exactly:**

| Group | Items |
|-------|-------|
| Languages | TypeScript, JavaScript, Java, Python, HTML/CSS |
| Frameworks | React, Spring Boot, Node.js, React Native |
| Testing | Playwright, Cypress, React Testing Library |
| Feature Flags | Statsig, LaunchDarkly |
| Monitoring | Sentry, Datadog, SignalFx |
| Cloud & DevOps | AWS, Google Cloud, Docker, Kubernetes |
| AI Engineering | LLM agent design, prompt engineering, Rovo, enterprise AI adoption |
| Practices | Accessibility (WCAG AA/AAA), Frontend Performance, Technical Architecture, Agile/Scrum |

Note: resume.md lists 8 rows in the skills table (the original count of 7 was off by one). All 8 will be included.

### 2. Remove Projects section

- Remove `ProjectsSection` import and usage from `app/page.tsx`
- Component files (`components/sections/projects.tsx`, `components/sections/project-card.tsx`) can be deleted or left — they won't be referenced

### 3. Update `meta` fields in `profile.yaml`

- `siteTitle`: "Alejandro Ramirez Herrera — Senior Software Engineer"
- `description`: leave as-is or blank until summary is written

### 4. Navbar

- Resume download button already exists — no changes needed (PDF placeholder is a separate TODO)

## Out of scope (deferred to TODO.md)

- Hero summary blurb
- Education section (SMU + ITESM)
- Replacing `public/resume.pdf` placeholder with actual PDF
- GitHub link (not in resume.md)

## No changes to

- Site architecture, routing, or component patterns
- Theme, animations, design system
- `resume.md` itself

# Portfolio "Magic" Redesign — Design Spec

## Overview

The current portfolio (post-redesign as of 2026-04-12) is structurally sound but visually bland — it reads as "a CV in a webpage" rather than a portfolio with personality. The user's prior portfolio at alexram.dev had more "magic" despite being technically weaker, and four specific elements are responsible for that difference: a pixel-art self-portrait, a more colorful palette, distinctive display typography, and ambient/decorative motion.

This spec layers those personality elements onto the existing site without throwing away the structural redesign. It also closes three deferred items from `TODO.md`: the empty hero summary blurb, the missing Education section, and (newly added) a "Selected Work" section that gives the user's most quantified achievements actual visibility.

The voice stays formal third-person — the conversational "Hello, my name is" approach from the old site was deliberately rejected. Personality comes from visual treatment, not copy voice.

**Scope chosen: B (Restructured).** Visual language gets a full overhaul; section *shapes* remain conventional (centered hero, vertical timeline, badge grid) — no asymmetric/horizontal-scroll/scrollytelling treatments. Three new sections, no removed sections.

## Architectural Invariants (Inherited)

These are kept from the existing redesign and constrain this work:

- **Server reads, client interacts.** `content/parser.ts` uses Node `fs` at module load and must only be imported from server components. Client components receive data as props.
- **Single source of content:** `content/profile.yaml`, typed by `Profile` in `content/parser.ts`. Schema gets *extended*, not replaced.
- **Static export.** No API routes, no runtime data fetching. Everything pre-rendered.
- **No new runtime dependencies.** No `framer-motion`, no animation libraries, no shadcn/ui primitives beyond what's already imported. Animations are CSS-only.
- **`resume.md` is the source of truth** for portfolio content. It is **not** modified by this work. New YAML fields are hand-curated *from* it but live separately.
- **Yarn 4 PnP, zero-installs, `.pnp.cjs` committed.** No `npm install`. No new deps.

## Visual Language

### Palette

Primary accent stays **emerald** (`oklch(0.596 0.145 163.225)` ≈ `#10b981`). Three supporting accents are added, used sparingly — typically one per section or one per Selected Work card:

| Token | Dark mode | Light mode | Use |
|---|---|---|---|
| `--emerald` | `#10b981` | `#059669` | Primary accent, hero italic, default tags |
| `--amber` | `#f59e0b` | `#92400e` | Secondary accent (Selected Work card 2) |
| `--blue` | `#3b82f6` | `#1d4ed8` | Tertiary accent |
| `--pink` | `#ec4899` | `#be185d` | Tertiary accent (Selected Work card 3) |

**Backgrounds:**

- Dark mode (default): `--background` → `#1c1f26` (charcoal — explicitly *not* near-black). Overlaid with a subtle dot-grid pattern (`radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 20px 20px`) applied site-wide on `body`.
- Light mode: `--background` → `#faf7f2` (warm cream). Same dot-grid overlay at lower opacity (`rgba(0,0,0,0.05)`) so light mode matches dark in spirit.

Both modes are first-class — light mode is not an afterthought. Every accent treatment must have a tested light-mode variant.

### Typography

Three families layered:

| Role | Family | Notes |
|---|---|---|
| Display (names, section headings) | **Playfair Display** | Weight 800; italic 400 for emphasis (e.g., last name, title accents) |
| Eyebrow / labels / metadata | **Oswald** | Weight 700, uppercase, letter-spaced (`tracking-[0.15em]`) |
| Body / paragraphs | **Geist Sans** | Already in project, kept |
| Code / mono accents | **Geist Mono** | Already in project, kept |

Loaded via `next/font/google` in `app/layout.tsx`. Critical weights only: Playfair 800 + italic 400, Oswald 700. `display: 'swap'`. Surfaced as CSS variables `--font-display` and `--font-eyebrow` alongside the existing `--font-sans` and `--font-mono`.

### Motion budget

Deliberately small. Personality comes from typography, color, and the pixel portrait — motion is the seasoning, not the meal.

1. **Sheen sweep** on the italic accent in the hero name (every ~6s, animated `background-clip: text` gradient position).
2. **Pixel portrait wave** — the arm sprite rotates briefly (`transform: rotate(-20deg) → 20deg → 0`) every ~8s. Completes the unfinished moment from the old site.
3. **Hover lift** on Selected Work cards and Experience cards (`translateY(-4px)` + shadow).
4. **Scroll-triggered fade-in-up** stays as today (existing `useAnimateOnScroll` hook).
5. **Stat count-up** on Selected Work — opt-in per card via the optional `stat_value` numeric field in YAML. When a card scrolls into view, the displayed `stat` string remains visually unchanged but is preceded by a count-up of `stat_value` from 0 to its final value (once, in ~1.5s). Cards without `stat_value` render `stat` statically. (Example: `stat: "500K+"`, `stat_value: 500000` → counts up `0 → 500000`, formatted as `500K+`. `stat: "hours → minutes"`, no `stat_value` → static.)

All animations gated by `@media (prefers-reduced-motion: reduce)` — sheen pauses, wave pauses, fades become instant, count-ups jump to final value. Wire via CSS media queries where possible; fall back to a `useReducedMotion` hook only if needed.

No cursor-tracking effects. No parallax. No glitch effects. No layered ambient blobs. Restraint is the choice.

### Voice

Third-person, formal. Same as today. The conversational greeting from alexram.dev is *not* brought back.

## Site Structure

Section order (top → bottom):

1. **Navbar** — sticky, retreated
2. **Hero** — redesigned visual treatment, summary blurb slot
3. **Selected Work** *(NEW)* — three highlight cards
4. **Experience** — same shape, retreated
5. **Skills** — same shape, retreated with per-group accent colors
6. **Education** *(NEW)* — small section, two cards
7. **Footer** — retreated

Single-page scroll, smooth-scroll, anchor links from navbar. Section IDs: `#hero`, `#selected-work`, `#experience`, `#skills`, `#education`, `#contact`.

## Component-Level Treatments

### Navbar (`components/layout/navbar-client.tsx` — retreated)

- Same fixed top bar, same backdrop blur on scroll past 50px
- Brand mark: name in **Playfair Display italic** (replaces current bold sans)
- Resume button label: Oswald uppercase
- Theme toggle unchanged

### Hero (`components/sections/hero.tsx` — rebuilt visually, server component)

Layout: centered, single column, `min-h-screen`.

```
[ pixel portrait, ~120px tall ]
[ SENIOR · SOFTWARE ENGINEER ]   ← Oswald, emerald, eyebrow
[ Alejandro <Ramirez> ]            ← Playfair 800 + italic emerald
[ 10+ YEARS · ATLASSIAN · AUSTIN, TX ]   ← Oswald, muted
[ summary blurb if present ]       ← Geist Sans, paragraph
[ View Work ]  [ Get in Touch ]    ← CTAs
```

- Pixel portrait composed of two `<img>` elements (body + arm) inside a relatively-positioned wrapper, so the arm can wave independently. Sprites: `image-rendering: pixelated`. See **Pixel Portrait Asset** below.
- Sheen animation applied only to the italic surname.
- "View Work" CTA links to `#selected-work` (replaces today's "View Experience" → `#experience`).
- Summary blurb only renders when `profile.summary` is non-empty (current behavior preserved).

### Selected Work (`components/sections/selected-work.tsx` — NEW, server component)

Section title: `Selected Work` in Playfair, with a Geist Mono eyebrow `// selected work` above.

Layout:

- Single-column stack on mobile
- Three-column grid on `lg:` and up
- Each card: full-bleed colored top stripe (`h-1`, accent color), dark card body (light-cream body in light mode)

Card content:

```
[ accent stripe ]
[ stat (Playfair, 5xl, accent color) ]
[ stat_label (Oswald, muted) ]
[ title (Playfair, lg) ]
[ company (Oswald uppercase, muted) ]
[ description (Geist, sm) ]
[ tag chips (sm, accent-tinted) ]
```

Hover: card lifts `translateY(-4px)` with subtle shadow. Stripe widens to `h-1.5`.

Count-up animation on the stat number is opt-in via the optional `stat_value` numeric field in YAML — see Motion Budget §5. Implemented in a client wrapper component (`selected-work-card.tsx`) using IntersectionObserver + `requestAnimationFrame`. Cards without `stat_value` render their `stat` string statically.

Cards rendered from `profile.selectedWork` array (3 items in v1, but the layout supports up to 6 — beyond that the grid wraps).

### Experience (`components/sections/experience.tsx` + `experience-card.tsx` — retreated)

Same vertical timeline as today. Changes:

- Timeline dot: filled emerald (currently outlined)
- Timeline line: subtle gradient (`linear-gradient(to bottom, transparent, var(--border), transparent)`)
- Card border-left: thin emerald accent stripe (`border-l-2 border-emerald/40`)
- Company name: Playfair Display 800 (currently bold sans)
- Period + location: Oswald uppercase eyebrow
- Highlight bullets: emerald `•` (kept)
- Tech tags: small badges, accent-tinted (`bg-accent/10 border-accent/30 text-accent`). One accent per role, cycling emerald/amber/blue/pink so adjacent roles differ.

Animation budget unchanged (existing `useAnimateOnScroll`).

### Skills (`components/sections/skills.tsx` + `skills-grid.tsx` — retreated)

Same 4-column grid, same `SkillGroup[]` data. Changes:

- Each group "owns" an accent color, cycled in array order: emerald, amber, blue, pink, emerald, amber, blue, pink. (8 groups in current YAML → 2 full cycles.)
- Group title: Oswald uppercase, accent-colored
- Badges: `bg-accent/10 border-accent/30 text-accent` — same treatment as experience tech tags so the visual language is cohesive

No tooltip, no hover scale on badges in v1. Restraint.

### Education (`components/sections/education.tsx` — NEW, server component)

Compact section. Two cards side-by-side at `md:` and up, stacked on mobile.

Card content:

```
[ school short_name (Oswald, uppercase, muted) ]
[ school full name (Playfair) ]
[ degree (Geist Sans) ]
[ year · location (Oswald, muted) ]
[ note if present (Geist, italic, small) ]
```

No hover effects, no animations beyond the existing scroll fade-in. Quiet by design.

### Footer (`components/layout/footer.tsx` — retreated)

Same shape and content. Changes:

- Name in Playfair italic (matches navbar treatment)
- Optional "Built with Next.js · Tailwind" line in Geist Mono — flagged as optional in implementation; user decides whether to include

## Content Layer

### `content/profile.yaml`

Two new top-level keys appended. Existing keys (`meta`, `name`, `title`, `years`, `location`, `summary`, `links`, `experience`, `skills`) are unchanged.

```yaml
selected_work:
  - title: "Enterprise change management at scale"
    company: "Atlassian"
    description: "Deployment freeze scheduling, experiment management, and cross-product change awareness."
    stat: "500K+"
    stat_value: 500000        # optional, enables count-up animation
    stat_label: "seats across 55+ organizations"
    tags: [TypeScript, React, Statsig]
    accent: emerald

  - title: "Test Summary Report agent"
    company: "NatWest · via Atlassian Rovo"
    description: "Rovo AI agent that auto-populates governance-critical TSRs by querying Jira via JQL."
    stat: "hours → minutes"   # no stat_value → renders statically
    stat_label: "TSR production time"
    tags: [Rovo, AI/LLM, Jira, JQL]
    accent: amber

  - title: "Real-time vessel tracking platform"
    company: "Ocean Freight Exchange"
    description: "Full-stack vessel tracking + subscription billing; work contributed to the company's Series A."
    stat: "$3.3M"
    stat_value: 3300000       # animates as a number, displayed as the stat string
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

### `content/parser.ts`

Add types:

```typescript
export type Accent = 'emerald' | 'amber' | 'blue' | 'pink'

export interface SelectedWork {
  title: string
  company: string
  description: string
  stat: string             // always displayed string ("500K+", "hours → minutes")
  statValue?: number       // optional: enables count-up animation; mapped from YAML stat_value
  statLabel: string        // mapped from YAML stat_label
  tags: string[]
  accent: Accent
}

export interface Education {
  school: string
  shortName?: string      // mapped from YAML short_name
  location: string
  degree: string
  year: string
  note?: string
}
```

Extend the `Profile` interface:

```typescript
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
  selectedWork: SelectedWork[]    // NEW
  education: Education[]          // NEW
}
```

YAML uses snake_case (`stat_label`, `short_name`); TS uses camelCase. After `yaml.parse()`, run a small mapping pass to camelize the two snake_case fields. Keep this targeted — do not add a generic snake-to-camel converter.

### `resume.md`

Not modified by this work. Standing rule: source of truth, requires explicit permission.

## Pixel Portrait Asset

Sourced from the old alexram.dev site (option #1 — reuse). Asset paths in old site (extracted from page source):

- `pixel_me_body.cb6a439c481206925137222a6be5bf6.png`
- `pixel_me_arm.0f8746814141c0acbb530aa577c0a162.png`

These are downloaded from the live site and committed to `public/portrait/` as `pixel_me_body.png` and `pixel_me_arm.png` (renamed without hashes since the cache-busting is now Next.js's job).

Rendering (in `components/portrait.tsx`):

```tsx
<div className="relative w-[120px] h-[160px]" style={{ imageRendering: 'pixelated' }}>
  <img src="/portrait/pixel_me_body.png" alt="" className="absolute inset-0" />
  <img src="/portrait/pixel_me_arm.png" alt="" className="portrait-arm absolute …" />
</div>
```

`alt=""` because the portrait is decorative; the hero name is the textual identity. The `.portrait-arm` class carries the wave keyframe.

User has flagged that they may iterate on the portrait sprites later. The component contract is "two PNGs in `public/portrait/`" — swapping the files later does not require code changes.

## Files Changed / Added / Untouched

### Changed

- `app/globals.css` — palette tokens (amber/blue/pink + light-mode vars), dot-grid background utility, sheen + wave keyframes, `prefers-reduced-motion` overrides
- `app/layout.tsx` — load Playfair Display + Oswald via `next/font/google`, expose as CSS vars
- `app/page.tsx` — add `<SelectedWorkSection />` and `<EducationSection />` to section order
- `content/profile.yaml` — append `selected_work` + `education`
- `content/parser.ts` — extend interfaces, add `SelectedWork` + `Education` types, snake→camel mapping
- `components/sections/hero.tsx` — rebuild visual treatment
- `components/sections/experience.tsx` + `experience-card.tsx` — retreat
- `components/sections/skills.tsx` + `skills-grid.tsx` — accent cycling, accent-tinted badges
- `components/layout/navbar-client.tsx` — Playfair italic brand, Oswald label
- `components/layout/footer.tsx` — Playfair italic name; optional credit line

### Added

- `components/sections/selected-work.tsx` — server, reads `profile.selectedWork`
- `components/sections/selected-work-card.tsx` — client, count-up + hover lift
- `components/sections/education.tsx` — server
- `components/portrait.tsx` — client, wave animation
- `lib/accents.ts` — util mapping `Accent` → Tailwind class strings (`bg`, `border`, `text`)
- `public/portrait/pixel_me_body.png`
- `public/portrait/pixel_me_arm.png`

### Untouched

- `resume.md` (standing rule)
- `components/ui/*` — no new shadcn primitives. Existing `Badge` and `Button` reused.
- `next.config.mjs`
- `package.json` — no new dependencies. `geist` package already provides Geist Sans/Mono; `next/font/google` covers Playfair + Oswald.
- `.pnp.cjs` — only changes if a dep changes (none planned)

## Risks and Mitigations

1. **Server/client boundary violations.** New components must follow the existing pattern: section-level files are server (read `profile`), card-level files are client (animations, IntersectionObserver). Lint/type errors at build time are silenced (`next.config.mjs` has `typescript.ignoreBuildErrors: true`), so verify in editor and via `yarn lint` — do not rely on `yarn build` to catch violations.
2. **Font loading layout shift.** Playfair Display 800 is heavy. Use `next/font/google` with `display: 'swap'`. Preload only the weights actually used. Mirror existing Geist loading pattern for consistency.
3. **Light-mode parity.** Every accent treatment needs a light-mode variant. `accent/10` washes out against cream — likely needs `accent/15` or solid borders for legibility. Test both modes in the same PR.
4. **Reduced motion.** Sheen and wave both must pause under `prefers-reduced-motion: reduce`. CSS media queries first; fall back to JS hook only if needed.
5. **AGENTS.md drift.** `AGENTS.md` already describes outdated `Profile` fields (`bio`, `badge`, `projects[]`). After this spec ships, AGENTS.md needs a refresh in a follow-up — out of scope here, but the implementation plan should include a one-line task to flag/update it.
6. **Static export constraints.** No runtime data fetching. Count-up animation uses client-side `useEffect` + `requestAnimationFrame`, not server data. Same model as the existing `useAnimateOnScroll`.

## Out of Scope

Explicitly deferred and not addressed by this spec:

- Hero summary blurb *content* — slot is wired up; user writes the copy when ready
- `public/resume.pdf` content — placeholder file; user replaces when ready (existing TODO item)
- GitHub link — not in `resume.md`; user adds to `profile.yaml` when available (existing TODO item)
- Pixel portrait refinement — user will iterate later
- AGENTS.md content refresh — flagged for follow-up
- Editorial/asymmetric layouts (scope C from brainstorm) — rejected
- Conversational copy ("Hello, my name is…") — rejected
- New shadcn/ui primitives — rejected

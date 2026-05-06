# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Canonical context

`AGENTS.md` is the primary project context (architecture, design system, decisions, gotchas). Read it before making non-trivial changes. This file only adds Claude-specific notes and items not covered there.

**AGENTS.md is partially stale.** It still references a `projects[]` field, `bio`, `badge`, and a `social` block that no longer exist in `content/profile.yaml` or the `Profile` interface. `components/sections/projects.tsx` and `project-card.tsx` still exist on disk but are not wired into `app/page.tsx` — treat them as orphaned until proven otherwise. Verify any AGENTS.md claim against `content/parser.ts` and `app/page.tsx` before acting on it.

`README.md` is a one-line stub — skip it.

## Where work-in-progress lives

- `TODO.md` — short list of deferred items (hero summary copy, education section, real `resume.pdf`, GitHub link). Check before adding features in those areas.
- `docs/superpowers/plans/` and `docs/superpowers/specs/` — active and historical plans/specs (e.g. the current `feature/portfolio-magic` redesign). Read the relevant plan before implementing against it.

## Commands

```bash
yarn dev      # dev server on localhost:3000
yarn build    # production build (static export)
yarn start    # serve the built site
yarn lint     # next lint
```

There is no test suite. `next.config.mjs` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` to `true` — `yarn build` will succeed even with TS/lint errors. To actually validate types, run `yarn lint` and check the editor's TypeScript output; do not rely on the build to catch errors.

## Package manager

Yarn 4 with PnP. **Do not run `npm install`.** There is no `node_modules/`; `.pnp.cjs` is committed on purpose (zero-installs). Use `yarn` to install and `yarn <script>` to run.

## Architecture invariants

- **Server reads, client interacts.** `content/parser.ts` calls Node `fs` at module load. Importing it from a `"use client"` component breaks the build. Server components read from `parser.ts` and pass data down as props; client components handle scroll/theme/animation only.
- **Single source of content:** `content/profile.yaml`, typed by `Profile` in `content/parser.ts`. The current shape is `{ meta, name, title, years, location, summary, links, experience[], skills[] }` — note this differs from older descriptions in AGENTS.md (no `bio`, `badge`, or `projects` field today). If you add fields, update both the YAML and the `Profile` interface.
- **Static export.** No API routes, no runtime data fetching. Everything is pre-rendered.
- **Path alias:** `@/*` → repo root (see `tsconfig.json`).

## Working rules

- **`resume.md` is the source of truth** for portfolio content. Do not modify it without explicit permission. When `profile.yaml` and `resume.md` disagree, treat `resume.md` as authoritative and ask before changing it.
- **No `Co-Authored-By: Claude` trailers** on commits.
- The `components/ui/` directory is mostly unused shadcn/ui boilerplate. Prefer composing existing section components over pulling in new primitives unless actually needed.

export const profile = {
  name: "Your Name",
  title: "Senior Software Engineer",
  years: 9,
  location: "Remote • Open to relocation",
  summary:
    "I build scalable, user-centric web applications. I thrive in product-focused teams where craftsmanship, velocity, and thoughtful DX meet.",
  about:
    "I’m a software engineer with a focus on modern web development. Over the past 9 years, I’ve designed, shipped, and maintained systems across startups and enterprises—covering everything from design systems and frontend architectures to backend APIs and developer tooling. I care deeply about accessibility, performance, and pragmatic engineering practices.",
  links: {
    github: "https://github.com/yourname",
    linkedin: "https://www.linkedin.com/in/yourname",
    email: "hello@yourdomain.com",
  },
  experience: [
    {
      company: "Acme Corp",
      role: "Senior Software Engineer",
      period: "2022 — Present",
      location: "Remote",
      highlights: [
        "Led migration to modern React architecture with performance budgets, improving Core Web Vitals across key flows.",
        "Partnered with design to roll out a component library that accelerated feature delivery by 30%.",
        "Mentored engineers, established code health guidelines, and improved on-call processes.",
      ],
      tech: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Playwright"],
    },
    {
      company: "Globex",
      role: "Software Engineer",
      period: "2019 — 2022",
      location: "Hybrid",
      highlights: [
        "Built multi-tenant APIs and observability pipelines to support product growth.",
        "Introduced CI quality gates and testing strategy, reducing regressions significantly.",
      ],
      tech: ["Node.js", "GraphQL", "Kubernetes", "AWS", "Tailwind CSS"],
    },
    {
      company: "Initech",
      role: "Full-Stack Engineer",
      period: "2016 — 2019",
      location: "On-site",
      highlights: [
        "Delivered features across the stack while collaborating with product and stakeholders.",
        "Optimized critical paths, improving average page load by 40%.",
      ],
      tech: ["React", "Express", "MongoDB", "Jest"],
    },
  ],
  projects: [
    {
      title: "Realtime Analytics Dashboard",
      description: "A high-performance analytics dashboard with live updates, charting, and role-based access control.",
      longDescription:
        "Designed a streaming-first architecture using WebSockets and server-sent events, plus a modular chart layer for extensibility. Instrumented both server and client for observability.",
      highlights: [
        "Sub-200ms end-to-end latency for critical metrics",
        "Feature-flagged experiments and progressive delivery",
        "Automated accessibility checks in CI",
      ],
      tags: ["Next.js", "TypeScript", "WebSockets", "Postgres", "Tailwind CSS"],
      demo: "https://example.com/analytics",
      repo: "https://github.com/yourname/realtime-analytics",
      imageQuery: "modern%20analytics%20dashboard%20ui",
    },
    {
      title: "Design System",
      description:
        "A robust design system with tokens, theming, and accessible components used across multiple products.",
      longDescription:
        "Delivered tokens, theming, and guidelines to align multiple product teams. Shipped a documented component library with usage examples and recipes.",
      highlights: [
        "Ship-ready components with a11y baked in",
        "Themeable tokens and dark mode",
        "Figma-to-code handoff improvements",
      ],
      tags: ["Design System", "Storybook", "Accessibility", "CSS Variables"],
      demo: "https://example.com/design-system",
      repo: "https://github.com/yourname/design-system",
      imageQuery: "design%20system%20components%20grid",
    },
    {
      title: "AI-assisted Code Review",
      description: "A lightweight AI reviewer that surfaces risky changes and suggests improvements in PRs.",
      longDescription:
        "Integrated code intelligence with repository metadata to provide contextual recommendations and auto-suggest refactors for common pitfalls.",
      highlights: [
        "Reduced review time while improving signal",
        "Configurable for team conventions",
        "Privacy-preserving processing",
      ],
      tags: ["AI", "TypeScript", "Node.js", "CI/CD"],
      demo: "https://example.com/ai-review",
      repo: "https://github.com/yourname/ai-code-review",
      imageQuery: "ai%20code%20review%20pr%20comments",
    },
    {
      title: "Edge-rendered Marketing Site",
      description: "A fast, localized marketing site with ISR, analytics, and A/B testing support.",
      longDescription:
        "Implemented localized routes and caching strategies for a global audience. Built a safe experimentation framework integrated with analytics.",
      highlights: [
        "Global edge rendering with low TTFB",
        "Locale-aware routing and content",
        "Experimentation framework",
      ],
      tags: ["Next.js", "Edge", "i18n", "A/B Testing"],
      demo: "https://example.com/edge-marketing",
      repo: "https://github.com/yourname/edge-marketing",
      imageQuery: "fast%20marketing%20site%20landing%20page",
    },
    {
      title: "Performance Budget CLI",
      description: "A CLI to enforce Lighthouse budgets in CI with helpful diffs and recommendations.",
      longDescription:
        "Automates performance checks pre-merge and provides actionable insights to fix regressions quickly.",
      highlights: ["Quick setup with sensible defaults", "Inline PR comments", "Configurable thresholds"],
      tags: ["Node.js", "CLI", "Lighthouse", "DX"],
      demo: "https://example.com/perf-cli",
      repo: "https://github.com/yourname/perf-budget-cli",
      imageQuery: "terminal%20cli%20performance%20lighthouse",
    },
    {
      title: "Open Source Contribution Tracker",
      description: "A dashboard to visualize contributions across orgs and repos with trend insights.",
      longDescription: "Aggregates GitHub data and surfaces impact metrics for teams and individuals.",
      highlights: ["Customizable visualizations", "Caching and rate limit handling", "Org-wide insights"],
      tags: ["Next.js", "GitHub API", "Charts", "Postgres"],
      demo: "https://example.com/oss-tracker",
      repo: "https://github.com/yourname/oss-tracker",
      imageQuery: "open%20source%20contributions%20visualization",
    },
  ],
  skills: [
    {
      title: "Languages & Frameworks",
      items: ["TypeScript", "JavaScript", "Node.js", "React", "Next.js", "HTML", "CSS"],
    },
    {
      title: "Systems & Data",
      items: ["PostgreSQL", "Redis", "REST", "GraphQL", "Pragmatic Microservices"],
    },
    {
      title: "Tooling & Quality",
      items: ["Vite", "ESLint", "Playwright", "Jest", "CI/CD", "Feature Flags"],
    },
    {
      title: "Practices",
      items: ["Performance", "Accessibility", "DX", "Testing", "Observability"],
    },
  ],
} as const

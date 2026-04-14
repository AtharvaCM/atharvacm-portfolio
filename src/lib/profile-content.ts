export const PROFILE_NAME = "Atharva Mahamuni";

export const HERO_BADGES = [
  "React",
  "Next.js",
  "TypeScript",
  "Monorepos",
  "Performance",
  "GraphQL",
  "Playwright",
] as const;

export const HERO_PROOF_POINTS = [
  {
    label: "Experience",
    value: "5+ years",
    description:
      "Building production web applications across SaaS, dashboards, and workflow-heavy products.",
  },
  {
    label: "Architecture",
    value: "Frontend systems at scale",
    description:
      "Owned architecture and delivery across React monorepos, reporting flows, and complex business modules.",
  },
  {
    label: "Performance",
    value: "7 MB to KB-level chunks",
    description:
      "Reduced frontend overhead through code splitting, lazy loading, and tighter dependency control.",
  },
  {
    label: "Product scale",
    value: "High-traffic + data-heavy",
    description:
      "Built for GraphQL-backed platforms, reporting systems, permissions, and operational workflows.",
  },
] as const;

export const HOME_FOCUS_AREAS = [
  {
    title: "Architecture for growing products",
    copy: "Keep React and Next.js codebases from turning into patchwork.",
  },
  {
    title: "Performance and release confidence",
    copy: "Use performance, testing, and observability to keep releases safer.",
  },
  {
    title: "Frontend decisions with product context",
    copy: "Build around APIs, permissions, and workflows, not screens alone.",
  },
] as const;

export const HOME_IMPACT_ITEMS = [
  "Cut a large production frontend from roughly 7 MB to modular, on-demand chunks.",
  "Added Playwright coverage for critical workflow-heavy product flows.",
  "Turned dynamic product flows into reusable, schema-driven frontend systems.",
  "Improved backend response time by 17% on a high-traffic Next.js platform.",
] as const;

export const QUICK_SNAPSHOT_ITEMS = [
  "5+ years building production web applications",
  "React, Next.js, and TypeScript across real product teams",
  "Frontend architecture for monorepos and shared systems",
  "Performance work across bundles, rendering, and load behavior",
  "Complex products spanning dashboards, workflows, and reporting",
  "GraphQL and API-heavy applications with production constraints",
] as const;

export const AVAILABILITY_NOTE =
  "Senior frontend or full-stack roles where engineering quality, ownership, and long-term product health matter.";

export const BEST_FIT_NOTE =
  "Best fit: teams building serious products where performance, maintainability, and delivery quality all matter.";

export const ABOUT_INTERESTS = [
  "Frontend architecture",
  "Performance optimization",
  "Scalable UI systems",
  "Testing and release confidence",
  "Developer experience",
  "Product engineering",
] as const;

export const WORK_STYLE_POINTS = [
  "Think in systems, not isolated screens.",
  "Bias toward maintainability.",
  "Care about performance where it actually matters.",
  "Build for shipping, not just elegance.",
  "Prefer clarity over cleverness.",
] as const;

export const EXPERIENCE_SNAPSHOT = [
  {
    company: "Sprih",
    title: "Member of Technical Staff",
    summary:
      "Frontend architecture, reporting systems, supply chain dashboards, RTK Query, Zod, Playwright, and performance optimization.",
  },
  {
    company: "Bluepineapple",
    title: "Software Engineer",
    summary:
      "High-traffic Next.js application, GraphQL APIs, product features, performance improvements, and reusable UI systems.",
  },
] as const;

export const RESUME_SUMMARY =
  "Frontend-focused fullstack engineer with experience building scalable React applications, owning complex product workflows, and improving performance, reliability, and developer experience. Strong background in monorepo architectures, state management, and production-grade frontend systems.";

export const RESUME_COMPETENCIES = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"],
  },
  {
    label: "State Management",
    items: ["Redux Toolkit", "RTK Query"],
  },
  {
    label: "Architecture",
    items: ["Monorepo (Nx)", "Scalable frontend systems", "Component design"],
  },
  {
    label: "Performance",
    items: ["Code splitting", "Lazy loading", "Bundle optimization"],
  },
  {
    label: "Testing",
    items: ["Playwright", "Jest", "E2E testing", "Unit testing"],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "GraphQL", "REST APIs"],
  },
  {
    label: "DevOps",
    items: ["CI/CD", "Docker", "AWS", "Azure", "Git"],
  },
] as const;

export const RESUME_EXPERIENCE = [
  {
    title: "Member of Technical Staff",
    company: "Sprih",
    period: "Nov 2025 - Present",
    points: [
      "Owned frontend architecture and delivery for Reports and Supply Chain modules in a React monorepo, handling complex workflows for assignments, permissions, and vendor analytics.",
      "Refactored large-scale dynamic form and reporting systems, introducing reusable hooks and schema-driven validation (Zod, jsonLogic), reducing regression issues and improving maintainability.",
      "Built and scaled API integrations using Redux Toolkit / RTK Query, enabling efficient handling of complex reporting and dashboard data flows.",
      "Delivered key supply chain dashboard features, including vendor analysis and reporting insights, improving usability and data visibility.",
      "Introduced Playwright E2E testing, stabilising critical flows and improving release confidence.",
      "Reduced frontend bundle size from 7MB to modular chunks (KB-level) through code-splitting, lazy loading, and dependency optimisation.",
      "Resolved cross-browser issues (Safari, CI environments) and improved observability using structured logging with Pino.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Bluepineapple",
    period: "Jan 2022 - Oct 2025",
    points: [
      "Delivered features for a high-traffic Next.js application backed by GraphQL APIs (WordPress + Node.js).",
      "Improved backend response performance using Clinic.js and k6, reducing average request time by 17%.",
      "Implemented lazy loading and dynamic imports, improving page load performance and reducing bundle size.",
      "Built key features such as Compare Bucket and optimised lead submission flows.",
      "Improved engineering standards through reusable components, linting rules, and increased test coverage.",
      "Collaborated across Product, QA, and DevOps teams to deliver production-ready releases.",
    ],
  },
] as const;

export const RESUME_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Monorepo architecture",
  "Redux Toolkit",
  "RTK Query",
  "GraphQL",
  "Zod",
  "Playwright",
  "Performance optimization",
  "Testing and release confidence",
  "Node.js",
] as const;

export const FOOTER_BIO =
  "I build durable frontend and full-stack systems for products that need to keep working as they grow.";

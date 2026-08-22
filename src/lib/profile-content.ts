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

export const HOME_FOCUS_AREAS = [
  {
    title: "Architecture for growing products",
    copy: "Keep React and Next.js codebases from turning into patchwork.",
  },
  {
    title: "Performance and release confidence",
    copy: "Performance budgets, E2E coverage, and structured logging so releases ship without surprises.",
  },
  {
    title: "Frontend decisions with product context",
    copy: "Build around APIs, permissions, and workflows, not screens alone.",
  },
] as const;

export const HOME_IMPACT_ITEMS = [
  "Cut a large production frontend from roughly 7 MB to modular, on-demand chunks.",
  "Brought Playwright E2E coverage to assignment, permissions, and reporting flows that gated releases.",
  "Replaced ad-hoc form and report code with schema-driven systems (Zod, jsonLogic) that cut regression bugs.",
  "Improved backend response time by 17% on a high-traffic Next.js platform.",
] as const;

export const AVAILABILITY_NOTE =
  "Senior full-stack roles where engineering quality, ownership, and long-term product health matter.";

export const RESUME_SUMMARY =
  "Frontend-focused fullstack engineer with over four years shipping production React systems at scale. Currently own frontend architecture for the reporting and supply chain modules of an enterprise carbon accounting platform, where emissions data has to survive regulator audit. Depth in Nx monorepos, schema-driven forms, frontend performance, and end-to-end delivery across React and Java services.";

export const RESUME_COMPETENCIES = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript (ES2022+)", "Java", "Python", "HTML5", "CSS3", "SCSS"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js (App Router, React Server Components, ISR)",
      "Redux Toolkit",
      "RTK Query",
      "Tailwind",
      "Storybook",
      "Vite",
      "Webpack",
    ],
  },
  {
    label: "Architecture",
    items: [
      "Nx monorepos",
      "Module boundaries",
      "Design systems",
      "Architecture decision records",
      "Schema-driven UI (Zod, jsonLogic)",
    ],
  },
  {
    label: "Performance",
    items: [
      "Code splitting",
      "Tree shaking",
      "Bundle analysis",
      "Lazy loading",
      "Core Web Vitals",
      "Profiling",
    ],
  },
  {
    label: "Testing",
    items: [
      "Playwright (Page Object Model, fixtures, API mocking)",
      "Jest",
      "Unit testing",
      "End-to-end testing",
    ],
  },
  {
    label: "Backend and Data",
    items: ["Node.js", "NestJS", "GraphQL", "REST APIs", "Java services", "XBRL / XML", "MongoDB"],
  },
  {
    label: "DevOps and Tooling",
    items: [
      "CI/CD (Jenkins, CircleCI)",
      "Docker",
      "AWS",
      "Azure",
      "Git",
      "Structured logging (Pino)",
    ],
  },
] as const;

export const RESUME_EXPERIENCE = [
  {
    title: "Member of Technical Staff",
    company: "Sprih",
    period: "Nov 2025 - Present",
    points: [
      "Own frontend architecture and delivery for the Reports and Supply Chain modules of an Nx React monorepo, covering scope 1/2/3 emissions reporting, facility- and supplier-level permission models, and supplier analytics.",
      "Architected and shipped the statutory BRSR disclosure export end to end across the React frontend and Java backend, replacing a hand-maintained XBRL emitter with a pipeline that drives the regulator's own 55-sheet validation utility headlessly, spanning 1,840 taxonomy elements and 185 dependency rules.",
      "Authored the architecture and decision records for a public ESG discovery site (Next.js 15 App Router, React Server Components, ISR with HMAC webhook revalidation and tag-based invalidation), including the cross-team contracts with backend, ops, and infrastructure before build.",
      "Broke a 7 MB monolithic main bundle into vendor and route-level chunks by eliminating circular barrel re-exports that blocked Rollup chunking, adding a manual chunking strategy, and lazy-loading heavy views, reducing the main chunk to KB scale.",
      "Set the Playwright end-to-end testing standard for the codebase, replacing a manual-aggregation JavaScript pattern with a typed Page Object Model plus reusable flows and fixtures, now the required pattern for all new modules.",
      "Refactored dynamic form and reporting systems around reusable hooks and schema-driven validation (Zod, jsonLogic), and eliminated a class of site-wide date defects by consolidating scattered date handling into a tested shared utility.",
      "Mentor junior engineers on the frontend team through code review, architecture walkthroughs, and pairing on monorepo module boundaries.",
    ],
  },
  {
    title: "Senior Cloud Analyst (Frontend Engineer)",
    company: "Bluepineapple",
    period: "Jan 2022 - Oct 2025",
    points: [
      "Delivered features across a Next.js application backed by GraphQL APIs over WordPress and Node.js services, serving 1 to 2 million users daily.",
      "Cut average backend request time by 17% by profiling with Clinic.js and load-testing with k6.",
      "Authored the shared ESLint base configuration for a monorepo split, establishing naming and type-definition conventions across the newly separated content and marketplace applications.",
      "Improved page load performance through lazy loading and dynamic imports, and built the Compare Bucket feature alongside optimised lead submission flows.",
      "Raised engineering standards through reusable components, lint rules, and expanded test coverage, and contributed to the platform's Next.js upgrade and independent release-cadence work (Yarn Berry v4, Terraform, CircleCI).",
      "Mentored junior developers on the frontend team, onboarding them to the codebase and reviewing their pull requests.",
      "Partnered with Product, QA, and DevOps across a distributed team to ship production releases on a fixed cadence.",
    ],
  },
] as const;

export const RESUME_EDUCATION = [
  {
    degree: "MSc Computer Science",
    institution: "Savitribai Phule Pune University",
    detail: "CGPA 9.93",
    period: "2020 - 2022",
  },
  {
    degree: "BSc Computer Science",
    institution: "Savitribai Phule Pune University",
    detail: "82.6%",
    period: "2017 - 2020",
  },
] as const;

export const RESUME_CERTIFICATIONS = [
  "AWS Cloud Foundations",
  "Microsoft Azure Fundamentals",
] as const;

export const RESUME_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Nx monorepos",
  "React Server Components",
  "Playwright",
  "Performance optimization",
  "Schema-driven UI",
  "Redux Toolkit",
  "RTK Query",
  "GraphQL",
  "Node.js",
] as const;

export const FOOTER_BIO =
  "Senior full-stack engineer. React, Next.js, and TypeScript for products that need to scale past v1.";

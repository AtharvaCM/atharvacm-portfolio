import Link from "next/link";
import { FiBriefcase, FiGrid, FiStar, FiZap } from "react-icons/fi";

const HERO_SIGNALS = [
  {
    label: "Experience",
    value: "5+ yrs",
    description:
      "Front-end and product engineering across SaaS, internal tools, and customer-facing platforms.",
    icon: FiBriefcase
  },
  {
    label: "Projects",
    value: "40+",
    description: "Delivered across SaaS, platform, commerce, and AI contexts.",
    icon: FiGrid
  },
  {
    label: "Core strengths",
    value: "UI + DX",
    description:
      "Design systems, motion, and performance-driven front-end architecture.",
    icon: FiZap
  }
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]">
        <div className="absolute left-1/2 top-[-220px] h-[640px] w-[145vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)_/_0.2),transparent_60%)]" />
        <div className="absolute left-[8%] top-28 h-52 w-52 rounded-full border border-accent/16 bg-accent/10 blur-2xl" />
        <div className="absolute right-[8%] top-24 h-40 w-40 rounded-full border border-accent/18 bg-[hsl(18_78%_60%_/_0.14)] blur-2xl" />
      </div>

      <div className="shell">
        <div>
          <p className="eyebrow inline-flex items-center gap-2">
            <FiStar aria-hidden className="h-3.5 w-3.5" />
            Product Storytelling • Performance • Motion
          </p>

          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.2rem,8vw,7.35rem)] leading-[0.88] tracking-tight">
            <span className="inline-block">Building</span>{" "}
            <span className="inline-block text-accent">scalable</span>{" "}
            <span className="inline-block">front-end</span>{" "}
            <span className="inline-block">systems</span>{" "}
            <span className="inline-block">for</span>{" "}
            <span className="inline-block">real</span>{" "}
            <span className="inline-block">products</span>
          </h1>

          <p className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-text/75 md:text-lg">
            I&apos;m a front-end / product engineer with 5+ years building and
            maintaining production systems in React, Next.js, and TypeScript. I
            focus on performance, maintainability, and shipping work that
            actually gets used.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link className="btn-primary" href="/projects">
              View projects
            </Link>
            <Link className="btn-secondary" href="/resume">
              View resume
            </Link>
            <Link className="link-inline" href="/blog">
              Read latest insights
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {HERO_SIGNALS.map((signal) => {
              const Icon = signal.icon;

              return (
                <article className="panel h-full p-5 md:p-6" key={signal.label}>
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-text/55">
                    <Icon aria-hidden className="h-3.5 w-3.5 text-accent/70" />
                    {signal.label}
                  </p>
                  <p className="mt-3 font-display text-[2.3rem] leading-[0.92] tracking-tight text-text">
                    {signal.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text/68">
                    {signal.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCode, FiLayers, FiStar, FiZap } from "react-icons/fi";

import type { BlogPostMeta, ProjectMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

const HERO_SIGNALS = [
  {
    label: "Perceived speed",
    value: "Fast by default",
    description: "No scroll-bound animation stack, no overloaded media wall, no decorative lag."
  },
  {
    label: "Design fidelity",
    value: "Built with intent",
    description: "Editorial layout, deliberate hierarchy, and motion only when it clarifies state."
  },
  {
    label: "Delivery",
    value: "Production-minded",
    description: "Systems that stay understandable after launch, not one-off polished screenshots."
  }
] as const;

const OPERATING_BIASES = [
  "Performance budgets before visual flourish debt.",
  "Components that survive iteration and handoff.",
  "Motion that supports hierarchy and direction."
] as const;

const STACK_HIGHLIGHTS = [
  "React",
  "Next.js",
  "TypeScript",
  "Design systems",
  "Core Web Vitals",
  "Product delivery"
] as const;

type Props = {
  featuredProjects: ProjectMeta[];
  latestPost?: BlogPostMeta;
};

type SurfaceCardProps = {
  project: ProjectMeta;
  className?: string;
  compact?: boolean;
  priority?: boolean;
};

function SurfaceCard({
  project,
  className,
  compact = false,
  priority = false
}: SurfaceCardProps) {
  return (
    <Link
      className={cn(
        "group relative block overflow-hidden rounded-[1.6rem] border border-border/65 bg-text/5",
        className
      )}
      href={`/projects/${project.slug}`}
    >
      <Image
        alt={project.title}
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
        fill
        priority={priority}
        sizes={
          compact
            ? "(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 100vw"
            : "(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 100vw"
        }
        src={project.coverImage}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/68">
          {project.year} · {project.category}
        </p>
        <h2
          className={cn(
            "mt-2 font-display leading-[0.92] tracking-tight text-white",
            compact ? "text-[1.75rem]" : "text-[2.35rem]"
          )}
        >
          {project.title}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/76">
          {project.metricHighlights[0] ?? project.excerpt}
        </p>
      </div>
    </Link>
  );
}

export function Hero({ featuredProjects, latestPost }: Props) {
  const [leadProject, secondaryProject, tertiaryProject] = featuredProjects;

  return (
    <section className="relative overflow-hidden pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]">
        <div className="absolute left-1/2 top-[-220px] h-[640px] w-[145vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)_/_0.2),transparent_60%)]" />
        <div className="absolute left-[8%] top-28 h-52 w-52 rounded-full border border-accent/16 bg-accent/10 blur-2xl" />
        <div className="absolute right-[8%] top-24 h-40 w-40 rounded-full border border-accent/18 bg-[hsl(18_78%_60%_/_0.14)] blur-2xl" />
      </div>

      <div className="shell">
        <div className="grid gap-10 xl:grid-cols-[1.04fr_0.96fr] xl:items-start">
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <FiStar aria-hidden className="h-3.5 w-3.5" />
              Software engineer • Product surfaces • Performance
            </p>

            <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.2rem,8vw,7.35rem)] leading-[0.88] tracking-tight">
              I build product interfaces that feel{" "}
              <span className="text-accent">considered</span>, move with
              intent, and still hold up in production.
            </h1>

            <p className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-text/75 md:text-lg">
              This portfolio is moving toward the same standard I aim for in
              product work: strong art direction, lean runtime cost, and UI
              systems that stay sharp after real-world iteration.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link className="btn-primary" href="/projects">
                Explore case studies
              </Link>
              <Link className="btn-secondary" href="/about">
                How I work
              </Link>
              <Link className="link-inline" href="/contact">
                Start a conversation
              </Link>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {HERO_SIGNALS.map((signal) => (
                <article className="panel h-full p-5 md:p-6" key={signal.label}>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-text/55">
                    {signal.label}
                  </p>
                  <p className="mt-3 font-display text-[2.1rem] leading-[0.94] tracking-tight text-text">
                    {signal.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text/68">
                    {signal.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {leadProject || secondaryProject || tertiaryProject ? (
              <div className="panel relative overflow-hidden p-4 md:p-5">
                <div className="pointer-events-none absolute right-5 top-5 h-16 w-16 rounded-full bg-accent/10 blur-2xl" />
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="eyebrow">Selected surfaces</p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-text/55">
                    Recent work
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-[0.9fr_1.1fr]">
                  {leadProject ? (
                    <SurfaceCard
                      className="min-h-[21rem] sm:min-h-[28rem]"
                      priority
                      project={leadProject}
                    />
                  ) : null}

                  <div className="grid gap-3">
                    {secondaryProject ? (
                      <SurfaceCard
                        className="min-h-[13rem]"
                        compact
                        project={secondaryProject}
                      />
                    ) : null}

                    <div className="grid gap-3 sm:grid-cols-2">
                      {tertiaryProject ? (
                        <SurfaceCard
                          className="min-h-[11.5rem]"
                          compact
                          project={tertiaryProject}
                        />
                      ) : null}

                      {latestPost ? (
                        <article className="rounded-[1.55rem] border border-border/65 bg-surface/72 p-4 md:p-5">
                          <p className="text-[10px] uppercase tracking-[0.16em] text-text/55">
                            Latest note
                          </p>
                          <Link
                            className="mt-3 inline-block font-display text-[1.85rem] leading-[0.95] tracking-tight text-text transition duration-300 hover:text-accent"
                            href={`/blog/${latestPost.slug}`}
                          >
                            {latestPost.title}
                          </Link>
                          <p className="mt-3 text-sm leading-relaxed text-text/68">
                            {latestPost.excerpt}
                          </p>
                          <Link
                            className="link-action mt-5"
                            href={`/blog/${latestPost.slug}`}
                          >
                            Read note <FiArrowRight aria-hidden className="h-4 w-4" />
                          </Link>
                        </article>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <article className="panel p-5 md:p-6">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-text/55">
                  <FiZap aria-hidden className="h-3.5 w-3.5 text-accent/70" />
                  Operating bias
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                  {OPERATING_BIASES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="panel p-5 md:p-6">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-text/55">
                  <FiCode aria-hidden className="h-3.5 w-3.5 text-accent/70" />
                  Core stack
                </p>
                <ul className="mt-4 flex flex-wrap gap-2 text-[11px] text-text/70">
                  {STACK_HIGHLIGHTS.map((item) => (
                    <li
                      className="rounded-full border border-border/70 bg-surface/88 px-3 py-1.5 font-semibold tracking-[0.04em]"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-[1.35rem] border border-border/60 bg-bg/50 p-4 text-sm leading-relaxed text-text/68">
                  <p className="inline-flex items-center gap-2 font-semibold text-text/82">
                    <FiLayers aria-hidden className="h-4 w-4 text-accent/70" />
                    Building for premium feel without the premium weight
                  </p>
                  <p className="mt-3">
                    The direction is closer to Framer-style portfolio work:
                    asymmetry, layered depth, and stronger typography, but kept
                    honest with pragmatic implementation.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

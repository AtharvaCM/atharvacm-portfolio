import type { Metadata } from "next";
import { FiBriefcase, FiCode, FiGrid, FiStar, FiZap } from "react-icons/fi";

import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About - ${SITE_NAME}`,
  description: "About Atharva CM - product engineer building scalable, performance-driven front-end systems."
};

export default function AboutPage() {
  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow inline-flex items-center gap-2">
        <FiStar aria-hidden className="h-3.5 w-3.5" />
        About
      </p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        Product engineer focused on building front-end systems that actually hold up.
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-text/72 md:text-lg">
        I work on production front-ends where performance, maintainability, and product impact matter more than
        trends.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-5 text-base leading-relaxed text-text/75">
          <p>
            I&apos;m a product-focused front-end engineer with 5+ years of experience working on real, shipped products.
            Most of my work lives inside long-running codebases.
          </p>
          <p>
            I spend my time translating product requirements into scalable front-end systems, collaborating closely
            with designers and backend engineers, and making sure what we ship is fast, understandable, and
            maintainable six months later.
          </p>
          <p>
            I care deeply about developer experience, performance, and clarity. If a component is hard to reason
            about, it usually means the system is wrong, not the developer.
          </p>
        </div>

        <div className="panel p-6 text-sm text-text/75">
          <p className="inline-flex items-center gap-2 font-semibold text-text">
            <FiCode aria-hidden className="h-4 w-4 text-accent/75" />
            What I work on
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Designing scalable component and state architectures</li>
            <li>Building production front-ends with React, Next.js, and TypeScript</li>
            <li>Performance optimization, Core Web Vitals, and load strategy</li>
            <li>Design systems, motion, and interaction implementation</li>
            <li>Improving DX in growing teams and codebases</li>
          </ul>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="section-heading inline-flex max-w-4xl items-center gap-3 text-[clamp(2rem,4.8vw,3.6rem)]">
          <FiZap aria-hidden className="h-7 w-7 text-accent/75 md:h-8 md:w-8" />
          How I approach front-end engineering
        </h2>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          <article className="panel p-6">
            <p className="inline-flex items-center gap-2 font-display text-3xl leading-none tracking-tight">
              <FiGrid aria-hidden className="h-5 w-5 text-accent/70" />
              Systems over screens
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text/72">
              I focus on component structure, state flow, and long-term maintainability before visual polish.
            </p>
          </article>
          <article className="panel p-6">
            <p className="inline-flex items-center gap-2 font-display text-3xl leading-none tracking-tight">
              <FiZap aria-hidden className="h-5 w-5 text-accent/70" />
              Performance is a feature
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text/72">
              I treat loading behavior, responsiveness, and perceived speed as part of the product, not an afterthought.
            </p>
          </article>
          <article className="panel p-6">
            <p className="inline-flex items-center gap-2 font-display text-3xl leading-none tracking-tight">
              <FiBriefcase aria-hidden className="h-5 w-5 text-accent/70" />
              Code is a team sport
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text/72">
              I optimize for clarity, conventions, and shared ownership so teams can move fast without breaking things.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}

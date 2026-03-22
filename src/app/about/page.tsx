import type { Metadata } from "next";
import Link from "next/link";
import { FiBriefcase, FiCode, FiStar, FiZap } from "react-icons/fi";

import { SITE_NAME } from "@/lib/constants";
import {
  ABOUT_INTERESTS,
  EXPERIENCE_SNAPSHOT,
  WORK_STYLE_POINTS
} from "@/lib/profile-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `About | ${SITE_NAME}`,
  description:
    "About Atharva Mahamuni, a senior frontend-focused full-stack engineer building scalable React, Next.js, and TypeScript systems for production-grade applications.",
  path: "/about",
  keywords: [
    "Senior Frontend Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Production Systems"
  ]
});

export default function AboutPage() {
  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow inline-flex items-center gap-2">
        <FiStar aria-hidden className="h-3.5 w-3.5 text-accent/80" />
        About
      </p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        I build frontend systems that are meant to survive production, not just
        look good in demos.
      </h1>
      <p className="section-copy mt-5 max-w-[46rem] text-base md:text-lg">
        I&apos;m a frontend-focused full-stack engineer with 5+ years of
        experience building and maintaining production-grade web applications.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link className="btn-primary" href="/projects">
          View projects
        </Link>
        <Link className="btn-secondary" href="/resume">
          View resume
        </Link>
        <Link className="btn-secondary" href="/contact">
          Contact me
        </Link>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.18fr_0.82fr]">
        <div className="space-y-5 rounded-[1.2rem] border border-border/60 bg-[hsl(var(--surface-soft)/0.48)] p-6 text-base leading-8 text-text/75 md:p-7">
          <p>
            My core background is as a frontend developer working in React,
            Next.js, and TypeScript. My strongest area is frontend engineering at scale, especially in
            React, Next.js, and TypeScript environments where product
            complexity, performance, and maintainability all matter at the same
            time.
          </p>
          <p>
            At Sprih, I&apos;ve owned frontend architecture and delivery for
            reporting and supply chain modules in a React monorepo. That work
            includes complex dashboard flows, permissions, vendor analytics,
            schema-driven forms, and API-heavy reporting systems.
          </p>
          <p>
            Before that, at Bluepineapple, I worked on a high-traffic Next.js
            platform backed by GraphQL APIs, shipping product features,
            improving performance, and contributing to stronger engineering
            standards.
          </p>
        </div>

        <div className="panel p-6 text-sm text-text/75 md:p-7">
          <p className="inline-flex items-center gap-2 font-semibold text-text">
            <FiCode aria-hidden className="h-4 w-4 text-accent/75" />
            Especially interested in
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {ABOUT_INTERESTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="section-heading inline-flex max-w-4xl items-center gap-3 text-[clamp(2rem,4.8vw,3.6rem)]">
          <FiZap aria-hidden className="h-7 w-7 text-accent/75 md:h-8 md:w-8" />
          How I work
        </h2>
        <p className="section-copy mt-5 max-w-[42rem] md:text-base">
          I like building systems that stay understandable as they grow. That
          usually means thinking beyond the immediate feature and making
          deliberate choices around structure, reuse, performance, and
          reliability. I care about clean code, but I care even more about
          whether the system remains easy to change six months later.
        </p>

        <div className="mt-7 overflow-hidden rounded-[1.45rem] border border-border/65 bg-border/65 shadow-[0_22px_54px_-40px_hsl(var(--text)/0.16)]">
          <div className="grid gap-px md:grid-cols-2 xl:grid-cols-5">
          {WORK_STYLE_POINTS.map((point) => (
            <article
              className="bg-[hsl(var(--surface)/0.96)] p-5 md:p-6"
              key={point}
            >
              <p className="text-sm leading-7 text-text/72">{point}</p>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="section-heading inline-flex items-center gap-3">
          <FiBriefcase aria-hidden className="h-6 w-6 text-accent/75" />
          Experience Snapshot
        </h2>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {EXPERIENCE_SNAPSHOT.map((item) => (
            <article className="panel p-6" key={item.company}>
              <span className="meta-chip">{item.company}</span>
              <h3 className="mt-3 font-display text-3xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-text/72">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="section-heading">Outside of work</h2>
        <p className="section-copy mt-5 md:text-base">
          Outside of work, I enjoy exploring systems, tools, and side projects
          that sharpen how I think about engineering, from CMS-driven platforms
          to real-time applications and self-hosted infrastructure.
        </p>
      </section>
    </section>
  );
}

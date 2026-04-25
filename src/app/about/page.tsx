import type { Metadata } from "next";
import Link from "next/link";

import { StructuredData } from "@/components/structured-data";
import { SITE_NAME } from "@/lib/constants";
import {
  buildMetadata,
  getBreadcrumbStructuredData,
  getProfilePageStructuredData
} from "@/lib/seo";

const ABOUT_DESCRIPTION =
  "Atharva Mahamuni — senior full-stack engineer based in Pune, working on React, Next.js, and TypeScript systems for products that need to scale past v1.";

export const metadata: Metadata = buildMetadata({
  title: `About | ${SITE_NAME}`,
  description: ABOUT_DESCRIPTION,
  path: "/about",
  type: "profile",
  keywords: [
    "Senior Full-Stack Engineer",
    "React Developer",
    "Next.js Developer",
    "Product Engineering",
    "Maintainable Software",
  ],
});

const CARE_POINTS = [
  {
    title: "Clarity",
    copy: "I'd rather ship a 50-line module the next person can read than a 15-line one only I can.",
  },
  {
    title: "Durability",
    copy: "Code that still makes sense six months and three feature pivots later.",
  },
  {
    title: "Ownership",
    copy: "I do my best work when I can think about the product, not just the ticket in front of me.",
  },
  {
    title: "Curiosity",
    copy: "Self-hosted setups, IR blasters, side projects — most of what I learn comes from tinkering.",
  },
  {
    title: "Taste",
    copy: "Software, like good design, should feel considered. I notice when it doesn't.",
  },
] as const;

const STORY_POINTS = [
  "Started with a straightforward interest in building for the web, then got pulled deeper into the systems behind them. The more real product work I did, the more I cared about structure, maintainability, and the decisions that only show up once complexity arrives.",
  "Over time I moved from shipping features to thinking about architecture, performance, and how products hold up after release. That's still the part of engineering I enjoy most.",
] as const;

const TINKERING_POINTS = [
  {
    title: "Self-hosted tools and Linux setups",
    copy: "I like understanding the systems I use, not just consuming them.",
    image: "/images/about/raspberry-pi-nas-self-hosted.jpg",
  },
  {
    title: "Side projects",
    copy: "Small experiments are usually where I learn fastest.",
    image: "/images/about/my-workstation-side-projects.jpg",
  },
  {
    title: "Music and rhythm",
    copy: "Playing drums is one of the better ways I get out of my head.",
    image: "/images/about/drum-setup.jpg",
  },
  {
    title: "Long drives",
    copy: "Some of the best resets are offline.",
    image: "/images/about/long-drive-me-with-virtus-gt.jpg",
  },
] as const;

export default function AboutPage() {
  return (
    <section className="shell py-14 md:py-20">
      <StructuredData
        data={getProfilePageStructuredData({
          description: ABOUT_DESCRIPTION,
          path: "/about"
        })}
      />
      <StructuredData
        data={getBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" }
        ])}
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_0.36fr] lg:items-end lg:gap-16">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.45rem,12vw,5rem)] leading-[0.95] tracking-tight md:leading-none">
            I like building things that stay useful over time.
          </h1>
          <p className="section-copy mt-6 max-w-[46rem] text-[1rem] leading-8 md:mt-5 md:text-lg">
            Senior full-stack engineer based in Pune. I work on React, Next.js,
            and TypeScript systems for products that need to scale past v1.
          </p>
        </div>
        <div
          aria-label="Portrait of Atharva Mahamuni"
          className="min-h-[22rem] overflow-hidden rounded-[1.45rem] border border-border/70 bg-cover bg-center opacity-95 shadow-[0_24px_80px_hsl(var(--ink)/0.28)] md:min-h-80 md:rounded-[1.7rem] lg:min-h-[24rem]"
          role="img"
          style={{
            backgroundImage: "url(/images/about/atharva-portrait.jpg)",
          }}
        />
      </div>

      <div className="mt-12 grid gap-7 border-t border-border/80 pt-9 md:mt-14 md:gap-10 md:pt-10 lg:grid-cols-[0.76fr_1fr] lg:gap-16">
        <p className="eyebrow">A little context</p>
        <div className="max-w-[47rem] space-y-5 text-[1rem] leading-8 text-text/76 md:text-[1.03rem]">
          <p>
            I&apos;m based in Pune, and most of my work has involved building
            products that need to work through real complexity, not just look
            good in ideal conditions. That&apos;s probably why I&apos;ve always
            been drawn to things that stay clear and useful as they grow.
          </p>
          <p>
            What keeps me interested is the judgment around the work: what to
            simplify, what to optimize, what to leave alone, and what&apos;s
            actually worth building well.
          </p>
        </div>
      </div>

      <section className="mt-14 grid gap-9 border-t border-border/80 pt-9 md:mt-16 md:gap-10 md:pt-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
        <div>
          <h2 className="section-heading">How I got here</h2>
          <p className="section-copy mt-5 text-[0.95rem] leading-7 md:mt-4 md:text-base">
            A short version of how I grew into the kind of engineer I am now.
          </p>
        </div>
        <ol className="space-y-7 md:space-y-6">
          {STORY_POINTS.map((item, index) => (
            <li
              className="grid gap-3 border-t border-border/70 pt-6 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr] sm:gap-4 md:pt-5"
              key={item}
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[1rem] leading-8 text-text/76 md:text-[1.03rem]">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 border-t border-border/80 pt-9 md:mt-16 md:pt-10">
        <h2 className="section-heading">What matters to me</h2>

        <div className="mt-8 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-px md:overflow-hidden md:rounded-[1.45rem] md:border md:border-border/65 md:bg-border/65 xl:grid-cols-5">
          {CARE_POINTS.map((item) => (
            <article
              className="rounded-[1.05rem] border border-border/70 bg-[hsl(var(--surface)/0.9)] p-5 md:rounded-none md:border-0 md:bg-[hsl(var(--surface)/0.96)] md:p-6"
              key={item.title}
            >
              <h3 className="text-base font-semibold tracking-[-0.02em] text-text">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-7 text-text/74 md:text-sm md:text-text/72">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border/80 pt-9 md:mt-16 md:pt-10">
        <div className="max-w-[42rem]">
          <h2 className="section-heading">
            What I&apos;m usually tinkering with
          </h2>
          <p className="section-copy mt-5 text-[0.95rem] leading-7 md:mt-4 md:text-base">
            A few things that keep showing up outside the day job.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-6">
          {TINKERING_POINTS.map((item) => (
            <article
              className="overflow-hidden rounded-[1.2rem] border border-border/70 bg-[hsl(var(--surface)/0.72)] md:rounded-[1.4rem]"
              key={item.title}
            >
              <div
                aria-hidden="true"
                className="relative aspect-square overflow-hidden border-b border-border/65 bg-[hsl(var(--ink)/0.55)] sm:aspect-[4/3] md:aspect-[5/4]"
              >
                <div
                  className="absolute -inset-5 scale-110 bg-cover bg-center opacity-65 blur-xl"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-[hsl(var(--ink)/0.2)]" />
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-text/74 md:text-sm md:text-text/72">
                  {item.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border/80 pt-9 md:mt-16 md:pt-10">
        <h2 className="section-heading max-w-4xl">
          If you think we&apos;d work well together, I&apos;d be glad to talk.
        </h2>
        <p className="section-copy mt-6 max-w-[42rem] md:mt-5 md:text-base">
          Especially if you care about strong engineering judgment, clear
          systems, and shipping work you can stand behind.
        </p>
        <div className="mt-8 grid sm:block">
          <Link className="btn-primary sm:w-auto" href="/contact">
            Get in touch
          </Link>
        </div>
      </section>
    </section>
  );
}

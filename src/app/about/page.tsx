import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `About | ${SITE_NAME}`,
  description:
    "About Atharva Mahamuni, a senior full-stack engineer who cares about thoughtful work, clear systems, and products that hold up over time.",
  path: "/about",
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
    copy: "I like work that is easy to understand, honest about its tradeoffs, and simple enough to build on.",
  },
  {
    title: "Durability",
    copy: "I care about things that still make sense after the first version ships.",
  },
  {
    title: "Ownership",
    copy: "I do my best work when I can care about the product, not just the task in front of me.",
  },
  {
    title: "Curiosity",
    copy: "A lot of my best learning has come from tinkering and following ideas properly.",
  },
  {
    title: "Taste",
    copy: "I care when things feel considered, useful, and well made.",
  },
] as const;

const STORY_POINTS = [
  "Started with a straightforward interest in building things for the web, then got pulled deeper into the systems behind them.",
  "The more real product work I did, the more I cared about structure, maintainability, and decisions that only show up once complexity arrives.",
  "Over time, I moved from just shipping features to thinking more about architecture, performance, and how products hold up after release.",
  "That is still the part of engineering I enjoy most: building things that stay useful, clear, and dependable in the real world.",
] as const;

const TINKERING_POINTS = [
  {
    title: "Self-hosted tools and Linux setups",
    copy: "I like understanding the systems I use, not just consuming them.",
    image: "/images/about/self-hosted-tools.svg",
  },
  {
    title: "Side projects",
    copy: "Small experiments are usually where I learn fastest.",
    image: "/images/about/side-projects.svg",
  },
  {
    title: "Books, music, and films",
    copy: "A lot of good ideas come from outside software.",
    image: "/images/about/books-music-films.svg",
  },
  {
    title: "Cooking, badminton, and long rides",
    copy: "Some of the best resets are offline.",
    image: "/images/about/offline-resets.svg",
  },
] as const;

export default function AboutPage() {
  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">About</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        I like building things that stay useful over time.
      </h1>
      <p className="section-copy mt-5 max-w-[46rem] text-base md:text-lg">
        I&apos;m a senior full-stack engineer who cares about thoughtful work,
        clear systems, and products that hold up over time.
      </p>

      <div className="mt-14 grid gap-10 border-t border-border/80 pt-10 lg:grid-cols-[0.76fr_1fr] lg:gap-16">
        <p className="eyebrow">A little context</p>
        <div className="max-w-[47rem] space-y-5 text-[1.03rem] leading-8 text-text/76">
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

      <section className="mt-16 grid gap-10 border-t border-border/80 pt-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
        <div>
          <h2 className="section-heading">How I got here</h2>
          <p className="section-copy mt-4 text-sm md:text-base">
            A short version of how I grew into the kind of engineer I am now.
          </p>
        </div>
        <ol className="space-y-6">
          {STORY_POINTS.map((item, index) => (
            <li
              className="grid gap-4 border-t border-border/70 pt-5 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr]"
              key={item}
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[1.03rem] leading-8 text-text/76">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 border-t border-border/80 pt-10">
        <h2 className="section-heading">What matters to me</h2>

        <div className="mt-8 grid gap-px overflow-hidden rounded-[1.45rem] border border-border/65 bg-border/65 md:grid-cols-2 xl:grid-cols-5">
          {CARE_POINTS.map((item) => (
            <article
              className="bg-[hsl(var(--surface)/0.96)] p-5 md:p-6"
              key={item.title}
            >
              <h3 className="text-base font-semibold tracking-[-0.02em] text-text">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-text/72">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-border/80 pt-10">
        <div className="max-w-[42rem]">
          <h2 className="section-heading">What I&apos;m usually tinkering with</h2>
          <p className="section-copy mt-4 text-sm md:text-base">
            A few things that keep showing up outside the day job.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {TINKERING_POINTS.map((item) => (
            <article
              className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-[hsl(var(--surface)/0.72)]"
              key={item.title}
            >
              <div
                aria-hidden="true"
                className="min-h-44 border-b border-border/65 bg-cover bg-center opacity-90"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-5 md:p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-text/72">
                  {item.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-border/80 pt-10">
        <h2 className="section-heading max-w-4xl">
          If you think we&apos;d work well together, I&apos;d be glad to talk.
        </h2>
        <p className="section-copy mt-5 max-w-[42rem] md:text-base">
          Especially if you care about thoughtful products, strong engineering
          judgment, and work that holds up over time.
        </p>
        <div className="mt-8">
          <Link className="btn-primary" href="/contact">
            Get in touch
          </Link>
        </div>
      </section>
    </section>
  );
}

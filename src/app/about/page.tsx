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
    copy: "I like work that is easy to understand and honest about its tradeoffs.",
  },
  {
    title: "Durability",
    copy: "I like decisions that still make sense after the first version ships.",
  },
  {
    title: "Ownership",
    copy: "I do my best work when I can care about the product, not just the task.",
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

      <section className="mt-16 grid gap-10 border-t border-border/80 pt-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
        <h2 className="section-heading">Outside of work</h2>
        <p className="max-w-[47rem] text-[1.03rem] leading-8 text-text/76">
          Outside work, I&apos;m often around side projects and systems too:
          self-hosted tools, Linux setups, and ideas I want to explore properly.
          The rest is books, music, cooking, long rides, badminton, and whatever
          I&apos;m currently watching or reading.
        </p>
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

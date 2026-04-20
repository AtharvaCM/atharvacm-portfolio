import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Now | ${SITE_NAME}`,
  description:
    "A quiet snapshot of what Atharva Mahamuni is currently building, tinkering with, and paying attention to.",
  path: "/now",
  keywords: [
    "Atharva Mahamuni now",
    "Now page",
    "Personal portfolio",
    "Software engineer",
  ],
});

const NOW_ITEMS = [
  {
    title: "Currently building",
    copy: "Refining this portfolio, getting the blog properly live, and going deeper into Vehicle Vault, a vehicle maintenance tracking product that's slowly turning into something much bigger.",
  },
  {
    title: "Currently tinkering with",
    copy: "Trying to get an IR blaster + Home Assistant setup working cleanly for PAR lights and AC controls without turning it into an unnecessary science experiment.",
  },
  {
    title: "Currently reading",
    copy: "Working through 12 Rules for Life by Dr. Jordan Peterson.",
  },
  {
    title: "Currently listening to",
    copy: "A lot of heavy metal lately.",
  },
] as const;

export default function NowPage() {
  return (
    <section className="shell py-14 md:py-20">
      <div className="max-w-4xl">
        <p className="eyebrow">Now</p>
        <h1 className="mt-5 font-display text-[clamp(2.45rem,12vw,5rem)] leading-[0.95] tracking-tight md:leading-none">
          A few things I&apos;m currently spending time on.
        </h1>
        <p className="section-copy mt-6 max-w-[34rem] text-[0.95rem] leading-7 md:mt-5">
          Updated occasionally, not religiously.
        </p>
      </div>

      <div className="mt-12 grid gap-7 border-t border-border/80 pt-9 md:mt-14 md:grid-cols-2 md:gap-x-12 md:gap-y-11 md:pt-10">
        {NOW_ITEMS.map((item) => (
          <article
            className="border-t border-border/65 pt-6 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-6"
            key={item.title}
          >
            <h2 className="text-[1.35rem] font-semibold leading-tight tracking-[-0.035em] text-text md:text-[1.6rem]">
              {item.title}
            </h2>
            <p className="mt-3 max-w-[34rem] text-[1rem] leading-8 text-text/76 md:text-[1.03rem]">
              {item.copy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

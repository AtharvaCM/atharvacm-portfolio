import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About - ${SITE_NAME}`,
  description: "About Atharva CM - product-focused designer and developer."
};

export default function AboutPage() {
  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">About</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        Product engineer focused on high-quality front-end systems.
      </h1>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <p className="text-base leading-relaxed text-text/75">
          I work full-time on product teams, shipping interfaces that balance usability, visual craft, and performance.
          My core strength is bridging product requirements with scalable front-end implementation.
        </p>
        <div className="panel p-6 text-sm text-text/75">
          <p className="font-semibold text-text">Capabilities</p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Design systems and component architecture</li>
            <li>React/Next.js front-end engineering</li>
            <li>Interaction design and motion implementation</li>
            <li>Performance optimization and developer experience</li>
          </ul>
        </div>
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <article className="panel p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-text/60">Experience</p>
          <p className="mt-3 font-display text-4xl">6+ years</p>
          <p className="mt-2 text-sm text-text/70">Shipping web products and campaigns.</p>
        </article>
        <article className="panel p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-text/60">Projects</p>
          <p className="mt-3 font-display text-4xl">40+</p>
          <p className="mt-2 text-sm text-text/70">Across SaaS, platform, commerce, and AI.</p>
        </article>
        <article className="panel p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-text/60">Focus</p>
          <p className="mt-3 font-display text-4xl">Product impact</p>
          <p className="mt-2 text-sm text-text/70">Quality engineering with measurable user and business outcomes.</p>
        </article>
      </section>
    </section>
  );
}

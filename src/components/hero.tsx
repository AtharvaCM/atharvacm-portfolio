"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiBriefcase, FiGrid, FiStar, FiZap } from "react-icons/fi";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-kicker]", { opacity: 0, y: 24, duration: 0.6 })
        .from(
          "[data-hero-title] span",
          {
            opacity: 0,
            y: 64,
            duration: 0.8,
            stagger: 0.08,
          },
          "<0.08",
        )
        .from("[data-hero-copy]", { opacity: 0, y: 20, duration: 0.65 }, "<0.2")
        .from(
          "[data-hero-actions]",
          { opacity: 0, y: 20, duration: 0.55 },
          "<0.12",
        )
        .from(
          "[data-hero-metrics]",
          { opacity: 0, y: 24, duration: 0.6 },
          "<0.1",
        )
        .from("[data-orb]", { scale: 0.85, opacity: 0, duration: 1.1 }, "<");
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <section
      className="relative pb-24 pt-20 md:pb-32 md:pt-28"
      ref={containerRef}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]">
        <div
          className="absolute left-1/2 top-[-190px] h-[660px] w-[160vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)_/_0.23),transparent_60%)]"
          data-orb
        />
        <div className="absolute right-[7%] top-20 h-56 w-56 rounded-full border border-accent/35 bg-accent/20 blur-2xl" />
        <div className="absolute left-[12%] top-24 h-44 w-44 rounded-full bg-white/45 blur-2xl" />
      </div>

      <div className="shell">
        <p className="eyebrow inline-flex items-center gap-2" data-hero-kicker>
          <FiStar aria-hidden className="h-3.5 w-3.5" />
          Product Storytelling • Performance • Motion
        </p>

        <h1
          className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,7vw,6.6rem)] leading-[0.9] tracking-tight"
          data-hero-title
        >
          <span className="inline-block">Building</span>{" "}
          <span className="inline-block text-accent">scalable</span>{" "}
          <span className="inline-block">front-end</span>{" "}
          <span className="inline-block">systems</span>{" "}
          <span className="inline-block">for</span>{" "}
          <span className="inline-block">real</span>{" "}
          <span className="inline-block">products</span>
        </h1>

        <p
          className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-text/75 md:text-lg"
          data-hero-copy
        >
          I&apos;m a front-end / product engineer with 5+ years building and
          maintaining production systems in React, Next.js, and TypeScript. I
          focus on performance, maintainability, and shipping work that actually
          gets used.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-4"
          data-hero-actions
        >
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

        <div className="mt-12 grid gap-4 md:grid-cols-3" data-hero-metrics>
          <article className="panel p-5 md:p-6">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-text/55">
              <FiBriefcase aria-hidden className="h-3.5 w-3.5 text-accent/70" />
              Experience
            </p>
            <p className="mt-2 font-display text-4xl leading-none">5+ yrs</p>
            <p className="mt-3 text-sm text-text/68">
              Front-end and product engineering across SaaS, internal tools, and
              customer-facing platforms.
            </p>
          </article>
          <article className="panel p-5 md:p-6">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-text/55">
              <FiGrid aria-hidden className="h-3.5 w-3.5 text-accent/70" />
              Projects
            </p>
            <p className="mt-2 font-display text-4xl leading-none">40+</p>
            <p className="mt-3 text-sm text-text/68">
              Delivered across SaaS, platform, commerce, and AI contexts.
            </p>
          </article>
          <article className="panel p-5 md:p-6">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-text/55">
              <FiZap aria-hidden className="h-3.5 w-3.5 text-accent/70" />
              Core strengths
            </p>
            <p className="mt-2 font-display text-4xl leading-none">UI + DX</p>
            <p className="mt-3 text-sm text-text/68">
              Design systems, motion, and performance-driven front-end
              architecture.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

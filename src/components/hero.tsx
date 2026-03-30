import Link from "next/link";
import { FiBriefcase, FiGrid, FiStar, FiZap } from "react-icons/fi";

import { BadgeLabel } from "@/components/badge-label";
import { RESUME_URL } from "@/lib/constants";
import {
  AVAILABILITY_NOTE,
  HERO_BADGES,
  HERO_PROOF_POINTS,
} from "@/lib/profile-content";

const HERO_SIGNAL_ICONS = [FiBriefcase, FiGrid, FiZap, FiStar];

export function Hero() {
  const resumeHref = RESUME_URL ?? "/resume";
  const resumeTarget = RESUME_URL ? "_blank" : undefined;
  const resumeRel = RESUME_URL ? "noreferrer" : undefined;

  return (
    <section className="relative overflow-hidden pb-14 pt-12 md:pb-20 md:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px]">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)_/_0.12),transparent_62%)]" />
        <div className="absolute inset-x-[6%] top-0 h-[340px] rounded-[2.2rem] bg-[linear-gradient(180deg,hsl(var(--surface)_/_0.42),transparent_82%)]" />
      </div>

      <div className="shell">
        <div className="mx-auto max-w-[71rem]">
          <div className="max-w-[64rem]">
            <p className="eyebrow inline-flex items-center gap-2">
              <FiStar aria-hidden className="h-3.5 w-3.5 text-accent/80" />
              Frontend Systems • Performance • Product Delivery
            </p>

            <h1 className="mt-5 font-display text-[clamp(3.65rem,8vw,7.15rem)] leading-[0.8] tracking-[-0.02em]">
              <span className="block md:whitespace-nowrap">
                Senior Software Engineer
              </span>
              <span className="mt-1 block text-accent">building scalable</span>
              <span className="mt-1 block md:whitespace-nowrap">
                product systems
              </span>
            </h1>

            <p className="mt-9 max-w-[43rem] text-balance text-base leading-7 text-text/74 md:text-[1.05rem]">
              I build frontend-heavy web products that stay fast, reliable,
              and maintainable as they grow. My work spans UI architecture,
              performance, and production delivery across real product teams.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <Link className="btn-primary" href="#selected-work">
                View Selected Work
              </Link>
              <Link
                className="btn-secondary"
                href={resumeHref}
                rel={resumeRel}
                target={resumeTarget}
              >
                Download Resume
              </Link>
              <Link className="link-inline" href="/contact">
                Contact Me
              </Link>
            </div>

            <p className="mt-5 text-sm font-medium leading-7 text-text/68">
              {AVAILABILITY_NOTE}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2 text-[11px] text-text/70">
              {HERO_BADGES.map((badge) => (
                <li
                  className="tag-chip font-semibold tracking-[0.06em]"
                  key={badge}
                >
                  <BadgeLabel label={badge} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 overflow-hidden rounded-[1.45rem] border border-border/65 bg-border/65 shadow-[0_22px_54px_-40px_hsl(var(--text)/0.18)]">
            <div className="grid gap-px sm:grid-cols-2 xl:grid-cols-4">
              {HERO_PROOF_POINTS.map((signal, index) => {
                const Icon = HERO_SIGNAL_ICONS[index] ?? FiBriefcase;

                return (
                  <article
                    className="bg-[hsl(var(--surface)/0.96)] p-5 md:p-6"
                    key={signal.label}
                  >
                    <p className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-text/52">
                      <Icon
                        aria-hidden
                        className="h-3.5 w-3.5 text-accent/75"
                      />
                      {signal.label}
                    </p>
                    <p className="mt-3 font-display text-[1.75rem] leading-[0.96] tracking-tight text-text md:text-[1.95rem]">
                      {signal.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-text/66">
                      {signal.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

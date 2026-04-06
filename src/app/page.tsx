import Image from "next/image";
import Link from "next/link";
import { createElement, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiGrid,
  FiShield,
  FiTrendingUp,
  FiUpload,
} from "react-icons/fi";

import { AnimatedSection } from "@/components/animated-section";
import { PROJECT_CATEGORY_LABELS, RESUME_URL } from "@/lib/constants";
import { getAllProjects } from "@/lib/content";
import {
  AVAILABILITY_NOTE,
  HOME_FOCUS_AREAS,
  HOME_IMPACT_ITEMS,
  PROFILE_NAME,
  RESUME_EXPERIENCE,
} from "@/lib/profile-content";
import { HOME_DESCRIPTION, HOME_TITLE, buildMetadata } from "@/lib/seo";
import type { ProjectMeta } from "@/lib/types";

export const metadata = buildMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  keywords: [
    "Senior Frontend Engineer",
    "Frontend-Focused Full-Stack Engineer",
    "React Architecture",
    "Next.js Performance",
    "Product Engineering",
  ],
});

const IMPACT_LABELS = [
  "Performance",
  "Reliability",
  "Architecture",
  "Delivery",
] as const;

const IMPACT_ICONS: IconType[] = [FiTrendingUp, FiShield, FiGrid, FiUpload];

const EXPERIENCE_PERIODS = [
  "Current • 2025–Present",
  "Previous • 2022–2025",
] as const;

function getHomepageProjects(projects: ProjectMeta[]) {
  const selected: ProjectMeta[] = [];
  const seen = new Set<string>();

  for (const project of projects.filter((item) => item.featured)) {
    selected.push(project);
    seen.add(project.slug);
  }

  for (const project of projects) {
    if (selected.length >= 3) {
      break;
    }

    if (seen.has(project.slug)) {
      continue;
    }

    if (project.liveUrl || project.repoUrl) {
      selected.push(project);
      seen.add(project.slug);
    }
  }

  return selected.slice(0, 3);
}

function WorkRow({
  project,
  imageFirst,
}: {
  project: ProjectMeta;
  imageFirst: boolean;
}) {
  return (
    <article className="border-t border-border/90 py-10 first:border-t-0 first:pt-0 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        <div className={imageFirst ? "" : "lg:order-2"}>
          <div className="flex flex-wrap items-center gap-2.5 text-[hsl(var(--text-muted))]">
            <p className="eyebrow">
              {PROJECT_CATEGORY_LABELS[project.category]}
            </p>
            <span aria-hidden className="text-text/28">
              •
            </span>
            <p className="eyebrow">{project.year}</p>
            <span aria-hidden className="text-text/28">
              •
            </span>
            <p className="eyebrow">{project.role}</p>
          </div>

          <h3 className="mt-4 max-w-[16ch] text-[clamp(1.75rem,3.15vw,3.45rem)] font-bold tracking-[-0.055em] text-text">
            <Link className="link-display" href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="mt-5 max-w-[38rem] text-[0.98rem] leading-7 text-[hsl(var(--text-muted))]">
            {project.excerpt}
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="eyebrow">System</p>
              <p className="mt-2 text-[0.95rem] leading-7 text-text">
                {project.context}
              </p>
            </div>
            <div>
              <p className="eyebrow">Outcome</p>
              <p className="mt-2 text-[0.95rem] leading-7 text-[hsl(var(--text-muted))]">
                {project.impact}
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-2.5 border-t border-border/80 pt-5">
            {project.metricHighlights.slice(0, 2).map((item) => (
              <li
                className="flex gap-3 text-[0.95rem] leading-7 text-[hsl(var(--text-muted))]"
                key={item}
              >
                <span className="mt-[0.95rem] h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link className="link-action" href={`/projects/${project.slug}`}>
              View project details <span aria-hidden>-&gt;</span>
            </Link>
            {project.liveUrl ? (
              <Link
                className="link-inline"
                href={project.liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                Live site{" "}
                <FiArrowUpRight aria-hidden className="ml-1 h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
        </div>

        <div className={imageFirst ? "" : "lg:order-1"}>
          <div className="relative aspect-[5/4] overflow-hidden bg-[hsl(var(--surface-soft))]">
            <Image
              alt={project.title}
              className="object-cover object-top transition duration-500 hover:scale-[1.015]"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={project.coverImage}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const projects = await getAllProjects();
  const homepageProjects = getHomepageProjects(projects);
  const resumeHref = RESUME_URL ?? "/resume";
  const resumeTarget = RESUME_URL ? "_blank" : undefined;
  const resumeRel = RESUME_URL ? "noreferrer" : undefined;

  return (
    <>
      <section className="shell relative overflow-hidden pb-4 pt-6 md:pb-8 md:pt-8">
        <div className="flex min-h-[calc(86svh-5.25rem)] items-start pt-8 md:min-h-[calc(88svh-5.25rem)] md:pt-10 lg:pt-12">
          <div className="w-full max-w-[66rem]">
            <p
              className="intro-reveal text-[clamp(2.4rem,4vw,4.2rem)] font-semibold tracking-[-0.07em] text-text"
              style={{ "--delay": "0.04s" } as CSSProperties}
            >
              {PROFILE_NAME}
            </p>
            <p
              className="intro-reveal mt-5 chapter-index"
              style={{ "--delay": "0.1s" } as CSSProperties}
            >
              Senior full-stack engineer
            </p>

            <h1
              className="intro-reveal mt-6 text-[clamp(2.85rem,6.35vw,5.95rem)] font-bold tracking-[-0.09em] text-text"
              style={
                { "--delay": "0.18s", lineHeight: "0.88" } as CSSProperties
              }
            >
              <span className="block">I build scalable,</span>
              <span className="block md:whitespace-nowrap">
                content-driven platforms.
              </span>
            </h1>

            <p
              className="intro-reveal mt-6 max-w-[34rem] text-[0.98rem] leading-7 text-[hsl(var(--text-muted))] md:text-[1.03rem]"
              style={{ "--delay": "0.26s" } as CSSProperties}
            >
              React, Next.js, and TypeScript for production product systems.
            </p>

            <div
              className="intro-reveal mt-8 flex flex-wrap items-center gap-3"
              style={{ "--delay": "0.34s" } as CSSProperties}
            >
              <Link className="btn-primary" href="#selected-work">
                Selected work
              </Link>
              <Link
                className="btn-secondary"
                href={resumeHref}
                rel={resumeRel}
                target={resumeTarget}
              >
                Resume
              </Link>
              <Link className="link-inline" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="shell content-band content-auto">
          <div className="section-frame-tight">
            <div className="grid gap-10 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14">
              <div className="lg:pt-1">
                <p className="chapter-index">Proof</p>
              </div>

              <div>
                <h2 className="section-heading max-w-[9ch]">
                  What the work changed.
                </h2>
                <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2">
                  {HOME_IMPACT_ITEMS.map((item, index) => (
                    <article
                      className="border-t border-border/80 pt-5"
                      key={item}
                    >
                      {(() => {
                        const Icon = IMPACT_ICONS[index]!;

                        return (
                          <p className="eyebrow mt-3 inline-flex items-center gap-2">
                            {createElement(Icon, {
                              "aria-hidden": true,
                              className: "h-3.5 w-3.5 text-text/55",
                            })}
                            <span>{IMPACT_LABELS[index]}</span>
                          </p>
                        );
                      })()}
                      <p className="chapter-index">0{index + 1}</p>
                      <p className="mt-3 text-[1.05rem] leading-8 text-text">
                        {item}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="shell content-band content-auto" id="selected-work">
          <div className="section-frame">
            <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14">
              <div className="lg:pt-1">
                <p className="chapter-index">Selected work</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)] lg:items-end">
                <h2 className="section-heading max-w-[9ch]">
                  Where it shows up.
                </h2>
                <p className="section-copy max-w-[21rem]">
                  Large systems, high-traffic product work, and platform
                  ownership.
                </p>
              </div>
            </div>

            <div className="space-y-0">
              {homepageProjects.map((project, index) => (
                <WorkRow
                  imageFirst={index % 2 === 0}
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="shell content-band content-auto">
          <div className="section-frame">
            <div className="grid gap-10 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14">
              <div className="lg:pt-1">
                <p className="chapter-index">Approach</p>
              </div>

              <div>
                <h2 className="section-heading max-w-[8ch]">How I build.</h2>
                <div className="mt-10 grid gap-8 md:grid-cols-3">
                  {HOME_FOCUS_AREAS.map((area, index) => (
                    <article
                      className="border-t border-border/80 pt-5"
                      key={area.title}
                    >
                      <p className="chapter-index">0{index + 1}</p>
                      <h3 className="mt-4 max-w-[14ch] text-[1.6rem] font-bold tracking-[-0.05em] text-text">
                        {area.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[hsl(var(--text-muted))]">
                        {area.copy}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="shell content-band content-auto">
          <div className="section-frame">
            <div className="grid gap-10 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14">
              <div className="lg:pt-1">
                <p className="chapter-index">Experience</p>
              </div>

              <div>
                <h2 className="section-heading max-w-[9ch]">
                  Where I&apos;ve applied it.
                </h2>
                <p className="section-copy mt-5 max-w-[24rem]">
                  Built inside complex React monorepos and high-traffic product
                  teams.
                </p>

                <div className="mt-10 space-y-10">
                  {RESUME_EXPERIENCE.map((role, index) => (
                    <article
                      className="border-t border-border/80 pt-6"
                      key={`${role.company}-${role.title}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="chapter-index">0{index + 1}</p>
                          <h3 className="mt-3 text-[clamp(1.7rem,2.4vw,2.4rem)] font-bold tracking-[-0.05em] text-text">
                            {role.company}
                          </h3>
                          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[hsl(var(--text-muted))]">
                            {role.title}
                          </p>
                        </div>
                        <p className="eyebrow">{EXPERIENCE_PERIODS[index]}</p>
                      </div>

                      <ul className="mt-6 grid gap-3">
                        {role.points
                          .filter((_, pointIndex) =>
                            index === 0
                              ? pointIndex === 0 || pointIndex === 4
                              : pointIndex === 0 || pointIndex === 2,
                          )
                          .map((point) => (
                            <li
                              className="flex gap-3 text-sm leading-7 text-[hsl(var(--text-muted))]"
                              key={point}
                            >
                              <span className="mt-[0.95rem] h-1.5 w-1.5 rounded-full bg-accent" />
                              <span>{point}</span>
                            </li>
                          ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="shell content-band content-auto">
        <div className="section-frame">
          <p className="chapter-index">Next</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
            <div>
              <h2 className="section-heading max-w-[18ch]">
                Looking for the next serious product to help build.
              </h2>
              <p className="section-copy mt-5 max-w-[50rem]">
                {AVAILABILITY_NOTE}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Link className="btn-primary" href="/contact">
                Contact
              </Link>
              <Link
                className="btn-secondary"
                href={resumeHref}
                rel={resumeRel}
                target={resumeTarget}
              >
                Download resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

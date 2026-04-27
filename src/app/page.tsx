import Image from "next/image";
import Link from "next/link";
import { createElement, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiGithub,
  FiGrid,
  FiLinkedin,
  FiMail,
  FiShield,
  FiTrendingUp,
  FiTwitter,
  FiUpload,
} from "react-icons/fi";

import { AnimatedSection } from "@/components/animated-section";
import { TrackedLink } from "@/components/tracked-link";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  PROJECT_CATEGORY_LABELS,
  RESUME_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { getAllProjects } from "@/lib/content";
import {
  AVAILABILITY_NOTE,
  HOME_IMPACT_ITEMS,
  RESUME_EXPERIENCE,
} from "@/lib/profile-content";
import { HOME_DESCRIPTION, HOME_TITLE, buildMetadata } from "@/lib/seo";
import type { ProjectMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  keywords: [
    "Senior Full-Stack Engineer",
    "Full-Stack Engineer",
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
  "Nov 2025 — Present",
  "Jan 2022 — Oct 2025",
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
    <article className="border-t border-border/90 py-11 first:border-t-0 first:pt-0 md:py-16">
      <div className="grid gap-8 md:gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        <div className={imageFirst ? "" : "lg:order-2"}>
          <div className="flex flex-wrap items-center gap-2.5 text-[hsl(var(--text-muted))]">
            <p className="eyebrow">
              {PROJECT_CATEGORY_LABELS[project.category]}
            </p>
            <span aria-hidden className="text-text/28">
              •
            </span>
            <p className="eyebrow">{project.year}</p>
            <span aria-hidden className="hidden text-text/28 sm:block">
              •
            </span>
            <p className="eyebrow hidden sm:block">{project.role}</p>
          </div>

          <h3 className="mt-4 max-w-[15ch] text-[clamp(1.6rem,9.4vw,2.4rem)] font-bold leading-[1.01] tracking-[-0.055em] text-text md:max-w-[16ch] md:text-[clamp(1.75rem,3.15vw,3.45rem)] md:leading-none">
            <TrackedLink
              className="link-display"
              href={`/projects/${project.slug}`}
              trackingEvent="project_open"
              trackingPayload={{
                location: "home_selected_work",
                project_name: project.title,
                project_slug: project.slug,
              }}
            >
              {project.title}
            </TrackedLink>
          </h3>

          <p className="mt-4 max-w-[38rem] text-[0.96rem] leading-7 text-text/78 md:mt-5 md:text-[0.98rem] md:text-[hsl(var(--text-muted))]">
            {project.excerpt}
          </p>

          <div className="mt-6 hidden gap-5 md:grid md:grid-cols-2">
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

          <ul className="mt-5 space-y-2.5 border-t border-border/80 pt-4 md:mt-6 md:pt-5">
            {project.metricHighlights.slice(0, 2).map((item, metricIndex) => (
              <li
                className={cn(
                  "gap-3 text-[0.92rem] leading-7 text-text/76 md:flex md:text-[0.95rem] md:text-[hsl(var(--text-muted))]",
                  metricIndex === 0 ? "flex" : "hidden"
                )}
                key={item}
              >
                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <TrackedLink
              className="link-action"
              href={`/projects/${project.slug}`}
              trackingEvent="project_open"
              trackingPayload={{
                location: "home_selected_work",
                project_name: project.title,
                project_slug: project.slug,
              }}
            >
              View project details <span aria-hidden>-&gt;</span>
            </TrackedLink>
            {project.liveUrl ? (
              <TrackedLink
                className="link-inline hidden sm:inline-flex"
                href={project.liveUrl}
                rel="noreferrer"
                target="_blank"
                trackingEvent="project_live_site_click"
                trackingPayload={{
                  link_url: project.liveUrl,
                  project_name: project.title,
                  project_slug: project.slug,
                }}
              >
                Live site{" "}
                <FiArrowUpRight aria-hidden className="ml-1 h-3.5 w-3.5" />
              </TrackedLink>
            ) : null}
          </div>
        </div>

        <div className={imageFirst ? "" : "lg:order-1"}>
          <div className="relative aspect-[1.18/1] overflow-hidden bg-[hsl(var(--surface-soft))] md:aspect-[5/4]">
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
  const resumeDownload = RESUME_URL?.startsWith("/") ? true : undefined;
  const resumeTarget = RESUME_URL && !resumeDownload ? "_blank" : undefined;
  const resumeRel = RESUME_URL && !resumeDownload ? "noreferrer" : undefined;

  const heroSocialIconMap: Record<string, IconType> = {
    GitHub: FiGithub,
    LinkedIn: FiLinkedin,
    X: FiTwitter,
  };
  const heroSocials: Array<{
    label: string;
    href: string;
    icon: IconType;
    trackingEvent?: string;
  }> = [
    ...SOCIAL_LINKS.filter((item) => heroSocialIconMap[item.label]).map(
      (item) => ({
        label: item.label,
        href: item.href,
        icon: heroSocialIconMap[item.label]!,
        trackingEvent:
          item.label === "GitHub"
            ? "github_click"
            : item.label === "LinkedIn"
              ? "linkedin_click"
              : undefined,
      }),
    ),
    ...(CONTACT_MAILTO && CONTACT_EMAIL
      ? [
          {
            label: "Email",
            href: CONTACT_MAILTO,
            icon: FiMail,
            trackingEvent: "contact_email_click",
          },
        ]
      : []),
  ];

  return (
    <>
      <section className="shell relative overflow-hidden pt-7 md:pt-10">
        <div className="grid max-w-[68rem] items-center gap-12 pb-14 pt-6 md:pb-16 md:pt-8 lg:min-h-[78svh] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <div className="flex w-full max-w-[64rem] flex-col">
            <p
              className="intro-reveal chapter-index"
              style={{ "--delay": "0.04s" } as CSSProperties}
            >
              Senior full-stack engineer
            </p>

            <h1
              className="intro-reveal mt-8 font-display font-bold tracking-[-0.05em] text-text md:mt-10"
              style={{
                "--delay": "0.14s",
                fontSize: "clamp(2.85rem,9.2vw,6rem)",
                lineHeight: 1.02,
              } as CSSProperties}
            >
              <span className="block">
                I build <span className="text-accent">scalable</span>
              </span>
              <span className="block">content-driven platforms.</span>
            </h1>

            <p
              className="intro-reveal mt-8 max-w-[40rem] text-[1.05rem] leading-7 text-text/78 md:mt-10 md:max-w-[44rem] md:text-[1.2rem] md:leading-9"
              style={{ "--delay": "0.22s" } as CSSProperties}
            >
              React, Next.js, and TypeScript systems for products that need to scale past v1.
            </p>

            <p
              className="intro-reveal mt-4 text-sm tracking-[0.01em] text-text/60 md:mt-5 md:text-[0.95rem]"
              style={{ "--delay": "0.28s" } as CSSProperties}
            >
              — Atharva Mahamuni
            </p>

            <div
              className="intro-reveal mt-9 grid gap-3 sm:flex sm:flex-wrap sm:items-center md:mt-11"
              style={{ "--delay": "0.34s" } as CSSProperties}
            >
              <Link className="btn-primary sm:w-auto" href="#selected-work">
                Selected work
              </Link>
              <TrackedLink
                className="btn-secondary sm:w-auto"
                download={resumeDownload}
                href={resumeHref}
                rel={resumeRel}
                target={resumeTarget}
                trackingEvent="resume_click"
                trackingPayload={{ location: "home_hero" }}
              >
                Resume
              </TrackedLink>
            </div>

            {heroSocials.length > 0 ? (
              <ul
                aria-label="Social links"
                className="intro-reveal mt-10 flex items-center gap-6 lg:hidden"
                style={{ "--delay": "0.42s" } as CSSProperties}
              >
                {heroSocials.map(({ label, href, icon: Icon, trackingEvent }) => (
                  <li key={label}>
                    <TrackedLink
                      aria-label={label}
                      className="text-text/45 transition-colors duration-150 hover:text-text"
                      href={href}
                      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      trackingEvent={trackingEvent}
                      trackingPayload={
                        trackingEvent
                          ? { link_url: href, location: "home_hero" }
                          : undefined
                      }
                    >
                      <Icon aria-hidden className="h-[1.15rem] w-[1.15rem]" />
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {heroSocials.length > 0 ? (
            <ul
              aria-label="Social links"
              className="intro-reveal hidden lg:flex lg:flex-col lg:items-center lg:gap-5 lg:self-center"
              style={{ "--delay": "0.42s" } as CSSProperties}
            >
              {heroSocials.map(({ label, href, icon: Icon, trackingEvent }) => (
                <li key={label}>
                  <TrackedLink
                    aria-label={label}
                    className="block text-text/45 transition-colors duration-150 hover:text-text"
                    href={href}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    trackingEvent={trackingEvent}
                    trackingPayload={
                      trackingEvent
                        ? { link_url: href, location: "home_hero" }
                        : undefined
                    }
                  >
                    <Icon aria-hidden className="h-5 w-5" />
                  </TrackedLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <AnimatedSection>
        <section className="shell content-band content-auto">
          <div className="section-frame-tight">
            <div className="grid gap-7 md:gap-10 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14">
              <div className="lg:pt-1">
                <p className="chapter-index">Proof</p>
              </div>

              <div>
                <h2 className="section-heading max-w-[9ch]">
                  What the work changed.
                </h2>
                <div className="mt-9 grid gap-x-8 gap-y-8 md:mt-10 md:grid-cols-2">
                  {HOME_IMPACT_ITEMS.map((item, index) => (
                    <article
                      className="border-t border-border/80 pt-4 md:pt-5"
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
            <div className="mb-10 grid gap-7 lg:mb-14 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14">
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
            <div className="grid gap-7 md:gap-10 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14">
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

                <ol className="relative mt-12 space-y-12 md:mt-14 md:space-y-14">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-border/55 md:left-[8rem] md:block"
                  />
                  {RESUME_EXPERIENCE.map((role, index) => (
                    <li
                      className="relative grid gap-4 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-7"
                      key={`${role.company}-${role.title}`}
                    >
                      <span
                        aria-hidden
                        className="absolute hidden h-2 w-2 rounded-full bg-accent md:left-[8rem] md:top-[0.65rem] md:block md:-translate-x-1/2"
                      />
                      <div className="md:pr-5 md:pt-[0.35rem] md:text-right">
                        <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-text/72 md:text-[0.82rem]">
                          {EXPERIENCE_PERIODS[index]}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-[clamp(1.7rem,9vw,2.2rem)] font-bold leading-none tracking-[-0.05em] text-text md:text-[clamp(1.7rem,2.4vw,2.4rem)]">
                          {role.company}
                        </h3>
                        <p className="mt-3 text-[0.72rem] uppercase leading-5 tracking-[0.18em] text-text/64 md:mt-2 md:text-sm md:text-[hsl(var(--text-muted))]">
                          {role.title}
                        </p>
                        <ul className="mt-5 grid gap-3 md:mt-6">
                          {role.points
                            .filter((_, pointIndex) =>
                              index === 0
                                ? pointIndex === 0 || pointIndex === 4
                                : pointIndex === 0 || pointIndex === 2,
                            )
                            .map((point) => (
                              <li
                                className="flex gap-3 text-[0.92rem] leading-7 text-text/74 md:text-sm md:text-[hsl(var(--text-muted))]"
                                key={point}
                              >
                                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{point}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="shell pb-8 pt-14 content-auto md:pb-12 md:pt-20">
        <div className="section-frame">
          <p className="chapter-index">Next</p>
          <div className="mt-6 max-w-[52rem]">
            <h2 className="section-heading max-w-[18ch]">
              Looking for the next serious product to help build.
            </h2>
            <p className="section-copy mt-6 max-w-[44rem] md:mt-7">
              {AVAILABILITY_NOTE}
            </p>

            <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap sm:items-center md:mt-10">
              <Link className="btn-primary sm:w-auto" href="/contact">
                Contact
              </Link>
              <TrackedLink
                className="btn-secondary sm:w-auto"
                download={resumeDownload}
                href={resumeHref}
                rel={resumeRel}
                target={resumeTarget}
                trackingEvent="resume_click"
                trackingPayload={{ location: "home_final_cta" }}
              >
                Download resume
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

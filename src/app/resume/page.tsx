import type { Metadata } from "next";
import Link from "next/link";

import { BadgeLabel } from "@/components/badge-label";
import { TrackedLink } from "@/components/tracked-link";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
  SITE_NAME,
} from "@/lib/constants";
import { getAllProjects } from "@/lib/content";
import {
  RESUME_COMPETENCIES,
  RESUME_EXPERIENCE,
  RESUME_SKILLS,
  RESUME_SUMMARY,
} from "@/lib/profile-content";
import { buildMetadata } from "@/lib/seo";
import { cn, getMailtoHref, getMeaningfulEmail } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `Resume | ${SITE_NAME}`,
  description:
    "Resume and experience highlights for Atharva Mahamuni across frontend architecture, performance optimization, product delivery, and full-stack systems work.",
  path: "/resume",
  keywords: [
    "Senior Frontend Engineer",
    "Frontend Architecture",
    "Performance Optimization",
    "TypeScript",
  ],
});

function getResumeProjects<T extends { featured: boolean }>(projects: T[]) {
  return projects.filter((project) => project.featured).slice(0, 3);
}

export default async function ResumePage() {
  const resumeUrl = RESUME_URL;
  const resumeDownload = resumeUrl?.startsWith("/") ? true : undefined;
  const linkedInUrl = LINKEDIN_URL;
  const githubUrl = GITHUB_URL;
  const contactEmail = getMeaningfulEmail(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL,
  );
  const contactHref = getMailtoHref(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL,
  );
  const projects = await getAllProjects();
  const featuredProjects = getResumeProjects(projects);

  return (
    <section className="shell py-14 md:py-20">
      <div className="grid gap-11 md:gap-10 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-16">
        <div>
          <p className="eyebrow">Resume</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.45rem,12vw,5rem)] leading-[0.94] tracking-tight md:leading-none">
            Experience and technical profile.
          </h1>
          <p className="section-copy mt-7 max-w-[44rem] md:mt-6">
            {RESUME_SUMMARY}
          </p>

          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap md:mt-8">
            <TrackedLink
              className="btn-primary sm:w-auto"
              download={resumeDownload}
              href={resumeUrl}
              rel={resumeDownload ? undefined : "noreferrer"}
              target={resumeDownload ? undefined : "_blank"}
              trackingEvent="resume_click"
              trackingPayload={{ location: "resume_page" }}
            >
              Download resume
            </TrackedLink>
            <Link className="btn-secondary sm:w-auto" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <aside className="border-t border-border/80 pt-7 xl:mt-2 xl:pt-6">
          <p className="eyebrow">Contact</p>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-text/72 sm:grid-cols-3 xl:grid-cols-1 xl:gap-5">
            {contactHref && contactEmail ? (
              <div>
                <p className="eyebrow">Email</p>
                <TrackedLink
                  className="link-inline-accent mt-2"
                  href={contactHref}
                  trackingEvent="contact_email_click"
                  trackingPayload={{
                    link_url: contactHref,
                    location: "resume_page",
                  }}
                >
                  {contactEmail}
                </TrackedLink>
              </div>
            ) : null}
            {linkedInUrl ? (
              <div>
                <p className="eyebrow">LinkedIn</p>
                <TrackedLink
                  className="link-inline-accent mt-2"
                  href={linkedInUrl}
                  rel="noreferrer"
                  target="_blank"
                  trackingEvent="linkedin_click"
                  trackingPayload={{
                    link_url: linkedInUrl,
                    location: "resume_page",
                  }}
                >
                  linkedin.com/in/atharvacm
                </TrackedLink>
              </div>
            ) : null}
            {githubUrl ? (
              <div>
                <p className="eyebrow">GitHub</p>
                <TrackedLink
                  className="link-inline-accent mt-2"
                  href={githubUrl}
                  rel="noreferrer"
                  target="_blank"
                  trackingEvent="github_click"
                  trackingPayload={{
                    link_url: githubUrl,
                    location: "resume_page",
                  }}
                >
                  github.com/AtharvaCM
                </TrackedLink>
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="mt-16 border-t border-border/90 pt-9 md:mt-18 md:pt-12">
        <h2 className="section-heading">Core competencies</h2>
        <div className="mt-8 grid gap-7 md:mt-9 md:grid-cols-2 xl:grid-cols-3">
          {RESUME_COMPETENCIES.map((group) => (
            <article
              className="border-t border-border/80 pt-5 md:pt-6"
              key={group.label}
            >
              <p className="eyebrow">{group.label}</p>
              <p className="mt-3 text-sm leading-7 text-text/76">
                {group.items.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-border/90 pt-9 md:mt-18 md:pt-12">
        <h2 className="section-heading">Experience</h2>
        <div className="mt-9 space-y-10 md:mt-10 md:space-y-12">
          {RESUME_EXPERIENCE.map((role, index) => (
            <article
              className="border-t border-border/80 pt-7 md:pt-8"
              key={`${role.company}-${role.title}`}
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem] md:items-start">
                <div>
                  <p className="chapter-index">0{index + 1}</p>
                  <h3 className="mt-3 font-display text-[clamp(1.85rem,10vw,2.6rem)] leading-[0.98] tracking-tight text-text md:leading-none">
                    {role.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-text/70">
                    {role.company}
                  </p>
                </div>
                <p className="eyebrow md:pt-7 md:text-right">{role.period}</p>
              </div>
              <ul className="mt-7 grid gap-4 text-[0.93rem] leading-7 text-text/76 md:mt-8 md:grid-cols-2 md:gap-x-8 md:gap-y-4 md:text-[0.98rem] md:text-text/74">
                {role.points.map((point, pointIndex) => (
                  <li
                    className={cn(
                      "gap-3 md:flex",
                      pointIndex < 4 ? "flex" : "hidden",
                    )}
                    key={point}
                  >
                    <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-border/90 pt-9 md:mt-18 md:pt-12">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-16">
          <div>
            <h2 className="section-heading">Selected projects</h2>
            <div className="mt-8 space-y-7 md:space-y-6">
              {featuredProjects.map((project) => (
                <article
                  className="border-t border-border/75 pt-6 md:pt-6"
                  key={project.slug}
                >
                  <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                    <h3 className="max-w-[20ch] text-[clamp(1.45rem,8vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-text md:leading-none">
                      <TrackedLink
                        className="link-display text-[inherit]"
                        href={`/projects/${project.slug}`}
                        trackingEvent="project_open"
                        trackingPayload={{
                          location: "resume_page",
                          project_name: project.title,
                          project_slug: project.slug,
                        }}
                      >
                        {project.title}
                      </TrackedLink>
                    </h3>
                    {project.liveUrl ? (
                      <TrackedLink
                        className="link-inline-accent"
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
                        Live site
                      </TrackedLink>
                    ) : null}
                  </div>
                  <p className="mt-4 max-w-[42rem] text-sm leading-7 text-text/72">
                    {project.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-heading">Core stack</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {RESUME_SKILLS.map((skill, index) => (
                <li
                  className={cn("tag-chip", index >= 8 && "hidden sm:inline-flex")}
                  key={skill}
                >
                  <BadgeLabel label={skill} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}

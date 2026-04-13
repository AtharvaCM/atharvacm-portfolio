import type { Metadata } from "next";
import Link from "next/link";

import { BadgeLabel } from "@/components/badge-label";
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
import { getMailtoHref, getMeaningfulEmail } from "@/lib/utils";

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
    <section className="shell py-16 md:py-20">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-14">
        <div>
          <p className="eyebrow">Resume</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
            Experience and technical profile.
          </h1>
          <p className="section-copy mt-5 max-w-[48rem]">{RESUME_SUMMARY}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {resumeUrl ? (
              <Link
                className="btn-primary"
                href={resumeUrl}
                rel="noreferrer"
                target="_blank"
              >
                Download PDF resume
              </Link>
            ) : null}
            <Link className="btn-secondary" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <aside className="panel p-6 md:p-7">
          <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">
            Contact
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-text/72">
            {contactHref && contactEmail ? (
              <div>
                <p className="eyebrow">Email</p>
                <Link className="link-inline-accent mt-2" href={contactHref}>
                  {contactEmail}
                </Link>
              </div>
            ) : null}
            {linkedInUrl ? (
              <div>
                <p className="eyebrow">LinkedIn</p>
                <Link
                  className="link-inline-accent mt-2"
                  href={linkedInUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  linkedin.com/in/atharvacm
                </Link>
              </div>
            ) : null}
            {githubUrl ? (
              <div>
                <p className="eyebrow">GitHub</p>
                <Link
                  className="link-inline-accent mt-2"
                  href={githubUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  github.com/AtharvaCM
                </Link>
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="section-heading">Core competencies</h2>
        <div className="mt-7 grid gap-px overflow-hidden rounded-[1.4rem] border border-border/65 bg-border/65 md:grid-cols-2 xl:grid-cols-3">
          {RESUME_COMPETENCIES.map((group) => (
            <article
              className="bg-[hsl(var(--surface)/0.96)] p-5 md:p-6"
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

      <section className="mt-14">
        <h2 className="section-heading">Experience</h2>
        <div className="mt-7 space-y-6">
          {RESUME_EXPERIENCE.map((role) => (
            <article
              className="panel p-6 md:p-7"
              key={`${role.company}-${role.title}`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] tracking-tight text-text">
                    {role.title}
                  </h3>
                  <p className="mt-2">
                    <span className="meta-chip">{role.company}</span>
                  </p>
                </div>
                <p className="eyebrow md:pt-2">{role.period}</p>
              </div>
              <ul className="mt-6 list-disc space-y-2.5 pl-5 text-sm leading-7 text-text/74 md:text-[0.98rem]">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-14">
          <div>
            <h2 className="section-heading">Selected projects</h2>
            <div className="mt-7 space-y-5">
              {featuredProjects.map((project) => (
                <article
                  className="border-t border-border/75 pt-5"
                  key={project.slug}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-[clamp(1.45rem,2vw,2rem)] font-semibold tracking-[-0.04em] text-text">
                      <Link
                        className="link-display text-[inherit]"
                        href={`/projects/${project.slug}`}
                      >
                        {project.title}
                      </Link>
                    </h3>
                    {project.liveUrl ? (
                      <Link
                        className="link-inline-accent"
                        href={project.liveUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Live site
                      </Link>
                    ) : null}
                  </div>
                  <p className="mt-3 max-w-[44rem] text-sm leading-7 text-text/72">
                    {project.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-heading">Core stack</h2>
            <ul className="mt-7 flex flex-wrap gap-2">
              {RESUME_SKILLS.map((skill) => (
                <li className="tag-chip" key={skill}>
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

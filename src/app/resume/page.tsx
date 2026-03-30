import type { Metadata } from "next";
import Link from "next/link";

import { BadgeLabel } from "@/components/badge-label";
import { RESUME_URL, SITE_NAME } from "@/lib/constants";
import { RESUME_EXPERIENCE, RESUME_SKILLS } from "@/lib/profile-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Resume | ${SITE_NAME}`,
  description:
    "Resume and experience highlights for Atharva Mahamuni across frontend architecture, performance optimization, product delivery, and frontend-focused full-stack work.",
  path: "/resume",
  keywords: [
    "Senior Frontend Engineer",
    "Frontend Architecture",
    "Performance Optimization",
    "TypeScript"
  ]
});

export default function ResumePage() {
  const resumeUrl = RESUME_URL;

  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">Resume</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        Experience and technical profile.
      </h1>
      <p className="section-copy mt-4 max-w-[44rem]">
        Frontend-focused full-stack engineer with experience building scalable
        React, Next.js, and TypeScript systems for reporting, dashboards,
        workflows, and high-traffic product surfaces.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {resumeUrl ? (
          <Link className="btn-primary" href={resumeUrl} rel="noreferrer" target="_blank">
            Download PDF resume
          </Link>
        ) : null}
        <Link className="btn-secondary" href="/contact">
          Contact
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="section-heading">Experience</h2>
        <div className="mt-6 space-y-5">
          {RESUME_EXPERIENCE.map((role) => (
            <article className="panel p-6" key={`${role.company}-${role.title}`}>
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <h3 className="font-display text-3xl tracking-tight">{role.title}</h3>
                <p className="text-sm uppercase tracking-[0.12em] text-text/60">{role.period}</p>
              </div>
              <p className="mt-2">
                <span className="meta-chip">{role.company}</span>
              </p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-text/72">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="section-heading">Core skills</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {RESUME_SKILLS.map((skill) => (
            <li className="tag-chip" key={skill}>
              <BadgeLabel label={skill} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

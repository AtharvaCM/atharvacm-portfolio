import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Resume - ${SITE_NAME}`,
  description: "Professional experience, skills, and impact highlights."
};

const experience = [
  {
    title: "Senior Front-end Engineer",
    company: "Current Company",
    period: "2022 - Present",
    points: [
      "Led front-end architecture for key product surfaces used by global customers.",
      "Built reusable design system components that reduced UI development cycle time.",
      "Improved page performance and bundle strategy for critical user journeys."
    ]
  },
  {
    title: "Front-end Engineer",
    company: "Previous Company",
    period: "2019 - 2022",
    points: [
      "Delivered production features across React/TypeScript codebases.",
      "Collaborated closely with product and design to ship high-quality experiences.",
      "Contributed to accessibility and quality standards across the team."
    ]
  }
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Design Systems",
  "Performance Optimization",
  "Framer Motion",
  "Accessibility",
  "Testing (Vitest)"
];

export default function ResumePage() {
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL ?? "#";

  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">Resume</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        Experience and technical profile.
      </h1>
      <p className="mt-4 max-w-2xl text-text/72">
        Product-focused front-end engineer with experience building reliable, high-performance interfaces for teams and
        users at scale.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn-primary" href={resumeUrl} rel="noreferrer" target="_blank">
          Download PDF Resume
        </Link>
        <Link className="btn-secondary" href="/contact">
          Contact
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="section-heading">Experience</h2>
        <div className="mt-6 space-y-5">
          {experience.map((role) => (
            <article className="panel p-6" key={`${role.company}-${role.title}`}>
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <h3 className="font-display text-3xl tracking-tight">{role.title}</h3>
                <p className="text-sm uppercase tracking-[0.12em] text-text/60">{role.period}</p>
              </div>
              <p className="mt-1 text-sm text-text/70">{role.company}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text/72">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="section-heading">Skills</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li className="rounded-full border border-border/70 bg-surface/85 px-3 py-1.5 text-xs tracking-[0.03em] text-text/75" key={skill}>
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

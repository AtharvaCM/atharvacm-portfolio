import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { LINKEDIN_URL, RESUME_URL, SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { getMailtoHref, getMeaningfulEmail } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `Contact | ${SITE_NAME}`,
  description:
    "Contact Atharva Mahamuni regarding senior frontend, product engineering, and frontend-focused full-stack roles.",
  path: "/contact",
  keywords: [
    "Senior Frontend Engineer",
    "Full-Stack Engineer",
    "Contact",
    "React Developer"
  ]
});

export default function ContactPage() {
  const resumeUrl = RESUME_URL;
  const linkedInUrl = LINKEDIN_URL;
  const contactEmail = getMeaningfulEmail(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );
  const contactHref = getMailtoHref(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );

  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        Open to senior frontend and full-stack roles.
      </h1>
      <p className="section-copy mt-4 max-w-[46rem]">
        If you&apos;re hiring for a senior frontend, product engineering, or
        full-stack role and want someone who can own meaningful parts of the
        system, I&apos;d be happy to talk.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-text/60">
        Best fit: teams that care about quality, delivery, performance, and
        clean engineering.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="panel p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">Profile</p>
          <h2 className="mt-3 font-display text-[2.2rem] tracking-tight">Resume and links</h2>
          <p className="mt-4 text-sm leading-7 text-text/72">
            Prefer async first? Start with the resume, then reach out with the role, team context, and what you need
            owned.
          </p>
          <div className="subtle-rule mt-6" />
          <div className="mt-6 flex flex-wrap gap-3">
            {resumeUrl ? (
              <Link className="btn-secondary" href={resumeUrl} rel="noreferrer" target="_blank">
                Download Resume
              </Link>
            ) : null}
            {linkedInUrl ? (
              <Link className="btn-secondary" href={linkedInUrl} rel="noreferrer" target="_blank">
                LinkedIn
              </Link>
            ) : null}
          </div>
          {contactHref && contactEmail ? (
            <div className="mt-6 rounded-[1rem] border border-border/65 bg-[hsl(var(--surface-soft)/0.62)] p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">
                Prefer email?
              </p>
              <Link className="link-inline-accent mt-3" href={contactHref}>
                {contactEmail}
              </Link>
            </div>
          ) : null}
          <p className="mt-6 text-sm leading-7 text-text/72">
            Location: India (IST) · Open to remote, hybrid, and strong engineering teams with meaningful product scope.
          </p>
          {contactHref && contactEmail ? (
            <Link className="btn-primary mt-5" href={contactHref}>
              Email me
            </Link>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

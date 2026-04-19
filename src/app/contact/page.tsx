import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { LINKEDIN_URL, RESUME_URL, SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { getMailtoHref, getMeaningfulEmail } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `Contact | ${SITE_NAME}`,
  description:
    "Contact Atharva Mahamuni about senior frontend and full-stack roles with teams that care about product quality and ownership.",
  path: "/contact",
  keywords: [
    "Senior Frontend Engineer",
    "Full-Stack Engineer",
    "Contact",
    "React Developer",
  ],
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
    <section className="shell py-12 md:py-20">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        If you&apos;d like to talk, I&apos;d be glad to hear from you.
      </h1>
      <p className="section-copy mt-4 max-w-[46rem]">
        I&apos;m open to senior frontend and full-stack roles, but also happy to
        hear from people building interesting products, exploring ideas, or just
        wanting to connect.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-text/60">
        The easiest way to reach me is on LinkedIn. You can also start with my
        resume or email.
      </p>

      <div className="mt-8 grid gap-5 md:mt-10 md:gap-6 lg:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="panel p-5 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">
            Contact
          </p>
          <h2 className="mt-3 font-display text-[1.9rem] leading-none tracking-tight md:text-[2.2rem]">
            Other ways to reach me
          </h2>
          <p className="mt-4 text-sm leading-7 text-text/72">
            Based in India. Open to roles, collaborations, and thoughtful
            conversations around products, systems, and ideas.
          </p>
          <div className="subtle-rule mt-6" />
          <div className="mt-6 space-y-4 text-sm leading-7">
            {resumeUrl ? (
              <p>
                <span className="eyebrow block">Resume</span>
                <Link
                  className="link-inline-accent mt-2"
                  href={resumeUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Download PDF resume
                </Link>
              </p>
            ) : null}
            {linkedInUrl ? (
              <p>
                <span className="eyebrow block">LinkedIn</span>
                <Link
                  className="link-inline-accent mt-2"
                  href={linkedInUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  linkedin.com/in/atharvacm
                </Link>
              </p>
            ) : null}
            {contactHref && contactEmail ? (
              <p>
                <span className="eyebrow block">Email</span>
                <Link className="link-inline-accent mt-2" href={contactHref}>
                  {contactEmail}
                </Link>
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}

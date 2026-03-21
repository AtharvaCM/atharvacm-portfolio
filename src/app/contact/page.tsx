import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { LINKEDIN_URL, RESUME_URL, SITE_NAME } from "@/lib/constants";
import { getMailtoHref, getMeaningfulEmail } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Contact - ${SITE_NAME}`,
  description: "Get in touch regarding product engineering opportunities and collaborations."
};

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
        Let us connect.
      </h1>
      <p className="mt-4 max-w-2xl text-text/70">
        Reach out regarding full-time roles, product engineering
        collaborations, or technical discussions.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="panel p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.15em] text-text/60">Profile</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight">Resume and links</h2>
          <p className="mt-4 text-sm text-text/72">
            Prefer async first? You can review my resume and reach out on LinkedIn as well.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {resumeUrl ? (
              <Link className="btn-secondary" href={resumeUrl} rel="noreferrer" target="_blank">
                View resume
              </Link>
            ) : null}
            {linkedInUrl ? (
              <Link className="btn-secondary" href={linkedInUrl} rel="noreferrer" target="_blank">
                LinkedIn
              </Link>
            ) : null}
          </div>
          <p className="mt-5 text-sm text-text/72">
            Location: India (IST) · Open to remote and hybrid opportunities.
          </p>
          {contactHref && contactEmail ? (
            <Link className="btn-primary mt-5" href={contactHref}>
              Email {contactEmail}
            </Link>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

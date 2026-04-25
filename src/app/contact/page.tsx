import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { TrackedLink } from "@/components/tracked-link";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  LINKEDIN_URL,
  RESUME_URL,
  SITE_NAME,
} from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Contact | ${SITE_NAME}`,
  description:
    "Contact Atharva Mahamuni about senior full-stack roles with teams that care about product quality and ownership.",
  path: "/contact",
  keywords: [
    "Senior Full-Stack Engineer",
    "Full-Stack Engineer",
    "Contact",
    "React Developer",
  ],
});

export default function ContactPage() {
  const resumeUrl = RESUME_URL;
  const resumeDownload = resumeUrl?.startsWith("/") ? true : undefined;
  const linkedInUrl = LINKEDIN_URL;
  const contactEmail = CONTACT_EMAIL;
  const contactHref = CONTACT_MAILTO;

  return (
    <section className="shell py-12 md:py-20">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.35rem,11vw,5rem)] leading-[0.95] tracking-tight md:text-[clamp(2.45rem,6vw,5rem)] md:leading-none">
        Let&apos;s talk.
      </h1>
      <p className="section-copy mt-5 max-w-[44rem] md:mt-4">
        Open to senior full-stack roles.
        <span className="hidden md:inline">
          {" "}
          Also happy to hear from teams building serious products.
        </span>
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-text/64 md:mt-3 md:text-text/60">
        Send a message below, or reach me by email or LinkedIn.
      </p>

      <div className="mt-8 grid gap-7 md:mt-10 md:gap-6 lg:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="border-t border-border/80 pt-7 md:panel md:border md:p-8">
          <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">
            Contact
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] leading-none tracking-tight md:text-[2.2rem]">
            Other ways to reach me
          </h2>
          <p className="mt-4 text-sm leading-7 text-text/72">
            Based in Pune. Open to roles and collaborations on serious product work.
          </p>
          <div className="subtle-rule mt-5 md:mt-6" />
          <div className="mt-5 grid gap-4 text-sm leading-7 sm:grid-cols-3 md:mt-6 md:block md:space-y-4">
            {resumeUrl ? (
              <p>
                <span className="eyebrow block">Resume</span>
                <TrackedLink
                  className="link-inline-accent mt-2"
                  download={resumeDownload}
                  href={resumeUrl}
                  rel={resumeDownload ? undefined : "noreferrer"}
                  target={resumeDownload ? undefined : "_blank"}
                  trackingEvent="resume_click"
                  trackingPayload={{ location: "contact_page" }}
                >
                  Download PDF resume
                </TrackedLink>
              </p>
            ) : null}
            {linkedInUrl ? (
              <p>
                <span className="eyebrow block">LinkedIn</span>
                <TrackedLink
                  className="link-inline-accent mt-2"
                  href={linkedInUrl}
                  rel="noreferrer"
                  target="_blank"
                  trackingEvent="linkedin_click"
                  trackingPayload={{
                    link_url: linkedInUrl,
                    location: "contact_page",
                  }}
                >
                  linkedin.com/in/atharvacm
                </TrackedLink>
              </p>
            ) : null}
            {contactHref && contactEmail ? (
              <p>
                <span className="eyebrow block">Email</span>
                <TrackedLink
                  className="link-inline-accent mt-2"
                  href={contactHref}
                  trackingEvent="contact_email_click"
                  trackingPayload={{
                    link_url: contactHref,
                    location: "contact_page",
                  }}
                >
                  {contactEmail}
                </TrackedLink>
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}

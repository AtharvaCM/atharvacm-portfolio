import type { Metadata } from "next";
import Link from "next/link";

import { TrackedLink } from "@/components/tracked-link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Terms | ${SITE_NAME}`,
  description:
    "Plain-language terms of use for the Atharva Mahamuni portfolio website.",
  path: "/terms",
});

export default function TermsPage() {
  const contactEmail = CONTACT_EMAIL;

  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">Terms</p>
      <h1 className="mt-5 font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        Terms of Use
      </h1>
      <div className="mt-10 max-w-3xl space-y-10 text-sm leading-7 text-text/74 md:text-base md:leading-8">
        <p>
          This website is a personal portfolio. By using it, you agree to use it
          lawfully and respectfully.
        </p>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            Use of the site
          </h2>
          <p className="mt-3">
            The content here is provided for general information about my work,
            writing, and professional background. Do not use the site in a way
            that disrupts it, abuses the contact form, or attempts unauthorized
            access.
          </p>
        </section>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            Intellectual property
          </h2>
          <p className="mt-3">
            Unless stated otherwise, the writing, design, and site content are
            mine. You may link to the site, but please do not copy or reuse the
            content or design assets without permission.
          </p>
        </section>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            External links
          </h2>
          <p className="mt-3">
            This site may link to third-party websites, profiles, tools, or
            project pages. I am not responsible for their content, availability,
            or privacy practices.
          </p>
        </section>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            Changes and accuracy
          </h2>
          <p className="mt-3">
            I try to keep the site accurate, but content may change and may not
            always be current, complete, or error-free.
          </p>
        </section>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            Contact
          </h2>
          {contactEmail ? (
            <p className="mt-3">
              For questions about these terms, contact{" "}
              <TrackedLink
                className="link-inline-accent"
                href={`mailto:${contactEmail}`}
                trackingEvent="contact_email_click"
                trackingPayload={{
                  link_url: `mailto:${contactEmail}`,
                  location: "terms_page",
                }}
              >
                {contactEmail}
              </TrackedLink>
              .
            </p>
          ) : (
            <p className="mt-3">
              For questions about these terms, use the{" "}
              <Link className="link-inline-accent" href="/contact">
                contact page
              </Link>
              .
            </p>
          )}
        </section>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { TrackedLink } from "@/components/tracked-link";
import { SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { getMeaningfulEmail } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `Privacy Policy | ${SITE_NAME}`,
  description:
    "Plain-language privacy policy for contact form submissions, analytics, and cookies on the Atharva Mahamuni portfolio website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const contactEmail = getMeaningfulEmail(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );

  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-5 font-display text-[clamp(2.3rem,6vw,5rem)] tracking-tight">
        Privacy Policy
      </h1>
      <div className="mt-10 max-w-3xl space-y-10 text-sm leading-7 text-text/74 md:text-base md:leading-8">
        <p>
          This is a personal portfolio site. I try to collect only what is
          needed to understand site usage and respond when someone contacts me.
        </p>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            Information collected
          </h2>
          <p className="mt-3">
            If you use the contact form, the site collects the name, email, and
            message you submit. The form also includes a hidden website field as
            a spam-prevention honeypot.
          </p>
        </section>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            How it is used
          </h2>
          <p className="mt-3">
            Contact submissions are used to read and respond to your message.
            The contact endpoint may also use the request IP in memory for basic
            rate limiting to reduce spam and abuse.
          </p>
        </section>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            Analytics and cookies
          </h2>
          <p className="mt-3">
            The site can use Google Analytics, Google Tag Manager, and
            Microsoft Clarity when the relevant environment IDs are configured.
            These analytics tools are loaded only after analytics consent is
            accepted. Your consent choice is stored in localStorage as{" "}
            <code>portfolio-cookie-consent</code>.
          </p>
        </section>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            Third parties and retention
          </h2>
          <p className="mt-3">
            Contact messages may be sent through Resend if email delivery is
            configured. Analytics data is handled by the analytics providers
            when those tools are enabled and consented to. The site code does
            not define a fixed retention period for contact messages; they may
            remain in the email inbox used for follow-up.
          </p>
        </section>

        <section className="border-t border-border/80 pt-7">
          <h2 className="font-display text-2xl tracking-tight text-text">
            Contact
          </h2>
          {contactEmail ? (
            <p className="mt-3">
              For privacy questions, contact{" "}
              <TrackedLink
                className="link-inline-accent"
                href={`mailto:${contactEmail}`}
                trackingEvent="contact_email_click"
                trackingPayload={{
                  link_url: `mailto:${contactEmail}`,
                  location: "privacy_page",
                }}
              >
                {contactEmail}
              </TrackedLink>
              .
            </p>
          ) : (
            <p className="mt-3">
              For privacy questions, use the{" "}
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

import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { getMeaningfulEmail } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "Privacy policy for analytics, site usage data, and contact form submissions.",
  path: "/privacy"
});

export default function PrivacyPage() {
  const contactEmail = getMeaningfulEmail(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );

  return (
    <section className="shell py-16 md:py-20">
      <h1 className="font-display text-5xl tracking-tight">Privacy Policy</h1>
      <div className="prose prose-neutral mt-8 max-w-3xl">
        <p>
          This website uses analytics cookies (when accepted) to understand traffic and performance. Contact form
          submissions include the details you provide and are used solely to respond to your inquiry.
        </p>
        <h2>Data collected</h2>
        <ul>
          <li>Form submission fields: name, email, opportunity type, company context, connect timeline, message.</li>
          <li>Basic usage metrics when analytics consent is provided.</li>
          <li>Session analytics and behavior insights via Google Analytics and Microsoft Clarity.</li>
        </ul>
        <h2>Retention</h2>
        <p>
          Inquiry emails are retained as business records. Analytics data is retained according to the analytics
          provider policy.
        </p>
        <h2>Contact</h2>
        {contactEmail ? (
          <p>For privacy requests, contact: {contactEmail}.</p>
        ) : (
          <p>
            For privacy requests, use the <Link href="/contact">contact page</Link>.
          </p>
        )}
      </div>
    </section>
  );
}

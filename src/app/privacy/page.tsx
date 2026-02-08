import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy - ${SITE_NAME}`,
  description: "Privacy policy for analytics and contact form submissions."
};

export default function PrivacyPage() {
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
        </ul>
        <h2>Retention</h2>
        <p>
          Inquiry emails are retained as business records. Analytics data is retained according to the analytics
          provider policy.
        </p>
        <h2>Contact</h2>
        <p>For privacy requests, contact: hello@example.com.</p>
      </div>
    </section>
  );
}

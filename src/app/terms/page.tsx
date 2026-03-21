import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/lib/constants";
import { getMeaningfulEmail } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Terms - ${SITE_NAME}`,
  description: "Terms and usage conditions for this website."
};

export default function TermsPage() {
  const contactEmail = getMeaningfulEmail(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );

  return (
    <section className="shell py-16 md:py-20">
      <h1 className="font-display text-5xl tracking-tight">Terms of Use</h1>
      <div className="prose prose-neutral mt-8 max-w-3xl">
        <p>
          By accessing this website, you agree to use it for lawful purposes only. Content is provided for
          informational purposes and may be updated without notice.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Unless noted otherwise, all content and design assets are owned by the site owner and may not be reused
          without permission.
        </p>
        <h2>External links</h2>
        <p>
          This website may link to third-party sites. The site owner is not responsible for external content or
          privacy practices.
        </p>
        <h2>Contact</h2>
        {contactEmail ? (
          <p>For legal inquiries, contact: {contactEmail}.</p>
        ) : (
          <p>
            For legal inquiries, use the <Link href="/contact">contact page</Link>.
          </p>
        )}
      </div>
    </section>
  );
}

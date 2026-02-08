import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms - ${SITE_NAME}`,
  description: "Terms and usage conditions for this website."
};

export default function TermsPage() {
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
        <p>For legal inquiries, contact: hello@example.com.</p>
      </div>
    </section>
  );
}

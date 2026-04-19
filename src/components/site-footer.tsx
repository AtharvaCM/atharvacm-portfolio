import Link from "next/link";

import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { FOOTER_BIO } from "@/lib/profile-content";
import { getMailtoHref, getMeaningfulEmail } from "@/lib/utils";

export function SiteFooter() {
  const contactEmail = getMeaningfulEmail(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );
  const contactHref = getMailtoHref(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );

  return (
    <footer className="border-t border-border/90 py-12 md:py-14">
      <div className="shell">
        <div className="grid gap-9 md:grid-cols-[1.3fr_0.7fr_0.9fr] md:gap-10">
          <div className="border-t border-border/65 pt-6 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0">
            <p className="text-[0.9rem] font-semibold uppercase tracking-[0.22em] text-text">
              {SITE_NAME}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[hsl(var(--text-muted))]">
              {FOOTER_BIO}
            </p>
          </div>

          <div className="border-t border-border/65 pt-6 md:border-t-0 md:pt-0">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 space-y-2.5 md:space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link className="link-inline" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border/65 pt-6 md:border-t-0 md:pt-0">
            <p className="eyebrow">Connect</p>
            <ul className="mt-4 space-y-2.5 md:space-y-2">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    className="link-inline"
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {contactEmail && contactHref ? (
                <li>
                  <Link className="link-inline" href={contactHref}>
                    {contactEmail}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-11 flex flex-col gap-5 border-t border-border/80 pt-6 text-[0.68rem] uppercase leading-6 tracking-[0.16em] text-text/48 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-4 md:pt-5 md:text-[0.72rem] md:leading-normal md:tracking-[0.18em] md:text-text/42">
          <p>Built with Next.js, TypeScript, and production-first instincts.</p>
          <p>
            <Link className="link-inline" href="/privacy">
              Privacy
            </Link>
            {" / "}
            <Link className="link-inline" href="/terms">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

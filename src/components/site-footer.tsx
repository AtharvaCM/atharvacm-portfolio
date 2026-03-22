import Link from "next/link";

import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { FOOTER_BIO } from "@/lib/profile-content";
import { getMailtoHref, getMeaningfulEmail } from "@/lib/utils";

export function SiteFooter() {
  const hasSocialLinks = SOCIAL_LINKS.length > 0;
  const contactEmail = getMeaningfulEmail(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );
  const contactHref = getMailtoHref(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL
  );

  return (
    <footer className="mt-24 pb-14 pt-6">
      <div className="shell">
        <div className="border-t border-border/65 px-1 pt-10 md:pt-12">
          <div
            className={`grid gap-10 md:items-start ${
              hasSocialLinks ? "md:grid-cols-[1.2fr_1fr_1fr]" : "md:grid-cols-[1.45fr_1fr]"
            }`}
          >
            <div>
              <p className="font-display text-4xl leading-none tracking-tight md:text-5xl">
                {SITE_NAME}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-text/70">
                {FOOTER_BIO}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-text/60">
                Navigate
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link className="link-inline" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {hasSocialLinks ? (
              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-text/60">
                  Elsewhere
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
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
                  <li className="pt-2 text-text/65">
                    <Link className="link-inline" href="/privacy">
                      Privacy
                    </Link>
                    {" / "}
                    <Link className="link-inline" href="/terms">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-text/60">
                  Elsewhere
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link className="link-inline" href="/contact">
                      Contact
                    </Link>
                  </li>
                  {contactEmail && contactHref ? (
                    <li>
                      <Link className="link-inline" href={contactHref}>
                        {contactEmail}
                      </Link>
                    </li>
                  ) : null}
                  <li className="pt-2 text-text/65">
                    <Link className="link-inline" href="/privacy">
                      Privacy
                    </Link>
                    {" / "}
                    <Link className="link-inline" href="/terms">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="subtle-rule mt-10" />
          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-text/55">
            Built with Next.js, TypeScript, and performance in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}

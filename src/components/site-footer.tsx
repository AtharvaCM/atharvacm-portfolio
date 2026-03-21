import Link from "next/link";

import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-24 pb-14 pt-10">
      <div className="shell">
        <div className="panel relative overflow-hidden px-6 py-10 md:px-10 md:py-12">
          <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-lg" />

          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
            <div>
              <p className="font-display text-4xl leading-none tracking-tight md:text-5xl">
                Atharva CM
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-text/72">
                Product-focused front-end engineer building scalable,
                performance-driven web systems.
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
          </div>

          <div className="subtle-rule mt-9" />
          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-text/55">
            Built with Next.js, MDX, and intentional motion.
          </p>
        </div>
      </div>
    </footer>
  );
}

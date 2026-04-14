"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/90 bg-[hsl(var(--bg)/0.86)] backdrop-blur-md">
      <div className="shell">
        <div className="grid h-[5.25rem] grid-cols-[1fr_auto] items-center gap-6">
          <Link className="min-w-0 rounded-md focus-visible:ring-offset-0" href="/">
            <span className="block truncate text-[0.92rem] font-semibold uppercase tracking-[0.22em] text-text">
              {SITE_NAME}
            </span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  className={cn(
                    "relative font-display text-[0.72rem] uppercase tracking-[0.2em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0",
                    active
                      ? "text-accent"
                      : "text-[hsl(var(--text-muted))] hover:text-text"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-text/15 text-text md:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-px w-5 bg-current transition",
                  open && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-current transition",
                  open && "-translate-y-[1px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-200 ease-out md:hidden",
            open ? "max-h-[calc(100dvh-5.25rem)] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="border-t border-border/90 py-4" aria-label="Mobile Primary">
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    className={cn(
                      "flex items-center justify-between py-2 text-xl font-semibold tracking-[-0.04em] transition duration-200",
                      active ? "text-accent" : "text-text"
                    )}
                    href={item.href}
                    key={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

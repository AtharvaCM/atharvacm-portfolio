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
    <header className="sticky top-4 z-50">
      <div className="shell">
        <div className="relative flex h-[4.9rem] items-center justify-between rounded-[1.35rem] border border-border/70 bg-[hsl(var(--surface)/0.88)] px-4 shadow-[0_18px_42px_-34px_hsl(var(--text)/0.18)] backdrop-blur-sm md:px-6">
          <div className="subtle-rule pointer-events-none absolute inset-x-6 bottom-0" />

          <Link
            className="rounded-md focus-visible:ring-offset-0"
            href="/"
          >
            <span className="block font-display text-[1.85rem] leading-none tracking-tight text-text transition duration-200 hover:text-accent md:text-[1.95rem]">
              {SITE_NAME}
            </span>
          </Link>

          <nav className="hidden items-center gap-1.5 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  className={cn(
                    "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2",
                    active
                      ? "border-accent/35 bg-accent/10 text-accent"
                      : "border-transparent text-text/68 hover:border-border/80 hover:bg-white hover:text-text"
                  )}
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white/80 text-text md:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1">
              <span className={cn("block h-0.5 w-5 bg-current transition", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("block h-0.5 w-5 bg-current transition", open && "-translate-y-1 rotate-[-45deg]")} />
            </div>
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity,transform,margin] duration-200 ease-out md:hidden",
            open
              ? "mt-3 max-h-[calc(100dvh-6.75rem)] opacity-100"
              : "max-h-0 -translate-y-2 opacity-0 pointer-events-none"
          )}
        >
          <div className="max-h-[calc(100dvh-6.75rem)] overflow-y-auto overscroll-contain rounded-[1.35rem] border border-border/70 bg-[hsl(var(--surface)/0.94)] p-4 shadow-[0_18px_40px_-34px_hsl(var(--text)/0.16)]">
            <nav className="flex flex-col gap-2" aria-label="Mobile Primary">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    className={cn(
                      "block rounded-2xl border px-4 py-3 font-display text-3xl tracking-tight transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2",
                      active
                        ? "border-accent/35 bg-accent/10 text-accent"
                        : "border-border/70 bg-white/80 text-text hover:border-border hover:bg-white"
                    )}
                    href={item.href}
                    key={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

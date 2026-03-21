"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50">
      <div className="shell">
        <div className="panel relative flex h-[4.85rem] items-center justify-between px-4 md:px-6">
          <div className="subtle-rule pointer-events-none absolute inset-x-6 bottom-0" />

          <Link
            className="link-display rounded-md text-3xl leading-none md:text-[2.1rem] focus-visible:ring-offset-0"
            href="/"
          >
            Atharva CM
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  className={cn(
                    "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2",
                    active
                      ? "border-accent bg-accent text-white shadow-[0_12px_34px_-20px_hsl(var(--accent)/0.85)]"
                      : "border-transparent text-text/72 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-surface/95 hover:text-accent"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text md:hidden"
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
              ? "mt-3 max-h-96 opacity-100"
              : "max-h-0 -translate-y-2 opacity-0 pointer-events-none"
          )}
        >
          <div className="panel p-4">
            <nav className="flex flex-col gap-2" aria-label="Mobile Primary">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    className={cn(
                      "block rounded-2xl border px-4 py-3 font-display text-3xl tracking-tight transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2",
                      active
                        ? "border-accent bg-accent text-white"
                        : "border-border/65 bg-surface/65 text-text hover:border-accent/35 hover:bg-accent/8 hover:text-accent"
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

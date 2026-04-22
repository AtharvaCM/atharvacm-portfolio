"use client";

import { useEffect, useState } from "react";

const MICROCOPY_LINES = [
  "Building software that holds up beyond the demo.",
  "Currently tinkering with too many things.",
  "Probably benchmarking something unnecessarily.",
  "Still believes good software should feel calm.",
  "Somewhere between product systems and side projects.",
  "Yes, Linux made it in here somehow.",
  "Trying to keep the code clean and the interface quieter.",
  "If this feels thoughtful, that was the point.",
] as const;

const STORAGE_KEY = "atharvacm:footer-microcopy";

function pickMicrocopyLine() {
  try {
    const existing = window.sessionStorage.getItem(STORAGE_KEY);

    if (existing && MICROCOPY_LINES.includes(existing as (typeof MICROCOPY_LINES)[number])) {
      return existing;
    }

    const next =
      MICROCOPY_LINES[Math.floor(Math.random() * MICROCOPY_LINES.length)] ??
      MICROCOPY_LINES[0];

    window.sessionStorage.setItem(STORAGE_KEY, next);

    return next;
  } catch {
    return MICROCOPY_LINES[0];
  }
}

export function FooterMicrocopy() {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLine(pickMicrocopyLine());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!line) {
    return null;
  }

  return (
    <p className="mt-3 max-w-md text-[0.78rem] leading-6 text-text/46 motion-safe:animate-[footerMicrocopyIn_220ms_ease-out]">
      {line}
    </p>
  );
}

"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => onStoreChange();
  window.addEventListener(CONSENT_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(CONSENT_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const visible = !dismissed && consent === null;

  if (!visible) {
    return null;
  }

  const handleConsent = (value: "accepted" | "rejected") => {
    setDismissed(true);
    writeConsent(value);
  };

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-[90] w-[min(21rem,calc(100vw-1rem))] md:bottom-4 md:right-4 md:w-[19rem]">
      <div className="panel pointer-events-auto rounded-[1.1rem] border border-text/12 bg-[hsl(var(--surface))/0.94] p-3.5 backdrop-blur-md">
        <p className="text-sm leading-6 text-text/78">
          Analytics cookies are used to understand performance. Read the{" "}
          <Link className="link-inline-accent" href="/privacy">
            privacy policy
          </Link>
          .
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            className="btn-secondary cursor-pointer px-4 py-2 text-[0.72rem]"
            onClick={() => handleConsent("rejected")}
            type="button"
          >
            Reject
          </button>
          <button
            className="btn-primary cursor-pointer px-4 py-2 text-[0.72rem]"
            onClick={() => handleConsent("accepted")}
            type="button"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

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
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90]">
      <div className="shell">
        <div className="panel pointer-events-auto flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <p className="text-sm text-text/80">
            This site uses analytics cookies to understand performance. Read the{" "}
            <Link className="link-inline-accent" href="/privacy">
              privacy policy
            </Link>
            .
          </p>
          <div className="flex gap-2">
            <button
              className="btn-secondary cursor-pointer px-4 py-2 text-xs"
              onClick={() => handleConsent("rejected")}
              type="button"
            >
              Reject
            </button>
            <button
              className="btn-primary cursor-pointer px-4 py-2 text-xs"
              onClick={() => handleConsent("accepted")}
              type="button"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CONSENT_EVENT, type ConsentState, readConsent } from "@/lib/consent";

type Props = {
  gaId: string;
};

export function GoogleAnalytics({ gaId }: Props) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const sync = () => {
      setConsent(readConsent());
    };

    sync();
    window.addEventListener(CONSENT_EVENT, sync as EventListener);
    return () => window.removeEventListener(CONSENT_EVENT, sync as EventListener);
  }, []);

  useEffect(() => {
    if (!gaId || consent !== "accepted" || !window.gtag) {
      return;
    }

    window.gtag("config", gaId, { page_path: pathname });
  }, [consent, gaId, pathname]);

  if (!gaId || consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

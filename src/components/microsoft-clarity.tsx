"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { CONSENT_EVENT, type ConsentState, readConsent } from "@/lib/consent";

type Props = {
  projectId: string;
};

const grantedConsent = {
  ad_Storage: "denied",
  analytics_Storage: "granted",
} as const;

export function MicrosoftClarity({ projectId }: Props) {
  const [consent, setConsent] = useState<ConsentState>(null);
  const hasClarity = typeof window !== "undefined" && typeof window.clarity === "function";

  useEffect(() => {
    const sync = () => {
      setConsent(readConsent());
    };

    sync();
    window.addEventListener(CONSENT_EVENT, sync as EventListener);
    return () => window.removeEventListener(CONSENT_EVENT, sync as EventListener);
  }, []);

  useEffect(() => {
    if (!projectId || !hasClarity || !window.clarity) {
      return;
    }

    if (consent === "accepted") {
      window.clarity("consentv2", grantedConsent);
      return;
    }

    if (consent === "rejected") {
      window.clarity("consent", false);
    }
  }, [consent, hasClarity, projectId]);

  if (!projectId || (consent !== "accepted" && !hasClarity)) {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:"granted"});`}
    </Script>
  );
}

declare global {
  interface Window {
    clarity?: (
      action: "consent" | "consentv2",
      payload?:
        | false
        | {
            ad_Storage: "granted" | "denied";
            analytics_Storage: "granted" | "denied";
          }
    ) => void;
  }
}

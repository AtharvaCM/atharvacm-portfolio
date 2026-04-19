"use client";

import { GoogleTagManager as NextGoogleTagManager } from "@next/third-parties/google";
import { useEffect, useState } from "react";

import { CONSENT_EVENT, type ConsentState, readConsent } from "@/lib/consent";

type Props = {
  gtmId: string;
};

export function GoogleTagManager({ gtmId }: Props) {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const sync = () => {
      setConsent(readConsent());
    };

    sync();
    window.addEventListener(CONSENT_EVENT, sync as EventListener);
    return () => window.removeEventListener(CONSENT_EVENT, sync as EventListener);
  }, []);

  if (!gtmId || consent !== "accepted") {
    return null;
  }

  return <NextGoogleTagManager gtmId={gtmId} />;
}

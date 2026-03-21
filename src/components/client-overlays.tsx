"use client";

import dynamic from "next/dynamic";

const CookieBanner = dynamic(
  () => import("@/components/cookie-banner").then((mod) => mod.CookieBanner),
  { ssr: false }
);

const GoogleAnalytics = dynamic(
  () => import("@/components/google-analytics").then((mod) => mod.GoogleAnalytics),
  { ssr: false }
);

const MicrosoftClarity = dynamic(
  () => import("@/components/microsoft-clarity").then((mod) => mod.MicrosoftClarity),
  { ssr: false }
);

type Props = {
  gaId: string;
  clarityId: string;
};

export function ClientOverlays({ gaId, clarityId }: Props) {
  return (
    <>
      <CookieBanner />
      <GoogleAnalytics gaId={gaId} />
      <MicrosoftClarity projectId={clarityId} />
    </>
  );
}

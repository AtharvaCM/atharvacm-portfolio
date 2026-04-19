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

const GoogleTagManager = dynamic(
  () =>
    import("@/components/google-tag-manager").then(
      (mod) => mod.GoogleTagManager
    ),
  { ssr: false }
);

const MicrosoftClarity = dynamic(
  () => import("@/components/microsoft-clarity").then((mod) => mod.MicrosoftClarity),
  { ssr: false }
);

type Props = {
  gaId: string;
  gtmId: string;
  clarityId: string;
};

export function ClientOverlays({ gaId, gtmId, clarityId }: Props) {
  return (
    <>
      <CookieBanner />
      <GoogleAnalytics gaId={gaId} />
      <GoogleTagManager gtmId={gtmId} />
      <MicrosoftClarity projectId={clarityId} />
    </>
  );
}

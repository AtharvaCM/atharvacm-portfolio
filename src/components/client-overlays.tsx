"use client";

import dynamic from "next/dynamic";

const CookieBanner = dynamic(
  () => import("@/components/cookie-banner").then((mod) => mod.CookieBanner),
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

const CommandPalette = dynamic(
  () => import("@/components/command-palette").then((mod) => mod.CommandPalette),
  { ssr: false }
);

const NavigationProgress = dynamic(
  () =>
    import("@/components/navigation-progress").then(
      (mod) => mod.NavigationProgress
    ),
  { ssr: false }
);

type Props = {
  gtmId: string;
  clarityId: string;
};

export function ClientOverlays({ gtmId, clarityId }: Props) {
  return (
    <>
      <NavigationProgress />
      <CookieBanner />
      <GoogleTagManager gtmId={gtmId} />
      <MicrosoftClarity projectId={clarityId} />
      <CommandPalette />
    </>
  );
}

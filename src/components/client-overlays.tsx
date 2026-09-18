"use client";

import dynamic from "next/dynamic";

import type { LatestPost } from "@/components/latest-post-popover";

const CookieBanner = dynamic(
  () => import("@/components/cookie-banner").then((mod) => mod.CookieBanner),
  { ssr: false }
);

const LatestPostPopover = dynamic(
  () => import("@/components/latest-post-popover").then((mod) => mod.LatestPostPopover),
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
  latestPost: LatestPost | null;
};

export function ClientOverlays({ gtmId, clarityId, latestPost }: Props) {
  return (
    <>
      <NavigationProgress />
      <CookieBanner />
      {latestPost ? <LatestPostPopover post={latestPost} /> : null}
      <GoogleTagManager gtmId={gtmId} />
      <MicrosoftClarity projectId={clarityId} />
      <CommandPalette />
    </>
  );
}

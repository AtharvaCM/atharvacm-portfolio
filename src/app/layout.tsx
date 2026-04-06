import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { ClientOverlays } from "@/components/client-overlays";
import { DraftModeBanner } from "@/components/draft-mode-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StructuredData } from "@/components/structured-data";
import { SITE_URL } from "@/lib/constants";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  buildMetadata,
  getSiteStructuredData
} from "@/lib/seo";

import "./globals.css";

const fontSans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "sans-serif"],
});

const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
    keywords: ["Senior Frontend Engineer", "React Developer", "Next.js Developer"]
  })
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable}`}
        suppressHydrationWarning
      >
        <StructuredData data={getSiteStructuredData()} />
        <DraftModeBanner />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <ClientOverlays
          clarityId={process.env.NEXT_PUBLIC_CLARITY_ID ?? ""}
          gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""}
        />
      </body>
    </html>
  );
}

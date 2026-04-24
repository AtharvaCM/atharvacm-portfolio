import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { ClientOverlays } from "@/components/client-overlays";
import { DraftModeBanner } from "@/components/draft-mode-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StructuredData } from "@/components/structured-data";
import { SITE_URL } from "@/lib/constants";
import "@/lib/env";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  buildMetadata,
  getRootVerification,
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#2c211d" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
    keywords: ["Senior Frontend Engineer", "React Developer", "Next.js Developer"]
  }),
  verification: getRootVerification()
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
          gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ""}
        />
      </body>
    </html>
  );
}

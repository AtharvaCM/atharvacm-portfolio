import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { ClientOverlays } from "@/components/client-overlays";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

import "./globals.css";

const fontSans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "sans-serif"],
});

const fontDisplay = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  fallback: ["Bookman Old Style", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Product Engineer Portfolio`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Portfolio and resume website featuring product engineering case studies, technical writing, and experience highlights.",
  openGraph: {
    title: `${SITE_NAME} | Product Engineer Portfolio`,
    description:
      "Portfolio and resume website featuring product engineering case studies, technical writing, and experience highlights.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Product Engineer Portfolio`,
    description:
      "Portfolio and resume website featuring product engineering case studies, technical writing, and experience highlights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable}`}>
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

import type { Metadata } from "next";

import { CookieBanner } from "@/components/cookie-banner";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

import "./globals.css";

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
      <body>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <CookieBanner />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
      </body>
    </html>
  );
}

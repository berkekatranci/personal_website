import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import {
  absoluteUrl,
  defaultDescription,
  defaultTitle,
  isIndexableDeployment,
  personSchema,
  siteName,
  siteOrigin
} from "@/lib/site";

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/fraunces-latin-400-italic.woff2", weight: "400", style: "italic" }
  ],
  display: "swap",
  variable: "--font-fraunces"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: defaultTitle,
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: "Berke Katrancı", url: siteOrigin }],
  creator: "Berke Katrancı",
  robots: { index: isIndexableDeployment, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    siteName,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Berke Katrancı | AI & Software Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [absoluteUrl("/opengraph-image")]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fraunces.variable}>
        <StructuredData data={personSchema} />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

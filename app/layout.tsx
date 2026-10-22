import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/fraunces-latin-400-italic.woff2", weight: "400", style: "italic" }
  ],
  display: "swap",
  variable: "--font-fraunces"
});

const siteUrl = "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Berke Katrancı - AI, Software, Leadership & Creative Technology",
  description:
    "Personal portfolio of Berke Katrancı, Informatics student at TU Braunschweig focused on AI, data engineering, software engineering, leadership, investing, and creative technology.",
  keywords: [
    "AI Engineer",
    "Data Science",
    "Software Engineering",
    "TU Braunschweig",
    "Machine Learning",
    "Portfolio",
    "Student Research Assistant",
    "Leadership",
    "Investing",
    "Creative Technology",
    "Reinforcement Learning",
    "Computer Vision",
    "Java",
    "Python"
  ],
  openGraph: {
    title: "Berke Katrancı - AI, Software, Leadership & Creative Technology",
    description:
      "AI, data engineering, software engineering, leadership, investing, and creative technology portfolio.",
    url: siteUrl,
    siteName: "Berke Katrancı",
    images: [
      {
        url: "/images/hero-systems.png",
        width: 1536,
        height: 1024,
        alt: "Abstract intelligent systems visualization for Berke Katrancı"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Berke Katrancı - AI, Software, Leadership & Creative Technology",
    description:
      "Portfolio and CV website focused on AI, software, leadership, investing, and creative technology.",
    images: ["/images/hero-systems.png"]
  },
  alternates: {
    canonical: siteUrl
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
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

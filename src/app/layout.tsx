import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-newsreader",
  display: "swap",
});

const xHandle = site.links.twitter
  ? `@${site.links.twitter.replace(/\/+$/, "").split("/").pop()}`
  : undefined;

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: site.title,
    template: "%s · Jaskaran Singh",
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    ...(xHandle ? { creator: xHandle } : {}),
    images: ["/og.png"],
  },
};

/** Structured data — facts only; nothing invented. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  description: site.description,
  affiliation: {
    "@type": "Organization",
    name: "Skild AI",
    url: "https://www.skild.ai",
  },
  ...(site.url ? { url: site.url } : {}),
  sameAs: [site.links.github, site.links.linkedin, site.links.twitter].filter(
    Boolean,
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plexMono.variable} ${newsreader.variable} font-sans`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}

// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Geist, Geist_Mono, Press_Start_2P, VT323 } from "next/font/google";
import Nav from "@/components/Nav";
import MusicProvider from "@/components/MusicProvider";
import LanguageProvider from "@/i18n/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

// Press Start 2P and VT323 have ZERO Thai glyphs, so Thai text was
// silently falling back to whatever generic Thai font the visitor's OS
// ships - wrong size, wrong weight, breaks the pixel-RPG look entirely.
// Chakra Petch is a real Thai+Latin family (square sans, tapered
// corners, no serifs) built for exactly this techno/sci-fi register -
// it's the standard pick for Thai game and sci-fi UI. Two weights:
// 700 stands in for the blocky Press Start 2P headings, 400 for the
// lighter VT323 dialogue/body text. Applied only when the site is in
// Thai (see globals.css [data-lang="th"] rules) - English still renders
// in the original two fonts, untouched.
const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  weight: ["400", "700"],
  subsets: ["thai", "latin"],
});

const SITE_TITLE = "Pannadhorn Rugseree (Pan) | The Marketing Student Who Codes";
const SITE_DESCRIPTION =
  "Portfolio of Pannadhorn Rugseree, a marketing student at Bangkok University International who builds data dashboards and web apps: ALLAround GDP, Melonality and Lofi Calculator.";

// Each route folder has a small layout.tsx with its own title,
// description and canonical (the pages themselves are client components,
// which cannot export metadata). Those titles fill the template below.
// Google Search Console ownership is verified by the HTML file in
// public/ (google5452e429c74d79a4.html), not a meta tag.
export const metadata: Metadata = {
  metadataBase: new URL("https://pan-portfolio-two.vercel.app"),
  title: {
    default: SITE_TITLE,
    template: "%s | Pannadhorn Rugseree (Pan)",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Pan | Portfolio",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

// schema.org Person, so search engines can tie the site to the LinkedIn
// and GitHub profiles. "<" escaped per the Next.js JSON-LD guide.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pannadhorn Rugseree",
  alternateName: "Pan",
  url: "https://pan-portfolio-two.vercel.app",
  jobTitle: "Marketing Student",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bangkok University International",
  },
  sameAs: [
    "https://www.linkedin.com/in/pannadhorn-rugseree-90a8b6403/",
    "https://github.com/Pansony67",
  ],
};

// Explicit viewport so phones lay the page out at device width instead
// of a zoomed-out desktop canvas. No maximumScale / userScalable on
// purpose - blocking pinch-zoom is an accessibility failure. themeColor
// tints the browser chrome to the site's dark UI color on mobile.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0b1a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable} ${vt323.variable} ${chakraPetch.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>
          <MusicProvider>
            <Nav />
            <main className="flex-1">{children}</main>
          </MusicProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

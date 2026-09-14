// src/app/layout.tsx
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Pan | The Marketing Student Who Codes",
  description:
    "Marketing x Dev hybrid portfolio, presented as a pixel-art space RPG.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable} ${vt323.variable} ${chakraPetch.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
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

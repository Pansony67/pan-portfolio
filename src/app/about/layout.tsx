// src/app/about/layout.tsx
import type { Metadata } from "next";

// Metadata only - page.tsx is a client component and cannot export it.
export const metadata: Metadata = {
  title: "About",
  description:
    "Pan's character sheet: a self-rated SWOT chart, profile, interests and tech stack (TypeScript, Python, SQL, Tableau and more).",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: LayoutProps<"/about">) {
  return children;
}

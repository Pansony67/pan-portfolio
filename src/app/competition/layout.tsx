// src/app/competition/layout.tsx
import type { Metadata } from "next";

// Metadata only - page.tsx is a client component and cannot export it.
export const metadata: Metadata = {
  title: "Competitions and Certifications",
  description:
    "Case competitions Pan has entered (HSBC, L'Oreal, Singha and more) and certifications earned, including Google Analytics 4 and the Google Data Analytics Professional Certificate.",
  alternates: { canonical: "/competition" },
};

export default function Layout({ children }: LayoutProps<"/competition">) {
  return children;
}

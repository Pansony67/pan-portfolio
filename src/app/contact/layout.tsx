// src/app/contact/layout.tsx
import type { Metadata } from "next";

// Metadata only - page.tsx is a client component and cannot export it.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email, LinkedIn, GitHub and Instagram for Pannadhorn Rugseree (Pan).",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: LayoutProps<"/contact">) {
  return children;
}

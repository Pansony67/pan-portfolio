// src/app/projects/layout.tsx
import type { Metadata } from "next";

// Metadata only - page.tsx is a client component and cannot export it.
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web apps Pan has built and shipped: Lofi Calculator, ALLAround GDP and Melonality, plus Wally the Wallet, still in the works.",
  alternates: { canonical: "/projects" },
};

export default function Layout({ children }: LayoutProps<"/projects">) {
  return children;
}

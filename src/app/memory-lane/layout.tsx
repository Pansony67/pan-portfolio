// src/app/memory-lane/layout.tsx
import type { Metadata } from "next";

// Metadata only - page.tsx is a client component and cannot export it.
export const metadata: Metadata = {
  title: "Memory Lane",
  description:
    "A photo timeline from kindergarten to university, one memory at a time.",
  alternates: { canonical: "/memory-lane" },
};

export default function Layout({ children }: LayoutProps<"/memory-lane">) {
  return children;
}

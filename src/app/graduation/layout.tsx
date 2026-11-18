// src/app/graduation/layout.tsx
import type { Metadata } from "next";

// Metadata only - page.tsx is a client component and cannot export it.
export const metadata: Metadata = {
  title: "Graduation",
  description:
    "Pan's academic record: Beaconhouse Yamsaard Rangsit (2007 - 2023) and Bangkok University (2023 - 2027).",
  alternates: { canonical: "/graduation" },
};

export default function Layout({ children }: LayoutProps<"/graduation">) {
  return children;
}

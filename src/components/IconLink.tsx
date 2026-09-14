// src/components/IconLink.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import PixelBrandIcon from "@/components/PixelBrandIcon";

/* A pixel-framed card wrapping a real, genuinely-rasterized brand icon
   (see PixelBrandIcon.tsx), with the platform name printed underneath.
   Corner brackets are always visible here (unlike the hover-only ones
   elsewhere) so the three cards read as a matched set even at rest.

   The handle appears in a hover box above the card - a game-style item
   tooltip - so the resting state stays clean but the actual username is
   one hover away. The Contact page reserves headroom above the row so
   the tooltip is not clipped.

   ADJUST HERE
   ICON_SIZE - on-screen size of the brand glyph */
const ICON_SIZE = 72;

export default function IconLink({
  name,
  href,
  label,
  handle,
}: {
  name: "github" | "instagram" | "linkedin";
  href: string;
  label: string;
  handle: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 -translate-x-1/2 transition-opacity duration-100 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative whitespace-nowrap border-2 border-[#6b5bd6] bg-[#1a1530] px-4 py-2 shadow-[4px_4px_0_0_#0a0a0c]">
          <p className="font-dialogue text-base text-[#c9bdff]">{handle}</p>
          <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-[5px] rotate-45 border-b-2 border-r-2 border-[#6b5bd6] bg-[#1a1530]" />
        </div>
      </div>

      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="relative flex flex-col items-center gap-4 border-2 border-[#3d3550] bg-[#1a1530]/70 px-8 py-7 shadow-[6px_6px_0_0_#0a0a0c] transition-all duration-100 hover:translate-x-[3px] hover:translate-y-[3px] hover:border-[#6b5bd6] hover:bg-[#1a1530] hover:shadow-[3px_3px_0_0_#0a0a0c]"
      >
        <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[#6b5bd6]" />
        <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[#6b5bd6]" />
        <span className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-[#6b5bd6]" />
        <span className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-[#6b5bd6]" />

        <PixelBrandIcon name={name} size={ICON_SIZE} />

        <span className="font-pixel text-[9px] tracking-widest text-[#f2ead9] sm:text-[10px]">
          {label}
        </span>
      </Link>
    </div>
  );
}

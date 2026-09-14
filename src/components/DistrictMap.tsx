// src/components/DistrictMap.tsx
"use client";

import Link from "next/link";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* Third of four sections beneath the title screen. Three doorway cards
   linking further into the site - a second navigation entry point beyond
   the top nav, styled as buildings you walk into. Only the three most
   useful stops for a first-time visitor are here; Quest Log, Memory Lane,
   and Graduation stay reachable from the nav only. Background is the
   crossroads loop - fits the "map" concept directly. */
type District = {
  href: "/about" | "/projects" | "/contact";
};

const districts: District[] = [
  { href: "/about" },
  { href: "/projects" },
  { href: "/contact" },
];

export default function DistrictMap() {
  const { lang } = useLanguage();
  const t = translations[lang].home.districtMap;

  return (
    <section className="relative flex w-full flex-col items-center gap-10 overflow-hidden border-t-2 border-white/20 bg-[#0d0b1a] px-6 py-24 text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/crossroads-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-[#0d0b1a]/55" />

      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />

      <p className="font-pixel relative z-10 text-[9px] tracking-[0.4em] text-[#c9bdff] [text-shadow:2px_2px_0_#0a0a0c] sm:text-[10px]">
        &gt; DISTRICT MAP
      </p>

      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {districts.map((district) => {
          const item = t.items[district.href];

          return (
            <Link
              key={district.href}
              href={district.href}
              className="group flex flex-col items-start gap-4 border-2 border-[#3d3550] bg-[#1a1530]/80 px-5 py-6 text-left shadow-[6px_6px_0_0_#0a0a0c] transition-colors duration-100 hover:border-[#6b5bd6]"
            >
              <span className="font-pixel text-[9px] tracking-widest text-[#6b5bd6] opacity-0 transition-opacity duration-100 group-hover:opacity-100">
                &gt; {t.enter}
              </span>

              <p className="font-pixel text-xs text-[#f2ead9] sm:text-sm">
                {item.name}
              </p>

              <p className="font-dialogue text-base text-[#c9bdff]/70 sm:text-lg">
                {item.teaser}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

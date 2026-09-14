// src/components/SignalFromBelow.tsx
"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* First of four sections beneath the title screen (see also: status
   ticker, district map, closing CTA). Carries the underground-city loop
   as its background - the "arrival" shot right after the black gap
   transition. The other three sections below keep a plain dark plate
   instead of repeating the same video, to avoid loading and playing four
   copies of the same clip at once. */
export default function SignalFromBelow() {
  const { lang } = useLanguage();
  const t = translations[lang].home;

  return (
    <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-[#0d0b1a] px-6 py-24 text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/underground-city-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Readability layer - lighter than before so the video underneath
          is actually visible; text-shadow below does the rest of the
          contrast work instead of a near-opaque overlay. */}
      <div className="absolute inset-0 bg-[#0d0b1a]/55" />

      {/* CRT scanlines, same trick used on Graduation and the loading
          screen, to tie this back into the rest of the theme. */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />

      {/* Fades in from black at the top edge, mirroring TitleScreen's
          bottom fade, so the two videos read as one continuous descent
          through the gap instead of two separate blocks. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0c] to-transparent sm:h-56" />

      <p className="font-pixel relative z-10 text-[9px] tracking-[0.4em] text-[#c9bdff] [text-shadow:2px_2px_0_#0a0a0c] sm:text-[10px]">
        &gt; WHO AM I
      </p>

      <p className="font-dialogue relative z-10 max-w-2xl text-xl leading-relaxed text-[#f2ead9] [text-shadow:3px_3px_0_#0a0a0c] sm:text-2xl">
        {t.whoAmIBio}
      </p>
    </section>
  );
}

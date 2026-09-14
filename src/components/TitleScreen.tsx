// src/components/TitleScreen.tsx
"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* ---------------------------------------------------------------------------
   ADJUST HERE
   TITLE_SIZE     - size of the main wordmark
   CONTENT_TOP    - vertical position of the title block, % down the screen
   SCANLINE_OPACITY - strength of the CRT line overlay
--------------------------------------------------------------------------- */
const TITLE_SIZE = "text-2xl sm:text-4xl lg:text-5xl";
const CONTENT_TOP = "34%";
const SCANLINE_OPACITY = "opacity-20";

export default function TitleScreen() {
  const { lang } = useLanguage();
  const t = translations[lang].titleScreen;

  return (
    <section className="relative h-[calc(100vh-57px)] w-full overflow-hidden bg-[#0d0b1a]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/title-screen-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content sits above the plate but below the CRT overlays, so the
          scanlines fall across the text too - it reads as one screen
          rather than text floating on a video. */}
      <div
        className="absolute left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center"
        style={{ top: CONTENT_TOP }}
      >
        <p className="font-pixel mb-8 text-[9px] tracking-[0.4em] text-[#f2ead9]/50 sm:text-[10px]">
          {t.eyebrow}
        </p>

        <div className="title-glitch">
          <h1
            className={`title-aberration font-pixel ${TITLE_SIZE} leading-[1.7] text-[#f2ead9]`}
          >
            PAN DEV
            <br />
            PORTFOLIO
          </h1>
        </div>

        <button
          type="button"
          className="font-pixel mt-14 rounded px-4 py-3 text-[11px] tracking-[0.2em] text-[#c9bdff] outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#c9bdff] sm:text-[13px]"
        >
          <span className="arcade-blink">PRESS START</span>
        </button>
      </div>

      {/* A single bright line sweeping down, like a CRT refresh pass. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-full overflow-hidden">
        <div className="scan-sweep h-24 w-full bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-20 ${SCANLINE_OPACITY} [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.55)_0px,rgba(0,0,0,0.55)_1px,transparent_1px,transparent_3px)]`}
      />

      <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_160px_rgba(8,4,25,0.9)]" />

      {/* Fades the bottom edge to solid black so it blends into the
          transition gap below instead of cutting off hard. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent to-[#0a0a0c] sm:h-56" />

      <p className="font-pixel absolute bottom-6 right-6 z-20 text-[8px] tracking-widest text-[#f2ead9]/35 sm:text-[9px]">
        PANDEV - SAVE FILE 001
      </p>
    </section>
  );
}

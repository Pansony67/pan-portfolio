// src/components/LoadingScreen.tsx
"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* ---------------------------------------------------------------------------
   ADJUST SIZING HERE
   LOGO_SIZE     - how big the PANDEV wordmark is (Tailwind text sizes)
   BEZEL_PAD     - thickness of the black monitor frame around the screen
   SCREEN_PAD    - breathing room inside the screen, before the content
   LOGO_TOP      - vertical position of the logo, % down from the top
   SUBTITLE_TOP  - vertical position of the "Sup welcome..." line
   STATUS_TOP    - vertical position of the "LOADING ASSETS" line
   BAR_TOP       - vertical position of the progress bar
   FOOTER_BOTTOM - distance of the footer line from the bottom, in %
--------------------------------------------------------------------------- */
const LOGO_SIZE = "text-3xl sm:text-5xl lg:text-7xl";
const BEZEL_PAD = "p-4 sm:p-6";
const SCREEN_PAD = "p-8 sm:p-12";

const LOGO_TOP = "22%";
const SUBTITLE_TOP = "38%";
const STATUS_TOP = "58%";
const BAR_TOP = "66%";
const FOOTER_BOTTOM = "6%";

// Number of blocks in the progress bar and how full it is (0-100). This is
// a static preview value for now - once the loading screen is wired to
// real asset loading, pass the real percentage in as a prop instead.
const BAR_SEGMENTS = 24;
const DEMO_PROGRESS = 65;

export default function LoadingScreen({
  progress = DEMO_PROGRESS,
}: {
  progress?: number;
}) {
  const { lang } = useLanguage();
  const t = translations[lang].loadingScreen;

  const filledSegments = Math.round((progress / 100) * BAR_SEGMENTS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-2 sm:p-4">
      {/* Bezel: thick black monitor shell. Change BEZEL_PAD to make it thicker. */}
      <div
        className={`relative h-full w-full rounded-[2.5rem] bg-[#0a0a0c] ${BEZEL_PAD} shadow-[0_0_120px_rgba(0,0,0,0.9),inset_0_2px_6px_rgba(255,255,255,0.06)]`}
      >
        {/* Screen: retro light purple. crt-power-on plays once on mount. */}
        <div className="crt-power-on relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[#6b5bd6]">
          {/* Screen glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(150,135,255,0.55)_0%,transparent_60%)]" />

          {/* Content layer. Change SCREEN_PAD for inner spacing. */}
          <div className={`absolute inset-0 ${SCREEN_PAD}`}>
            {/* Wordmark in the 90s arcade pixel face. */}
            <h1
              className={`logo-glow font-pixel ${LOGO_SIZE} absolute left-1/2 -translate-x-1/2 text-center text-[#f2ead9] leading-none tracking-wider`}
              style={{ top: LOGO_TOP }}
            >
              PANDEV
            </h1>

            {/* Subtitle */}
            <p
              className="font-dialogue absolute left-1/2 -translate-x-1/2 text-center text-2xl text-[#f2ead9]/90 sm:text-3xl"
              style={{ top: SUBTITLE_TOP }}
            >
              {t.subtitle}
            </p>

            {/* Status line */}
            <p
              className="font-pixel absolute left-1/2 -translate-x-1/2 text-center text-[10px] tracking-widest text-[#f2ead9]/80 sm:text-xs"
              style={{ top: STATUS_TOP }}
            >
              {t.status}
              <span className="loading-dot" style={{ animationDelay: "0ms" }}>
                .
              </span>
              <span className="loading-dot" style={{ animationDelay: "200ms" }}>
                .
              </span>
              <span className="loading-dot" style={{ animationDelay: "400ms" }}>
                .
              </span>
            </p>

            {/* Progress bar: pixel block segments, like the sketch. */}
            <div
              className="absolute left-1/2 flex w-[70%] max-w-md -translate-x-1/2 gap-[3px] border-2 border-[#f2ead9]/70 bg-[#2a2050]/40 p-1"
              style={{ top: BAR_TOP }}
            >
              {Array.from({ length: BAR_SEGMENTS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 flex-1 sm:h-5 ${
                    i < filledSegments ? "bg-[#f2ead9]" : "bg-transparent"
                  }`}
                />
              ))}
            </div>

            {/* Footer line */}
            <p
              className="font-pixel absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-[9px] tracking-widest text-[#f2ead9]/60 sm:text-[10px]"
              style={{ bottom: FOOTER_BOTTOM }}
            >
              {t.footer}
            </p>
          </div>

          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.5)_0px,rgba(0,0,0,0.5)_1px,transparent_1px,transparent_3px)]" />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(20,10,50,0.75)]" />
        </div>
      </div>
    </div>
  );
}

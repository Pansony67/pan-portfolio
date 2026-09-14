// src/components/CurrentlyRunning.tsx
"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* Second of four sections beneath the title screen. Reads like a
   process/status log from the underground workshop - LIVE (deployed,
   shipped) in green, IN PROGRESS (actively being built, not deployed yet)
   in amber. Rows with a real URL are clickable and open in a new tab; rows
   without one render as a plain, non-interactive block instead of a dead
   link. Background is the engine-room loop - the process rows already
   carry their own solid plate, so the overlay here stays fairly light. */
type Process = {
  id: string;
  name: string;
  description: string;
  status: "LIVE" | "IN PROGRESS";
  isLive: boolean;
  href: string | null;
};

const processes: Process[] = [
  {
    id: "allaround-gdp",
    name: "ALLAROUND_GDP.exe",
    description: "3D globe GDP visualizer",
    status: "LIVE",
    isLive: true,
    href: "https://all-around-gdp.vercel.app",
  },
  {
    id: "lofi-calculator",
    name: "LOFI_CALCULATOR.exe",
    description: "Lofi calculator with a currency converter",
    status: "LIVE",
    isLive: true,
    href: "https://lofi-calculator.vercel.app/",
  },
  {
    id: "portfolio-site",
    name: "PORTFOLIO_SITE.exe",
    description: "This site - pixel art RPG portfolio",
    status: "IN PROGRESS",
    isLive: false,
    href: null,
  },
];

export default function CurrentlyRunning() {
  const { lang } = useLanguage();
  const t = translations[lang].home.currentlyRunningDescriptions;

  return (
    <section className="relative flex w-full flex-col items-center gap-10 overflow-hidden border-t-2 border-white/20 bg-[#0d0b1a] px-6 py-24 text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/engine-room-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-[#0d0b1a]/55" />

      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />

      <p className="font-pixel relative z-10 text-[9px] tracking-[0.4em] text-[#c9bdff] [text-shadow:2px_2px_0_#0a0a0c] sm:text-[10px]">
        &gt; CURRENTLY RUNNING
      </p>

      <div className="relative z-10 flex w-full max-w-2xl flex-col gap-4 text-left">
        {processes.map((item) => {
          const badge = (
            <span
              className={`flex w-fit shrink-0 items-center gap-2 border-2 bg-[#0a0a0c]/80 px-2 py-1 shadow-[3px_3px_0_0_#0a0a0c] ${
                item.isLive ? "border-[#4ade80]" : "border-[#f2b134]"
              }`}
            >
              <span
                className={`h-[8px] w-[8px] ${
                  item.isLive ? "bg-[#4ade80]" : "bg-[#f2b134]"
                }`}
              />
              <span
                className={`font-pixel text-[8px] tracking-widest ${
                  item.isLive ? "text-[#4ade80]" : "text-[#f2b134]"
                }`}
              >
                {item.status}
              </span>
            </span>
          );

          const details = (
            <div>
              <p className="font-pixel text-xs text-[#f2ead9] sm:text-sm">
                {item.name}
              </p>
              <p className="font-dialogue mt-2 text-base text-[#c9bdff]/70 sm:text-lg">
                {t[item.id as keyof typeof t]}
              </p>
            </div>
          );

          const rowClassName =
            "flex flex-col gap-3 border-2 border-[#3d3550] bg-[#1a1530]/80 px-5 py-4 shadow-[6px_6px_0_0_#0a0a0c] sm:flex-row sm:items-center sm:justify-between";

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${rowClassName} transition-colors duration-100 hover:border-[#6b5bd6]`}
              >
                {details}
                {badge}
              </a>
            );
          }

          return (
            <div key={item.id} className={rowClassName}>
              {details}
              {badge}
            </div>
          );
        })}
      </div>
    </section>
  );
}

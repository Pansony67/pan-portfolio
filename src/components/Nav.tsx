// src/components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMusic } from "@/components/MusicProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

export default function Nav() {
  const pathname = usePathname();
  const { muted, toggleMuted } = useMusic();
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;

  const links = [
    { href: "/", label: t.titleScreen },
    { href: "/about", label: t.characterSelect },
    { href: "/projects", label: t.levelSelect },
    { href: "/competition", label: t.questLog },
    { href: "/contact", label: t.saveContinue },
    { href: "/memory-lane", label: t.memoryLane },
    { href: "/graduation", label: t.graduation },
  ];

  // Shared classes for the two standalone control buttons - each is its
  // own independent box, no wrapping container. Neon pink border + a
  // soft glow layered on top of the site's usual hard offset shadow
  // (the glow is what actually reads as "neon" - a flat border alone
  // wouldn't).
  const controlButtonClass =
    "flex items-center justify-center border-2 border-[#ff2fc7] bg-[#1a1530]/80 text-[#ffd6f5] shadow-[3px_3px_0_0_#0a0a0c,0_0_10px_rgba(255,47,199,0.55)] outline-none transition-colors hover:bg-[#ff2fc7]/15 hover:text-[#fff0fb] hover:shadow-[3px_3px_0_0_#0a0a0c,0_0_16px_rgba(255,47,199,0.85)] focus-visible:ring-2 focus-visible:ring-[#ff2fc7] active:translate-y-[1px] active:shadow-[0_0_10px_rgba(255,47,199,0.55)]";

  return (
    <>
      <div className="border-b-2 border-[#3d3550] bg-[#0d0b1a]">
        {/* Page links only. The language/mute controls used to live in
            a second row here (a bordered black strip under this nav),
            but that took up header space and scrolled out of view with
            the rest of the page - moved out to a fixed floating cluster
            below instead. */}
        <nav className="flex flex-wrap items-center gap-3 px-6 py-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`font-pixel flex items-center border-2 px-3 py-2 text-[10px] tracking-wide outline-none transition-colors sm:text-xs ${
                  isActive
                    ? "border-[#f2ead9] bg-[#6b5bd6]/30 text-[#f2ead9] shadow-[3px_3px_0_rgba(45,20,95,0.7)]"
                    : "border-white/15 text-[#f2ead9]/55 hover:border-[#6b5bd6] hover:text-[#f2ead9] hover:bg-white/5"
                } focus-visible:ring-2 focus-visible:ring-[#f2ead9] active:translate-y-[1px] active:shadow-none`}
              >
                <span className={isActive ? "mr-1 opacity-100" : "mr-1 opacity-0"}>
                  &#9656;
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Floating controls: language + mute. Fixed to the top-right
          corner of the viewport (not the nav bar) so they stay
          reachable no matter how far down the page is scrolled. This
          wrapper is purely for position/stacking - no background or
          border of its own - each button keeps its own independent
          neon-pink box. */}
      <div className="fixed right-4 top-4 z-40 flex flex-col gap-3">
        <button
          type="button"
          onClick={toggleLang}
          aria-label={lang === "en" ? t.switchToThai : t.switchToEnglish}
          title={lang === "en" ? t.switchToThai : t.switchToEnglish}
          className={`font-pixel h-8 px-2.5 text-[9px] tracking-widest ${controlButtonClass}`}
        >
          {lang === "en" ? "TH" : "EN"}
        </button>

        <button
          type="button"
          onClick={toggleMuted}
          aria-label={muted ? t.muteOff : t.muteOn}
          aria-pressed={muted}
          title={muted ? t.muteOff : t.muteOn}
          className={`h-8 w-8 ${controlButtonClass}`}
        >
          {muted ? (
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1 6h3l4-3v10l-4-3H1z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6 5.4l1.4 1.4-1.4 1.4.7.7L12.7 7.5l1.4 1.4.7-.7-1.4-1.4 1.4-1.4-.7-.7-1.4 1.4-1.4-1.4z"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1 6h3l4-3v10l-4-3H1z" />
              <path d="M10.5 5.2a3 3 0 010 5.6v-1.1a2 2 0 000-3.4V5.2z" />
              <path d="M10.5 3.2a5 5 0 010 9.6v-1.1a4 4 0 000-7.4V3.2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

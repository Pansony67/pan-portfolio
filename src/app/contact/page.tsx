// src/app/contact/page.tsx
"use client";

import IconLink from "@/components/IconLink";
import PixelFrame from "@/components/PixelFrame";
import DialogueCallout from "@/components/DialogueCallout";
import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* Save & Continue / Contact page, built to the mockup: everything sits
   inside an ornate bracketed frame, with the heading, an ornament
   divider, a speech-bubble callout, the three channel cards, and a
   footer save-file line. Background is the citadel loop - PixelFrame's
   own interior has no fill, so the video shows through the open areas
   between cards, same idea as the reference image's deliberately empty
   center. */
const channels = [
  {
    name: "linkedin" as const,
    href: "https://www.linkedin.com/in/pannadhorn-rugseree-90a8b6403/",
    label: "LINKEDIN",
    handle: "Pannadhorn Rugseree",
  },
  {
    name: "github" as const,
    href: "https://github.com/Pansony67",
    label: "GITHUB",
    handle: "Pansony67",
  },
  {
    name: "instagram" as const,
    href: "https://www.instagram.com/pancantalk/?theme=dark",
    label: "INSTAGRAM",
    handle: "pancantalk",
  },
];

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <div className="relative w-full overflow-hidden px-6 py-16 sm:px-10">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/citadel-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-[#0d0b1a]/50" />

      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />

      <div className="relative z-10">
        <PixelFrame>
          <div className="text-center">
            <p className="font-pixel text-[9px] tracking-[0.4em] text-[#c9bdff] [text-shadow:2px_2px_0_#0a0a0c] sm:text-[10px]">
              &gt; SAVE &amp; CONTINUE
            </p>

            <h1 className="font-pixel mt-8 text-2xl text-[#f2ead9] [text-shadow:4px_4px_0_#1a1530] sm:text-4xl">
              {t.heading}
            </h1>

            <div className="mt-7 flex items-center justify-center gap-2">
              <span className="h-[2px] w-16 bg-[#3d3550] sm:w-24" />
              <span className="h-[6px] w-[6px] bg-[#6b5bd6]" />
              <span className="h-[12px] w-[12px] bg-[#6b5bd6]" />
              <span className="h-[6px] w-[6px] bg-[#6b5bd6]" />
              <span className="h-[2px] w-16 bg-[#3d3550] sm:w-24" />
            </div>
          </div>

          <div className="mt-10">
            <DialogueCallout>{t.calloutText}</DialogueCallout>
          </div>

          {/* Small diamond marker between the callout and the channels */}
          <div className="mt-10 flex justify-center">
            <span className="h-3 w-3 rotate-45 border-2 border-[#6b5bd6]" />
          </div>

          {/* Headroom so the hover tooltips have somewhere to pop into */}
          <div className="mt-16 flex flex-wrap items-start justify-center gap-6 sm:gap-8">
            {channels.map((channel) => (
              <IconLink
                key={channel.name}
                name={channel.name}
                href={channel.href}
                label={channel.label}
                handle={channel.handle}
              />
            ))}
          </div>

          {/* Footer save-file line, flanked by rules and diamonds */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <span className="hidden h-[2px] w-16 bg-[#3d3550] sm:block" />
            <span className="hidden h-2 w-2 rotate-45 border border-[#3d3550] sm:block" />
            <p className="font-pixel text-[8px] tracking-widest text-[#f2ead9]/35 sm:text-[9px]">
              PANDEV - SAVE FILE 001
            </p>
            <span className="hidden h-2 w-2 rotate-45 border border-[#3d3550] sm:block" />
            <span className="hidden h-[2px] w-16 bg-[#3d3550] sm:block" />
          </div>
        </PixelFrame>
      </div>
    </div>
  );
}

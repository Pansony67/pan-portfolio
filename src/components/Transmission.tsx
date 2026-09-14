// src/components/Transmission.tsx
"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* Fourth and last section beneath the title screen - the closing CTA.
   Background is the signal-tower loop, chosen deliberately for this one:
   the light shaft breaking through the cavern ceiling reads as a visual
   bookend, a signal reaching back up toward the surface city from the
   title screen. Plain pixel-font text buttons instead of icons, since no
   icon package is confirmed installed in this project yet. */
type SocialLink = {
  name: string;
  href: string;
};

const socials: SocialLink[] = [
  {
    name: "LINKEDIN",
    href: "https://www.linkedin.com/in/pannadhorn-rugseree-90a8b6403/",
  },
  {
    name: "GITHUB",
    href: "https://github.com/Pansony67",
  },
  {
    name: "INSTAGRAM",
    href: "https://www.instagram.com/pancantalk/?theme=dark",
  },
];

export default function Transmission() {
  const { lang } = useLanguage();
  const t = translations[lang].home;

  return (
    <section className="relative flex w-full flex-col items-center gap-10 overflow-hidden border-t-2 border-white/20 bg-[#0d0b1a] px-6 py-24 text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/signal-tower-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-[#0d0b1a]/55" />

      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />

      <p className="font-pixel relative z-10 text-[9px] tracking-[0.4em] text-[#c9bdff] [text-shadow:2px_2px_0_#0a0a0c] sm:text-[10px]">
        &gt; TRANSMISSION
      </p>

      <p className="font-dialogue relative z-10 max-w-xl text-xl leading-relaxed text-[#f2ead9] [text-shadow:3px_3px_0_#0a0a0c] sm:text-2xl">
        {t.transmissionCta}
      </p>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
        {socials.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel border-2 border-[#3d3550] bg-[#1a1530]/80 px-5 py-3 text-[10px] tracking-widest text-[#f2ead9] shadow-[4px_4px_0_0_#0a0a0c] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[#6b5bd6] hover:shadow-[2px_2px_0_0_#0a0a0c] sm:text-xs"
          >
            {item.name}
          </a>
        ))}
      </div>
    </section>
  );
}

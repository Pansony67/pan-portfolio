// src/app/graduation/page.tsx
"use client";

import Image from "next/image";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* Layout - no surrounding box. Full-width horizontal rules only: one under
   the GRADUATION heading and one between the two rows. Nothing closes off
   the bottom. Both rows share equal height and carry a pixel-art campus
   image as a scaled background (object-cover). A left-to-right gradient
   keeps the text side readable while letting the art breathe on the right,
   and a scanline layer ties the rows back into the CRT theme. Status reads
   like an online/offline indicator: green for the school still in progress,
   red for the one already finished.

   `type` stays the stable English key (SCHOOL/UNIVERSITY) used to look up
   translations[lang].graduation.types - only the rendered label changes
   with language. */
type Institution = {
  type: "SCHOOL" | "UNIVERSITY";
  name: string;
  href: string;
  years: string;
  status: "ACTIVE" | "INACTIVE";
  isActive: boolean;
  bgImage: string;
  logo: string;
  logoAlt: string;
};

const institutions: Institution[] = [
  {
    type: "SCHOOL",
    name: "Beaconhouse Yamsaard Rangsit",
    href: "https://bys.ac.th/bilingual/bysrangsit/",
    years: "2007 - 2023",
    status: "INACTIVE",
    isActive: false,
    bgImage: "/images/school-campus-pixel.png",
    logo: "/images/school-logo.png",
    logoAlt: "Beaconhouse Yamsaard Rangsit logo",
  },
  {
    type: "UNIVERSITY",
    name: "Bangkok University",
    href: "https://www.bu.ac.th/en",
    years: "2023 - 2027",
    status: "ACTIVE",
    isActive: true,
    bgImage: "/images/university-campus-pixel.png",
    logo: "/images/university-logo.png",
    logoAlt: "Bangkok University logo",
  },
];

export default function Graduation() {
  const { lang } = useLanguage();
  const t = translations[lang].graduation;

  return (
    <div className="w-full py-16">
      <div className="relative border-b-2 border-white/20 px-6 pb-12 pt-6 text-center sm:px-14">
        {/* Pixel corner brackets framing the heading block */}
        <span className="pointer-events-none absolute left-4 top-0 h-6 w-6 border-l-2 border-t-2 border-[#6b5bd6] sm:left-10" />
        <span className="pointer-events-none absolute right-4 top-0 h-6 w-6 border-r-2 border-t-2 border-[#6b5bd6] sm:right-10" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[#6b5bd6] sm:left-10" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#6b5bd6] sm:right-10" />

        <h1 className="font-pixel text-xl text-[#f2ead9] [text-shadow:4px_4px_0_#1a1530] sm:text-3xl">
          {t.heading}
        </h1>

        {/* Hard-edged ornament divider, no blur */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-[3px] w-10 bg-[#3d3550] sm:w-16" />
          <span className="h-[6px] w-[6px] bg-[#6b5bd6]" />
          <span className="h-[10px] w-[10px] bg-[#6b5bd6]" />
          <span className="h-[6px] w-[6px] bg-[#6b5bd6]" />
          <span className="h-[3px] w-10 bg-[#3d3550] sm:w-16" />
        </div>

        <p className="font-dialogue mt-5 text-lg tracking-wide text-[#c9bdff] sm:text-xl">
          {t.subtitle}
        </p>
      </div>

      {institutions.map((inst, i) => (
        <a
          key={inst.name}
          href={inst.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex min-h-[250px] items-center justify-between overflow-hidden px-6 py-16 text-left sm:px-12 ${
            i < institutions.length - 1 ? "border-b-2 border-white/20" : ""
          }`}
        >
          <Image
            src={inst.bgImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover [image-rendering:pixelated]"
          />

          {/* Readability layer: solid on the text side, thinner over the art */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/95 via-[#0d0b1a]/75 to-[#0d0b1a]/45 transition-colors duration-100 group-hover:from-[#1a1530]/95 group-hover:via-[#1a1530]/70" />

          {/* CRT scanlines, same trick used on the loading screen */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />

          <div className="relative z-10">
            <p className="font-pixel text-[9px] tracking-widest text-[#c9bdff]">
              <span className="mr-2 inline-block text-[#6b5bd6] opacity-0 transition-opacity duration-100 group-hover:opacity-100">
                &gt;
              </span>
              {t.types[inst.type]}
            </p>

            <p className="font-dialogue mt-3 text-2xl text-[#f2ead9] [text-shadow:3px_3px_0_#0a0a0c] sm:text-3xl">
              {inst.name}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="font-pixel text-[9px] tracking-widest text-[#f2ead9]/70">
                {inst.years}
              </span>

              <span
                className={`flex items-center gap-2 border-2 bg-[#0a0a0c]/80 px-2 py-1 shadow-[3px_3px_0_0_#0a0a0c] ${
                  inst.isActive ? "border-[#4ade80]" : "border-[#f2555a]"
                }`}
              >
                <span
                  className={`h-[8px] w-[8px] ${
                    inst.isActive ? "bg-[#4ade80]" : "bg-[#f2555a]"
                  }`}
                />
                <span
                  className={`font-pixel text-[8px] tracking-widest ${
                    inst.isActive ? "text-[#4ade80]" : "text-[#f2555a]"
                  }`}
                >
                  {inst.status}
                </span>
              </span>
            </div>
          </div>

          <div className="relative z-10 shrink-0 border-2 border-[#3d3550] bg-[#1a1530]/85 p-3 shadow-[6px_6px_0_0_#0a0a0c] transition-colors duration-100 group-hover:border-[#6b5bd6] sm:p-4">
            <Image
              src={inst.logo}
              alt={inst.logoAlt}
              width={96}
              height={96}
              className="h-16 w-16 object-contain [image-rendering:pixelated] sm:h-24 sm:w-24"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

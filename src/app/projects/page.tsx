// src/app/projects/page.tsx
"use client";

import Image from "next/image";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* Level Select / Projects page - same row pattern as Graduation: full-
   width rows with a pixel-art background image, gradient overlay for
   text contrast, scanline, and a status badge. Order per Pan: Lofi
   Calculator, then ALLAround-GDP, then Wally the Wallet last (locked,
   no background scene yet - that's a separate future step, plain dark
   plate with the padlock icon as a watermark for now).

   Each project's type label gets its own accent color instead of the
   site's default violet, so the three rows read as distinct at a
   glance - Wally's stays a flat gray on purpose, since it's not live
   yet (color = available, gray = not).

   `name` stays the stable English key used to look up
   translations[lang].projects.descriptions - only the rendered
   description text changes with language. */
type Project = {
  type: string;
  accentColor: string;
  name: "Lofi Calculator" | "ALLAround-GDP" | "Wally the Wallet";
  bgImage: string | null;
  href: string | null;
  status: "LIVE" | "LOCKED";
};

const projects: Project[] = [
  {
    type: "PROJECT_01",
    accentColor: "#f2a9d0",
    name: "Lofi Calculator",
    bgImage: "/images/lofi-desk-pixel.png",
    href: "https://lofi-calculator.vercel.app/",
    status: "LIVE",
  },
  {
    type: "PROJECT_02",
    accentColor: "#7dd3fc",
    name: "ALLAround-GDP",
    bgImage: "/images/command-center-pixel.png",
    href: "https://all-around-gdp.vercel.app",
    status: "LIVE",
  },
  {
    type: "PROJECT_03",
    accentColor: "#9ca3af",
    name: "Wally the Wallet",
    bgImage: "/images/wally-vault-pixel.png",
    href: null,
    status: "LOCKED",
  },
];

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "LOCKED") {
    return (
      <span className="flex h-7 w-fit shrink-0 items-center gap-2 border-2 border-[#6b6b7a] bg-[#0a0a0c]/80 px-2 shadow-[3px_3px_0_0_#0a0a0c]">
        <Image
          src="/images/padlock-pixel.png"
          alt=""
          width={12}
          height={12}
          className="[image-rendering:pixelated]"
        />
        <span className="font-pixel text-[8px] tracking-widest text-[#9ca3af]">
          LOCKED
        </span>
      </span>
    );
  }

  return (
    <span className="flex h-7 w-fit shrink-0 items-center gap-2 border-2 border-[#4ade80] bg-[#0a0a0c]/80 px-2 shadow-[3px_3px_0_0_#0a0a0c]">
      <span className="h-[8px] w-[8px] bg-[#4ade80]" />
      <span className="font-pixel text-[8px] tracking-widest text-[#4ade80]">
        LIVE
      </span>
    </span>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  return (
    <div className="w-full py-16">
      <div className="border-b-2 border-white/20 px-6 pb-10 text-center sm:px-14">
        <h1 className="font-pixel text-xl text-[#f2ead9] [text-shadow:4px_4px_0_#1a1530] sm:text-3xl">
          {t.heading}
        </h1>
      </div>

      {projects.map((project, i) => {
        const details = (
          <div className="relative z-10">
            <p
              className="font-pixel text-[9px] tracking-widest"
              style={{ color: project.accentColor }}
            >
              {project.type}
            </p>
            <p className="font-dialogue mt-3 text-2xl text-[#f2ead9] [text-shadow:3px_3px_0_#0a0a0c] sm:text-3xl">
              {project.name}
            </p>
            <p className="font-dialogue mt-2 text-lg text-[#c9bdff]/80 sm:text-xl">
              {t.descriptions[project.name]}
            </p>
          </div>
        );

        const rowClassName = `group relative flex min-h-[280px] items-center justify-between overflow-hidden px-6 py-16 sm:px-12 ${
          i < projects.length - 1 ? "border-b-2 border-white/20" : ""
        }`;

        const background = project.bgImage ? (
          <Image
            src={project.bgImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover [image-rendering:pixelated]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0c]">
            <Image
              src="/images/padlock-pixel.png"
              alt=""
              width={160}
              height={160}
              className="opacity-[0.08] [image-rendering:pixelated]"
            />
          </div>
        );

        const overlay = (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/95 via-[#0d0b1a]/75 to-[#0d0b1a]/45 transition-colors duration-100 group-hover:from-[#1a1530]/95 group-hover:via-[#1a1530]/70" />
        );

        const scanline = (
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />
        );

        if (project.href) {
          return (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClassName}
            >
              {background}
              {overlay}
              {scanline}
              {details}
              <span className="relative z-10">
                <StatusBadge status={project.status} />
              </span>
            </a>
          );
        }

        return (
          <div key={project.name} className={rowClassName}>
            {background}
            {overlay}
            {scanline}
            {details}
            <span className="relative z-10">
              <StatusBadge status={project.status} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

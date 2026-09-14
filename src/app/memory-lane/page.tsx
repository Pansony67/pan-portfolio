// src/app/memory-lane/page.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import SpaceConstellationBackground from "@/components/SpaceConstellationBackground";
import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* Memory Lane - a horizontal constellation-style timeline instead of a
   normal vertical scroll page, per Pan's sketch: polaroid "stars"
   connected by a chain, moving sideways through 2005 -> Kindergarten ->
   Primary -> Secondary -> University (present).

   Two navigation methods, both working at once:
   1. Native horizontal scroll/swipe on the track (overflow-x-auto +
      scroll-snap) - trackpad, mouse wheel with shift, touch swipe.
   2. The two arrow buttons, which just call scrollBy() on the same
      track ref - they do not replace native scrolling, they assist it.

   PLACEHOLDER STATE (frame first, per Pan):
   - No real photos yet - each memory card shows "[ photo coming soon ]"
     placeholders instead of real images. Swap them in once ready.
   - Background is now the real SpaceConstellationBackground (the
     Claude Design canvas algorithm, extracted into its own component -
     see that file for details). Deterministic, seeded art - not a
     placeholder anymore.
   - Years for Kindergarten/Primary/Secondary are unknown, so they show
     "-" rather than a guessed date - fill in the real years later.

   `label` stays the stable English key used to look up
   translations[lang].memoryLane.labels - only the rendered text changes
   with language. `year` stays as-is in both languages. */

type MemoryLabel =
  | "THE BEGINNING"
  | "KINDERGARTEN"
  | "PRIMARY SCHOOL"
  | "HIGH SCHOOL"
  | "UNIVERSITY";

type MemoryNode = {
  year: string;
  label: MemoryLabel;
  /* Optional - once a node has real photos, MemoryCard renders them
     instead of the "[ photo coming soon ]" placeholders. */
  photos?: {
    big: string;
    small: [string, string];
  };
};

/* Widened (non-literal) shape for the translated strings this page
   needs - avoids pinning to either language's exact literal type from
   the `as const` translations object, which the "en" and "th" variants
   are NOT structurally assignable to one another as (each string is a
   distinct literal type per language). */
type MemoryLaneText = {
  heading: string;
  subtitle: string;
  labels: Record<MemoryLabel, string>;
  photoComingSoon: string;
  photo: string;
  previousMemory: string;
  nextMemory: string;
};

const memories: MemoryNode[] = [
  {
    year: "2005 - 2007",
    label: "THE BEGINNING",
    photos: {
      big: "/images/baby-piano.png",
      small: ["/images/baby-lookup.png", "/images/baby-standing.png"],
    },
  },
  {
    year: "2008 - 2010",
    label: "KINDERGARTEN",
    photos: {
      big: "/images/kindergarten-portrait.jpg",
      small: [
        "/images/kindergarten-couch.jpg",
        "/images/kindergarten-toygun.jpg",
      ],
    },
  },
  {
    year: "2011 - 2016",
    label: "PRIMARY SCHOOL",
    photos: {
      big: "/images/primary-classroom.jpg",
      small: ["/images/primary-dog.jpg", "/images/primary-drums.jpg"],
    },
  },
  {
    year: "2017 - 2022",
    label: "HIGH SCHOOL",
    photos: {
      big: "/images/highschool-mortar.jpg",
      small: [
        "/images/highschool-ceremony.jpg",
        "/images/highschool-bench.jpg",
      ],
    },
  },
  {
    year: "2023 - PRESENT",
    label: "UNIVERSITY",
    photos: {
      big: "/images/university-cafe.jpg",
      small: ["/images/university-garden.jpg", "/images/university-tablet.jpg"],
    },
  },
];

function MemoryCard({
  node,
  t,
}: {
  node: MemoryNode;
  t: MemoryLaneText;
}) {
  return (
    <div className="flex w-56 flex-col items-center border-2 border-[#0a0a0c] bg-[#f2ead9] p-2 pb-4 shadow-[6px_6px_0_0_#0a0a0c] sm:w-64">
      <div className="relative flex aspect-video w-full items-center justify-center border-2 border-[#3d3550] bg-[#1a1530]">
        {node.photos ? (
          <Image
            src={node.photos.big}
            alt={t.labels[node.label]}
            fill
            sizes="256px"
            className="object-cover"
          />
        ) : (
          <p className="font-pixel px-3 text-center text-[8px] leading-relaxed text-[#c9bdff]/50">
            {t.photoComingSoon}
          </p>
        )}
      </div>

      <div className="mt-2 grid w-full grid-cols-2 gap-2">
        {node.photos ? (
          node.photos.small.map((src) => (
            <div
              key={src}
              className="relative flex aspect-square items-center justify-center border-2 border-[#3d3550] bg-[#1a1530]"
            >
              <Image
                src={src}
                alt={t.labels[node.label]}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          ))
        ) : (
          <>
            <div className="flex aspect-square items-center justify-center border-2 border-[#3d3550] bg-[#1a1530]">
              <p className="font-pixel px-1 text-center text-[7px] leading-relaxed text-[#c9bdff]/50">
                {t.photo}
              </p>
            </div>
            <div className="flex aspect-square items-center justify-center border-2 border-[#3d3550] bg-[#1a1530]">
              <p className="font-pixel px-1 text-center text-[7px] leading-relaxed text-[#c9bdff]/50">
                {t.photo}
              </p>
            </div>
          </>
        )}
      </div>

      <p className="font-dialogue mt-3 text-center text-lg text-[#1a1530]">
        {t.labels[node.label]}
      </p>
      <p className="font-pixel mt-1 text-center text-[8px] tracking-widest text-[#6b5bd6]">
        {node.year}
      </p>
    </div>
  );
}

function ScrollArrow({
  direction,
  onClick,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#3d3550] bg-[#1a1530]/80 shadow-[4px_4px_0_0_#0a0a0c] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[#6b5bd6] hover:shadow-[2px_2px_0_0_#0a0a0c]"
    >
      <svg viewBox="0 0 12 16" className="h-4 w-4 fill-[#f2ead9]">
        {direction === "left" ? (
          <polygon points="10,2 10,14 2,8" />
        ) : (
          <polygon points="2,2 2,14 10,8" />
        )}
      </svg>
    </button>
  );
}

export default function MemoryLane() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang].memoryLane;

  function scrollByStep(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * 340, behavior: "smooth" });
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0a0c] py-16">
      <SpaceConstellationBackground />

      {/* Light overlay - kept fairly subtle on purpose so the generated
          art actually shows, per Pan's request. Text below leans on its
          own hard text-shadow for contrast instead of a heavy dim. */}
      <div className="absolute inset-0 bg-[#0a0a0c]/25" />

      <div className="relative z-10 px-6 pb-10 text-center sm:px-14">
        <h1 className="font-pixel text-xl text-[#f2ead9] [text-shadow:4px_4px_0_#1a1530] sm:text-3xl">
          {t.heading}
        </h1>
        <p className="font-dialogue mt-4 text-lg text-[#f2ead9] [text-shadow:2px_2px_0_#0a0a0c] sm:text-xl">
          {t.subtitle}
        </p>
      </div>

      <div className="relative z-10 flex flex-1 items-center gap-4 px-4 sm:px-8">
        <ScrollArrow
          direction="left"
          onClick={() => scrollByStep(-1)}
          label={t.previousMemory}
        />

        <div
          ref={trackRef}
          className="scrollbar-hide flex flex-1 snap-x snap-mandatory items-start gap-16 overflow-x-auto px-[10vw] py-10 sm:gap-28"
        >
          {memories.map((node) => (
            <div
              key={node.label}
              className="flex shrink-0 snap-center flex-col items-center"
            >
              <span className="h-3 w-3 shrink-0 rotate-45 border-2 border-[#6b5bd6] bg-[#1a1530]" />
              <div className="mt-6">
                <MemoryCard node={node} t={t} />
              </div>
            </div>
          ))}
        </div>

        <ScrollArrow
          direction="right"
          onClick={() => scrollByStep(1)}
          label={t.nextMemory}
        />
      </div>
    </div>
  );
}

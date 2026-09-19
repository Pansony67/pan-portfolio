// src/app/about/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* About / Character Select page. Sized up per "oversized large" -
   roughly double the padding, gaps, and text sizes of the previous
   medium pass. Two columns under a STATS header: character card, and a
   SWOT self-analysis. A tech stack row sits below listing real skills as
   plain text tags - logos come later once pixel versions of each tool
   icon exist, so this is a placeholder-friendly layout: swap a text-only
   tag for icon+text whenever that's ready.

   SWOT: real self-rated scores out of STAT_MAX (5), not placeholders.
   One `swot` array is the single source of truth - each item's `angle`
   and `labelAnchor` position it on the StatsRadar diamond chart (see
   notebook sketch: Strength top, Weakness right, Threat bottom,
   Opportunity left), while the array order (S, W, O, T) drives the bar
   list below it, which reads in standard SWOT order regardless of where
   each one sits on the diamond.

   `name` stays the stable English key (used for the radar geometry and
   as the lookup key into translations[lang].about.swot) - only the
   rendered label text changes with language, via the `label` prop each
   sub-component now takes. */
type SwotItem = {
  name: "STRENGTH" | "WEAKNESS" | "OPPORTUNITY" | "THREAT";
  value: number;
  angle: number;
  labelAnchor: "start" | "middle" | "end";
};

const STAT_MAX = 5;

const swot: SwotItem[] = [
  { name: "STRENGTH", value: 4.5, angle: -90, labelAnchor: "middle" },
  { name: "WEAKNESS", value: 3.5, angle: 0, labelAnchor: "start" },
  { name: "OPPORTUNITY", value: 4.5, angle: 180, labelAnchor: "end" },
  { name: "THREAT", value: 2.9, angle: 90, labelAnchor: "middle" },
];

function SwotBar({ item, label }: { item: SwotItem; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-pixel text-xs text-[#f2ead9] sm:text-sm">
          {label}
        </p>
        <p className="font-pixel text-[10px] text-[#c9bdff]/70">
          {item.value.toFixed(1)} / {STAT_MAX}
        </p>
      </div>

      <div className="flex gap-1.5">
        {Array.from({ length: STAT_MAX }, (_, i) => i + 1).map((segment) => {
          const fill = Math.min(Math.max(item.value - (segment - 1), 0), 1);
          return (
            <div
              key={segment}
              className="relative h-3 flex-1 border-2 border-[#3d3550] bg-[#0a0a0c]"
            >
              <div
                className="absolute inset-y-0 left-0 bg-[#6b5bd6]"
                style={{ width: `${fill * 100}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* "Stats power" radar - a 4-axis diamond chart matching the notebook
   sketch, sitting above the bar list as an at-a-glance shape. Built from
   straight polygons and square vertex markers rather than curves/
   circles, to keep the hard-edge pixel look used everywhere else on the
   site. Reads straight from the `swot` array above, so the shape and the
   bars can never drift out of sync with each other. */
const RADAR_SIZE = 300;
const RADAR_CENTER = RADAR_SIZE / 2;
const RADAR_MAX_RADIUS = 68;
const RADAR_LABEL_RADIUS = 92;

function radarPoint(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: RADAR_CENTER + radius * Math.cos(rad),
    y: RADAR_CENTER + radius * Math.sin(rad),
  };
}

function StatsRadar({ labels }: { labels: Record<SwotItem["name"], string> }) {
  const dataPoints = swot
    .map((axis) => {
      const r = (axis.value / STAT_MAX) * RADAR_MAX_RADIUS;
      const p = radarPoint(axis.angle, r);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}
      className="mx-auto w-full max-w-[220px] overflow-visible"
    >
      {/* Grid rings - straight-edged diamonds, not circles */}
      {[0.33, 0.66, 1].map((step) => {
        const ring = swot
          .map((axis) => {
            const p = radarPoint(axis.angle, step * RADAR_MAX_RADIUS);
            return `${p.x},${p.y}`;
          })
          .join(" ");
        return (
          <polygon
            key={step}
            points={ring}
            fill="none"
            stroke="#3d3550"
            strokeWidth={1}
          />
        );
      })}

      {/* Axis lines from center out to each label point */}
      {swot.map((axis) => {
        const p = radarPoint(axis.angle, RADAR_MAX_RADIUS);
        return (
          <line
            key={axis.name}
            x1={RADAR_CENTER}
            y1={RADAR_CENTER}
            x2={p.x}
            y2={p.y}
            stroke="#3d3550"
            strokeWidth={1}
          />
        );
      })}

      {/* Data shape */}
      <polygon
        points={dataPoints}
        fill="#6b5bd6"
        fillOpacity={0.35}
        stroke="#6b5bd6"
        strokeWidth={2}
      />

      {/* Vertex markers - small squares, matching the pixel aesthetic */}
      {swot.map((axis) => {
        const r = (axis.value / STAT_MAX) * RADAR_MAX_RADIUS;
        const p = radarPoint(axis.angle, r);
        return (
          <rect
            key={axis.name}
            x={p.x - 3}
            y={p.y - 3}
            width={6}
            height={6}
            fill="#c9bdff"
          />
        );
      })}

      {/* Axis labels */}
      {swot.map((axis) => {
        const p = radarPoint(axis.angle, RADAR_LABEL_RADIUS);
        return (
          <text
            key={axis.name}
            x={p.x}
            y={p.y}
            textAnchor={axis.labelAnchor}
            dominantBaseline="middle"
            fontSize={9}
            className="font-pixel fill-[#c9bdff]"
          >
            {labels[axis.name]}
          </text>
        );
      })}
    </svg>
  );
}

/* Basic character details for the PROFILE box - key order only here,
   the label/value text itself comes from translations[lang].about. */
const PROFILE_FIELDS = ["NAME", "BORN", "INTERESTS", "HOBBIES"] as const;

/* Real tool list - logos not ready yet, name-only tags for now. Kept
   English on purpose (technical terms). */
const techStack = [
  "FRONTEND",
  "BACKEND",
  "FULL STACK DEVELOPER",
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "PYTHON",
  "TYPESCRIPT",
  "RELATIONAL DATABASES",
  "SQL",
  "TABLEAU",
  "KAGGLE",
];

export default function About() {
  const [showReal, setShowReal] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <div className="w-full">
      {/* STATS screen - character card, SWOT radar/bars, tech stack.
          Video background is scoped to just this section (not the whole
          page) so it doesn't get stretched thin if more sections get
          added below it - same reasoning as the home page sections. */}
      <div className="relative min-h-screen w-full overflow-hidden py-12">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/workspace-bg-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-[#0d0b1a]/55" />

        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />

        <div className="relative z-10 border-b-2 border-white/20 px-6 pb-10 text-center sm:px-14">
          <h1 className="font-pixel text-xl text-[#f2ead9] [text-shadow:4px_4px_0_#1a1530] sm:text-3xl">
            {t.heading}
          </h1>
        </div>

        <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 gap-6 px-6 py-12 sm:grid-cols-2 sm:px-14">
          {/* Left: character card */}
          <div className="relative flex flex-col gap-4 border-2 border-[#3d3550] bg-[#1a1530]/80 p-6 shadow-[8px_8px_0_0_#0a0a0c]">
            <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#6b5bd6]" />
            <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-[#6b5bd6]" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#6b5bd6]" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#6b5bd6]" />

            <p className="font-pixel text-[10px] tracking-widest text-[#c9bdff]/70 sm:text-xs">
              &gt; CHARACTER CARD
            </p>

            <div className="relative aspect-[4/5] w-full border-2 border-[#3d3550] bg-[#0a0a0c]">
              {showReal ? (
                <Image
                  src="/images/character-real.png"
                  alt="Pan"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              ) : (
                <Image
                  src="/images/character-pixel.png"
                  alt="Pan, pixel art character"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4 [image-rendering:pixelated]"
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowReal((prev) => !prev)}
              className="font-pixel min-h-10 border-2 border-[#3d3550] bg-[#0a0a0c]/60 px-4 py-2.5 text-[9px] tracking-widest text-[#f2ead9] shadow-[3px_3px_0_0_#0a0a0c] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[#6b5bd6] hover:shadow-[1px_1px_0_0_#0a0a0c] sm:min-h-auto sm:text-xs"
            >
              {showReal ? t.switchToPixel : t.switchToReal}
            </button>
          </div>

          {/* Right: SWOT stats panel */}
          <div className="flex flex-col gap-5 border-2 border-[#3d3550] bg-[#1a1530]/80 p-6 shadow-[8px_8px_0_0_#0a0a0c]">
            <p className="font-pixel text-[10px] tracking-widest text-[#c9bdff]/70 sm:text-xs">
              &gt; PERSONAL CUSTOMIZE
            </p>

            <StatsRadar labels={t.swot} />

            <div className="flex flex-col gap-4">
              {swot.map((item) => (
                <SwotBar key={item.name} item={item} label={t.swot[item.name]} />
              ))}
            </div>
          </div>
        </div>

        {/* Profile - basic character details, sitting between the stats
          columns and the tech stack. */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8 sm:px-14">
          <div className="border-2 border-[#3d3550] bg-[#1a1530]/80 p-6 shadow-[8px_8px_0_0_#0a0a0c]">
            <p className="font-pixel mb-5 text-[10px] tracking-widest text-[#c9bdff]/70 sm:text-xs">
              &gt; PROFILE
            </p>

            <dl className="flex flex-col gap-4">
              {PROFILE_FIELDS.map((field) => (
                <div
                  key={field}
                  className="flex flex-col gap-1.5 sm:flex-row sm:gap-4"
                >
                  <dt className="font-pixel shrink-0 text-[10px] tracking-widest text-[#c9bdff] sm:w-32 sm:text-xs">
                    {t.profileLabels[field]}
                  </dt>
                  <dd className="font-dialogue text-base text-[#f2ead9] sm:text-lg">
                    {t.profileValues[field]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Tech stack - real skill list, name-only tags until pixel logos
          are ready. */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-12 sm:px-14">
          <div className="border-2 border-[#3d3550] bg-[#1a1530]/80 p-6 shadow-[8px_8px_0_0_#0a0a0c]">
            <p className="font-pixel mb-5 text-[10px] tracking-widest text-[#c9bdff]/70 sm:text-xs">
              &gt; TECH STACK
            </p>

            <div className="flex flex-wrap gap-3">
              {techStack.map((tool) => (
                <span
                  key={tool}
                  className="font-pixel border-2 border-[#3d3550] bg-[#0a0a0c]/60 px-3 py-2 text-[10px] tracking-widest text-[#f2ead9] shadow-[2px_2px_0_0_#0a0a0c] sm:text-xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ORIGINAL SHEET - entry point into the cutscene that tells the
          Past -> Present -> Next story (not built yet, separate step).
          The nostalgia-realm loop plays behind it. Button click has no
          real handler yet; wire it to open the cutscene once that
          component exists. */}
      <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 overflow-hidden border-t-2 border-white/20 bg-[#0a0a0c] px-6 py-16 text-center">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/nostalgia-realm-bg-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-[#0d0b1a]/55" />

        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)] opacity-60" />

        <p className="font-pixel relative z-10 text-[10px] tracking-widest text-[#c9bdff] [text-shadow:2px_2px_0_#0a0a0c] sm:text-xs">
          &gt; ORIGINAL SHEET
        </p>

        <button
          type="button"
          onClick={() => {
            /* TODO: open the cutscene popup once that component exists */
          }}
          className="font-pixel relative z-10 border-2 border-[#3d3550] bg-[#1a1530]/80 px-8 py-5 text-sm tracking-widest text-[#f2ead9] shadow-[6px_6px_0_0_#0a0a0c] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[#6b5bd6] hover:shadow-[3px_3px_0_0_#0a0a0c] sm:text-base"
        >
          {t.ogSheet}
        </button>
      </div>
    </div>
  );
}

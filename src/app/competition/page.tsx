// src/app/competition/page.tsx
"use client";

import type { ReactNode } from "react";

import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

/* Quest Log / Competition page
   Visual direction:
   - polished retro-futuristic RPG HUD
   - dark purple neon atmosphere
   - pixel framing, thin glowing borders, subtle CRT scanlines
   - keeps the existing quest content and statuses unchanged

   `category.id` and `quest.note` stay stable English keys used to look
   up translations[lang].competition.categories / .questNotes - only the
   rendered text changes with language. Quest `name` and `status` stay
   English in both languages (official titles / game-HUD status words).
*/

type QuestStatus = "ENTERED" | "COMPLETE" | "PLANNED";

type CategoryId =
  | "boss-battles"
  | "completed-quests"
  | "planned-quests"
  | "side-quests";

type Quest = {
  name: string;
  note?: string;
  status: QuestStatus;
  logo?: string;
};

type QuestCategory = {
  id: CategoryId;
  accentColor: string;
  icon: "sword" | "check" | "clock" | "diamond";
  quests: Quest[];
};

const categories: QuestCategory[] = [
  {
    id: "boss-battles",
    accentColor: "#ffb12f",
    icon: "sword",
    quests: [
      {
        name: "HSBC Case Competition",
        status: "ENTERED",
        logo: "/images/hsbc.png",
      },
      {
        name: "Kunna Case Competition",
        note: "Workshop format with a case round",
        status: "ENTERED",
        logo: "/images/kunna.png",
      },
      {
        name: "L'Oreal Case Competition",
        note: "Entered twice",
        status: "ENTERED",
        logo: "/images/loreal.png",
      },
      {
        name: "Botnoi Case Competition",
        note: "Workshop format",
        status: "ENTERED",
        logo: "/images/botnoi-group.png",
      },
      {
        name: "Singha Case Competition",
        note: "Workshop format",
        status: "ENTERED",
        logo: "/images/singha.png",
      },
      {
        name: "Google Ads Case Competition",
        note: "Workshop format",
        status: "ENTERED",
        logo: "/images/google-ads.png",
      },
      {
        name: "BIDH Case Competition",
        note: "Workshop format",
        status: "ENTERED",
        logo: "/images/bidh.png",
      },
      {
        name: "Meka Case Competition",
        note: "Workshop format",
        status: "ENTERED",
        logo: "/images/meka.png",
      },
      {
        name: "Gree Case Competition",
        note: "Workshop format",
        status: "ENTERED",
        logo: "/images/gree.png",
      },
    ],
  },
  {
    id: "completed-quests",
    accentColor: "#50f38d",
    icon: "check",
    quests: [
      {
        name: "Google Data Analytics Professional Certificate",
        note: "Coursera",
        status: "COMPLETE",
      },
      {
        name: "freeCodeCamp - Back End Development",
        note: "Certificate recovered",
        status: "COMPLETE",
      },
      {
        name: "freeCodeCamp - Full Stack",
        note: "Certificate recovered",
        status: "COMPLETE",
      },
    ],
  },
  {
    id: "planned-quests",
    accentColor: "#ffbd36",
    icon: "clock",
    quests: [
      {
        name: "Google Analytics 4 (GA4) Certification",
        note: "Exam planned",
        status: "PLANNED",
      },
      {
        name: "Google Advanced Data Analytics Certificate",
        note: "Not started",
        status: "PLANNED",
      },
      {
        name: "Gemini Certification",
        note: "Expected late this year",
        status: "PLANNED",
      },
    ],
  },
  {
    id: "side-quests",
    accentColor: "#63b5ff",
    icon: "diamond",
    quests: [
      {
        name: "Toyota Digital Transformation Workshop",
        note: "2025",
        status: "COMPLETE",
      },
      {
        name: "Change Management for Generative AI",
        note: "Vanderbilt University, via Coursera",
        status: "COMPLETE",
      },
    ],
  },
];

const STATUS_STYLES: Record<
  QuestStatus,
  { border: string; text: string; fill: string; glow: string }
> = {
  ENTERED: {
    border: "#9c7cff",
    text: "#d7c9ff",
    fill: "#251b46",
    glow: "rgba(156,124,255,.26)",
  },
  COMPLETE: {
    border: "#50f38d",
    text: "#6affaa",
    fill: "#0f2b20",
    glow: "rgba(80,243,141,.24)",
  },
  PLANNED: {
    border: "#ffbd36",
    text: "#ffd66d",
    fill: "#342514",
    glow: "rgba(255,189,54,.24)",
  },
};

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="5" y="0" width="2" height="12" />
      <rect x="0" y="5" width="12" height="2" />
    </svg>
  );
}

function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 16"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2.5h5.5c1.1 0 2 .9 2 2v9c-.7-.7-1.5-1-2.6-1H2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M18 2.5h-5.5c-1.1 0-2 .9-2 2v9c.7-.7 1.5-1 2.6-1H18z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10 4v9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SwordIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.9 1H16v4.1l-2.1-2.1-7 7-1.8-1.8 7-7z" />
      <path d="M4.8 9.8 2.6 12 4 13.4l2.2-2.2zM1.5 16.5H5V13z" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="15"
        height="15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m5 9.3 2.2 2.2 5.8-5.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 5v4l2.8 1.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DiamondIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path d="M9 2 15 9l-6 7-6-7z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m6.2 9 2.8 3 2.8-3L9 5z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function MedalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 20"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 1h4v6H3zM11 1h4v6h-4z" fill="currentColor" opacity=".35" />
      <circle cx="9" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m9 9.6 1 2 2.2.3-1.6 1.5.4 2.1L9 14.4l-2 1.1.4-2.1-1.6-1.5 2.2-.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function DocumentIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 20"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 1.5h8l4 4v13H3z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 1.5v4h4M5.5 9h7M5.5 12h7M5.5 15h4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CategoryIcon({
  icon,
  className = "",
}: {
  icon: QuestCategory["icon"];
  className?: string;
}) {
  if (icon === "sword") return <SwordIcon className={className} />;
  if (icon === "check") return <CheckIcon className={className} />;
  if (icon === "clock") return <ClockIcon className={className} />;
  return <DiamondIcon className={className} />;
}

function StatusBadge({ status }: { status: QuestStatus }) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className="inline-flex h-7 items-center gap-2 border px-2.5 font-pixel text-[8px] tracking-[0.12em] sm:text-[9px]"
      style={{
        borderColor: style.border,
        color: style.text,
        backgroundColor: style.fill,
        boxShadow: `0 0 14px ${style.glow}`,
      }}
    >
      <span className="h-1.5 w-1.5" style={{ backgroundColor: style.border }} />
      {status}
    </span>
  );
}

function CornerFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-[#8067df]" />
      <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-[#8067df]" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-[#8067df]" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#8067df]" />
      {children}
    </div>
  );
}

function QuestCard({
  quest,
  category,
  noteText,
}: {
  quest: Quest;
  category: QuestCategory;
  noteText: string | null;
}) {
  return (
    <article
      className="group relative min-h-[118px] border bg-[#151126]/90 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-[#1b1631]"
      style={{
        borderColor: `${category.accentColor}80`,
        boxShadow: `inset 0 0 28px rgba(107,91,214,.06), 5px 5px 0 rgba(8,6,16,.75)`,
      }}
    >
      <span
        className="absolute left-0 top-0 h-[2px] w-14"
        style={{ backgroundColor: category.accentColor }}
      />
      <span
        className="absolute bottom-0 right-0 h-[2px] w-16"
        style={{ backgroundColor: category.accentColor }}
      />

      <div className="flex h-full items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center border"
          style={{
            borderColor: category.accentColor,
            color: category.accentColor,
            background: `linear-gradient(180deg, ${category.accentColor}1c, rgba(11,8,20,.25))`,
            boxShadow: `0 0 18px ${category.accentColor}18`,
          }}
        >
          {quest.logo ? (
            <img
              src={quest.logo}
              alt=""
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              draggable={false}
            />
          ) : category.icon === "check" ? (
            <MedalIcon className="h-6 w-6" />
          ) : category.icon === "clock" ? (
            <MedalIcon className="h-6 w-6" />
          ) : (
            <DocumentIcon className="h-6 w-6" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-dialogue text-[15px] leading-snug text-[#f6f0df] sm:text-base">
              {quest.name}
            </p>
            <div className="hidden shrink-0 sm:block">
              <StatusBadge status={quest.status} />
            </div>
          </div>

          {noteText ? (
            <p className="font-dialogue text-[12px] leading-relaxed text-[#c9a9ff] [text-shadow:0_0_8px_rgba(156,124,255,0.6)] sm:text-[13px]">
              {noteText}
            </p>
          ) : null}

          <div className="mt-auto pt-1 sm:hidden">
            <StatusBadge status={quest.status} />
          </div>
        </div>
      </div>
    </article>
  );
}

function CategoryHeader({
  category,
  label,
}: {
  category: QuestCategory;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center border"
        style={{
          color: category.accentColor,
          borderColor: `${category.accentColor}aa`,
          backgroundColor: `${category.accentColor}0f`,
          boxShadow: `0 0 16px ${category.accentColor}15`,
        }}
      >
        <CategoryIcon icon={category.icon} className="h-5 w-5" />
      </div>

      <p
        className="font-pixel whitespace-nowrap text-[11px] tracking-[0.14em] sm:text-xs"
        style={{ color: category.accentColor }}
      >
        {label}
      </p>

      <div
        className="flex min-w-0 flex-1 items-center gap-2"
        style={{ color: category.accentColor }}
      >
        <span
          className="h-px flex-1 opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${category.accentColor} 0 5px, transparent 5px 10px)`,
          }}
        />
        <span
          className="h-2 w-2 rotate-45 border"
          style={{ borderColor: category.accentColor }}
        />
        <span
          className="hidden h-px flex-1 opacity-25 sm:block"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${category.accentColor} 0 5px, transparent 5px 10px)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Competition() {
  const { lang } = useLanguage();
  const t = translations[lang].competition;

  const totalQuests = categories.reduce((sum, c) => sum + c.quests.length, 0);
  const completedQuests = categories.reduce(
    (sum, c) => sum + c.quests.filter((q) => q.status === "COMPLETE").length,
    0,
  );
  const progressPercent = Math.round((completedQuests / totalQuests) * 100);

  return (
    <main className="relative isolate w-full overflow-hidden bg-[#080612] text-[#f2ead9]">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        src="/videos/trophy-room-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(92,63,173,.28),transparent_42%),linear-gradient(180deg,rgba(7,5,16,.32),rgba(8,6,18,.96)_82%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,.22)_0px,rgba(0,0,0,.22)_1px,transparent_1px,transparent_4px)] opacity-55" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0813]/80 to-transparent" />

      <div className="relative mx-auto max-w-[1500px] px-3 py-4 sm:px-5 sm:py-6">
        <CornerFrame>
          <section className="relative overflow-hidden border border-[#4b3b77]/75 bg-[#0d0a1a]/72 backdrop-blur-[2px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(122,88,255,.16),transparent_35%)]" />

            <div className="relative border-b border-[#53457a]/70 px-5 pb-8 pt-7 text-center sm:px-10 sm:pb-9 sm:pt-9">
              <div className="mb-3 flex items-center justify-center gap-3 text-[#b8a7ff]">
                <SparkleIcon className="h-2.5 w-2.5 opacity-80" />
                <BookIcon className="h-7 w-9 drop-shadow-[0_0_8px_rgba(170,145,255,.3)]" />
                <SparkleIcon className="h-2.5 w-2.5 opacity-80" />
              </div>

              <h1 className="font-pixel text-2xl tracking-[0.13em] text-[#fbf6e9] [text-shadow:3px_3px_0_#2b1c50,0_0_18px_rgba(160,130,255,.2)] sm:text-4xl">
                {t.heading}
              </h1>

              <div className="mx-auto mt-4 flex max-w-2xl items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#6e59a9] to-transparent" />
                <p className="font-dialogue text-xs text-[#c9c0e2]/85 sm:text-sm">
                  {t.tagline}
                </p>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#6e59a9] to-transparent" />
              </div>
            </div>

            <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
              <div className="space-y-10 sm:space-y-12">
                {categories.map((category) => (
                  <section key={category.id} className="space-y-4 sm:space-y-5">
                    <CategoryHeader
                      category={category}
                      label={t.categories[category.id]}
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {category.quests.map((quest) => (
                        <QuestCard
                          key={quest.name}
                          quest={quest}
                          category={category}
                          noteText={
                            quest.note
                              ? t.questNotes[
                                  quest.note as keyof typeof t.questNotes
                                ]
                              : null
                          }
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <div className="relative border-t border-[#493b69]/65 px-4 py-5 sm:px-8 sm:py-6">
              <div className="mx-auto flex max-w-2xl items-center gap-3 border border-[#4d3c75] bg-[#120e20]/95 px-4 py-3 shadow-[5px_5px_0_rgba(6,4,12,.8)] sm:gap-4 sm:px-5">
                <SparkleIcon className="h-3 w-3 shrink-0 text-[#ffbd36]" />
                <span className="font-pixel whitespace-nowrap text-[8px] tracking-[0.12em] text-[#f2ead9] sm:text-[9px]">
                  {t.yourProgress}
                </span>

                <div className="h-3 flex-1 border border-[#3a2f59] bg-[#090711] p-[2px] sm:h-4">
                  <div
                    className="h-full bg-gradient-to-r from-[#6444b8] via-[#8462ea] to-[#9f82ff] shadow-[0_0_10px_rgba(132,98,234,.4)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <span className="font-pixel min-w-[32px] text-right text-[9px] text-[#cbbdff] sm:text-[10px]">
                  {progressPercent}%
                </span>
              </div>
            </div>
          </section>
        </CornerFrame>
      </div>
    </main>
  );
}

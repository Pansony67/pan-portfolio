// src/components/BootGreeting.tsx

"use client";

import Image from "next/image";
import { useEffect, useReducer, useRef } from "react";
import { DIALOGUE_STEPS } from "@/data/dialogue";
import { useLanguage } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";

const TYPE_SPEED_MS = 28;

// --- Character placement inside the room -------------------------------
// Measured against the background art (1672x941). Tweak these three numbers
// if the character doesn't sit exactly where you want on the floor.
// NOT touched in this edit, per Pan's instruction - only the image src and
// its own width/height (the aspect-ratio metadata, not the on-screen size)
// changed below.
const CHAR_CENTER_X = "49.2%"; // horizontal center of the character
const CHAR_FLOOR_Y = "15%"; // distance from the bottom of the room to his feet
const CHAR_WIDTH = "24%"; // character width as a share of the room width
// -----------------------------------------------------------------------

// How dark the room gets once dialogue starts (0 = no dim, 1 = fully black).
// The standing character and room stay visible underneath, just darkened,
// so focus shifts onto the textbox instead of hiding him.
const DIALOGUE_DIM_OPACITY = 0.55;

type State = {
  phase: "standing" | "dialogue";
  stepIndex: number;
  charIndex: number;
};

type Action =
  | { type: "START" }
  | { type: "TICK" }
  | { type: "COMPLETE_LINE" }
  | { type: "ADVANCE" };

function makeReducer(stepTextLengths: number[], stepCount: number) {
  return function reducer(state: State, action: Action): State {
    if (action.type === "START") {
      return { phase: "dialogue", stepIndex: 0, charIndex: 0 };
    }

    if (state.phase === "standing") return state;

    const textLength = stepTextLengths[state.stepIndex];

    switch (action.type) {
      case "TICK": {
        if (state.charIndex >= textLength) return state;
        return { ...state, charIndex: state.charIndex + 1 };
      }

      case "COMPLETE_LINE": {
        if (state.charIndex >= textLength) return state;
        return { ...state, charIndex: textLength };
      }

      case "ADVANCE": {
        if (state.stepIndex >= stepCount - 1) return state;
        return { ...state, stepIndex: state.stepIndex + 1, charIndex: 0 };
      }
    }
  };
}

export default function BootGreeting({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { lang } = useLanguage();
  const t = translations[lang].bootGreeting;

  const steps = DIALOGUE_STEPS.map((step) => ({
    ...step,
    text: t.dialogue[step.id],
  }));
  const stepTextLengths = steps.map((step) => step.text.length);

  const [state, dispatch] = useReducer(
    makeReducer(stepTextLengths, steps.length),
    {
      phase: "standing",
      stepIndex: 0,
      charIndex: 0,
    },
  );

  // A pool of Audio elements for the blip, rotated round-robin. Typing
  // fires a lot faster than one short clip takes to play out, so reusing
  // a single Audio element cuts itself off every time - cycling through a
  // few instances lets consecutive blips overlap cleanly instead.
  const BLIP_POOL_SIZE = 4;
  const blipPoolRef = useRef<HTMLAudioElement[]>([]);
  const blipCursorRef = useRef(0);

  useEffect(() => {
    blipPoolRef.current = Array.from({ length: BLIP_POOL_SIZE }, () => {
      const audio = new Audio("/sounds/text-blip.mp3");
      audio.volume = 0.34;
      return audio;
    });
  }, []);

  const step = steps[state.stepIndex];
  const isTyping = state.charIndex < step.text.length;
  const isLastLine = state.stepIndex === steps.length - 1;

  useEffect(() => {
    if (state.phase !== "dialogue") return;
    const id = setInterval(() => dispatch({ type: "TICK" }), TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [state.phase, state.stepIndex]);

  // Play a short blip on every new character revealed (skip spaces, skip
  // the reset back to 0 at the start of a line).
  useEffect(() => {
    if (state.phase !== "dialogue" || state.charIndex === 0) return;
    const justRevealed = steps[state.stepIndex].text[state.charIndex - 1];
    if (justRevealed && justRevealed !== " ") {
      const pool = blipPoolRef.current;
      if (pool.length > 0) {
        const audio = pool[blipCursorRef.current];
        blipCursorRef.current = (blipCursorRef.current + 1) % pool.length;
        audio.currentTime = 0;
        audio
          .play()
          .catch((err) => console.error("blip playback failed:", err));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.charIndex, state.phase]);

  function handleAdvance() {
    if (state.phase === "standing") {
      dispatch({ type: "START" });
      return;
    }

    if (isTyping) {
      dispatch({ type: "COMPLETE_LINE" });
      return;
    }

    if (isLastLine) {
      onComplete();
      return;
    }

    dispatch({ type: "ADVANCE" });
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleAdvance();
      } else if (e.key === "Escape") {
        onComplete();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.stepIndex, state.charIndex]);

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-hidden bg-black"
      onClick={handleAdvance}
    >
      {/* The stage locks to the same 16:9 frame as the room art, so the
          character always lines up with the floor no matter the window size. */}
      <div className="relative aspect-video min-h-full min-w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/space-apartment-bg-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div
          className="pixel-idle absolute"
          style={{
            left: CHAR_CENTER_X,
            bottom: CHAR_FLOOR_Y,
            width: CHAR_WIDTH,
            transform: "translateX(-50%)",
          }}
        >
          <Image
            src="/images/Pan-original.png"
            alt=""
            width={1024}
            height={1536}
            className="h-auto w-full [image-rendering:pixelated]"
            priority
          />
        </div>

        {/* Focus dim: fades the room + standing character down (not away)
            once dialogue starts, like a spotlight settling on the textbox. */}
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-black transition-opacity duration-500"
          style={{
            opacity: state.phase === "dialogue" ? DIALOGUE_DIM_OPACITY : 0,
          }}
        />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="font-pixel absolute right-6 top-6 z-20 rounded px-3 py-2 text-[10px] text-white/60 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {t.skip}
      </button>

      {state.phase === "standing" ? (
        <p className="font-pixel absolute bottom-16 left-1/2 z-20 -translate-x-1/2 animate-pulse text-[10px] text-white/70">
          {t.clickToStart}
        </p>
      ) : (
        <div className="absolute bottom-0 left-1/2 z-20 flex w-full max-w-4xl -translate-x-1/2 flex-col items-end px-6 pb-12">
          <div className="relative mr-4 -mb-12 w-56 sm:mr-8 sm:w-72">
            <Image
              key={step.id}
              src={step.pose}
              alt=""
              width={1034}
              height={1000}
              sizes="(min-width: 640px) 224px, 192px"
              style={{ height: "auto" }}
              className="w-full [image-rendering:pixelated]"
              priority
            />
          </div>

          <div
            className="relative flex w-[80%] items-start justify-center bg-contain bg-center bg-no-repeat bg-[#1a1530] px-7 py-9"
            style={{
              backgroundImage: "url(/images/dialogue-textbox.png)",
              aspectRatio: "1627 / 680",
            }}
          >
            <p className="font-dialogue min-h-[3lh] w-full text-center text-xl leading-relaxed text-white sm:text-4xl">
              {step.text.slice(0, state.charIndex)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

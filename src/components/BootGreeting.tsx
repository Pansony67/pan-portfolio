// src/components/BootGreeting.tsx
"use client";

import Image from "next/image";
import { useEffect, useReducer } from "react";
import { DIALOGUE } from "@/data/dialogue";

const TYPE_SPEED_MS = 28;

type State = { stepIndex: number; charIndex: number };
type Action = { type: "TICK" } | { type: "COMPLETE_LINE" } | { type: "ADVANCE" };

function reducer(state: State, action: Action): State {
  const text = DIALOGUE[state.stepIndex].text;
  switch (action.type) {
    case "TICK": {
      if (state.charIndex >= text.length) return state;
      return { ...state, charIndex: state.charIndex + 1 };
    }
    case "COMPLETE_LINE": {
      if (state.charIndex >= text.length) return state;
      return { ...state, charIndex: text.length };
    }
    case "ADVANCE": {
      if (state.stepIndex >= DIALOGUE.length - 1) return state;
      return { stepIndex: state.stepIndex + 1, charIndex: 0 };
    }
  }
}

export default function BootGreeting({ onComplete }: { onComplete: () => void }) {
  const [state, dispatch] = useReducer(reducer, { stepIndex: 0, charIndex: 0 });
  const step = DIALOGUE[state.stepIndex];
  const isTyping = state.charIndex < step.text.length;
  const isLastLine = state.stepIndex === DIALOGUE.length - 1;

  // typewriter tick — restarts automatically whenever the line changes,
  // since the interval is torn down/recreated on stepIndex change.
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "TICK" }), TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [state.stepIndex]);

  function handleAdvance() {
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

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-end overflow-hidden bg-black"
      onClick={handleAdvance}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/space-apartment-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="font-pixel absolute right-6 top-6 z-10 text-[10px] text-white/60 hover:text-white"
      >
        SKIP &gt;&gt;
      </button>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 pb-10">
        <div className="relative -mb-16 w-56 sm:w-64">
          <Image
            key={step.id}
            src={step.pose}
            alt=""
            width={1034}
            height={946}
            style={{ height: "auto" }}
            className="w-full [image-rendering:pixelated]"
            priority
          />
        </div>

        <div
          className="relative flex w-full items-start justify-center bg-contain bg-center bg-no-repeat px-12 py-10"
          style={{
            backgroundImage: "url(/images/dialogue-textbox.png)",
            aspectRatio: "1657 / 710",
          }}
        >
          <p className="font-dialogue min-h-[3lh] w-full text-center text-lg leading-snug text-white sm:text-xl">
            {step.text.slice(0, state.charIndex)}
          </p>
        </div>
      </div>
    </div>
  );
}
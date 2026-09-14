// src/components/SectorTransition.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/* Black gap between the Title Screen (surface) and the sections below
   (underground), dressed as an elevator shaft: guide rails, hoist
   cables, pixel dust falling through, and a depth readout that counts
   down as you scroll past it.

   The shaft is a narrow centered column rather than pinned to the screen
   edges - a shaft reads as a shaft because it is narrow enough to see
   both walls at once.

   The depth counter needs scroll position, so this is a client
   component. The readout snaps in steps of DEPTH_STEP rather than
   counting every single metre, which keeps it feeling like a chunky
   mechanical gauge instead of a smooth web animation.

   The keyframes live in a scoped <style> tag rather than globals.css
   because they are only ever used here. Send me globals.css if you would
   rather keep every keyframe together with the existing ones.

   ADJUST HERE
   SHAFT_HEIGHT - how long the descent feels
   SHAFT_WIDTH  - how wide the shaft column is
   MAX_DEPTH    - the number the counter reaches at the bottom
   DEPTH_STEP   - how coarsely the number ticks */
const SHAFT_HEIGHT = "h-[42vh]";
const SHAFT_WIDTH = "w-full max-w-[520px]";
const MAX_DEPTH = 240;
const DEPTH_STEP = 5;

/* left % within the shaft column, duration, delay, size in px */
const dustMotes = [
  { id: "d1", left: "8%", duration: "2.8s", delay: "0s", size: 3 },
  { id: "d2", left: "17%", duration: "3.6s", delay: "0.7s", size: 2 },
  { id: "d3", left: "26%", duration: "3.1s", delay: "1.6s", size: 2 },
  { id: "d4", left: "34%", duration: "4.0s", delay: "0.3s", size: 3 },
  { id: "d5", left: "43%", duration: "3.3s", delay: "2.1s", size: 2 },
  { id: "d6", left: "52%", duration: "2.9s", delay: "1.1s", size: 3 },
  { id: "d7", left: "61%", duration: "3.8s", delay: "0.5s", size: 2 },
  { id: "d8", left: "69%", duration: "3.4s", delay: "2.6s", size: 2 },
  { id: "d9", left: "78%", duration: "4.2s", delay: "1.4s", size: 3 },
  { id: "d10", left: "87%", duration: "3.0s", delay: "0.9s", size: 2 },
  { id: "d11", left: "94%", duration: "3.7s", delay: "2.3s", size: 2 },
];

export default function SectorTransition() {
  const shaftRef = useRef<HTMLDivElement | null>(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    let frame = 0;

    const readDepth = () => {
      frame = 0;

      const el = shaftRef.current;
      if (!el) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;

      /* 0 when the shaft's top edge is level with the bottom of the
         viewport, 1 once its bottom edge has passed the top. */
      const raw = (window.innerHeight - rect.top) / travel;
      const progress = Math.min(Math.max(raw, 0), 1);

      const stepped =
        Math.round((progress * MAX_DEPTH) / DEPTH_STEP) * DEPTH_STEP;

      setDepth(stepped);
    };

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(readDepth);
      }
    };

    readDepth();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={shaftRef}
      className={`relative flex w-full items-stretch justify-center overflow-hidden bg-[#0a0a0c] ${SHAFT_HEIGHT}`}
    >
      <style>{`
        @keyframes shaft-dust-fall {
          0%   { transform: translateY(-12%); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(460%); opacity: 0; }
        }
      `}</style>

      <div className={`relative ${SHAFT_WIDTH}`}>
        {/* Shaft interior - very slightly lifted off pure black so the
            walls read as walls rather than as empty page background. */}
        <div className="absolute inset-0 bg-[#0d0b1a]/60" />

        {/* Guide rails, hugging the inside of both shaft walls. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[14px] bg-[#1a1530] bg-[repeating-linear-gradient(0deg,#3d3550_0px,#3d3550_4px,transparent_4px,transparent_18px)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[14px] bg-[#1a1530] bg-[repeating-linear-gradient(0deg,#3d3550_0px,#3d3550_4px,transparent_4px,transparent_18px)]" />

        {/* Hoist cables, set just inside the rails. */}
        <div className="pointer-events-none absolute inset-y-0 left-[30px] w-[2px] bg-[#3d3550]" />
        <div className="pointer-events-none absolute inset-y-0 right-[30px] w-[2px] bg-[#3d3550]" />

        {/* Dust and grit drifting down the shaft. steps() keeps the fall
            chunky rather than glassy-smooth, matching the pixel theme. */}
        {dustMotes.map((mote) => (
          <span
            key={mote.id}
            className="pointer-events-none absolute top-0 bg-[#c9bdff]/60"
            style={{
              left: mote.left,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animation: `shaft-dust-fall ${mote.duration} steps(20, end) ${mote.delay} infinite`,
            }}
          />
        ))}

        {/* Depth gauge, riding in the middle of the shaft. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-pixel text-[10px] tracking-[0.3em] text-[#c9bdff] [text-shadow:2px_2px_0_#0a0a0c] sm:text-xs">
            DEPTH {depth === 0 ? "-0" : `-${depth}`}m
          </p>
        </div>

        {/* Shadow pooling against both walls, so the shaft has depth. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.85)_0%,transparent_32%,transparent_68%,rgba(0,0,0,0.85)_100%)]" />
      </div>
    </div>
  );
}

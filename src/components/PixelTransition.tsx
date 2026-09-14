// src/components/PixelTransition.tsx
"use client";

import { useEffect, useMemo } from "react";

/* ---------------------------------------------------------------------------
   ADJUST HERE
   COLS / ROWS  - grid density. More tiles = finer/slower wipe.
   STAGGER_MS   - delay added per tile based on distance from the top-left
                  corner. Higher = more visible diagonal sweep.
   TILE_MS      - how long each individual tile takes to flip.
   TILE_COLOR   - color of the covering tiles (matches site UI chrome).
--------------------------------------------------------------------------- */
const COLS = 14;
const ROWS = 9;
const STAGGER_MS = 10;
const TILE_MS = 200;
const TILE_COLOR = "#1a1530";

type Props = {
  // "cover": tiles appear, sweeping in to hide whatever's on screen.
  // "reveal": tiles disappear, sweeping out to show what's underneath.
  mode: "cover" | "reveal";
  onDone: () => void;
};

export default function PixelTransition({ mode, onDone }: Props) {
  const totalMs = useMemo(() => {
    const maxDist = Math.hypot(COLS - 1, ROWS - 1);
    return Math.round(maxDist * STAGGER_MS + TILE_MS);
  }, []);

  useEffect(() => {
    const id = setTimeout(onDone, totalMs);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalMs]);

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const delay = Math.hypot(c, r) * STAGGER_MS;
      tiles.push(
        <div
          key={`${r}-${c}`}
          className={
            mode === "cover" ? "pixel-tile-cover" : "pixel-tile-reveal"
          }
          style={{ animationDelay: `${delay}ms`, backgroundColor: TILE_COLOR }}
        />,
      );
    }
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] grid"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {tiles}
    </div>
  );
}

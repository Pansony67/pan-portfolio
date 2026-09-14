// src/components/SpaceConstellationBackground.tsx
"use client";

import { useEffect, useRef } from "react";

/* Space constellation background for Memory Lane - the drawing algorithm
   from the Claude Design export, extracted out of its bundler wrapper
   (DCLogic/x-dc/script-tag scaffolding that only exists inside Claude
   Design's own preview) and rewritten as a plain client component.

   Renders once per prop change onto a canvas at GRID_W*SCALE x
   GRID_H*SCALE (1792x1024, same generation size used for every other
   background on the site), nearest-neighbor scaled up from a 448x256
   pixel grid for a crisp, hard-edged look.

   The randomness is seeded (mulberry(20260905)), so a given set of
   props always produces the exact same image - this is deterministic
   generative art, not a live animation, and not randomized per visit.

   ADJUST HERE (also exposed as component props, see bottom of file)
   nebulaIntensity, starDensity, showConstellation, horizonGlow */

const GRID_W = 448;
const GRID_H = 256;
const SCALE = 4;

const B8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];
const dith = (x: number, y: number) => B8[y & 7][x & 7] / 64;

function hex(h: string): [number, number, number] {
  return [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
}

const NEB = [
  "#15102a",
  "#181230",
  "#1b1438",
  "#201741",
  "#261c4c",
  "#2d2159",
  "#352868",
  "#3f307c",
  "#4b3a94",
  "#5947b4",
  "#6b5bd6",
  "#8163c8",
  "#9a6cae",
].map(hex);
const AMBER = hex("#f2b134");
const AMBER_DIM = hex("#8f6634");
const CREAM = hex("#f2ead9");
const CREAM_DIM = hex("#8d85a0");
const VIOLET = hex("#6b5bd6");
const VIOLET_DIM = hex("#3f3577");
const ROSE = hex("#c47f8f");

function hash2(x: number, y: number, s: number) {
  let n = (x | 0) * 374761393 + (y | 0) * 668265263 + (s | 0) * 1442695041;
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}
const smoothStep = (t: number) => t * t * (3 - 2 * t);
function vnoise(x: number, y: number, s: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smoothStep(x - xi);
  const yf = smoothStep(y - yi);
  const a = hash2(xi, yi, s);
  const b = hash2(xi + 1, yi, s);
  const c = hash2(xi, yi + 1, s);
  const d = hash2(xi + 1, yi + 1, s);
  return (a * (1 - xf) + b * xf) * (1 - yf) + (c * (1 - xf) + d * xf) * yf;
}
function fbm(x: number, y: number, s: number, oct?: number) {
  let v = 0;
  let amp = 0.5;
  let f = 1;
  for (let i = 0; i < (oct || 4); i++) {
    v += amp * vnoise(x * f, y * f, s + i * 17);
    amp *= 0.5;
    f *= 2.03;
  }
  return v;
}
function mulberry(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type PaintProps = {
  nebulaIntensity: number;
  starDensity: number;
  showConstellation: boolean;
  horizonGlow: boolean;
};

function paint(canvas: HTMLCanvasElement, props: PaintProps) {
  const W = GRID_W;
  const H = GRID_H;
  const px = new Uint8ClampedArray(W * H * 4);
  const inb = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < H;
  const set = (x: number, y: number, c: number[]) => {
    if (!inb(x, y)) return;
    const i = (y * W + x) * 4;
    px[i] = c[0];
    px[i + 1] = c[1];
    px[i + 2] = c[2];
    px[i + 3] = 255;
  };
  const blend = (x: number, y: number, c: number[], a: number) => {
    if (!inb(x, y)) return;
    const i = (y * W + x) * 4;
    px[i] = px[i] * (1 - a) + c[0] * a;
    px[i + 1] = px[i + 1] * (1 - a) + c[1] * a;
    px[i + 2] = px[i + 2] * (1 - a) + c[2] * a;
  };
  const glow = (
    cxp: number,
    cyp: number,
    rad: number,
    amt: number,
    c: number[],
  ) => {
    const r = Math.ceil(rad);
    for (let y = cyp - r; y <= cyp + r; y++) {
      for (let x = cxp - r; x <= cxp + r; x++) {
        const dx = x - cxp;
        const dy = y - cyp;
        const dd = Math.sqrt(dx * dx + dy * dy);
        if (dd > rad) continue;
        const g = amt * Math.exp(-Math.pow(dd / (rad * 0.55), 2));
        if (dith(x, y) < g) blend(x, y, c, Math.min(0.85, g * 0.9));
      }
    }
  };

  const nebI = props.nebulaIntensity;
  const starD = props.starDensity;
  const showC = props.showConstellation;
  const horizon = props.horizonGlow;

  const dArr = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const u = x / W;
      const v = y / H;
      const dist = Math.abs(v - (1.14 - 1.28 * u));
      const band = Math.exp(-Math.pow(dist / 0.31, 2));
      const cloud = fbm(x * 0.026, y * 0.036, 7);
      const detail = fbm(x * 0.062 + 40, y * 0.078, 23);
      let d = band * (0.26 + 0.85 * cloud) * (0.68 + 0.6 * detail);
      const lane = Math.abs(fbm(x * 0.017 + 90, y * 0.03 + 11, 61, 3) - 0.5);
      d *= 0.55 + 0.9 * Math.min(1, lane * 3.4);
      d *= 1 - 0.93 * Math.exp(-Math.pow((v - 0.5) / 0.155, 2));
      d *= 0.46 + 0.54 * Math.exp(-Math.pow((u - 0.5) / 0.74, 4));
      d *= nebI;
      dArr[y * W + x] = d;

      let lvl = d * 11;
      if (lvl > 7) lvl = 7 + (lvl - 7) * 0.45;
      lvl += (v - 0.5) * 1.1;
      if (horizon) {
        lvl +=
          2.4 *
          Math.exp(-Math.pow((H - 1 - y) / 24, 2)) *
          (0.55 + 0.6 * fbm(x * 0.045, 90, 55, 3));
      }
      const rv = Math.hypot((u - 0.5) * 1.02, (v - 0.5) * 1.25);
      lvl -= Math.max(0, rv - 0.42) * 3.6;

      const t = lvl + (dith(x, y) - 0.5) * 1.15;
      let idx = Math.round(t);
      if (idx < 0) idx = 0;
      if (idx > NEB.length - 1) idx = NEB.length - 1;
      set(x, y, NEB[idx]);
    }
  }

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const d = dArr[y * W + x];
      if (d < 0.34) continue;
      const w =
        0.85 *
        Math.min(1, (d - 0.34) / 0.5) *
        (0.35 + 0.75 * fbm(x * 0.024 + 300, y * 0.034 + 80, 191, 3));
      const th = dith(x, y);
      if (th < w) blend(x, y, ROSE, 0.36);
      if (th < w - 0.58) blend(x, y, [226, 158, 112], 0.42);
    }
  }

  const rnd = mulberry(20260905);
  const faint = Math.round(820 * starD);
  const mid = Math.round(170 * starD);
  const bright = Math.round(26 * starD);

  for (let i = 0; i < faint; i++) {
    const x = Math.floor(rnd() * W);
    const y = Math.floor(rnd() * H);
    const warm = rnd() > 0.6;
    blend(x, y, warm ? AMBER_DIM : CREAM_DIM, 0.35 + rnd() * 0.45);
  }
  for (let i = 0; i < mid; i++) {
    const x = Math.floor(rnd() * W);
    const y = Math.floor(rnd() * H);
    const warm = rnd() > 0.55;
    set(x, y, warm ? AMBER : CREAM);
    const f = warm ? AMBER_DIM : CREAM_DIM;
    if (rnd() > 0.45) {
      blend(x - 1, y, f, 0.55);
      blend(x + 1, y, f, 0.55);
      blend(x, y - 1, f, 0.55);
      blend(x, y + 1, f, 0.55);
    }
  }
  for (let i = 0; i < bright; i++) {
    const x = Math.floor(rnd() * W);
    const y = Math.floor(rnd() * H);
    const warm = rnd() > 0.5;
    const halo = warm ? AMBER : VIOLET;
    glow(x, y, 7, 0.5, halo);
    const arm = warm ? AMBER : CREAM;
    set(x, y, CREAM);
    set(x - 1, y, arm);
    set(x + 1, y, arm);
    set(x, y - 1, arm);
    set(x, y + 1, arm);
    const tip = warm ? AMBER_DIM : VIOLET;
    set(x - 2, y, tip);
    set(x + 2, y, tip);
    set(x, y - 2, tip);
    set(x, y + 2, tip);
    if (rnd() > 0.4) {
      blend(x - 3, y, tip, 0.5);
      blend(x + 3, y, tip, 0.5);
      blend(x, y - 3, tip, 0.5);
      blend(x, y + 3, tip, 0.5);
    }
    blend(x - 1, y - 1, tip, 0.35);
    blend(x + 1, y + 1, tip, 0.35);
    blend(x + 1, y - 1, tip, 0.35);
    blend(x - 1, y + 1, tip, 0.35);
  }
  for (let i = 0; i < Math.round(420 * starD); i++) {
    const x = Math.floor(rnd() * W);
    const y = Math.floor(rnd() * H);
    if (dArr[y * W + x] < 0.3 || rnd() > dArr[y * W + x]) continue;
    blend(x, y, rnd() > 0.5 ? CREAM : ROSE, 0.3 + rnd() * 0.3);
  }

  const mx = 62;
  const my = 42;
  const rad = 23;
  glow(mx, my, rad + 15, 0.3, VIOLET);
  for (let y = my - rad - 2; y <= my + rad + 2; y++) {
    for (let x = mx - rad - 2; x <= mx + rad + 2; x++) {
      const dx = x - mx;
      const dy = y - my;
      const dd = Math.hypot(dx, dy);
      if (dd > rad + 1.5) continue;
      const lit = (dx * 0.68 + dy * 0.73) / rad;
      const crater =
        0.86 +
        0.26 * fbm(x * 0.19, y * 0.19, 131) +
        0.12 * fbm(x * 0.5, y * 0.5, 211, 2);
      let lvl = 2.6 + (0.42 + 0.58 * lit) * crater * 5.4;
      lvl *= Math.max(0, Math.min(1, 1 - (dd - (rad - 3)) / 4.5));
      const t = lvl + (dith(x, y) - 0.5) * 1.5;
      let idx = Math.round(t);
      if (idx <= 3) continue;
      if (idx > 9) idx = 9;
      set(x, y, NEB[idx]);
    }
  }

  if (showC) {
    const pts = [
      [52, 138],
      [126, 117],
      [198, 133],
      [284, 110],
      [382, 127],
    ];
    const cr = (p0: number, p1: number, p2: number, p3: number, t: number) => {
      const t2 = t * t;
      const t3 = t2 * t;
      return (
        0.5 *
        (2 * p1 +
          (-p0 + p2) * t +
          (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
          (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
      );
    };
    const path: [number, number][] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 0; k < 90; k++) {
        const t = k / 90;
        path.push([
          Math.round(cr(p0[0], p1[0], p2[0], p3[0], t)),
          Math.round(cr(p0[1], p1[1], p2[1], p3[1], t)),
        ]);
      }
    }
    path.push(pts[pts.length - 1] as [number, number]);
    let last: [number, number] | null = null;
    let n = 0;
    for (const [x, y] of path) {
      if (last && last[0] === x && last[1] === y) continue;
      last = [x, y];
      if (dith(x, y) < 0.5) blend(x, y, VIOLET_DIM, 0.85);
      const nearEnd = pts.some((p) => Math.hypot(p[0] - x, p[1] - y) < 8);
      if (!nearEnd && n % 4 < 2) blend(x, y, VIOLET, n % 12 < 2 ? 0.85 : 0.6);
      n++;
    }
    pts.forEach(([x, y], i) => {
      const key = i === 1 || i === 3;
      glow(x, y, key ? 14 : 11, key ? 0.56 : 0.44, AMBER);
      set(x, y, CREAM);
      set(x - 1, y, CREAM);
      set(x + 1, y, CREAM);
      set(x, y - 1, CREAM);
      set(x, y + 1, CREAM);
      set(x - 2, y, AMBER);
      set(x + 2, y, AMBER);
      set(x, y - 2, AMBER);
      set(x, y + 2, AMBER);
      blend(x - 1, y - 1, AMBER, 0.5);
      blend(x + 1, y - 1, AMBER, 0.5);
      blend(x - 1, y + 1, AMBER, 0.5);
      blend(x + 1, y + 1, AMBER, 0.5);
      set(x - 3, y, AMBER_DIM);
      set(x + 3, y, AMBER_DIM);
      set(x, y - 3, AMBER_DIM);
      set(x, y + 3, AMBER_DIM);
      if (key) {
        blend(x - 4, y, AMBER_DIM, 0.6);
        blend(x + 4, y, AMBER_DIM, 0.6);
        blend(x, y - 4, AMBER_DIM, 0.6);
        blend(x, y + 4, AMBER_DIM, 0.6);
      }
    });
  }

  const small = document.createElement("canvas");
  small.width = W;
  small.height = H;
  const smallCtx = small.getContext("2d");
  if (!smallCtx) return;
  smallCtx.putImageData(new ImageData(px, W, H), 0, 0);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(small, 0, 0, W, H, 0, 0, W * SCALE, H * SCALE);
}

export default function SpaceConstellationBackground({
  nebulaIntensity = 1.25,
  starDensity = 1.4,
  showConstellation = true,
  horizonGlow = true,
}: {
  nebulaIntensity?: number;
  starDensity?: number;
  showConstellation?: boolean;
  horizonGlow?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    paint(canvas, {
      nebulaIntensity,
      starDensity,
      showConstellation,
      horizonGlow,
    });
  }, [nebulaIntensity, starDensity, showConstellation, horizonGlow]);

  return (
    <canvas
      ref={canvasRef}
      width={GRID_W * SCALE}
      height={GRID_H * SCALE}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

// src/components/MusicProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";

// One background track per section. "/contact" intentionally reuses the
// Title Screen track - like a game's save/pause screen reusing the main
// theme instead of getting its own.
const TRACKS: Record<string, string> = {
  "/": "/sounds/title-screen.mp3",
  "/about": "/sounds/about.mp3",
  "/projects": "/sounds/projects.mp3",
  "/competition": "/sounds/quest-log.mp3",
  "/memory-lane": "/sounds/memory-lane.mp3",
  "/graduation": "/sounds/graduation.mp3",
  "/contact": "/sounds/title-screen.mp3",
};

const MUTED_STORAGE_KEY = "pan-portfolio-music-muted";
const VOLUME = 0.45;

// Tiny external store for the muted flag, backed by localStorage. Reading
// it through useSyncExternalStore (instead of "useState + read in an
// effect") is what keeps the very first client render in sync with the
// server-rendered markup - no hydration-mismatch flash, and no
// setState-inside-an-effect.
type Listener = () => void;
const mutedListeners = new Set<Listener>();

function getMutedSnapshot() {
  try {
    return localStorage.getItem(MUTED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getMutedServerSnapshot() {
  return false;
}

function subscribeMuted(listener: Listener) {
  mutedListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    mutedListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function writeMuted(next: boolean) {
  try {
    localStorage.setItem(MUTED_STORAGE_KEY, next ? "1" : "0");
  } catch {
    // localStorage unavailable (private mode, etc.) - the toggle still
    // works for the rest of this visit, it just won't persist.
  }
  mutedListeners.forEach((listener) => listener());
}

type MusicContextValue = {
  muted: boolean;
  toggleMuted: () => void;
  setGateOpen: (open: boolean) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used inside <MusicProvider>");
  }
  return ctx;
}

export default function MusicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string | null>(null);

  const muted = useSyncExternalStore(
    subscribeMuted,
    getMutedSnapshot,
    getMutedServerSnapshot,
  );

  // unlocked: a real user gesture has happened on this page load, so the
  // browser will actually allow audio.play() with sound.
  // gateOpen: BootGreetingGate says the boot cutscene + loading sequence
  // is finished. Defaults to true - only the "/" route (via
  // BootGreetingGate) ever closes it, every other page has no cutscene to
  // wait for.
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(true);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = VOLUME;
      audioRef.current = audio;
    }
  }, []);

  // Unlock on the FIRST real interaction anywhere on the page - this is
  // what catches the "CLICK TO START" click on BootGreeting, so by the
  // time the gate opens later, the browser already trusts this page to
  // play audio.
  useEffect(() => {
    function unlock() {
      setUnlocked(true);
    }
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!unlocked || !gateOpen || muted) {
      audio.pause();
      return;
    }

    const src = TRACKS[pathname] ?? TRACKS["/"];
    if (currentSrcRef.current !== src) {
      currentSrcRef.current = src;
      audio.src = src;
    }
    audio.play().catch(() => {
      // Browser still refused (rare) - it'll retry next time this effect
      // re-runs (e.g. on the next route change or unmute).
    });
  }, [unlocked, gateOpen, muted, pathname]);

  function toggleMuted() {
    writeMuted(!muted);
  }

  return (
    <MusicContext.Provider value={{ muted, toggleMuted, setGateOpen }}>
      {children}
    </MusicContext.Provider>
  );
}

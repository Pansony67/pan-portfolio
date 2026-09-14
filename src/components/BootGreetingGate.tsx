// src/components/BootGreetingGate.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import BootGreeting from "@/components/BootGreeting";
import LoadingScreen from "@/components/LoadingScreen";
import PixelTransition from "@/components/PixelTransition";
import { useMusic } from "@/components/MusicProvider";

// Assets to preload during the transition FROM the dialogue INTO the real
// site. These specific files are already on screen during the greeting
// (so this list will usually resolve almost instantly, from cache) - the
// point of keeping it here is so it's easy to extend: as heavier assets
// get added to the Title Screen or other pages later, add their paths
// below and this loading screen will start actually waiting on them.
const ASSETS_TO_PRELOAD = [
  "/videos/space-apartment-bg-loop.mp4",
  "/images/character-standing.png",
  "/images/dialogue-textbox.png",
  "/images/dialogue-poses/zero-coffee.png",
  "/images/dialogue-poses/first-shock.png",
  "/images/dialogue-poses/second-wave.png",
  "/images/dialogue-poses/third-happy.png",
  "/images/dialogue-poses/fourth-whisper.png",
  "/images/dialogue-poses/fifth-byebye.png",
  "/images/dialogue-poses/six-nervous.png",
];

// Once assets actually finish loading, hold the screen at 100% for at
// least this long before moving on. The progress bar itself never lies -
// it always tracks real load progress - this just stops a fast connection
// from making the loading screen flash by before it's even readable.
const MIN_LOADING_MS = 2600;

// greeting -> loading -> done, with a pixel-wipe transition bridging each
// hop: cover the screen, swap what's underneath, then reveal it.
type Phase = "greeting" | "loading" | "done";
type TransitionStage = "none" | "covering" | "revealing";

// Module-level, not localStorage/sessionStorage on purpose: it resets on
// every fresh page load/refresh (so the greeting still plays "every time
// you enter the site" the way it always has), but stays true across
// client-side nav within the same load - so clicking "Title Screen" from
// elsewhere in the nav doesn't replay the whole boot sequence.
let hasPlayedThisLoad = false;

export default function BootGreetingGate() {
  const [phase, setPhase] = useState<Phase>(
    hasPlayedThisLoad ? "done" : "greeting",
  );
  const [transitionStage, setTransitionStage] =
    useState<TransitionStage>("none");
  const [progress, setProgress] = useState(0);
  const pendingPhaseRef = useRef<Phase | null>(null);
  const { setGateOpen } = useMusic();

  useEffect(() => {
    hasPlayedThisLoad = true;
  }, []);

  // Background music stays silent for the whole greeting + loading
  // sequence and only opens up once the real site (Title Screen) is
  // actually on screen - never during the cutscene or the download/
  // preload step.
  useEffect(() => {
    setGateOpen(phase === "done");
  }, [phase, setGateOpen]);

  function goToPhase(next: Phase) {
    pendingPhaseRef.current = next;
    setTransitionStage("covering");
  }

  function handleTransitionDone() {
    if (transitionStage === "covering") {
      if (pendingPhaseRef.current) setPhase(pendingPhaseRef.current);
      setTransitionStage("revealing");
    } else if (transitionStage === "revealing") {
      setTransitionStage("none");
    }
  }

  useEffect(() => {
    if (phase !== "loading") return;

    let cancelled = false;
    let loadedCount = 0;
    const total = ASSETS_TO_PRELOAD.length;
    const startedAt = Date.now();

    function finishAfterMinimum() {
      const elapsed = Date.now() - startedAt;
      const remaining = MIN_LOADING_MS - elapsed;
      if (remaining <= 0) {
        goToPhase("done");
        return;
      }
      setTimeout(() => {
        if (!cancelled) goToPhase("done");
      }, remaining);
    }

    ASSETS_TO_PRELOAD.forEach((url) => {
      fetch(url)
        .then((res) => res.blob())
        .catch(() => {
          // One missing/failed asset shouldn't strand the transition -
          // count it as "done" and move on.
        })
        .finally(() => {
          if (cancelled) return;
          loadedCount += 1;
          setProgress(Math.round((loadedCount / total) * 100));
          if (loadedCount === total) {
            finishAfterMinimum();
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [phase]);

  return (
    <>
      {phase === "greeting" && (
        <BootGreeting onComplete={() => goToPhase("loading")} />
      )}
      {phase === "loading" && <LoadingScreen progress={progress} />}

      {transitionStage !== "none" && (
        <PixelTransition
          key={transitionStage}
          mode={transitionStage === "covering" ? "cover" : "reveal"}
          onDone={handleTransitionDone}
        />
      )}
    </>
  );
}

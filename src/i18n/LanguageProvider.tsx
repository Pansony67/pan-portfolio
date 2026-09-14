// src/i18n/LanguageProvider.tsx
"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Lang = "en" | "th";

const LANG_STORAGE_KEY = "pan-portfolio-lang";

// Same tiny external-store pattern as MusicProvider's muted flag: reading
// through useSyncExternalStore keeps the very first client render in sync
// with the server-rendered markup (server always renders "en") with no
// hydration-mismatch flash and no setState-inside-an-effect.
type Listener = () => void;
const langListeners = new Set<Listener>();

function getLangSnapshot(): Lang {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY) === "th" ? "th" : "en";
  } catch {
    return "en";
  }
}

function getLangServerSnapshot(): Lang {
  return "en";
}

function subscribeLang(listener: Listener) {
  langListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    langListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function writeLang(next: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, next);
  } catch {
    // localStorage unavailable (private mode, etc.) - the toggle still
    // works for the rest of this visit, it just won't persist.
  }
  langListeners.forEach((listener) => listener());
}

type LanguageContextValue = {
  lang: Lang;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = useSyncExternalStore(
    subscribeLang,
    getLangSnapshot,
    getLangServerSnapshot,
  );

  // The <html> tag itself is rendered by the (server) root layout, so it
  // can't read this client-only state directly. Mirror it onto the real
  // DOM node instead: `lang` for accessibility/screen readers, and
  // `data-lang` so globals.css can swap in a Thai-capable font (Press
  // Start 2P / VT323 have zero Thai glyphs) and drop the wide pixel-style
  // letter-spacing that breaks Thai vowel/tone marks. Runs after mount
  // and again on every toggle - never during render, so no hydration
  // mismatch.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  function toggleLang() {
    writeLang(lang === "en" ? "th" : "en");
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

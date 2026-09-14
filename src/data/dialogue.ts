// src/data/dialogue.ts
//
// Structural data only - which pose goes with which line, and in what
// order. The actual text lives in src/i18n/translations.ts
// (bootGreeting.dialogue), keyed by the same `id`, so it can switch
// between English and Thai.
export type DialogueStepMeta = {
  id: "zero" | "first" | "second" | "third" | "fourth" | "fifth" | "six";
  pose: string;
};

export const DIALOGUE_STEPS: DialogueStepMeta[] = [
  { id: "zero", pose: "/images/dialogue-poses/zero-coffee.png" },
  { id: "first", pose: "/images/dialogue-poses/first-shock.png" },
  { id: "second", pose: "/images/dialogue-poses/second-wave.png" },
  { id: "third", pose: "/images/dialogue-poses/third-happy.png" },
  { id: "fourth", pose: "/images/dialogue-poses/fourth-whisper.png" },
  { id: "fifth", pose: "/images/dialogue-poses/fifth-byebye.png" },
  { id: "six", pose: "/images/dialogue-poses/six-nervous.png" },
];

// src/data/dialogue.ts
export type DialogueStep = {
  id: string;
  text: string;
  pose: string;
};

export const DIALOGUE: DialogueStep[] = [
  {
    id: "zero",
    text: "...",
    pose: "/images/dialogue-poses/zero-coffee.png",
  },
  {
    id: "first",
    text: "Oh who tf are u?",
    pose: "/images/dialogue-poses/first-shock.png",
  },
  {
    id: "second",
    text: "Ohhhh u are my visitor to check my portfolio, I'm glad someone finally notice me HI!?!?",
    pose: "/images/dialogue-poses/second-wave.png",
  },
  {
    id: "third",
    text: "But hey, if u here, u can check my portfolio to see what project I'm currently developing and what's my favorite tech stack.",
    pose: "/images/dialogue-poses/third-happy.png",
  },
  {
    id: "fourth",
    text: "Ps it's TypeScript.",
    pose: "/images/dialogue-poses/fourth-whisper.png",
  },
  {
    id: "fifth",
    text: "Okay I'm wasting ur guys time, hope u enjoyed my portfolio.",
    pose: "/images/dialogue-poses/fifth-byebye.png",
  },
  {
    id: "six",
    text: "I guess haha.",
    pose: "/images/dialogue-poses/six-nervous.png",
  },
];
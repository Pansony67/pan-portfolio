// src/app/about/page.tsx
export default function About() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-white/50">
        Character Select
      </p>
      <h1 className="text-3xl font-bold">About</h1>
      <p className="text-white/60">
        Stat Sheet + Origin Story go here (content already finalized).
      </p>
    </div>
  );
}
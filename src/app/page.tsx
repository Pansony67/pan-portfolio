// src/app/page.tsx
import BootGreetingGate from "@/components/BootGreetingGate";

export default function Home() {
  return (
    <>
      <BootGreetingGate />
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50">
          Title Screen
        </p>
        <h1 className="text-3xl font-bold">The Marketing Student Who Codes</h1>
        <p className="text-white/60">Press Start (placeholder, styling comes later)</p>
      </div>
    </>
  );
}


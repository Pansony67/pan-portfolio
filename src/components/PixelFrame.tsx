// src/components/PixelFrame.tsx

/* The ornate outer frame used on the Contact page: a double hairline
   border with chunky L-shaped brackets at each corner, each capped by a
   small filled block on the outside. Built from plain bordered spans so
   every edge stays hard - no radius, no blur. */
function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isTop = position === "tl" || position === "tr";
  const isLeft = position === "tl" || position === "bl";

  const armEdges = `${isTop ? "border-t-2" : "border-b-2"} ${
    isLeft ? "border-l-2" : "border-r-2"
  }`;

  return (
    <>
      <span
        className={`pointer-events-none absolute h-10 w-10 border-[#6b5bd6] ${armEdges} ${
          isTop ? "-top-[6px]" : "-bottom-[6px]"
        } ${isLeft ? "-left-[6px]" : "-right-[6px]"}`}
      />
      <span
        className={`pointer-events-none absolute h-3 w-3 bg-[#6b5bd6] ${
          isTop ? "-top-[10px]" : "-bottom-[10px]"
        } ${isLeft ? "-left-[10px]" : "-right-[10px]"}`}
      />
    </>
  );
}

export default function PixelFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-4xl border-2 border-[#3d3550] bg-[#0d0b1a]/95 px-6 py-14 sm:px-14">
      {/* Inner hairline, inset a few px from the outer border */}
      <span className="pointer-events-none absolute inset-2 border border-[#3d3550]/60" />

      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {children}
    </div>
  );
}

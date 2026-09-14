// src/components/DialogueCallout.tsx

/* The speech-bubble callout on the Contact page: a pixel chat glyph on
   the left, message text on the right, and a notch on the top edge that
   points up at the ornament divider above it. The glyph is drawn from
   plain rects rather than an icon font so it stays chunky at any size. */
function PixelChatGlyph() {
  return (
    <svg
      viewBox="0 0 16 14"
      className="h-12 w-12 shrink-0 sm:h-16 sm:w-16"
      aria-hidden="true"
      fill="#6b5bd6"
    >
      <rect x="1" y="1" width="14" height="9" />
      <rect x="3" y="10" width="4" height="2" />
      <rect x="3" y="12" width="2" height="2" />
      <rect x="4" y="4" width="2" height="2" fill="#1a1530" />
      <rect x="7" y="4" width="2" height="2" fill="#1a1530" />
      <rect x="10" y="4" width="2" height="2" fill="#1a1530" />
    </svg>
  );
}

export default function DialogueCallout({ children }: { children: string }) {
  return (
    <div className="relative mx-auto max-w-2xl border-2 border-[#3d3550] bg-[#1a1530]/60 px-6 py-6 sm:px-8">
      {/* Notch on the top edge, pointing up at the divider */}
      <span className="absolute bottom-full left-1/2 h-3 w-3 -translate-x-1/2 translate-y-[7px] rotate-45 border-l-2 border-t-2 border-[#3d3550] bg-[#1a1530]" />

      <div className="flex items-center gap-5 sm:gap-6">
        <PixelChatGlyph />
        <p className="font-dialogue text-left text-lg leading-relaxed text-[#f2ead9] sm:text-xl">
          {children}
        </p>
      </div>
    </div>
  );
}

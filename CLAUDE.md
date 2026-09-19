@AGENTS.md

# Project notes (pan-portfolio)

## Nav heights (measured, not guessed)

`src/components/TitleScreen.tsx` sizes the title section as
`h-[calc(100svh-48px)] sm:h-[calc(100svh-70px)]`. Those two numbers are the
rendered height of the nav (`getBoundingClientRect().height`):

- 48px  - phone HUD bar (`sticky h-12` in `src/components/Nav.tsx`), below 640px
- 70px  - desktop bar at 1440px in English (72px in Thai; between 640px and
  roughly 1400px the desktop bar wraps to two rows and is taller, so the
  title section overshoots there - accepted)

Changing the nav height (padding, font size, border, adding a link) means
changing those two numbers in TitleScreen.tsx. Use svh there, not vh (iOS URL
bar clips vh) and not dvh (resizes while the URL bar animates and jitters the
video).

## Thai text-size block (end of src/app/globals.css)

Tailwind v4 bakes font sizes into each utility class, so Thai (Chakra Petch,
which reads smaller) gets a per-utility size bump in an unlayered
`[data-lang="th"]` block. Rules of that block:

- Every text-size utility used anywhere in the app needs an entry there, or
  Thai renders at the un-bumped size on that element. Grep before adding a
  new `text-*` / `text-[Npx]` class.
- The `sm:*` entries live inside `@media (min-width: 640px)` and the `lg:*`
  entries inside `@media (min-width: 1024px)`, matching the Tailwind
  breakpoints they override. Do NOT add a `sm:`/`lg:` override outside those
  media queries - unscoped, it beats the base rule on source order and the
  element renders at desktop size on phones.
- `.dialogue-line` (the BootGreeting dialogue text) has a phone-only guard at
  the very end of the file (`@media (max-width: 639.98px)`, 1rem /
  line-height 1.375) so 3 lines of Thai always fit inside the fixed-ratio
  textbox art. Keep it last so it wins.

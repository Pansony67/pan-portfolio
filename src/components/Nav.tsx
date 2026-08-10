// src/components/Nav.tsx
import Link from "next/link";

const links = [
  { href: "/", label: "Title Screen" },
  { href: "/about", label: "Character Select" },
  { href: "/projects", label: "Level Select" },
  { href: "/competition", label: "Quest Log" },
  { href: "/contact", label: "Save & Continue" },
];

export default function Nav() {
  return (
    <nav className="flex flex-wrap gap-4 border-b border-white/10 px-6 py-4 text-sm">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-white/70 transition-colors hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
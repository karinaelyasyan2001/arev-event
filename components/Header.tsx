
"use client";

import { useState } from "react";

const navigation = [
  {
    label: "Միջոցառումներ",
    href: "/#events",
  },
  {
    label: "Ծառայություններ",
    href: "/#services",
  },
  {
    label: "Մասնագետներ",
    href: "/#partners",
  },
  {
    label: "Գործիքներ",
    href: "/#tools",
  },
  {
    label: "Գիտելիք",
    href: "/#knowledge",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-black/5 bg-[#fffaf2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold tracking-tight sm:text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <span className="mr-2">☀️</span>
          ԱՐԵՎ ԻՎԵՆԹ
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition hover:text-[#f28c28]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Login */}
          <a
            href="/login"
            className="hidden rounded-full border border-[#252525]/15 px-5 py-2.5 text-sm font-semibold transition hover:bg-[#252525] hover:text-white sm:inline-flex"
          >
            Մուտք
          </a>

          {/* Planner */}
          <a
            href="/planner"
            className="hidden rounded-full bg-[#f28c28] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#df7817] sm:inline-flex"
          >
            Սկսել ☀️
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Փակել մենյուն" : "Բացել մենյուն"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-xl transition hover:border-[#f28c28] lg:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-black/5 py-4 text-base font-medium transition hover:text-[#f28c28]"
              >
                {item.label}
              </a>
            ))}

            <div className="mt-5 flex flex-col gap-3 sm:hidden">
              <a
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-black/10 px-5 py-3 text-center font-semibold"
              >
                Մուտք
              </a>

              <a
                href="/planner"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[#f28c28] px-5 py-3 text-center font-semibold text-white"
              >
                Սկսել իմ միջոցառումը ☀️
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

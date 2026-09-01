
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      setUser(user);
      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
      return;
    }

    setUser(null);
    setMenuOpen(false);
    setLoggingOut(false);

    window.location.href = "/";
  }

  const userEmail = user?.email ?? "";
  const userName = userEmail.split("@")[0] || "Օգտատեր";

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

          {/* Logged out */}
          {!loading && !user && (
            <>
              <a
                href="/login"
                className="hidden rounded-full border border-[#252525]/15 px-5 py-2.5 text-sm font-semibold transition hover:bg-[#252525] hover:text-white sm:inline-flex"
              >
                Մուտք
              </a>

              <a
                href="/register"
                className="hidden rounded-full border border-[#f28c28] px-5 py-2.5 text-sm font-semibold text-[#f28c28] transition hover:bg-[#f28c28] hover:text-white md:inline-flex"
              >
                Գրանցվել
              </a>
            </>
          )}

          {/* Logged in */}
          {!loading && user && (
            <>
              <a
                href="/profile"
                className="hidden max-w-[180px] truncate rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-[#f28c28] hover:text-[#f28c28] sm:inline-flex"
                title={userEmail}
              >
                👤 {userName}
              </a>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="hidden rounded-full border border-red-500/20 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:inline-flex"
              >
                {loggingOut ? "Դուրս է գալիս..." : "Դուրս գալ"}
              </button>
            </>
          )}

          {/* Loading */}
          {loading && (
            <div
              className="hidden h-10 w-24 animate-pulse rounded-full bg-black/5 sm:block"
              aria-label="Բեռնվում է"
            />
          )}

          {/* Planner */}
          <a
            href="/planner"
            className="hidden rounded-full bg-[#f28c28] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#df7817] sm:inline-flex"
          >
            Սկսել ☀️
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              menuOpen ? "Փակել մենյուն" : "Բացել մենյուն"
            }
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

            <div className="mt-5 flex flex-col gap-3">

              {/* Mobile logged out */}
              {!loading && !user && (
                <>
                  <a
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-black/10 px-5 py-3 text-center font-semibold"
                  >
                    Մուտք
                  </a>

                  <a
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-[#f28c28] px-5 py-3 text-center font-semibold text-[#f28c28]"
                  >
                    Գրանցվել
                  </a>
                </>
              )}

              {/* Mobile logged in */}
              {!loading && user && (
                <>
                  <a
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-black/10 px-5 py-3 text-center font-semibold"
                  >
                    👤 {userName}
                  </a>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="rounded-full border border-red-500/20 px-5 py-3 text-center font-semibold text-red-600 disabled:opacity-50"
                  >
                    {loggingOut
                      ? "Դուրս է գալիս..."
                      : "Դուրս գալ"}
                  </button>
                </>
              )}

              {/* Mobile Planner */}
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

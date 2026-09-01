"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    {
      label: "Գլխավոր",
      href: "/",
    },
    {
      label: "Մեր մասին",
      href: "/#about",
    },
    {
      label: "Ծառայություններ",
      href: "/#services",
    },
    {
      label: "Ինչպես է աշխատում",
      href: "/#how-it-works",
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-black/[0.06] bg-white/90 shadow-[0_10px_35px_rgba(31,31,31,.07)] backdrop-blur-xl"
            : "border-b border-black/[0.04] bg-white/75 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex h-[76px] w-[min(1180px,calc(100%-24px))] items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 text-xl shadow-[0_8px_25px_rgba(242,140,40,.25)] transition duration-300 group-hover:rotate-6 group-hover:scale-105">
              ☀
            </div>

            <div className="leading-none">
              <div className="text-lg font-black tracking-[-0.03em]">
                Արև{" "}
                <span className="text-orange-500">
                  Իվենթ
                </span>
              </div>

              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                Event & Experience
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : false;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-neutral-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-4 py-2.5 text-sm font-bold transition hover:border-orange-200 hover:bg-orange-50"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600">
                    {user.email?.charAt(0).toUpperCase() ||
                      "U"}
                  </span>

                  <span>Իմ հաշիվը</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-neutral-500 transition hover:text-red-500"
                >
                  Ելք
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2.5 text-sm font-bold text-neutral-600 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Մուտք
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(242,140,40,.22)] transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-[0_12px_30px_rgba(242,140,40,.3)]"
                >
                  Գրանցվել
                </Link>
              </>
            )}

            <Link
              href="/planner"
              className="rounded-full bg-[#1f1f1f] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-500"
            >
              Կազմակերպել ✦
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={
              menuOpen ? "Փակել մենյուն" : "Բացել մենյուն"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/[0.07] bg-white text-xl transition hover:bg-orange-50 lg:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden border-t border-black/[0.05] bg-white/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto w-[min(1180px,calc(100%-24px))] py-5">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3.5 text-sm font-bold text-neutral-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="my-4 h-px bg-black/[0.06]" />

            {user ? (
              <div className="grid gap-2">
                <Link
                  href="/profile"
                  className="rounded-2xl bg-orange-50 px-4 py-4 font-bold text-orange-600"
                >
                  👤 Իմ հաշիվը
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl px-4 py-4 text-left font-bold text-red-500 transition hover:bg-red-50"
                >
                  ↪ Դուրս գալ
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="rounded-2xl border border-black/[0.07] px-4 py-4 text-center font-bold"
                >
                  Մուտք
                </Link>

                <Link
                  href="/register"
                  className="rounded-2xl bg-orange-500 px-4 py-4 text-center font-bold text-white"
                >
                  Գրանցվել
                </Link>
              </div>
            )}

            <Link
              href="/planner"
              className="mt-3 flex min-h-14 items-center justify-center rounded-2xl bg-[#1f1f1f] font-black text-white transition hover:bg-orange-500"
            >
              ☀ Կազմակերպել միջոցառում
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
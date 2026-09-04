
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

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
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

  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-black/[0.06] bg-white/90 shadow-[0_10px_35px_rgba(31,31,31,.07)] backdrop-blur-xl"
          : "border-black/[0.04] bg-white/80 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-[min(1180px,calc(100%-24px))] items-center justify-between lg:h-[76px]">
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Արև Իվենթ — Գլխավոր էջ"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 text-lg text-white shadow-[0_8px_25px_rgba(242,140,40,.25)] transition duration-300 group-hover:rotate-6 group-hover:scale-105 sm:h-11 sm:w-11 sm:text-xl">
            ☀
          </div>

          <div className="min-w-0 leading-none">
            <div className="truncate text-[17px] font-black tracking-[-0.03em] sm:text-lg">
              Արև{" "}
              <span className="text-orange-500">
                Իվենթ
              </span>
            </div>

            <div className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400 min-[400px]:block">
              Event & Experience
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav
          aria-label="Հիմնական նավիգացիա"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? isHome
                : false;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-neutral-600 hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-orange-600">
                  {user.email?.charAt(0).toUpperCase() || "U"}
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
                className="rounded-full px-4 py-2.5 text-sm font-bold text-neutral-600 transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
              >
                Մուտք
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(242,140,40,.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-[0_12px_30px_rgba(242,140,40,.3)]"
              >
                Գրանցվել
              </Link>
            </>
          )}

          <Link
            href="/planner"
            className="rounded-full bg-[#1f1f1f] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(31,31,31,.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-[0_12px_30px_rgba(242,140,40,.2)]"
          >
            Կազմակերպել ✦
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={
            menuOpen
              ? "Փակել մենյուն"
              : "Բացել մենյուն"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/[0.07] bg-white text-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 lg:hidden"
        >
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-[#1f1f1f] transition-all duration-300 ${
              menuOpen
                ? "rotate-45"
                : "-translate-y-1.5"
            }`}
          />

          <span
            className={`absolute h-0.5 w-5 rounded-full bg-[#1f1f1f] transition-all duration-300 ${
              menuOpen
                ? "-rotate-45"
                : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        id="mobile-navigation"
        className={`absolute left-0 right-0 top-full overflow-hidden border-b border-black/[0.06] bg-white/95 shadow-[0_20px_50px_rgba(31,31,31,.08)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible max-h-[calc(100vh-72px)] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-h-[calc(100vh-72px)] w-[min(1180px,calc(100%-24px))] overflow-y-auto py-5">
          {/* Mobile navigation */}
          <nav
            aria-label="Բջջային նավիգացիա"
            className="flex flex-col gap-1"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? isHome
                  : false;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-12 items-center rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-neutral-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="my-4 h-px bg-black/[0.06]" />

          {/* Account */}
          {user ? (
            <div className="grid gap-2">
              <Link
                href="/profile"
                className="flex min-h-14 items-center gap-3 rounded-2xl bg-orange-50 px-4 py-4 font-bold text-orange-600 transition hover:bg-orange-100"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-black">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </span>

                <span>Իմ հաշիվը</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-14 items-center rounded-2xl px-4 py-4 text-left font-bold text-red-500 transition hover:bg-red-50"
              >
                ↪ Դուրս գալ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                className="flex min-h-14 items-center justify-center rounded-2xl border border-black/[0.07] bg-white px-4 py-4 text-center font-bold text-neutral-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                Մուտք
              </Link>

              <Link
                href="/register"
                className="flex min-h-14 items-center justify-center rounded-2xl bg-orange-500 px-4 py-4 text-center font-bold text-white shadow-[0_8px_25px_rgba(242,140,40,.18)] transition hover:bg-orange-600"
              >
                Գրանցվել
              </Link>
            </div>
          )}

          {/* Planner */}
          <Link
            href="/planner"
            className="mt-3 flex min-h-14 items-center justify-center rounded-2xl bg-[#1f1f1f] px-5 text-center font-black text-white shadow-[0_10px_25px_rgba(31,31,31,.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500"
          >
            ☀ Կազմակերպել միջոցառում
          </Link>

          {/* Mobile brand note */}
          <div className="mt-5 text-center text-xs font-medium text-neutral-400">
            Ձեր օրը։ Ձեր պատմությունը։ Ձեր Արևը։ ✦
          </div>
        </div>
      </div>
    </header>
  );
}

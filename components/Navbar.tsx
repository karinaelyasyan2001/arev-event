"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
const navLinks = [
  { href: "/", label: "Գլխավոր" },
  { href: "/#about", label: "Մեր մասին" },
  { href: "/services", label: "Ծառայություններ" },
  { href: "/calculator", label: "Հաշվիչ" },
  { href: "/contact", label: "Կապ" },
  { href: "/#how-it-works", label: "Ինչպես է աշխատում" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(user);
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

  if (href === "/services") {
  return pathname === "/services";
}

if (href === "/calculator") {
  return pathname === "/calculator";
}

if (href === "/contact") {
  return pathname === "/contact";
}

return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.05] bg-[#fffaf2]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-[min(100%-24px,1180px)] items-center justify-between sm:h-[76px] sm:w-[min(100%-32px,1180px)]">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Արև Իվենթ - Գլխավոր էջ"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 text-xl shadow-[0_8px_20px_rgba(242,140,40,.2)] transition-transform duration-300 group-hover:scale-105">
            ☀
          </div>

          <div className="hidden min-[380px]:block">
            <div className="text-base font-black leading-none text-[#252525] sm:text-lg">
              Արև Իվենթ
            </div>
            <div className="mt-1 text-[10px] font-medium text-neutral-400 sm:text-[11px]">
              Ձեր օրը։ Ձեր պատմությունը։
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                isActive(link.href)
                  ? "bg-orange-50 text-[#f28c28]"
                  : "text-neutral-600 hover:bg-white hover:text-[#f28c28]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {!loading && user ? (
            <>
              <Link
                href="/profile"
                className={`rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                  pathname === "/profile"
                    ? "bg-orange-50 text-[#f28c28]"
                    : "text-neutral-600 hover:bg-white hover:text-[#f28c28]"
                }`}
              >
                Իմ էջը
              </Link>

              <Link
                href="/planner"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f28c28] px-5 text-sm font-black text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7817] hover:shadow-[0_15px_32px_rgba(242,140,40,.25)]"
              >
                Կազմակերպել միջոցառում
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full px-3 py-2 text-sm font-bold text-neutral-500 transition hover:bg-white hover:text-red-500"
              >
                Դուրս գալ
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2.5 text-sm font-bold text-neutral-600 transition hover:bg-white hover:text-[#f28c28]"
              >
                Մուտք
              </Link>

              <Link
                href="/register"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-orange-200 bg-white px-5 text-sm font-black text-[#f28c28] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-50"
              >
                Գրանցվել
              </Link>

              <Link
                href="/planner"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f28c28] px-5 text-sm font-black text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7817] hover:shadow-[0_15px_32px_rgba(242,140,40,.25)]"
              >
                Սկսել →
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/[0.07] bg-white text-xl shadow-sm transition hover:border-orange-200 hover:text-[#f28c28] lg:hidden"
          aria-label={menuOpen ? "Փակել մենյուն" : "Բացել մենյուն"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-50 overflow-y-auto border-t border-black/[0.05] bg-[#fffaf2] lg:hidden sm:top-[76px]">
          <div className="mx-auto flex min-h-full w-[min(100%-24px,560px)] flex-col px-1 pb-8 pt-5">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-5 py-4 text-base font-black transition ${
                    isActive(link.href)
                      ? "bg-orange-50 text-[#f28c28]"
                      : "bg-white text-neutral-700 hover:bg-orange-50 hover:text-[#f28c28]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="my-5 h-px bg-black/[0.06]" />

            {!loading && user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl bg-white px-5 py-4 text-base font-black text-neutral-700 transition hover:bg-orange-50 hover:text-[#f28c28]"
                >
                  👤 Իմ էջը
                </Link>

                <Link
                  href="/planner"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 flex min-h-14 items-center justify-center rounded-2xl bg-[#f28c28] px-5 py-4 text-base font-black text-white shadow-[0_12px_30px_rgba(242,140,40,.2)] transition hover:bg-[#df7817]"
                >
                  Կազմակերպել միջոցառում →
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-white px-5 py-4 text-left text-base font-bold text-red-500 transition hover:bg-red-50"
                >
                  Դուրս գալ
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl bg-white px-5 py-4 text-base font-black text-neutral-700 transition hover:bg-orange-50 hover:text-[#f28c28]"
                >
                  Մուտք
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-orange-200 bg-white px-5 py-4 text-base font-black text-[#f28c28] transition hover:bg-orange-50"
                >
                  Գրանցվել
                </Link>

                <Link
                  href="/planner"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 flex min-h-14 items-center justify-center rounded-2xl bg-[#f28c28] px-5 py-4 text-base font-black text-white shadow-[0_12px_30px_rgba(242,140,40,.2)] transition hover:bg-[#df7817]"
                >
                  Սկսել պլանավորումը →
                </Link>
              </div>
            )}

            <div className="mt-auto pt-10 text-center text-xs text-neutral-400">
              Արև Իվենթ ☀
              <br />
              Ձեր օրը։ Ձեր պատմությունը։
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
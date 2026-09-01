"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("❌ Մուտքը չհաջողվեց։ Ստուգեք email-ը և գաղտնաբառը։");
      return;
    }

    setMessage("✅ Մուտքը հաջողությամբ կատարվեց։");

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }

  return (
    <main className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#fffaf2] px-4 py-12 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/30 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="rounded-[32px] border border-black/[0.06] bg-white/95 p-6 shadow-[0_30px_90px_rgba(31,31,31,.12)] backdrop-blur-xl sm:p-9">
          {/* Logo */}
          <div className="text-center">
            <Link
              href="/"
              className="mx-auto flex w-fit items-center gap-3"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 text-2xl shadow-[0_10px_30px_rgba(242,140,40,.25)]">
                ☀
              </div>

              <div className="text-left">
                <div className="text-xl font-black">
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

            <div className="mt-9">
              <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Բարի վերադարձ
              </h1>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Մուտք գործեք ձեր Արև Իվենթ հաշիվ
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold"
              >
                Էլ․ փոստ
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="example@email.com"
                autoComplete="email"
                required
                className="arev-input"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold"
                >
                  Գաղտնաբառ
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-orange-500 transition hover:text-orange-700"
                >
                  Մոռացե՞լ եք
                </Link>
              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="arev-input"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 font-black text-white shadow-[0_12px_30px_rgba(242,140,40,.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(242,140,40,.3)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Մուտք է գործում...
                </span>
              ) : (
                "Մուտք գործել →"
              )}
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-center text-sm font-semibold text-neutral-700">
              {message}
            </div>
          )}

          {/* Register */}
          <div className="mt-7 border-t border-black/[0.06] pt-7 text-center text-sm text-neutral-500">
            Դեռ հաշիվ չունե՞ք։{" "}
            <Link
              href="/register"
              className="font-black text-orange-500 transition hover:text-orange-700"
            >
              Գրանցվել
            </Link>
          </div>

          {/* Home */}
          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-neutral-400 transition hover:text-orange-500"
            >
              ← Վերադառնալ գլխավոր էջ
            </Link>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-neutral-400">
          ☀ Ձեր օրը։ Ձեր պատմությունը։ Ձեր Արևը։
        </p>
      </div>
    </main>
  );
}
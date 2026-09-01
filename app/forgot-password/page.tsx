"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetRequest(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const { error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

    setLoading(false);

    if (error) {
      setError(
        "❌ Չհաջողվեց ուղարկել վերականգնման հղումը։ Փորձեք կրկին։"
      );
      return;
    }

    setMessage(
      "✅ Վերականգնման հղումն ուղարկվել է ձեր էլ․ փոստին։ Ստուգեք նաև Spam/Junk թղթապանակը։"
    );
  }

  return (
    <main className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#fffaf2] px-4 py-12 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
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

            {/* Icon */}
            <div className="mx-auto mt-9 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-3xl shadow-inner">
              🔐
            </div>

            <h1 className="mt-7 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Մոռացե՞լ եք գաղտնաբառը
            </h1>

            <p className="mt-3 text-sm leading-7 text-neutral-500">
              Մուտքագրեք ձեր էլ․ փոստը, և մենք կուղարկենք
              գաղտնաբառը վերականգնելու հղումը։
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleResetRequest}
            className="mt-8 space-y-5"
          >
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

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 font-black text-white shadow-[0_12px_30px_rgba(242,140,40,.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(242,140,40,.3)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Ուղարկվում է...
                </span>
              ) : (
                "Ուղարկել հղումը →"
              )}
            </button>
          </form>

          {/* Success */}
          {message && (
            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-center text-sm leading-6 font-semibold text-green-700">
              {message}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm leading-6 font-semibold text-red-700">
              {error}
            </div>
          )}

          {/* Login */}
          <div className="mt-7 border-t border-black/[0.06] pt-7 text-center">
            <Link
              href="/login"
              className="text-sm font-black text-orange-500 transition hover:text-orange-700"
            >
              ← Վերադառնալ մուտքի էջ
            </Link>
          </div>

          {/* Register */}
          <div className="mt-4 text-center text-sm text-neutral-500">
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
              Գլխավոր էջ
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          ☀ Ձեր օրը։ Ձեր պատմությունը։ Ձեր Արևը։
        </p>
      </div>
    </main>
  );
}
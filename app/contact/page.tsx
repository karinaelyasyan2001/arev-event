"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setResult({
        type: "error",
        text: "Խնդրում ենք լրացնել անունը, հեռախոսահամարը և հաղորդագրությունը։",
      });
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setResult({
          type: "error",
          text: "Հայտ ուղարկելու համար խնդրում ենք մուտք գործել Ձեր հաշիվ։",
        });
        return;
      }

      // 1. Պահպանում ենք հայտը Supabase-ում
      const { error: insertError } = await supabase
        .from("client_requests")
        .insert({
          user_id: user.id,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          message: message.trim(),
          status: "new",
        });

      if (insertError) {
        throw insertError;
      }

      // 2. Ուղարկում ենք email-ը Resend-ի միջոցով
      const { data: emailResult, error: functionError } =
        await supabase.functions.invoke("quick-responder", {
          body: {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim() || null,
            message: message.trim(),
          },
        });

      if (functionError) {
        console.error("Email function error:", functionError);
      } else {
        console.log("Email result:", emailResult);
      }

      setName("");
      setPhone("");
      setEmail("");
      setMessage("");

      setResult({
        type: "success",
        text: "Ձեր հայտը հաջողությամբ ուղարկվեց։ Մենք շուտով կապ կհաստատենք Ձեզ հետ։",
      });
    } catch (error) {
      console.error("Client request error:", error);

      setResult({
        type: "error",
        text: "Չհաջողվեց ուղարկել հայտը։ Խնդրում ենք կրկին փորձել։",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] py-16">
      <div className="arev-container">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f28c28]">
              Արև Իվենթ
            </p>

            <h1 className="arev-title">Կապվեք մեզ հետ</h1>

            <p className="arev-subtitle mx-auto mt-4 max-w-2xl">
              Պատմեք մեզ Ձեր միջոցառման գաղափարի մասին, և մենք կօգնենք
              այն վերածել իրականության։
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="arev-card h-fit">
              <div className="text-4xl">☀️</div>

              <h2 className="mt-5 text-2xl font-black">
                Ստեղծենք Ձեր օրը
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-500">
                Անկախ նրանից՝ հարսանիք է, ծննդյան տարեդարձ,
                կորպորատիվ կամ հատուկ միջոցառում, պատմեք մեզ
                Ձեր գաղափարը։
              </p>

              <div className="mt-7 space-y-4 text-sm">
                <div className="rounded-2xl bg-orange-50 p-4">
                  <div className="font-bold text-[#f28c28]">
                    ✓ Անհատական մոտեցում
                  </div>
                </div>

                <div className="rounded-2xl bg-orange-50 p-4">
                  <div className="font-bold text-[#f28c28]">
                    ✓ Ձեր բյուջեի շրջանակում
                  </div>
                </div>

                <div className="rounded-2xl bg-orange-50 p-4">
                  <div className="font-bold text-[#f28c28]">
                    ✓ Փորձառու թիմ
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="arev-card">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Անուն *
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ձեր անունը"
                    className="arev-input"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Հեռախոս *
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+374 XX XX XX XX"
                    className="arev-input"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-bold">
                  Էլ․ փոստ
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="arev-input"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-bold">
                  Հաղորդագրություն *
                </label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Պատմեք Ձեր միջոցառման մասին..."
                  rows={7}
                  className="arev-textarea"
                />
              </div>

              {result && (
                <div
                  className={`mt-5 rounded-2xl border p-4 text-sm font-medium ${
                    result.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {result.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="arev-button mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Ուղարկվում է..." : "Ուղարկել հայտը →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
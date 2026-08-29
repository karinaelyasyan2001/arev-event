"use client";

import { useState } from "react";

const events = [
  "Հարսանիք",
  "Ծնունդ",
  "Նշանադրություն",
  "Կորպորատիվ միջոցառում",
  "Մանկական միջոցառում",
  "Խնջույք",
  "Առաջարկություն",
  "Ավարտական միջոցառում",
];

export default function EventTypes() {
  const [customEvent, setCustomEvent] = useState("");

  return (
    <section
      id="events"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          YOUR EVENT
        </p>

        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Ի՞նչ առիթ ունես։
        </h2>

        <p className="mt-5 text-lg leading-8 text-[#666]">
          Անկախ նրանից՝ մեծ է, փոքր, դասական թե ամբողջովին յուրահատուկ,
          Արևը կօգնի քեզ այն դարձնել իրականություն։
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {events.map((event) => (
          <button
            key={event}
            className="group rounded-3xl border border-black/10 bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[#f28c28]/40 hover:shadow-xl"
          >
            <span className="text-lg font-semibold group-hover:text-[#f28c28]">
              {event}
            </span>

            <span className="mt-8 block text-sm text-[#888]">
              Բացել →
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-dashed border-black/15 bg-white/60 p-8">
        <h3 className="text-2xl font-semibold">
          Չգտա իմ առիթը։
        </h3>

        <p className="mt-2 text-[#666]">
          Գրիր քո միջոցառումը, նույնիսկ եթե այն ամբողջովին յուրահատուկ է։
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={customEvent}
            onChange={(event) => setCustomEvent(event.target.value)}
            placeholder="Օրինակ՝ surprise party, fashion event..."
            className="min-h-14 flex-1 rounded-full border border-black/10 bg-white px-6 outline-none transition focus:border-[#f28c28]"
          />

          <button
            onClick={() => {
              if (!customEvent.trim()) return;

              alert(`Քո առիթը՝ ${customEvent}`);
            }}
            className="rounded-full bg-[#252525] px-7 py-4 font-semibold text-white transition hover:bg-[#f28c28]"
          >
            Շարունակել →
          </button>
        </div>
      </div>
    </section>
  );
}
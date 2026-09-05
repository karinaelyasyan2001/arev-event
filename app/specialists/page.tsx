"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { specialists } from "@/lib/specialists";

const services = [
  { id: "all", label: "Բոլորը" },
  { id: "photo", label: "Լուսանկարիչ" },
  { id: "video", label: "Վիդեոգրաֆ" },
  { id: "host", label: "Հաղորդավար" },
  { id: "dj", label: "DJ" },
  { id: "decor", label: "Դեկորացիա" },
  { id: "music", label: "Երաժշտական խումբ" },
  { id: "makeup", label: "Դիմահարդարում" },
  { id: "flowers", label: "Ծաղիկներ" },
];

const serviceIdBySpecialist: Record<string, string> = {
  "anna-photo": "photo",
  "david-video": "video",
  "arm-host": "host",
  "dj-mika": "dj",
  "lilit-decor": "decor",
  "aria-band": "music",
  "mari-makeup": "makeup",
  "flora-studio": "flowers",
};

export default function SpecialistsPage() {
  const [activeService, setActiveService] = useState("all");
  const [search, setSearch] = useState("");

  const filteredSpecialists = useMemo(() => {
    return specialists.filter((specialist) => {
      const serviceId = serviceIdBySpecialist[specialist.id];

      const matchesService =
        activeService === "all" || serviceId === activeService;

      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        specialist.name.toLowerCase().includes(searchText) ||
        specialist.service.toLowerCase().includes(searchText) ||
        specialist.city.toLowerCase().includes(searchText) ||
        specialist.tags.some((tag) =>
          tag.toLowerCase().includes(searchText),
        );

      return matchesService && matchesSearch;
    });
  }, [activeService, search]);

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#1f1f1f]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pb-20 sm:pt-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#f7b955]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#f28c28]/10 blur-3xl" />

        <div className="arev-container relative text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-[#d96f0b] shadow-sm">
            ✨ Ստուգված մասնագետներ
          </div>

          <h1 className="arev-title">
            Գտեք ձեր միջոցառման
            <br />
            <span className="arev-gradient-text">
              կատարյալ մասնագետին
            </span>
          </h1>

          <p className="arev-subtitle">
            Դիտեք մասնագետների աշխատանքները, համեմատեք ծառայությունները և
            ընտրեք այն մարդուն, ով կօգնի ձեր օրը դարձնել առանձնահատուկ։
          </p>

          {/* Search */}
          <div className="mx-auto mt-9 max-w-2xl">
            <div className="arev-card flex items-center gap-3 p-2">
              <span className="pl-3 text-xl">🔎</span>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Փնտրել մասնագետ, ծառայություն..."
                className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none sm:text-base"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mr-2 rounded-full px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-orange-50 hover:text-[#d96f0b]"
                >
                  Մաքրել
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-10">
        <div className="arev-container">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {services.map((service) => {
              const active = activeService === service.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(service.id)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-sm font-bold transition ${
                    active
                      ? "border-[#f28c28] bg-[#f28c28] text-white shadow-lg shadow-orange-200"
                      : "border-black/10 bg-white text-[#1f1f1f] hover:border-orange-200 hover:bg-orange-50"
                  }`}
                >
                  {service.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialists */}
      <section className="arev-section px-6 pt-8">
        <div className="arev-container">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#f28c28]">
                Մասնագետներ
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ընտրեք ձեր թիմը
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              Գտնվել է{" "}
              <span className="font-bold text-[#1f1f1f]">
                {filteredSpecialists.length}
              </span>{" "}
              մասնագետ
            </p>
          </div>

          {filteredSpecialists.length === 0 ? (
            <div className="arev-card px-6 py-16 text-center">
              <div className="mb-4 text-5xl">🔍</div>

              <h3 className="text-2xl font-extrabold">
                Մասնագետ չի գտնվել
              </h3>

              <p className="mx-auto mt-3 max-w-md text-gray-500">
                Փորձեք փոխել որոնման բառը կամ ընտրել մեկ այլ ծառայություն։
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveService("all");
                }}
                className="arev-button mt-7"
              >
                Ցուցադրել բոլորին
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSpecialists.map((specialist) => (
                <article
                  key={specialist.id}
                  className="arev-card group overflow-hidden"
                >
                  {/* Portfolio preview */}
                  <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 via-white to-yellow-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(242,140,40,.22),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(247,185,85,.25),transparent_35%)]" />

                    <div className="relative text-7xl transition duration-500 group-hover:scale-110">
                      {specialist.emoji}
                    </div>

                    {specialist.verified && (
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur">
                        ✓ Ստուգված
                      </div>
                    )}

                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur">
                      {specialist.city}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-extrabold">
                          {specialist.name}
                        </h3>

                        <p className="mt-1 font-semibold text-[#f28c28]">
                          {specialist.service}
                        </p>
                      </div>

                      <div className="rounded-xl bg-orange-50 px-3 py-2 text-center">
                        <div className="text-sm font-extrabold">★</div>

                        <div className="text-sm font-bold">
                          {specialist.rating}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                      {specialist.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {specialist.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="my-5 h-px bg-black/5" />

                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-400">
                          Ծառայության արժեքը
                        </p>

                        <p className="mt-1 text-sm font-extrabold">
                          {specialist.price}
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-gray-400">
                        {specialist.reviews} կարծիք
                      </span>
                    </div>

                    <Link
                      href={`/specialists/${specialist.id}`}
                      className="arev-button mt-5 w-full"
                    >
                      Դիտել պրոֆիլը →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="arev-container">
          <div className="relative overflow-hidden rounded-[32px] bg-[#1f1f1f] px-7 py-12 text-center text-white shadow-2xl sm:px-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#f28c28]/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#f7b955]/20 blur-3xl" />

            <div className="relative">
              <div className="mb-4 text-4xl">☀️</div>

              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Չգիտե՞ք ում ընտրել
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-white/65">
                Պատմեք մեզ ձեր միջոցառման մասին, և Արև Իվենթ-ը կօգնի գտնել
                ձեզ համապատասխան մասնագետներին։
              </p>

              <Link
                href="/planner"
                className="arev-button mt-7 bg-white text-[#1f1f1f] hover:bg-orange-50"
              >
                Սկսել պլանավորումը →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
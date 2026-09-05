"use client";

import Link from "next/link";

const services = [
  {
    id: "host",
    icon: "🎤",
    title: "Հաղորդավար",
    description:
      "Պրոֆեսիոնալ հաղորդավարներ, որոնք կստեղծեն ճիշտ տրամադրություն և կկառավարեն միջոցառման ընթացքը։",
    tags: ["Հարսանիք", "Ծնունդ", "Կորպորատիվ"],
  },
  {
    id: "dj",
    icon: "🎧",
    title: "DJ",
    description:
      "Երաժշտություն, որը կհամապատասխանի ձեր միջոցառման ոճին, հյուրերին և տրամադրությանը։",
    tags: ["DJ", "Sound", "Party"],
  },
  {
    id: "photo",
    icon: "📸",
    title: "Լուսանկարիչ",
    description:
      "Կարևոր պահերի պրոֆեսիոնալ լուսանկարահանում՝ բնական, գեղեցիկ և հիշարժան կադրերով։",
    tags: ["Photo", "Wedding", "Event"],
  },
  {
    id: "video",
    icon: "🎥",
    title: "Վիդեոգրաֆ",
    description:
      "Ձեր օրվա պատմությունը՝ պրոֆեսիոնալ տեսանյութի, highlight-ի կամ ամբողջական ֆիլմի ձևաչափով։",
    tags: ["Video", "Highlight", "Film"],
  },
  {
    id: "decor",
    icon: "🌸",
    title: "Դեկորացիա",
    description:
      "Տարածքի ձևավորում՝ ձեր ընտրված գույներով, ոճով և միջոցառման գաղափարին համապատասխան։",
    tags: ["Decor", "Design", "Flowers"],
  },
  {
    id: "lighting",
    icon: "💡",
    title: "Լուսավորություն",
    description:
      "Մթնոլորտային և պրոֆեսիոնալ լուսավորություն, որը կփոխի տարածքի ամբողջ տեսքը։",
    tags: ["Light", "Stage", "Atmosphere"],
  },
  {
    id: "music",
    icon: "🎵",
    title: "Երաժշտական խումբ",
    description:
      "Կենդանի երաժշտություն՝ տարբեր ժանրերի և միջոցառումների համար նախատեսված խմբերով։",
    tags: ["Live", "Music", "Band"],
  },
  {
    id: "flowers",
    icon: "💐",
    title: "Ծաղիկներ",
    description:
      "Ծաղկային ձևավորում, փնջեր և դեկորատիվ կոմպոզիցիաներ՝ միջոցառման ընդհանուր ոճին համապատասխան։",
    tags: ["Flowers", "Bouquet", "Decor"],
  },
  {
    id: "cake",
    icon: "🍰",
    title: "Տորթ",
    description:
      "Անհատական դիզայնով տորթեր՝ ձեր միջոցառման թեմային, գույներին և ցանկություններին համապատասխան։",
    tags: ["Cake", "Dessert", "Design"],
  },
  {
    id: "catering",
    icon: "🍽️",
    title: "Քեյթրինգ",
    description:
      "Սննդի և սպասարկման կազմակերպում՝ փոքր հավաքույթներից մինչև մեծ միջոցառումներ։",
    tags: ["Food", "Service", "Event"],
  },
  {
    id: "makeup",
    icon: "💄",
    title: "Դիմահարդարում",
    description:
      "Պրոֆեսիոնալ դիմահարդարում՝ միջոցառման տեսակի, հագուստի և ձեր անհատական ոճի համաձայն։",
    tags: ["Makeup", "Beauty", "Style"],
  },
  {
    id: "effects",
    icon: "✨",
    title: "Հատուկ էֆեկտներ",
    description:
      "Ծուխ, բեմական էֆեկտներ, լուսային լուծումներ և այլ հատուկ տարրեր՝ wow էֆեկտի համար։",
    tags: ["Effects", "Show", "Wow"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffaf2] text-[#252525]">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold text-[#f28c28] shadow-sm sm:text-sm">
            Արև Իվենթ · Ծառայություններ
          </span>

          <h1 className="mt-6 text-[2.5rem] font-black leading-[1.02] tracking-[-0.05em] text-gray-900 min-[380px]:text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl">
            Ամեն ինչ ձեր{" "}
            <span className="bg-gradient-to-r from-[#f28c28] to-[#f7b955] bg-clip-text text-transparent">
              կարևոր օրվա
            </span>{" "}
            համար
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 lg:text-lg">
            Գտեք այն մասնագետներին և ծառայությունները, որոնք անհրաժեշտ են
            ձեր միջոցառումը գեղեցիկ, կազմակերպված և հիշարժան դարձնելու համար։
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/planner"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#f28c28] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(242,140,40,.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#df7817] hover:shadow-[0_18px_40px_rgba(242,140,40,.28)] sm:text-base"
            >
              Կազմակերպել իմ միջոցառումը →
            </Link>

            <a
              href="#services"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-black/[0.08] bg-white px-7 py-4 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-[#f28c28] sm:text-base"
            >
              Տեսնել ծառայությունները
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="px-3 pb-20 sm:px-6 sm:pb-24 lg:pb-32"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f28c28] sm:text-sm">
                Ընտրեք ձեր ծառայությունները
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Այն ամենը, ինչ պետք է ձեր միջոցառմանը
              </h2>
            </div>

            <div className="w-fit rounded-full border border-orange-100 bg-white px-4 py-2 text-xs font-bold text-gray-500 shadow-sm sm:text-sm">
              {services.length} ծառայություն
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.id}
                className="group relative overflow-hidden rounded-[22px] border border-black/[0.07] bg-white p-4 shadow-[0_8px_25px_rgba(31,31,31,.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#f28c28]/30 hover:shadow-[0_18px_40px_rgba(31,31,31,.09)] sm:rounded-3xl sm:p-6"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-orange-200/30 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-2xl transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-50 sm:h-14 sm:w-14 sm:text-3xl">
                    {service.icon}
                  </div>

                  <span className="rounded-full bg-[#fff3e3] px-2.5 py-1 text-[10px] font-bold text-[#d96f0b] sm:px-3 sm:text-xs">
                    Ծառայություն
                  </span>
                </div>

                <h3 className="relative mt-5 text-base font-black text-gray-900 sm:text-lg">
                  {service.title}
                </h3>

                <p className="relative mt-2 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                  {service.description}
                </p>

                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/[0.06] bg-gray-50 px-2 py-1 text-[10px] font-semibold text-gray-500 sm:px-2.5 sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/planner?service=${service.id}`}
                  className="relative mt-5 inline-flex items-center text-xs font-black text-[#f28c28] transition hover:text-[#d96f0b] sm:text-sm"
                >
                  Ընտրել ծառայությունը
                  <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-3 pb-20 sm:px-6 sm:pb-24">
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[28px] bg-[#1f1f1f] px-5 py-10 text-white sm:rounded-[2rem] sm:px-8 sm:py-14 md:px-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-300/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              Ձեր հաջորդ քայլը
            </span>

            <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
              Չգիտե՞ք՝ ինչ ծառայություններ են պետք։
              <span className="block text-orange-300">
                Մենք կօգնենք։
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              Անցեք մեր Planner-ը, պատասխանեք մի քանի պարզ հարցերի և
              ստեղծեք ձեր միջոցառման նախնական պլանը։
            </p>

            <Link
              href="/planner"
              className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#f28c28] px-7 py-4 text-sm font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#e77d18] sm:w-auto sm:text-base"
            >
              Սկսել պլանավորումը →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
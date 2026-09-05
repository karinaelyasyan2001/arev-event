"use client";

import Link from "next/link";

const services = [
  {
    icon: "💍",
    title: "Հարսանիքներ",
    text: "Ստեղծում ենք ձեր ամենակարևոր օրվա ամբողջական կոնցեպտը՝ գաղափարից մինչև վերջին մանրուքը։",
  },
  {
    icon: "🎂",
    title: "Ծննդյան տարեդարձեր",
    text: "Յուրահատուկ ձևավորում, ժամանց և մթնոլորտ՝ հենց ձեր ցանկություններին համապատասխան։",
  },
  {
    icon: "🏢",
    title: "Կորպորատիվ միջոցառումներ",
    text: "Պրոֆեսիոնալ միջոցառումներ ընկերությունների, թիմերի և բրենդների համար։",
  },
  {
    icon: "✨",
    title: "Հատուկ միջոցառումներ",
    text: "Նշանադրություն, առաջարկություն, ավարտական, մանկական և ցանկացած այլ առիթ։",
  },
];

const advantages = [
  {
    number: "01",
    title: "Մեկ թիմ",
    text: "Ձեր միջոցառման բոլոր կարևոր փուլերը կազմակերպում է մեկ միասնական թիմ։",
  },
  {
    number: "02",
    title: "Ընտրված մասնագետներ",
    text: "Գտեք լուսանկարիչների, DJ-ների, հաղորդավարների, դիզայներների և այլ մասնագետների։",
  },
  {
    number: "03",
    title: "Անհատական մոտեցում",
    text: "Յուրաքանչյուր միջոցառում կառուցվում է հենց ձեր պատմության, ոճի և բյուջեի շուրջ։",
  },
];

const steps = [
  {
    number: "01",
    title: "Պատմեք ձեր գաղափարը",
    text: "Պատասխանեք մի քանի պարզ հարցի մեր Event Planner-ում։",
  },
  {
    number: "02",
    title: "Ստացեք ձեր պլանը",
    text: "Մենք հավաքում ենք ձեր միջոցառման հիմնական կառուցվածքը։",
  },
  {
    number: "03",
    title: "Մենք կազմակերպում ենք",
    text: "Մեր թիմը հոգում է մնացածի մասին, որպեսզի դուք վայելեք օրը։",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-[#fffaf2] text-[#1f1f1f]">
      {/* ================================
          HERO
      ================================= */}
      <section
        id="home"
        className="relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden sm:min-h-[calc(100svh-76px)]"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="arev-glow absolute -left-32 top-16 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl sm:top-20 sm:h-72 sm:w-72" />

          <div className="arev-glow absolute -right-20 top-10 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl sm:right-0 sm:h-96 sm:w-96" />

          <div className="arev-glow absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl sm:h-80 sm:w-80" />

          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/20 sm:h-[500px] sm:w-[500px]" />

          <div className="absolute left-1/2 top-1/2 hidden h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/10 sm:block" />
        </div>

        <div className="mx-auto grid w-[min(1180px,calc(100%-24px))] items-center gap-10 py-12 sm:w-[min(1180px,calc(100%-32px))] sm:gap-12 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          {/* Hero text */}
          <div className="arev-fade-up">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-200/70 bg-white/75 px-4 py-2 text-xs font-semibold shadow-[0_10px_30px_rgba(242,140,40,.08)] backdrop-blur-xl transition hover:-translate-y-0.5 sm:mb-6 sm:px-5 sm:py-2.5 sm:text-sm">
              <span className="shrink-0 text-orange-500">✦</span>

              <span className="truncate">
                Ձեր օրը։ Ձեր պատմությունը։ Ձեր Արևը։
              </span>
            </div>

            <h1 className="max-w-4xl text-[2.7rem] font-black leading-[0.98] tracking-[-0.055em] min-[380px]:text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
              Մենք ստեղծում ենք
              <span className="arev-gradient-text block">
                հիշողություններ։
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-neutral-600 sm:mt-7 sm:text-lg sm:leading-8 lg:text-[1.15rem]">
              «Արև Իվենթ»-ը միջոցառումների կազմակերպման նոր սերունդ է։
              Գաղափարից մինչև իրականացում՝ մենք հավաքում ենք ճիշտ մարդկանց,
              ճիշտ ծառայությունները և ստեղծում ձեր միջոցառման ամբողջական
              պատմությունը։
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
  <Link
    href="/planner"
    className="arev-button min-h-14 w-full px-8 text-base sm:w-auto"
  >
    Կազմակերպել միջոցառում →
  </Link>

  <Link
    href="/calculator"
    className="arev-button arev-button-secondary min-h-14 w-full px-8 text-base sm:w-auto"
  >
    Հաշվել բյուջեն →
  </Link>

  <Link
    href="#services"
    className="arev-button arev-button-secondary min-h-14 w-full px-8 text-base sm:w-auto"
  >
    Դիտել ծառայությունները
  </Link>
</div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-neutral-500 sm:mt-10 sm:gap-x-8 sm:text-sm">
              <span>✓ Անհատական մոտեցում</span>
              <span>✓ Փորձառու թիմ</span>
              <span>✓ Ամբողջական կազմակերպում</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto hidden min-h-[540px] w-full max-w-[520px] lg:block">
            <div className="absolute right-5 top-8 h-[430px] w-[390px] rotate-3 rounded-[44px] bg-gradient-to-br from-orange-300 via-orange-200 to-yellow-100 shadow-[0_35px_100px_rgba(242,140,40,.22)]" />

            <div className="absolute right-12 top-16 flex h-[430px] w-[390px] -rotate-3 flex-col justify-between overflow-hidden rounded-[44px] border border-white/80 bg-white/85 p-8 shadow-[0_35px_100px_rgba(31,31,31,.14)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:rotate-[-2deg] hover:shadow-[0_40px_100px_rgba(31,31,31,.18)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                    AREV EVENT
                  </div>

                  <div className="mt-2 text-2xl font-black">
                    Your moment.
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-xl">
                  ☀️
                </div>
              </div>

              <div className="text-center">
                <div className="text-8xl">✨</div>

                <div className="mt-5 text-3xl font-black">
                  Make it
                  <br />
                  unforgettable.
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-neutral-400">
                    EVENT PLANNING
                  </div>

                  <div className="mt-1 font-bold">
                    From idea to memory
                  </div>
                </div>

                <div className="text-4xl">☀</div>
              </div>
            </div>

            <div className="arev-float absolute bottom-5 left-0 rounded-3xl border border-white bg-white/95 p-5 shadow-xl backdrop-blur">
              <div className="text-xs font-semibold text-neutral-400">
                YOUR EVENT
              </div>

              <div className="mt-1 font-bold">
                Starts here ✦
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          ABOUT
      ================================= */}
      <section id="about" className="arev-section bg-white">
        <div className="arev-container">
          <div className="grid gap-10 sm:gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-sm">
                Մեր մասին
              </div>

              <h2 className="arev-title">
                Արևը այնտեղ է,
                <span className="arev-gradient-text block">
                  որտեղ լավ հիշողություններն են։
                </span>
              </h2>
            </div>

            <div>
              <p className="text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                «Արև Իվենթ»-ը ստեղծվել է մի պարզ գաղափարով՝ միջոցառումների
                կազմակերպումը դարձնել ավելի հեշտ, գեղեցիկ և վստահելի։
              </p>

              <p className="mt-5 text-sm leading-7 text-neutral-500 sm:text-base">
                Դուք կարող եք մեզ վստահել ամբողջ միջոցառումը կամ օգտագործել
                հարթակը՝ անհրաժեշտ մասնագետներին գտնելու, նրանց աշխատանքները
                դիտելու և ձեր միջոցառման համար ճիշտ թիմ հավաքելու համար։
              </p>

              <Link
                href="/planner"
                className="mt-6 inline-flex font-bold text-orange-500 transition hover:text-orange-700 sm:mt-7"
              >
                Սկսել պլանավորումը →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          SERVICES
      ================================= */}
      <section id="services" className="arev-section">
        <div className="arev-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-sm">
              Ծառայություններ
            </div>

            <h2 className="arev-title">
              Ամեն առիթ ունի
              <span className="arev-gradient-text"> իր Արևը։</span>
            </h2>

            <p className="arev-subtitle">
              Անկախ նրանից՝ փոքրիկ ընտանեկան երեկո է, թե մեծ կորպորատիվ
              միջոցառում, մենք ստեղծում ենք այն ձեր պատկերացրած ձևով։
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-[26px] border border-black/[0.06] bg-white p-6 shadow-[0_10px_35px_rgba(31,31,31,.05)] transition-all duration-500 hover:-translate-y-3 hover:border-orange-200 hover:shadow-[0_30px_70px_rgba(31,31,31,.12)] sm:rounded-[30px] sm:p-7"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-100/60 blur-2xl transition duration-500 group-hover:bg-orange-200/70" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 text-2xl shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_12px_30px_rgba(242,140,40,.18)] sm:h-16 sm:w-16 sm:text-3xl">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-lg font-black tracking-[-0.02em] transition-colors duration-300 group-hover:text-orange-600 sm:mt-7 sm:text-xl">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-500 sm:mt-4">
                  {service.text}
                </p>

                <Link
                  href="/planner"
                  className="mt-5 inline-flex items-center text-sm font-bold text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-600 sm:mt-6"
                >
                  Կազմակերպել →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          ADVANTAGES
      ================================= */}
      <section className="arev-section bg-[#1f1f1f] text-white">
        <div className="arev-container">
          <div className="grid gap-10 sm:gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-sm">
                Ինչու՞ Արև Իվենթ
              </div>

              <h2 className="arev-title">
                Ոչ միայն
                <span className="block text-orange-400">
                  միջոցառում։
                </span>
                Այլ փորձառություն։
              </h2>
            </div>

            <div className="grid gap-4 sm:gap-5 sm:grid-cols-3">
              {advantages.map((item) => (
                <div
                  key={item.number}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-orange-400/30 hover:bg-white/[0.09] hover:shadow-[0_25px_60px_rgba(0,0,0,.25)] sm:rounded-[30px] sm:p-7"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-400/10 blur-2xl transition duration-500 group-hover:bg-orange-400/20" />

                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-orange-400/20 bg-orange-400/10 text-sm font-black text-orange-400 transition duration-500 group-hover:scale-110 group-hover:bg-orange-400/20">
                    {item.number}
                  </div>

                  <h3 className="mt-9 text-lg font-black tracking-[-0.02em] transition-colors duration-300 group-hover:text-orange-300 sm:mt-12 sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60 sm:mt-4">
                    {item.text}
                  </p>

                  <div className="mt-6 h-px w-10 bg-orange-400/40 transition-all duration-500 group-hover:w-20 sm:mt-7" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          HOW IT WORKS
      ================================= */}
      <section id="how-it-works" className="arev-section bg-white">
        <div className="arev-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-sm">
              Ինչպես է աշխատում
            </div>

            <h2 className="arev-title">
              Երեք քայլ դեպի
              <span className="arev-gradient-text"> ձեր օրը։</span>
            </h2>
          </div>

          <div className="relative mt-10 grid gap-10 sm:mt-16 sm:gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative text-center"
              >
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="pointer-events-none absolute left-1/2 top-20 hidden h-px w-full bg-gradient-to-r from-orange-200 via-orange-100 to-transparent md:block" />
                )}

                <div className="relative z-10 mx-auto flex h-18 w-18 items-center justify-center rounded-full border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 text-lg font-black text-orange-500 shadow-[0_12px_30px_rgba(242,140,40,.12)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_18px_40px_rgba(242,140,40,.22)] sm:h-20 sm:w-20 sm:text-xl">
                  {step.number}
                </div>

                <h3 className="mt-6 text-lg font-black tracking-[-0.02em] transition-colors duration-300 group-hover:text-orange-600 sm:mt-7 sm:text-xl">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-neutral-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center sm:mt-14">
            <Link
              href="/planner"
              className="arev-button min-h-14 w-full px-10 sm:w-auto"
            >
              Սկսել հիմա →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================
          CTA
      ================================= */}
      <section
        id="contact"
        className="px-3 py-6 sm:px-6 sm:py-8 lg:py-12"
      >
        <div className="group relative mx-auto max-w-[1180px] overflow-hidden rounded-[30px] bg-gradient-to-br from-orange-500 via-orange-500 to-orange-400 px-6 py-12 text-white shadow-[0_25px_70px_rgba(242,140,40,.25)] sm:rounded-[40px] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/15 blur-3xl transition duration-700 group-hover:scale-125 sm:h-80 sm:w-80" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-yellow-300/15 blur-3xl sm:h-96 sm:w-96" />

          <div className="pointer-events-none absolute right-[28%] top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border border-white/10 sm:block" />

          {/* Decorative stars */}
          <div className="pointer-events-none absolute right-6 top-6 text-xl text-white/40 transition duration-500 group-hover:rotate-12 group-hover:scale-110 sm:right-10 sm:top-10 sm:text-2xl">
            ✦
          </div>

          <div className="pointer-events-none absolute bottom-8 right-[25%] text-lg text-white/30 sm:bottom-10 sm:right-[38%]">
            ✧
          </div>

          <div className="relative z-10 grid items-center gap-10 sm:gap-12 lg:grid-cols-[1fr_auto]">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.25em]">
                <span className="text-white">✦</span>
                Պատրա՞ստ եք
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-[1.06] tracking-[-0.04em] sm:mt-6 sm:text-5xl lg:text-6xl xl:text-[4.4rem]">
                Ձեր հաջորդ
                <span className="block text-white/90">
                  հիշողությունը
                </span>
                սկսվում է այստեղ։
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8">
                Պատմեք մեզ ձեր գաղափարը, իսկ մենք կօգնենք այն
                վերածել իրականության։
              </p>

              {/* Benefits */}
              <div className="mt-7 flex flex-col gap-3 text-sm font-medium text-white/75 min-[450px]:flex-row min-[450px]:flex-wrap min-[450px]:gap-x-6 sm:mt-8">
                <span className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  Անհատական մոտեցում
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  Ձեր բյուջեի շրջանակում
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  Մեկ միասնական թիմ
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="lg:pr-2">
              <Link
                href="/planner"
                className="group/btn inline-flex min-h-15 w-full items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-black text-orange-500 shadow-[0_18px_45px_rgba(0,0,0,.14)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(0,0,0,.2)] sm:min-h-16 sm:w-auto sm:min-w-[260px] sm:px-8 sm:text-base"
              >
                <span>Կազմակերպել միջոցառում</span>

                <span className="text-xl transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </Link>

              <div className="mt-4 text-center text-xs text-white/55 sm:text-right">
                Սկսեք ձեր միջոցառման պլանավորումը
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="relative z-10 mt-10 h-px w-full bg-white/15 sm:mt-14" />

          <div className="relative z-10 mt-5 flex flex-col gap-2 text-center text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span>Արև Իվենթ</span>

            <span>
              From idea to unforgettable memory ✦
            </span>
          </div>
        </div>
      </section>

      {/* ================================
          FOOTER
      ================================= */}
      <footer className="bg-[#1f1f1f] px-5 py-12 text-white sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-[1180px] gap-10 sm:gap-12 md:grid-cols-3 lg:gap-20">
          <div>
            <div className="text-2xl font-black tracking-[-0.03em]">
              Արև{" "}
              <span className="text-orange-400">
                Իվենթ
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/50">
              Միջոցառումներ, որոնք դառնում են հիշողություններ։
            </p>
          </div>

          <div>
            <div className="font-bold">
              Արագ հղումներ
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <Link
                href="#about"
                className="transition hover:text-white"
              >
                Մեր մասին
              </Link>

              <Link
                href="#services"
                className="transition hover:text-white"
              >
                Ծառայություններ
              </Link>

              <Link
                href="/planner"
                className="transition hover:text-white"
              >
                Event Planner
              </Link>

<Link
  href="/calculator"
  className="transition hover:text-white"
>
  Բյուջեի հաշվիչ
</Link>



              <Link
                href="/profile"
                className="transition hover:text-white"
              >
                Իմ հաշիվը
              </Link>
            </div>
          </div>

          <div>
            <div className="font-bold">
              Կապ
            </div>

            <div className="mt-4 space-y-3 text-sm leading-7 text-white/60">
              <p>Հայաստան</p>

              <p>
                Եկեք ստեղծենք ձեր հաջորդ մեծ օրը։
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1180px] border-t border-white/10 pt-6 text-center text-xs leading-6 text-white/40 sm:mt-12">
          © {new Date().getFullYear()} Արև Իվենթ — Բոլոր իրավունքները
          պաշտպանված են։
        </div>
      </footer>
    </main>
  );
}
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
    <main className="overflow-hidden bg-[#fffaf2] text-[#1f1f1f]">
      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-[calc(100vh-76px)] items-center"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-orange-200/20 blur-3xl" />
        </div>

        <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div className="arev-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur">
              <span className="text-orange-500">✦</span>
              Ձեր օրը։ Ձեր պատմությունը։ Ձեր Արևը։
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Մենք ստեղծում ենք
              <span className="arev-gradient-text block">
                հիշողություններ։
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
              «Արև Իվենթ»-ը միջոցառումների կազմակերպման նոր սերունդ է։
              Գաղափարից մինչև իրականացում՝ մենք հավաքում ենք ճիշտ մարդկանց,
              ճիշտ ծառայությունները և ստեղծում ձեր միջոցառման ամբողջական
              պատմությունը։
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/planner"
                className="arev-button min-h-14 px-8 text-base"
              >
                Կազմակերպել միջոցառում →
              </Link>

              <Link
                href="#services"
                className="arev-button arev-button-secondary min-h-14 px-8 text-base"
              >
                Դիտել ծառայությունները
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-500">
              <span>✓ Անհատական մոտեցում</span>
              <span>✓ Փորձառու թիմ</span>
              <span>✓ Ամբողջական կազմակերպում</span>
            </div>
          </div>

          <div className="relative hidden min-h-[540px] lg:block">
            <div className="absolute right-5 top-8 h-[430px] w-[390px] rotate-3 rounded-[44px] bg-gradient-to-br from-orange-300 via-orange-200 to-yellow-100 shadow-[0_35px_100px_rgba(242,140,40,.2)]" />

            <div className="absolute right-12 top-16 flex h-[430px] w-[390px] -rotate-3 flex-col justify-between overflow-hidden rounded-[44px] border border-white/80 bg-white p-8 shadow-[0_30px_80px_rgba(31,31,31,.12)]">
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
                  <div className="text-xs text-neutral-400">EVENT PLANNING</div>
                  <div className="mt-1 font-bold">From idea to memory</div>
                </div>

                <div className="text-4xl">☀</div>
              </div>
            </div>

            <div className="arev-float absolute bottom-5 left-0 rounded-3xl border border-white bg-white/95 p-5 shadow-xl backdrop-blur">
              <div className="text-xs font-semibold text-neutral-400">
                YOUR EVENT
              </div>
              <div className="mt-1 font-bold">Starts here ✦</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="arev-section bg-white">
        <div className="arev-container">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <div className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
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
              <p className="text-lg leading-8 text-neutral-600">
                «Արև Իվենթ»-ը ստեղծվել է մի պարզ գաղափարով՝ միջոցառումների
                կազմակերպումը դարձնել ավելի հեշտ, գեղեցիկ և վստահելի։
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                Դուք կարող եք մեզ վստահել ամբողջ միջոցառումը կամ օգտագործել
                հարթակը՝ անհրաժեշտ մասնագետներին գտնելու, նրանց աշխատանքները
                դիտելու և ձեր միջոցառման համար ճիշտ թիմ հավաքելու համար։
              </p>

              <Link
                href="/planner"
                className="mt-7 inline-flex font-bold text-orange-500 transition hover:text-orange-700"
              >
                Սկսել պլանավորումը →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="arev-section">
        <div className="arev-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
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

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-[28px] border border-black/[0.06] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(31,31,31,.1)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {service.icon}
                </div>

                <h3 className="mt-7 text-xl font-black">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  {service.text}
                </p>

                <Link
                  href="/planner"
                  className="mt-6 inline-flex text-sm font-bold text-orange-500"
                >
                  Կազմակերպել →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="arev-section bg-[#1f1f1f] text-white">
        <div className="arev-container">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
                Ինչու՞ Արև Իվենթ
              </div>

              <h2 className="arev-title">
                Ոչ միայն
                <span className="block text-orange-400">միջոցառում։</span>
                Այլ փորձառություն։
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {advantages.map((item) => (
                <div
                  key={item.number}
                  className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 transition hover:bg-white/[0.08]"
                >
                  <div className="text-sm font-black text-orange-400">
                    {item.number}
                  </div>

                  <h3 className="mt-10 text-xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="arev-section bg-white">
        <div className="arev-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              Ինչպես է աշխատում
            </div>

            <h2 className="arev-title">
              Երեք քայլ դեպի
              <span className="arev-gradient-text"> ձեր օրը։</span>
            </h2>
          </div>

          <div className="relative mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-xl font-black text-orange-500">
                  {step.number}
                </div>

                <h3 className="mt-7 text-xl font-black">{step.title}</h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-neutral-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/planner"
              className="arev-button min-h-14 px-10"
            >
              Սկսել հիմա →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[40px] bg-gradient-to-br from-orange-500 to-orange-400 px-7 py-16 text-white shadow-[0_30px_80px_rgba(242,140,40,.25)] sm:px-12 lg:px-20 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
                Պատրա՞ստ եք
              </div>

              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Ձեր հաջորդ հիշողությունը սկսվում է այստեղ։
              </h2>

              <p className="mt-6 max-w-2xl text-white/80">
                Պատմեք մեզ ձեր գաղափարը, իսկ մենք կօգնենք այն վերածել
                իրականության։
              </p>
            </div>

            <Link
              href="/planner"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-8 font-black text-orange-500 transition hover:-translate-y-1 hover:shadow-xl"
            >
              Կազմակերպել միջոցառում →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1f1f1f] px-6 py-12 text-white">
        <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-3">
          <div>
            <div className="text-2xl font-black">
              Արև <span className="text-orange-400">Իվենթ</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/50">
              Միջոցառումներ, որոնք դառնում են հիշողություններ։
            </p>
          </div>

          <div>
            <div className="font-bold">Արագ հղումներ</div>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <Link href="#about" className="transition hover:text-white">
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

              <Link href="/profile" className="transition hover:text-white">
                Իմ հաշիվը
              </Link>
            </div>
          </div>

          <div>
            <div className="font-bold">Կապ</div>

            <div className="mt-4 space-y-3 text-sm text-white/60">
              <p>Հայաստան</p>
              <p>Եկեք ստեղծենք ձեր հաջորդ մեծ օրը։</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[1180px] border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Արև Իվենթ — Բոլոր իրավունքները
          պաշտպանված են։
        </div>
      </footer>
    </main>
  );
}
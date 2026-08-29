
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#252525]">

      {/* Header */}
      <Header />

      {/* Navigation / Brand Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="text-2xl font-bold tracking-tight">
          ☀️ ԱՐԵՎ ԻՎԵՆԹ
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#events"
            className="transition hover:text-[#f28c28]"
          >
            Միջոցառումներ
          </a>

          <a
            href="#services"
            className="transition hover:text-[#f28c28]"
          >
            Ծառայություններ
          </a>

          <a
            href="#partners"
            className="transition hover:text-[#f28c28]"
          >
            Մասնագետներ
          </a>

          <a
            href="#tools"
            className="transition hover:text-[#f28c28]"
          >
            Գործիքներ
          </a>

          <a
            href="#knowledge"
            className="transition hover:text-[#f28c28]"
          >
            Գիտելիք
          </a>
        </nav>

        <button className="rounded-full border border-[#252525]/15 px-5 py-2.5 text-sm font-medium transition hover:bg-[#252525] hover:text-white">
          Մուտք
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-20">
        <div className="max-w-4xl">

          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            AREV EVENT
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-8xl">
            Քո առիթը։
            <br />
            Քո գաղափարը։
            <br />
            <span className="text-[#f28c28]">
              Մեր ամբողջ թիմը։
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#555] sm:text-xl">
            Միջոցառումների կազմակերպում, պլանավորում և
            ստեղծագործական լուծումներ՝ ամեն ինչ մեկ վայրում։
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/planner"
              className="rounded-full bg-[#f28c28] px-8 py-4 text-center font-semibold text-white transition hover:scale-[1.02] hover:bg-[#df7817]"
            >
              Սկսել իմ միջոցառումը ☀️
            </a>

            <a
              href="#services"
              className="rounded-full border border-[#252525]/15 px-8 py-4 text-center font-semibold transition hover:bg-white"
            >
              Ուսումնասիրել Արևը
            </a>

          </div>

        </div>
      </section>

      {/* Events */}
      <section
        id="events"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="max-w-2xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            ՔՈ ԱՌԻԹԸ
          </p>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Ամեն առիթի համար՝ իր Արևը։
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#666]">
            Մենք չենք սահմանափակվում մեկ տեսակի միջոցառմամբ։
            Ընտրիր քո առիթը և սկսիր ստեղծել այն։
          </p>

        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <a
            href="/events/wedding"
            className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">💍</div>

            <h3 className="mt-5 text-xl font-bold">
              Հարսանիք
            </h3>

            <p className="mt-2 text-sm text-[#777]">
              Ստեղծիր ձեր պատմությանը համապատասխան մեծ օրը։
            </p>
          </a>

          <a
            href="/events/birthday"
            className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">🎂</div>

            <h3 className="mt-5 text-xl font-bold">
              Ծնունդ
            </h3>

            <p className="mt-2 text-sm text-[#777]">
              Ծնունդ, որը երկար կհիշվի։
            </p>
          </a>

          <a
            href="/events/engagement"
            className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">💫</div>

            <h3 className="mt-5 text-xl font-bold">
              Նշանադրություն
            </h3>

            <p className="mt-2 text-sm text-[#777]">
              Ջերմ և յուրահատուկ սկիզբ ձեր պատմության համար։
            </p>
          </a>

          <a
            href="/events/corporate"
            className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">🏢</div>

            <h3 className="mt-5 text-xl font-bold">
              Կորպորատիվ
            </h3>

            <p className="mt-2 text-sm text-[#777]">
              Թիմային և բիզնես միջոցառումներ՝ նոր մակարդակով։
            </p>
          </a>

        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            ԱՐԵՎ ԻՎԵՆԹ
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
            Մենք պարզապես միջոցառում չենք կազմակերպում։
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            <div className="rounded-3xl bg-[#fffaf2] p-8">
              <div className="text-4xl">☀️</div>

              <h3 className="mt-5 text-2xl font-bold">
                Ամբողջական կազմակերպում
              </h3>

              <p className="mt-4 leading-7 text-[#666]">
                Մեր թիմը քեզ հետ է սկզբից մինչև վերջ՝
                գաղափարից, պլանավորումից և կազմակերպումից
                մինչև միջոցառման վերջին մանրուքը։
              </p>
            </div>

            <div className="rounded-3xl bg-[#fffaf2] p-8">
              <div className="text-4xl">🤝</div>

              <h3 className="mt-5 text-2xl font-bold">
                Մասնագետների հարթակ
              </h3>

              <p className="mt-4 leading-7 text-[#666]">
                Կարող ես ինքնուրույն գտնել մասնագետների,
                ուսումնասիրել նրանց աշխատանքները,
                տեսնել ծառայությունները և կապ հաստատել։
              </p>
            </div>

            <div className="rounded-3xl bg-[#fffaf2] p-8">
              <div className="text-4xl">📝</div>

              <h3 className="mt-5 text-2xl font-bold">
                Arev Notebook
              </h3>

              <p className="mt-4 leading-7 text-[#666]">
                Պահպանիր քո գաղափարները, հյուրերի ցանկը,
                dress code-ը, սեղանների դասավորությունը
                և միջոցառման բոլոր կարևոր մանրուքները։
              </p>
            </div>

            <div className="rounded-3xl bg-[#fffaf2] p-8">
              <div className="text-4xl">🎨</div>

              <h3 className="mt-5 text-2xl font-bold">
                Ստեղծիր քո դեկորը
              </h3>

              <p className="mt-4 leading-7 text-[#666]">
                Պատկերացրու քո ֆոտոզոնան և դեկորը,
                փորձիր տարբեր գաղափարներ և վերջնական
                տարբերակը փոխանցիր մասնագետին։
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Planner CTA */}
      <section
        id="tools"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="rounded-[2rem] bg-[#252525] px-8 py-16 text-white sm:px-14">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            AREV PLANNER
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-bold sm:text-6xl">
            Միայն գաղափա՞ր ունես։
            Մենք կօգնենք այն կառուցել։
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Ընտրիր միջոցառումը, ամսաթիվը, վայրը,
            հյուրերի քանակը, բյուջեն և անհրաժեշտ
            ծառայությունները։
          </p>

          <a
            href="/planner"
            className="mt-10 inline-block rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white transition hover:bg-[#df7817]"
          >
            Սկսել Planner-ը ☀️
          </a>

        </div>
      </section>

      {/* Knowledge */}
      <section
        id="knowledge"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            AREV KNOWLEDGE
          </p>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Միջոցառման մասին գիտելիքը նույնպես ծառայություն է։
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#666]">
            Խորհուրդներ, գաղափարներ, հետաքրքիր փաստեր և
            մասնագիտական գիտելիքներ՝ որպեսզի կարողանաս
            ավելի ճիշտ որոշումներ կայացնել։
          </p>

        </div>
      </section>

      {/* Partners */}
      <section
        id="partners"
        className="bg-[#fff3e3]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            PARTNERS
          </p>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Մասնագետներ, որոնց կարող ես վստահել։
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#666]">
            Մեր գործընկերները կարող են ներկայացնել իրենց
            աշխատանքները, ծառայությունները և պորտֆոլիոն
            Արև Իվենթ-ի հարթակում։
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col justify-between gap-6 border-t border-black/10 pt-8 sm:flex-row">

          <div>
            <div className="font-bold">
              ☀️ ԱՐԵՎ ԻՎԵՆԹ
            </div>

            <p className="mt-2 text-sm text-[#777]">
              Քո առիթը։ Քո գաղափարը։ Մեր ամբողջ թիմը։
            </p>
          </div>

          <p className="text-sm text-[#999]">
            © 2026 Arev Event
          </p>

        </div>

      </footer>

    </main>
  );
}
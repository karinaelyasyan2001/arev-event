import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#252525]">
      {/* =========================
          HEADER
      ========================== */}
      <Header />

      {/* =========================
          HERO
      ========================== */}
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

      {/* =========================
          EVENTS
      ========================== */}
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
          {/* Wedding */}
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

            <span className="mt-6 block text-sm font-semibold text-[#f28c28]">
              Բացել →
            </span>
          </a>

          {/* Birthday */}
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

            <span className="mt-6 block text-sm font-semibold text-[#f28c28]">
              Բացել →
            </span>
          </a>

          {/* Engagement */}
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

            <span className="mt-6 block text-sm font-semibold text-[#f28c28]">
              Բացել →
            </span>
          </a>

          {/* Corporate */}
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

            <span className="mt-6 block text-sm font-semibold text-[#f28c28]">
              Բացել →
            </span>
          </a>
        </div>

        {/* More events */}
        <div className="mt-8 text-center">
          <a
            href="/events"
            className="inline-block rounded-full border border-black/10 bg-white px-7 py-3 font-semibold transition hover:bg-black hover:text-white"
          >
            Դիտել բոլոր միջոցառումները →
          </a>
        </div>
      </section>

      {/* =========================
          SERVICES
      ========================== */}
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

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#666]">
            Մենք ստեղծել ենք ամբողջական համակարգ, որտեղ միջոցառումը
            կարող ես վստահել մեր թիմին կամ քայլ առ քայլ ստեղծել
            ինքնուրույն՝ օգտագործելով Արև Իվենթ-ի գործիքներն ու
            մասնագետների հարթակը։
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Service 1 */}
            <div className="rounded-3xl bg-[#fffaf2] p-8">
              <div className="text-4xl">☀️</div>

              <h3 className="mt-5 text-2xl font-bold">
                Ամբողջական կազմակերպում
              </h3>

              <p className="mt-4 leading-7 text-[#666]">
                Մեր ամբողջ թիմը քո կողքին է սկզբից մինչև վերջ։
                Մենք մտածում ենք գաղափարի, պլանավորման, մասնագետների,
                դեկորի, ժամանցի և մյուս մանրուքների մասին՝ նույնիսկ
                այն բաների, որոնց մասին դու դեռ չես մտածել։
              </p>

              <a
                href="/planner"
                className="mt-6 inline-block font-semibold text-[#f28c28]"
              >
                Սկսել կազմակերպումը →
              </a>
            </div>

            {/* Service 2 */}
            <div className="rounded-3xl bg-[#fffaf2] p-8">
              <div className="text-4xl">🤝</div>

              <h3 className="mt-5 text-2xl font-bold">
                Մասնագետների հարթակ
              </h3>

              <p className="mt-4 leading-7 text-[#666]">
                Ընտրիր մասնագետներին ինքնուրույն։ Դիտիր նրանց
                պորտֆոլիոները, աշխատանքները, ծառայությունները,
                տեղեկությունները, ազատ օրերը և անհրաժեշտության
                դեպքում կապ հաստատիր նրանց հետ։
              </p>

              <a
                href="#partners"
                className="mt-6 inline-block font-semibold text-[#f28c28]"
              >
                Ուսումնասիրել մասնագետներին →
              </a>
            </div>

            {/* Service 3 */}
            <div className="rounded-3xl bg-[#fffaf2] p-8">
              <div className="text-4xl">📝</div>

              <h3 className="mt-5 text-2xl font-bold">
                Arev Notebook
              </h3>

              <p className="mt-4 leading-7 text-[#666]">
                Քո թվային նոթատետրը՝ մեկ վայրում պահելու համար
                հյուրերի ցանկը, գաղափարները, dress code-ը,
                սեղանների դասավորությունը, կարևոր նշումները,
                հղումները և միջոցառման մյուս մանրամասները։
              </p>

              <a
                href="/notebook"
                className="mt-6 inline-block font-semibold text-[#f28c28]"
              >
                Բացել Notebook-ը →
              </a>
            </div>

            {/* Service 4 */}
            <div className="rounded-3xl bg-[#fffaf2] p-8">
              <div className="text-4xl">🎨</div>

              <h3 className="mt-5 text-2xl font-bold">
                Ստեղծիր քո դեկորը
              </h3>

              <p className="mt-4 leading-7 text-[#666]">
                Պատկերացրու քո ֆոտոզոնան կամ դեկորը, ավելացրու
                ու հեռացրու տարրեր, փորձիր տարբեր գաղափարներ
                և տես՝ ինչպիսի տեսք կունենա վերջնական տարբերակը։
              </p>

              <a
                href="/designer"
                className="mt-6 inline-block font-semibold text-[#f28c28]"
              >
                Ստեղծել դեկոր →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PLANNER
      ========================== */}
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
            <br />
            Մենք կօգնենք այն կառուցել։
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Ընտրիր միջոցառման տեսակը, ամսաթիվը, վայրը,
            հյուրերի քանակը, բյուջեն, ծառայությունները և ոճը։
            Վերջում կստանաս քո միջոցառման նախնական պլանը։
          </p>

          <a
            href="/planner"
            className="mt-10 inline-block rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white transition hover:bg-[#df7817]"
          >
            Սկսել Planner-ը ☀️
          </a>
        </div>
      </section>

      {/* =========================
          KNOWLEDGE
      ========================== */}
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
            Այստեղ մարդիկ կարող են սովորել միջոցառումների
            կազմակերպման կարևոր մանրուքները՝ ինչ ընտրել,
            ինչից խուսափել, ինչպես պլանավորել բյուջեն,
            ինչպես ընտրել մասնագետներին և ինչ բաների մասին
            մարդիկ սովորաբար մոռանում են։
          </p>

          <a
            href="/knowledge"
            className="mt-8 inline-block rounded-full bg-[#252525] px-7 py-3 font-semibold text-white transition hover:bg-[#f28c28]"
          >
            Բացել գիտելիքի բաժինը →
          </a>
        </div>
      </section>

      {/* =========================
          PARTNERS
      ========================== */}
      <section
        id="partners"
        className="bg-[#fff3e3]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            AREV PARTNERS
          </p>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Մասնագետներ, որոնց կարող ես վստահել։
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#666]">
            Լուսանկարիչներ, դեկորատորներ, DJ-ներ, հաղորդավարներ,
            երաժիշտներ, դիմահարդարներ և միջոցառման մյուս մասնագետները
            կարող են ունենալ իրենց անհատական պորտֆոլիոն Արև Իվենթ-ի
            հարթակում։
          </p>

          <div className="mt-10">
            <a
              href="/partners"
              className="inline-block rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white transition hover:bg-[#df7817]"
            >
              Գտնել մասնագետ →
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          AI ASSISTANT
      ========================== */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] border border-black/10 bg-white p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            AREV AI
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
            Չգիտե՞ս ինչ անել։
            <br />
            Հարցրու Արևի AI-ին։
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#666]">
            AI օգնականը կարող է օգնել գաղափարների, միջոցառման
            պլանավորման, դեկորի, հյուրերի, ծառայությունների և
            այլ հարցերի շուրջ։
          </p>

          <a
            href="/ai"
            className="mt-8 inline-block rounded-full bg-[#252525] px-8 py-4 font-semibold text-white transition hover:bg-[#f28c28]"
          >
            Զրուցել Արևի AI-ի հետ ☀️
          </a>
        </div>
      </section>

      {/* =========================
          LOGIN / ACCOUNT
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="rounded-[2rem] bg-[#fffaf2] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
              AREV ACCOUNT
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
              Քո միջոցառումները՝ քո անձնական տարածքում։
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#666]">
              Ստեղծիր հաշիվ, պահպանիր Planner-ի տվյալները,
              Notebook-ի գրառումները, ընտրված մասնագետներին,
              գաղափարները և քո միջոցառման ամբողջ պատմությունը։
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/login"
                className="rounded-full bg-[#f28c28] px-8 py-4 text-center font-semibold text-white transition hover:bg-[#df7817]"
              >
                Մուտք գործել
              </a>

              <a
                href="/register"
                className="rounded-full border border-black/10 bg-white px-8 py-4 text-center font-semibold transition hover:bg-black hover:text-white"
              >
                Ստեղծել հաշիվ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
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

          <div className="flex flex-wrap gap-5 text-sm text-[#777]">
            <a
              href="/about"
              className="transition hover:text-[#f28c28]"
            >
              Մեր մասին
            </a>

            <a
              href="/contact"
              className="transition hover:text-[#f28c28]"
            >
              Կապ
            </a>

            <a
              href="/partners"
              className="transition hover:text-[#f28c28]"
            >
              Մասնագետներ
            </a>

            <a
              href="/knowledge"
              className="transition hover:text-[#f28c28]"
            >
              Գիտելիք
            </a>
          </div>

          <p className="text-sm text-[#999]">
            © 2026 Arev Event
          </p>
        </div>
      </footer>
    </main>
  );
}
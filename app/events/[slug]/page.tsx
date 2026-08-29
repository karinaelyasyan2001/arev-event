type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const eventData: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  wedding: {
    title: "Քո հարսանիքը՝ քո պատմության նման",
    description:
      "Արև Իվենթ-ը կօգնի քեզ ստեղծել հարսանիք, որտեղ յուրաքանչյուր մանրուք համապատասխանում է ձեր պատմությանը, ցանկություններին և երազանքներին։",
  },

  birthday: {
    title: "Ծնունդ, որը երկար կհիշվի",
    description:
      "Գաղափարից մինչև վերջին մանրուք՝ ստեղծում ենք քո բնավորությանը և տրամադրությանը համապատասխան ծննդյան միջոցառում։",
  },

  engagement: {
    title: "Նշանադրության գեղեցիկ սկիզբը",
    description:
      "Ստեղծում ենք ջերմ, գեղեցիկ և հիշվող նշանադրության գաղափար՝ դեկորից մինչև հյուրերի փորձառություն։",
  },

  corporate: {
    title: "Կորպորատիվ միջոցառում՝ նոր մակարդակով",
    description:
      "Թիմային միջոցառումներ, բիզնես միջոցառումներ և կորպորատիվ երեկոներ՝ գաղափարից մինչև իրականացում։",
  },

  party: {
    title: "Քո երեկույթը՝ քո կանոններով",
    description:
      "Երաժշտություն, դեկոր, ժամանց և ամբողջական կազմակերպում՝ քո երեկույթի տրամադրությանը համապատասխան։",
  },
};

export default async function EventPage({
  params,
}: EventPageProps) {
  const { slug } = await params;

  const event = eventData[slug];

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf2] px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Չգտանք այս միջոցառումը
          </h1>

          <p className="mt-4 text-[#666]">
            Բայց կարող ենք միասին ստեղծել այն։
          </p>

          <a
            href="/"
            className="mt-8 inline-block rounded-full bg-[#f28c28] px-7 py-3 font-semibold text-white"
          >
            Վերադառնալ գլխավոր էջ
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#252525]">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
            AREV EVENT
          </p>

          <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            {event.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#666]">
            {event.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={`/planner?event=${slug}`}
              className="rounded-full bg-[#f28c28] px-8 py-4 text-center font-semibold text-white transition hover:bg-[#df7817]"
            >
              Սկսել պլանավորումը ☀️
            </a>

            <a
              href="/"
              className="rounded-full border border-black/10 bg-white px-8 py-4 text-center font-semibold transition hover:bg-black hover:text-white"
            >
              Վերադառնալ
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

type SummaryStepProps = {
  eventPlan: {
    eventType: string;
    date: string;
    location: string;
    guests: number;
    budget: number;
    services: string[];
    style: string;
    notes: string;
  };
  onBack: () => void;
};

const eventNames: Record<string, string> = {
  wedding: "Հարսանիք",
  birthday: "Ծնունդ",
  engagement: "Նշանադրություն",
  corporate: "Կորպորատիվ",
  party: "Երեկույթ",
};

const locationNames: Record<string, string> = {
  hall: "Միջոցառումների սրահ",
  restaurant: "Ռեստորան",
  hotel: "Հյուրանոց",
  outdoor: "Բացօթյա",
  home: "Տուն",
  rooftop: "Rooftop",
  other: "Այլ վայր",
  unknown: "Դեռ չեմ որոշել",
};

const styleNames: Record<string, string> = {
  elegant: "Elegant",
  modern: "Modern",
  romantic: "Romantic",
  luxury: "Luxury",
  nature: "Nature",
  colorful: "Colorful",
  traditional: "Traditional",
  creative: "Creative",
};

export default function SummaryStep({
  eventPlan,
  onBack,
}: SummaryStepProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">

      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 09
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Քո միջոցառման պլանը պատրաստ է։ ☀️
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-[#666]">
          Ստուգիր տվյալները։ Հաջորդ փուլում այս պլանը
          կարող ենք պահպանել քո Արև Իվենթ հաշվում։
        </p>

      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">

        <InfoCard
          icon="🎉"
          title="Միջոցառում"
          value={eventNames[eventPlan.eventType] || eventPlan.eventType}
        />

        <InfoCard
          icon="📅"
          title="Ամսաթիվ"
          value={
            eventPlan.date
              ? new Date(`${eventPlan.date}T12:00:00`).toLocaleDateString(
                  "hy-AM",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )
              : "Չի նշվել"
          }
        />

        <InfoCard
          icon="📍"
          title="Վայր"
          value={
            locationNames[eventPlan.location] ||
            eventPlan.location ||
            "Չի նշվել"
          }
        />

        <InfoCard
          icon="👥"
          title="Հյուրեր"
          value={`${eventPlan.guests} հյուր`}
        />

        <InfoCard
          icon="💰"
          title="Բյուջե"
          value={`${eventPlan.budget.toLocaleString("hy-AM")} ֏`}
        />

        <InfoCard
          icon="✨"
          title="Ոճ"
          value={styleNames[eventPlan.style] || eventPlan.style}
        />

      </div>

      <div className="mt-5 rounded-3xl bg-white p-7 shadow-sm">

        <h2 className="text-xl font-bold">
          Ծառայություններ
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">

          {eventPlan.services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-[#fff3e3] px-4 py-2 text-sm font-medium"
            >
              {service}
            </span>
          ))}

        </div>

      </div>

      {eventPlan.notes && (
        <div className="mt-5 rounded-3xl bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Քո գաղափարները
          </h2>

          <p className="mt-4 whitespace-pre-wrap leading-7 text-[#666]">
            {eventPlan.notes}
          </p>

        </div>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">

        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-black/10 bg-white px-7 py-3 font-semibold hover:bg-black hover:text-white"
        >
          ← Փոփոխել
        </button>

        <button
          type="button"
          className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white hover:bg-[#df7817]"
        >
          Ուղարկել Արև Իվենթ-ին ☀️
        </button>

      </div>

    </section>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">

      <div className="text-3xl">
        {icon}
      </div>

      <p className="mt-5 text-sm text-[#888]">
        {title}
      </p>

      <p className="mt-1 text-lg font-bold">
        {value}
      </p>

    </div>
  );
}

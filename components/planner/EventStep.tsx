"use client";

const eventTypes = [
  {
    id: "wedding",
    title: "Հարսանիք",
    icon: "💍",
  },
  {
    id: "birthday",
    title: "Ծնունդ",
    icon: "🎂",
  },
  {
    id: "engagement",
    title: "Նշանադրություն",
    icon: "💫",
  },
  {
    id: "corporate",
    title: "Կորպորատիվ",
    icon: "🏢",
  },
  {
    id: "children",
    title: "Մանկական",
    icon: "🧸",
  },
  {
    id: "party",
    title: "Party",
    icon: "🎉",
  },
  {
    id: "graduation",
    title: "Ավարտական",
    icon: "🎓",
  },
  {
    id: "proposal",
    title: "Առաջարկություն",
    icon: "❤️",
  },
];

type EventStepProps = {
  selectedEvent: string;
  onSelectEvent: (event: string) => void;
  onNext: () => void;
};

export default function EventStep({
  selectedEvent,
  onSelectEvent,
  onNext,
}: EventStepProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 01
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Ի՞նչ միջոցառում ես ցանկանում կազմակերպել։
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#666]">
          Ընտրիր առիթը, իսկ եթե չգտար՝ կարող ես ստեղծել քո սեփական տարբերակը։
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {eventTypes.map((event) => {
          const isSelected = selectedEvent === event.id;

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => onSelectEvent(event.id)}
              className={`rounded-3xl border p-6 text-left transition duration-300 ${
                isSelected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-lg"
                  : "border-black/10 bg-white hover:-translate-y-1 hover:border-[#f28c28]/40 hover:shadow-lg"
              }`}
            >
              <div className="text-4xl">
                {event.icon}
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                {event.title}
              </h2>

              <p className="mt-2 text-sm text-[#888]">
                {isSelected ? "Ընտրված է ✓" : "Ընտրել →"}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl border border-dashed border-black/15 bg-white/60 p-7">
        <h2 className="text-xl font-semibold">
          Չգտա իմ միջոցառումը
        </h2>

        <p className="mt-2 text-[#666]">
          Գրիր քո գաղափարը և մենք կօգնենք այն վերածել իրական միջոցառման։
        </p>

        <input
          type="text"
          placeholder="Օրինակ՝ Rooftop fashion event"
          className="mt-5 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#f28c28]"
        />
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          disabled={!selectedEvent}
          onClick={onNext}
          className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white transition hover:bg-[#df7817] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
"use client";

type EventStepProps = {
  selectedEvent: string;
  customEvent: string;
  onSelectEvent: (event: string) => void;
  onChangeCustomEvent: (value: string) => void;
  onNext: () => void;
};

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
    icon: "💎",
  },
  {
    id: "corporate",
    title: "Կորպորատիվ",
    icon: "🏢",
  },
  {
    id: "children",
    title: "Մանկական",
    icon: "🎈",
  },
  {
    id: "party",
    title: "Փարթի",
    icon: "🎉",
  },
  {
    id: "graduation",
    title: "Ավարտական",
    icon: "🎓",
  },
  {
    id: "proposal",
    title: "Ամուսնության առաջարկ",
    icon: "❤️",
  },
];

export default function EventStep({
  selectedEvent,
  customEvent,
  onSelectEvent,
  onChangeCustomEvent,
  onNext,
}: EventStepProps) {
  const canContinue =
    selectedEvent.trim() !== "" || customEvent.trim() !== "";

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-10 text-center">
        <span className="mb-4 inline-flex rounded-full bg-[#f28c28]/10 px-4 py-2 text-sm font-semibold text-[#f28c28]">
          Քայլ 1
        </span>

        <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
          Ի՞նչ միջոցառում եք ցանկանում կազմակերպել։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Ընտրեք միջոցառման տեսակը և սկսեք ստեղծել ձեր միջոցառման պլանը։
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {eventTypes.map((event) => {
          const selected = selectedEvent === event.id;

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => onSelectEvent(event.id)}
              className={`rounded-3xl border p-6 text-left transition ${
                selected
                  ? "border-[#f28c28] bg-[#f28c28]/10 shadow-lg"
                  : "border-black/10 bg-white hover:border-[#f28c28]/50 hover:shadow-lg"
              }`}
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
                  selected ? "bg-[#f28c28]" : "bg-gray-100"
                }`}
              >
                {event.icon}
              </div>

              <h2 className="font-bold text-gray-900">
                {event.title}
              </h2>

              {selected && (
                <p className="mt-2 text-sm font-semibold text-[#f28c28]">
                  Ընտրված է ✓
                </p>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Այլ միջոցառում
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Եթե ցանկում չկա ձեր միջոցառումը, գրեք դրա անվանումը։
        </p>

        <input
          type="text"
          value={customEvent}
          onChange={(e) => onChangeCustomEvent(e.target.value)}
          placeholder="Օրինակ՝ Rooftop fashion event"
          className="mt-5 w-full rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 text-gray-900 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className={`rounded-2xl px-8 py-4 font-bold transition ${
            canContinue
              ? "bg-[#f28c28] text-white hover:bg-[#e77d18]"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
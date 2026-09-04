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
      {/* HEADER */}
      <div className="mx-auto max-w-3xl px-1 text-center">
        <span className="mb-4 inline-flex rounded-full bg-[#f28c28]/10 px-4 py-2 text-xs font-bold text-[#f28c28] sm:text-sm">
          Քայլ 1
        </span>

        <h1 className="text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 min-[380px]:text-[2.2rem] sm:text-4xl md:text-5xl">
          Ի՞նչ միջոցառում եք ցանկանում կազմակերպել։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
          Ընտրեք միջոցառման տեսակը և սկսեք ստեղծել ձեր միջոցառման պլանը։
        </p>
      </div>

      {/* EVENT TYPES */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {eventTypes.map((event) => {
          const selected = selectedEvent === event.id;

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => onSelectEvent(event.id)}
              aria-pressed={selected}
              className={`group relative min-h-[150px] overflow-hidden rounded-[22px] border p-4 text-left transition-all duration-300 active:scale-[0.98] sm:min-h-[175px] sm:rounded-3xl sm:p-6 ${
                selected
                  ? "border-[#f28c28] bg-[#f28c28]/10 shadow-[0_15px_40px_rgba(242,140,40,.14)]"
                  : "border-black/[0.08] bg-white shadow-[0_8px_25px_rgba(31,31,31,.04)] hover:-translate-y-1 hover:border-[#f28c28]/40 hover:shadow-[0_18px_40px_rgba(31,31,31,.09)]"
              }`}
            >
              {/* Decorative glow */}
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-200/30 blur-2xl transition duration-500 ${
                  selected
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />

              {/* Icon */}
              <div
                className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all duration-300 sm:mb-5 sm:h-14 sm:w-14 sm:text-3xl ${
                  selected
                    ? "bg-[#f28c28] shadow-[0_10px_25px_rgba(242,140,40,.22)]"
                    : "bg-gray-100 group-hover:scale-105 group-hover:bg-orange-50"
                }`}
              >
                {event.icon}
              </div>

              <h2 className="relative text-sm font-black leading-5 text-gray-900 sm:text-base">
                {event.title}
              </h2>

              {selected && (
                <p className="relative mt-2 text-xs font-bold text-[#f28c28] sm:text-sm">
                  Ընտրված է ✓
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* CUSTOM EVENT */}
      <div className="mt-5 rounded-[24px] border border-black/[0.08] bg-white p-5 shadow-[0_8px_30px_rgba(31,31,31,.04)] sm:mt-8 sm:rounded-3xl sm:p-8">
        <div>
          <h2 className="text-lg font-black text-gray-900 sm:text-xl">
            Այլ միջոցառում
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Եթե ցանկում չկա ձեր միջոցառումը, գրեք դրա անվանումը։
          </p>
        </div>

        <input
          type="text"
          value={customEvent}
          onChange={(e) => onChangeCustomEvent(e.target.value)}
          placeholder="Օրինակ՝ Rooftop fashion event"
          className="mt-5 min-h-14 w-full rounded-2xl border border-black/[0.08] bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10 sm:px-5 sm:text-base"
        />
      </div>

      {/* NEXT */}
      <div className="mt-5 flex justify-stretch sm:mt-8 sm:justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className={`min-h-14 w-full rounded-2xl px-8 py-4 text-sm font-bold transition-all duration-300 sm:w-auto sm:min-w-[160px] sm:text-base ${
            canContinue
              ? "bg-[#f28c28] text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] hover:-translate-y-0.5 hover:bg-[#e77d18] hover:shadow-[0_15px_35px_rgba(242,140,40,.25)]"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
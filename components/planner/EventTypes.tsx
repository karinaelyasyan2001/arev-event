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
    description: "Ձեր կյանքի ամենակարևոր օրը",
  },
  {
    id: "birthday",
    title: "Ծնունդ",
    icon: "🎂",
    description: "Հատուկ օր՝ հատուկ հիշողություններով",
  },
  {
    id: "engagement",
    title: "Նշանադրություն",
    icon: "💎",
    description: "Սիրո գեղեցիկ սկիզբ",
  },
  {
    id: "corporate",
    title: "Կորպորատիվ",
    icon: "🏢",
    description: "Միջոցառում ձեր թիմի համար",
  },
  {
    id: "children",
    title: "Մանկական",
    icon: "🎈",
    description: "Ուրախ և գունավոր տոն",
  },
  {
    id: "party",
    title: "Փարթի",
    icon: "🎉",
    description: "Երաժշտություն, պար և ժամանց",
  },
  {
    id: "graduation",
    title: "Ավարտական",
    icon: "🎓",
    description: "Նոր ճանապարհի սկիզբ",
  },
  {
    id: "proposal",
    title: "Ամուսնության առաջարկ",
    icon: "❤️",
    description: "Անմոռանալի պահ երկուսի համար",
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

  const handleSelectEvent = (event: string) => {
    onSelectEvent(event);
  };

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-10 text-center">
        <span className="mb-4 inline-flex rounded-full bg-[#f28c28]/10 px-4 py-2 text-sm font-semibold text-[#f28c28]">
          Քայլ 1
        </span>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Ի՞նչ միջոցառում եք ցանկանում կազմակերպել։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          Ընտրեք միջոցառման տեսակը, որպեսզի միասին սկսենք ստեղծել ձեր
          երազանքի միջոցառումը։
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {eventTypes.map((event) => {
          const isSelected = selectedEvent === event.id;

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => handleSelectEvent(event.id)}
              className={`group rounded-3xl border p-6 text-left transition-all duration-200 ${
                isSelected
                  ? "border-[#f28c28] bg-[#f28c28]/10 shadow-lg shadow-[#f28c28]/10"
                  : "border-black/10 bg-white hover:-translate-y-1 hover:border-[#f28c28]/50 hover:shadow-lg"
              }`}
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition ${
                  isSelected
                    ? "bg-[#f28c28] text-white"
                    : "bg-gray-100 group-hover:bg-[#f28c28]/10"
                }`}
              >
                {event.icon}
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                {event.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {event.description}
              </p>

              <div
                className={`mt-5 h-1.5 rounded-full transition ${
                  isSelected ? "bg-[#f28c28]" : "bg-gray-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Չկա ձեր միջոցառման տեսակը՞
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Գրեք ձեր միջոցառման անվանումը, և մենք կհարմարեցնենք պլանը։
          </p>
        </div>

        <input
          type="text"
          value={customEvent}
          onChange={(event) => onChangeCustomEvent(event.target.value)}
          placeholder="Օրինակ՝ Rooftop fashion event"
          className="w-full rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className={`rounded-2xl px-8 py-4 font-bold transition-all ${
            canContinue
              ? "bg-[#f28c28] text-white shadow-lg shadow-[#f28c28]/20 hover:-translate-y-0.5 hover:bg-[#e77d18]"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
type LocationStepProps = {
  selectedLocation: string;
  customLocation: string;
  onSelectLocation: (location: string) => void;
  onChangeCustomLocation: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};
const locationTypes = [
  {
    id: "hall",
    title: "Միջոցառումների սրահ",
    icon: "🏛️",
    description: "Հարսանիք, ծնունդ, մեծ միջոցառում",
  },
  {
    id: "restaurant",
    title: "Ռեստորան",
    icon: "🍽️",
    description: "Ջերմ և հարմարավետ միջավայր",
  },
  {
    id: "hotel",
    title: "Հյուրանոց",
    icon: "🏨",
    description: "Միջոցառում հյուրանոցային միջավայրում",
  },
  {
    id: "outdoor",
    title: "Բացօթյա",
    icon: "🌿",
    description: "Այգի, տեռասա, բնություն կամ այլ տարածք",
  },
  {
    id: "home",
    title: "Տուն",
    icon: "🏠",
    description: "Տնային կամ փոքր միջոցառում",
  },
  {
    id: "rooftop",
    title: "Rooftop",
    icon: "🌆",
    description: "Ժամանակակից և առանձնահատուկ մթնոլորտ",
  },
  {
    id: "other",
    title: "Այլ վայր",
    icon: "📍",
    description: "Ունեմ այլ տարբերակ",
  },
  {
    id: "unknown",
    title: "Դեռ չեմ որոշել",
    icon: "🤔",
    description: "Օգնեք ինձ ընտրել",
  },
];

export default function LocationStep({
  selectedLocation,
  customLocation,
  onSelectLocation,
  onChangeCustomLocation,
  onNext,
  onBack,
}: LocationStepProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      
      {/* Title */}
      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 03
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Որտե՞ղ է լինելու քո միջոցառումը։
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#666]">
          Ընտրիր այն վայրը, որը ամենամոտն է քո պատկերացմանը։
          Եթե դեռ չգիտես՝ ոչինչ, Արևը կօգնի քեզ ընտրել։
        </p>

      </div>

      {/* Location cards */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {locationTypes.map((location) => {

          const isSelected = selectedLocation === location.id;

          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onSelectLocation(location.id)}
              className={`group rounded-3xl border p-6 text-left transition duration-300 ${
                isSelected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-lg"
                  : "border-black/10 bg-white hover:-translate-y-1 hover:border-[#f28c28]/40 hover:shadow-lg"
              }`}
            >

              <div className="flex items-center justify-between">

                <span className="text-4xl">
                  {location.icon}
                </span>

                {isSelected && (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f28c28] text-sm text-white">
                    ✓
                  </span>
                )}

              </div>

              <h2 className="mt-5 text-lg font-bold">
                {location.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#777]">
                {location.description}
              </p>

            </button>
          );

        })}

      </div>

      {/* Extra information */}
      <div className="mt-10 rounded-3xl border border-dashed border-black/15 bg-white/60 p-7">

        <h2 className="text-xl font-semibold">
          Ունե՞ս կոնկրետ վայր։
        </h2>

        <p className="mt-2 text-[#666]">
          Եթե արդեն գիտես վայրի անունը, գրիր այստեղ։
        </p>

      <input
  type="text"
  value={customLocation}
  onChange={(event) =>
    onChangeCustomLocation(event.target.value)
  }
  placeholder="Օրինակ՝ Dvin Music Hall"
  className="mt-5 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#f28c28]"
/>

      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">

        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-black/10 bg-white px-7 py-3 font-semibold transition hover:bg-black hover:text-white"
        >
          ← Հետ
        </button>

        <button
          type="button"
          disabled={!selectedLocation}
          onClick={onNext}
          className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white transition hover:bg-[#df7817] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Հաջորդը →
        </button>

      </div>

    </section>
  );
}
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
  const canContinue =
    selectedLocation.trim() !== "" || customLocation.trim() !== "";

  return (
    <section className="mx-auto w-full max-w-5xl">
      {/* Title */}
      <div className="mx-auto max-w-3xl px-1 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f28c28] sm:text-sm sm:tracking-[0.25em]">
          ՔԱՅԼ 03
        </p>

        <h1 className="mt-4 text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 min-[380px]:text-[2.2rem] sm:text-4xl md:text-5xl">
          Որտե՞ղ է լինելու քո միջոցառումը։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666] sm:mt-5 sm:text-lg sm:leading-8">
          Ընտրիր այն վայրը, որը ամենամոտն է քո պատկերացմանը։
          Եթե դեռ չգիտես՝ ոչինչ, Արևը կօգնի քեզ ընտրել։
        </p>
      </div>

      {/* Location cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {locationTypes.map((location) => {
          const isSelected = selectedLocation === location.id;

          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onSelectLocation(location.id)}
              aria-pressed={isSelected}
              className={`group relative min-h-[165px] overflow-hidden rounded-[22px] border p-4 text-left transition-all duration-300 active:scale-[0.98] sm:min-h-[190px] sm:rounded-3xl sm:p-6 ${
                isSelected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-[0_15px_40px_rgba(242,140,40,.14)]"
                  : "border-black/[0.08] bg-white shadow-[0_8px_25px_rgba(31,31,31,.04)] hover:-translate-y-1 hover:border-[#f28c28]/40 hover:shadow-[0_18px_40px_rgba(31,31,31,.09)]"
              }`}
            >
              {/* Decorative glow */}
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-200/30 blur-2xl transition duration-500 ${
                  isSelected
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />

              {/* Icon + selected */}
              <div className="relative flex items-center justify-between gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl transition-all duration-300 sm:h-14 sm:w-14 sm:text-3xl ${
                    isSelected
                      ? "bg-[#f28c28] shadow-[0_10px_25px_rgba(242,140,40,.22)]"
                      : "bg-gray-100 group-hover:scale-105 group-hover:bg-orange-50"
                  }`}
                >
                  {location.icon}
                </div>

                {isSelected && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f28c28] text-sm font-bold text-white shadow-sm">
                    ✓
                  </span>
                )}
              </div>

              {/* Text */}
              <h2 className="relative mt-5 text-sm font-black leading-5 text-gray-900 sm:text-base">
                {location.title}
              </h2>

              <p className="relative mt-2 text-xs leading-5 text-[#777] sm:text-sm sm:leading-6">
                {location.description}
              </p>

              {isSelected && (
                <p className="relative mt-3 text-xs font-bold text-[#f28c28] sm:text-sm">
                  Ընտրված է ✓
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Extra information */}
      <div className="mt-5 rounded-[24px] border border-dashed border-black/[0.12] bg-white/80 p-5 shadow-[0_8px_30px_rgba(31,31,31,.03)] sm:mt-8 sm:rounded-3xl sm:p-8">
        <div>
          <h2 className="text-lg font-black text-gray-900 sm:text-xl">
            Ունե՞ս կոնկրետ վայր։
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#666] sm:text-base">
            Եթե արդեն գիտես վայրի անունը, գրիր այստեղ։
          </p>
        </div>

        <input
          id="custom-location"
          type="text"
          value={customLocation}
          onChange={(event) => onChangeCustomLocation(event.target.value)}
          placeholder="Օրինակ՝ Dvin Music Hall"
          className="mt-5 min-h-14 w-full rounded-2xl border border-black/[0.08] bg-[#fffaf2] px-4 text-sm text-gray-900 outline-none transition-all duration-200 hover:border-[#f28c28]/30 focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10 sm:px-5 sm:text-base"
        />
      </div>

      {/* Navigation */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="min-h-14 w-full rounded-2xl border border-black/[0.08] bg-white px-7 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white sm:w-auto sm:rounded-full sm:text-base"
        >
          ← Հետ
        </button>

        <button
          type="button"
          disabled={!canContinue}
          onClick={onNext}
          className="min-h-14 w-full rounded-2xl bg-[#f28c28] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7817] hover:shadow-[0_15px_35px_rgba(242,140,40,.24)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[160px] sm:rounded-full sm:text-base"
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
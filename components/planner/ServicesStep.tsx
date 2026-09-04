type ServicesStepProps = {
  services: string[];
  onToggleService: (service: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const services = [
  ["host", "🎤", "Հաղորդավար"],
  ["dj", "🎧", "DJ"],
  ["photo", "📸", "Լուսանկարիչ"],
  ["video", "🎥", "Վիդեոգրաֆ"],
  ["decor", "🌸", "Դեկոր"],
  ["lighting", "💡", "Լուսավորություն"],
  ["music", "🎵", "Երաժշտական խումբ"],
  ["flowers", "💐", "Ծաղիկներ"],
  ["cake", "🍰", "Տորթ"],
  ["catering", "🍽️", "Քեյթրինգ"],
  ["makeup", "💄", "Դիմահարդարում"],
  ["effects", "✨", "Հատուկ էֆեկտներ"],
];

export default function ServicesStep({
  services: selectedServices,
  onToggleService,
  onNext,
  onBack,
}: ServicesStepProps) {
  return (
    <section className="mx-auto w-full max-w-5xl">
      {/* Title */}
      <div className="mx-auto max-w-3xl px-1 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f28c28] sm:text-sm sm:tracking-[0.25em]">
          ՔԱՅԼ 06
        </p>

        <h1 className="mt-4 text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 min-[380px]:text-[2.2rem] sm:text-4xl md:text-5xl">
          Ի՞նչ ծառայություններ են պետք։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666] sm:mt-5 sm:text-lg sm:leading-8">
          Ընտրիր այն ամենը, ինչ ցանկանում ես ունենալ քո միջոցառմանը։
          Հետագայում այստեղ կարող ենք ցույց տալ համապատասխան մասնագետներին։
        </p>
      </div>

      {/* Selected counter */}
      <div className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-full border border-orange-100 bg-[#fff3e3] px-4 py-2 text-xs font-semibold text-[#777] shadow-sm sm:mt-9 sm:px-5 sm:py-2.5 sm:text-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f28c28] text-xs font-black text-white">
          {selectedServices.length}
        </span>

        <span>
          ընտրված{" "}
          {selectedServices.length === 1 ? "ծառայություն" : "ծառայություն"}
        </span>
      </div>

      {/* Services */}
      <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {services.map(([id, icon, title]) => {
          const selected = selectedServices.includes(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggleService(id)}
              aria-pressed={selected}
              className={`group relative min-h-[145px] overflow-hidden rounded-[22px] border p-4 text-left transition-all duration-300 active:scale-[0.98] sm:min-h-[170px] sm:rounded-3xl sm:p-6 ${
                selected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-[0_15px_40px_rgba(242,140,40,.14)]"
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

              {/* Icon + check */}
              <div className="relative flex items-center justify-between gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl transition-all duration-300 sm:h-14 sm:w-14 sm:text-3xl ${
                    selected
                      ? "bg-[#f28c28] shadow-[0_10px_25px_rgba(242,140,40,.22)]"
                      : "bg-gray-100 group-hover:scale-105 group-hover:bg-orange-50"
                  }`}
                >
                  {icon}
                </div>

                {selected && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f28c28] text-sm font-bold text-white shadow-sm">
                    ✓
                  </span>
                )}
              </div>

              {/* Service title */}
              <h2
                className={`relative mt-5 text-sm font-black leading-5 sm:text-base ${
                  selected ? "text-[#d96f0b]" : "text-gray-900"
                }`}
              >
                {title}
              </h2>

              {selected && (
                <p className="relative mt-2 text-xs font-bold text-[#f28c28] sm:text-sm">
                  Ընտրված է
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected summary */}
      {selectedServices.length > 0 && (
        <div className="mx-auto mt-6 max-w-4xl rounded-[24px] border border-orange-100 bg-white p-5 shadow-[0_8px_30px_rgba(31,31,31,.04)] sm:mt-8 sm:rounded-3xl sm:p-6">
          <p className="text-sm font-black text-gray-900 sm:text-base">
            Քո ընտրած ծառայությունները
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedServices.map((selectedId) => {
              const service = services.find(([id]) => id === selectedId);

              if (!service) return null;

              const [, icon, title] = service;

              return (
                <span
                  key={selectedId}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-[#fff3e3] px-3 py-2 text-xs font-bold text-gray-800 sm:text-sm"
                >
                  <span>{icon}</span>
                  <span>{title}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

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
          disabled={selectedServices.length === 0}
          onClick={onNext}
          className="min-h-14 w-full rounded-2xl bg-[#f28c28] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7817] hover:shadow-[0_15px_35px_rgba(242,140,40,.24)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[160px] sm:rounded-full sm:text-base"
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
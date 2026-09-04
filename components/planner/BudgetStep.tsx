type BudgetStepProps = {
  budget: number;
  onSelectBudget: (budget: number) => void;
  onNext: () => void;
  onBack: () => void;
};

const budgetOptions = [
  {
    value: 500000,
    title: "Մինչև 500,000 ֏",
    description: "Փոքր և համեստ միջոցառում",
  },
  {
    value: 1000000,
    title: "500,000 – 1,000,000 ֏",
    description: "Միջին բյուջե",
  },
  {
    value: 2000000,
    title: "1,000,000 – 2,000,000 ֏",
    description: "Ավելի լայն հնարավորություններ",
  },
  {
    value: 3000000,
    title: "2,000,000 – 3,000,000 ֏",
    description: "Ընդարձակ միջոցառում",
  },
  {
    value: 5000000,
    title: "3,000,000 – 5,000,000 ֏",
    description: "Պրեմիում տարբերակ",
  },
  {
    value: 10000000,
    title: "5,000,000 ֏ +",
    description: "Անհատական և մեծածավալ միջոցառում",
  },
];

export default function BudgetStep({
  budget,
  onSelectBudget,
  onNext,
  onBack,
}: BudgetStepProps) {
  return (
    <section className="mx-auto w-full max-w-5xl">
      {/* Title */}
      <div className="mx-auto max-w-3xl px-1 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f28c28] sm:text-sm sm:tracking-[0.25em]">
          ՔԱՅԼ 05
        </p>

        <h1 className="mt-4 text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 min-[380px]:text-[2.2rem] sm:text-4xl md:text-5xl">
          Ի՞նչ բյուջե ես նախատեսում։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666] sm:mt-5 sm:text-lg sm:leading-8">
          Սա միայն նախնական կողմնորոշման համար է։ Վերջնական արժեքը կախված է
          ընտրված ծառայություններից, մասնագետներից և միջոցառման մանրամասներից։
        </p>
      </div>

      {/* Budget options */}
      <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
        {budgetOptions.map((option) => {
          const isSelected = budget === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelectBudget(option.value)}
              aria-pressed={isSelected}
              className={`group relative min-h-[125px] overflow-hidden rounded-[22px] border p-5 text-left transition-all duration-300 active:scale-[0.98] sm:min-h-[145px] sm:rounded-3xl sm:p-6 ${
                isSelected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-[0_15px_40px_rgba(242,140,40,.14)]"
                  : "border-black/[0.08] bg-white shadow-[0_8px_25px_rgba(31,31,31,.04)] hover:-translate-y-1 hover:border-[#f28c28]/40 hover:shadow-[0_18px_40px_rgba(31,31,31,.09)]"
              }`}
            >
              {/* Decorative glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-200/30 blur-2xl transition duration-500 ${
                  isSelected
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />

              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div
                    className={`text-lg font-black leading-6 sm:text-2xl sm:leading-7 ${
                      isSelected ? "text-[#d96f0b]" : "text-gray-900"
                    }`}
                  >
                    {option.title}
                  </div>

                  <p className="mt-2 text-xs leading-5 text-[#777] sm:text-sm sm:leading-6">
                    {option.description}
                  </p>
                </div>

                {isSelected && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f28c28] text-sm font-bold text-white shadow-sm">
                    ✓
                  </span>
                )}
              </div>

              {isSelected && (
                <p className="relative mt-4 text-xs font-bold text-[#f28c28] sm:text-sm">
                  Ընտրված է
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom budget */}
      <div className="mx-auto mt-5 max-w-xl rounded-[24px] border border-dashed border-black/[0.12] bg-white/80 p-5 shadow-[0_8px_30px_rgba(31,31,31,.03)] sm:mt-8 sm:rounded-3xl sm:p-8">
        <h2 className="text-lg font-black text-gray-900 sm:text-xl">
          Ունե՞ս կոնկրետ բյուջե։
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#666] sm:text-base">
          Կարող ես նշել քո նախատեսած գումարը։
        </p>

        <div className="relative mt-5">
          <input
            id="custom-budget"
            type="number"
            min="0"
            max="1000000000"
            value={budget || ""}
            onChange={(event) => {
              const value = Number(event.target.value);

              if (value > 1000000000) {
                onSelectBudget(1000000000);
                return;
              }

              onSelectBudget(value);
            }}
            placeholder="Օրինակ՝ 1,500,000"
            inputMode="numeric"
            className="min-h-14 w-full rounded-2xl border border-black/[0.08] bg-[#fffaf2] px-4 py-3 pr-14 text-base text-gray-900 outline-none transition-all duration-200 hover:border-[#f28c28]/30 focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10 sm:px-5 sm:text-lg"
          />

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg font-black text-[#777] sm:right-5">
            ֏
          </span>
        </div>

        {budget > 0 && (
          <div className="mt-4 rounded-2xl bg-[#fff3e3] px-4 py-3">
            <p className="text-sm font-bold text-[#f28c28]">
              Ընտրված բյուջե՝ {budget.toLocaleString("hy-AM")} ֏
            </p>
          </div>
        )}
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
          disabled={!budget || budget <= 0}
          onClick={onNext}
          className="min-h-14 w-full rounded-2xl bg-[#f28c28] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7817] hover:shadow-[0_15px_35px_rgba(242,140,40,.24)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[160px] sm:rounded-full sm:text-base"
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
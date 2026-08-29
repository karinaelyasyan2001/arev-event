
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
    <section className="mx-auto w-full max-w-5xl px-6 py-16">

      {/* Title */}
      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 05
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Ի՞նչ բյուջե ես նախատեսում։
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#666]">
          Սա միայն նախնական կողմնորոշման համար է։
          Վերջնական արժեքը կախված է ընտրված ծառայություններից,
          մասնագետներից և միջոցառման մանրամասներից։
        </p>

      </div>

      {/* Budget options */}
      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">

        {budgetOptions.map((option) => {

          const isSelected = budget === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelectBudget(option.value)}
              className={`rounded-3xl border p-6 text-left transition duration-300 ${
                isSelected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-lg"
                  : "border-black/10 bg-white hover:-translate-y-1 hover:border-[#f28c28]/40 hover:shadow-lg"
              }`}
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <div className="text-2xl font-bold">
                    {option.title}
                  </div>

                  <p className="mt-2 text-sm text-[#777]">
                    {option.description}
                  </p>

                </div>

                {isSelected && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f28c28] text-sm text-white">
                    ✓
                  </span>
                )}

              </div>

            </button>
          );

        })}

      </div>

      {/* Custom budget */}
      <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-dashed border-black/15 bg-white/60 p-7">

        <h2 className="text-xl font-semibold">
          Ունե՞ս կոնկրետ բյուջե։
        </h2>

        <p className="mt-2 text-sm text-[#666]">
          Կարող ես նշել քո նախատեսած գումարը։
        </p>

        <div className="relative mt-5">

          <input
            type="number"
            min="0"
            value={budget || ""}
            onChange={(event) =>
              onSelectBudget(Number(event.target.value))
            }
            placeholder="Օրինակ՝ 1,500,000"
            className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 pr-16 text-lg outline-none transition focus:border-[#f28c28]"
          />

          <span className="absolute right-5 top-1/2 -translate-y-1/2 font-semibold text-[#777]">
            ֏
          </span>

        </div>

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
          disabled={!budget || budget <= 0}
          onClick={onNext}
          className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white transition hover:bg-[#df7817] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Հաջորդը →
        </button>

      </div>

    </section>
  );
}
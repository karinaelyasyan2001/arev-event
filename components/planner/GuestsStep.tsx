
type GuestsStepProps = {
  guests: number;
  onSelectGuests: (guests: number) => void;
  onNext: () => void;
  onBack: () => void;
};

const guestOptions = [20, 50, 80, 120, 200, 300];

export default function GuestsStep({
  guests,
  onSelectGuests,
  onNext,
  onBack,
}: GuestsStepProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">

      {/* Title */}
      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 04
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Քանի՞ հյուր եք սպասում։
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#666]">
          Հյուրերի քանակը մեզ կօգնի ավելի ճիշտ պատկերացնել
          տարածքը, ծառայությունները և մոտավոր բյուջեն։
        </p>

      </div>

      {/* Guest options */}
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">

        {guestOptions.map((count) => {

          const isSelected = guests === count;

          return (
            <button
              key={count}
              type="button"
              onClick={() => onSelectGuests(count)}
              className={`rounded-3xl border p-7 transition duration-300 ${
                isSelected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-lg"
                  : "border-black/10 bg-white hover:-translate-y-1 hover:border-[#f28c28]/40 hover:shadow-lg"
              }`}
            >
              <div className="text-3xl">👥</div>

              <div className="mt-4 text-2xl font-bold">
                {count === 300 ? "300+" : count}
              </div>

              <div className="mt-1 text-sm text-[#777]">
                հյուր
              </div>

              {isSelected && (
                <div className="mt-4 text-sm font-semibold text-[#f28c28]">
                  ✓ Ընտրված է
                </div>
              )}
            </button>
          );
        })}

      </div>

      {/* Custom number */}
      <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-dashed border-black/15 bg-white/60 p-7">

        <h2 className="text-xl font-semibold">
          Կոնկրետ թիվ ունե՞ս։
        </h2>

        <p className="mt-2 text-sm text-[#666]">
          Կարող ես գրել հյուրերի ճշգրիտ քանակը։
        </p>

        <input
          type="number"
          min="1"
          max="10000"
          value={guests || ""}
          onChange={(event) =>
            onSelectGuests(Number(event.target.value))
          }
          placeholder="Օրինակ՝ 145"
          className="mt-5 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg outline-none transition focus:border-[#f28c28]"
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
          disabled={!guests || guests < 1}
          onClick={onNext}
          className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white transition hover:bg-[#df7817] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Հաջորդը →
        </button>

      </div>

    </section>
  );
}
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
    <section className="mx-auto w-full max-w-5xl">
      {/* Title */}
      <div className="mx-auto max-w-3xl px-1 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f28c28] sm:text-sm sm:tracking-[0.25em]">
          ՔԱՅԼ 04
        </p>

        <h1 className="mt-4 text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 min-[380px]:text-[2.2rem] sm:text-4xl md:text-5xl">
          Քանի՞ հյուր եք սպասում։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666] sm:mt-5 sm:text-lg sm:leading-8">
          Հյուրերի քանակը մեզ կօգնի ավելի ճիշտ պատկերացնել տարածքը,
          ծառայությունները և մոտավոր բյուջեն։
        </p>
      </div>

      {/* Guest options */}
      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
        {guestOptions.map((count) => {
          const isSelected = guests === count;

          return (
            <button
              key={count}
              type="button"
              onClick={() => onSelectGuests(count)}
              aria-pressed={isSelected}
              className={`group relative min-h-[145px] overflow-hidden rounded-[22px] border p-4 text-center transition-all duration-300 active:scale-[0.98] sm:min-h-[175px] sm:rounded-3xl sm:p-7 ${
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

              {/* Icon */}
              <div
                className={`relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all duration-300 sm:h-14 sm:w-14 sm:text-3xl ${
                  isSelected
                    ? "bg-[#f28c28] shadow-[0_10px_25px_rgba(242,140,40,.22)]"
                    : "bg-gray-100 group-hover:scale-105 group-hover:bg-orange-50"
                }`}
              >
                👥
              </div>

              {/* Number */}
              <div className="relative mt-4 text-2xl font-black text-gray-900 sm:mt-5 sm:text-3xl">
                {count === 300 ? "300+" : count}
              </div>

              <div className="relative mt-1 text-xs font-medium text-[#777] sm:text-sm">
                հյուր
              </div>

              {isSelected && (
                <div className="relative mt-3 text-xs font-bold text-[#f28c28] sm:mt-4 sm:text-sm">
                  ✓ Ընտրված է
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom number */}
      <div className="mx-auto mt-5 max-w-xl rounded-[24px] border border-dashed border-black/[0.12] bg-white/80 p-5 shadow-[0_8px_30px_rgba(31,31,31,.03)] sm:mt-8 sm:rounded-3xl sm:p-8">
        <h2 className="text-lg font-black text-gray-900 sm:text-xl">
          Կոնկրետ թիվ ունե՞ս։
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#666] sm:text-base">
          Կարող ես գրել հյուրերի ճշգրիտ քանակը։
        </p>

        <input
          id="guest-count"
          type="number"
          min="1"
          max="10000"
          value={guests || ""}
          onChange={(event) => {
            const value = Number(event.target.value);

            if (value > 10000) {
              onSelectGuests(10000);
              return;
            }

            onSelectGuests(value);
          }}
          placeholder="Օրինակ՝ 145"
          inputMode="numeric"
          className="mt-5 min-h-14 w-full rounded-2xl border border-black/[0.08] bg-[#fffaf2] px-4 text-base text-gray-900 outline-none transition-all duration-200 hover:border-[#f28c28]/30 focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10 sm:px-5 sm:text-lg"
        />

        {guests > 0 && (
          <div className="mt-4 rounded-2xl bg-[#fff3e3] px-4 py-3">
            <p className="text-sm font-bold text-[#f28c28]">
              Հյուրերի քանակ՝ {guests.toLocaleString("hy-AM")}
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
          disabled={!guests || guests < 1}
          onClick={onNext}
          className="min-h-14 w-full rounded-2xl bg-[#f28c28] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7817] hover:shadow-[0_15px_35px_rgba(242,140,40,.24)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[160px] sm:rounded-full sm:text-base"
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
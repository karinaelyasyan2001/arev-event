type DateStepProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function DateStep({
  selectedDate,
  onSelectDate,
  onNext,
  onBack,
}: DateStepProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* HEADER */}
      <div className="mx-auto max-w-3xl px-1 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f28c28] sm:text-sm sm:tracking-[0.25em]">
          ՔԱՅԼ 02
        </p>

        <h1 className="mt-4 text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 min-[380px]:text-[2.2rem] sm:text-4xl md:text-5xl">
          Ե՞րբ է քո մեծ օրը։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666] sm:mt-5 sm:text-lg sm:leading-8">
          Ընտրիր միջոցառման ամսաթիվը։ Հետագայում այստեղ կարող ենք ցույց տալ
          նաև մեր մասնագետների ազատ և զբաղված օրերը։
        </p>
      </div>

      {/* DATE CARD */}
      <div className="mx-auto mt-8 max-w-xl rounded-[24px] border border-black/[0.08] bg-white p-5 shadow-[0_10px_35px_rgba(31,31,31,.05)] sm:mt-12 sm:rounded-[2rem] sm:p-8">
        <label
          htmlFor="event-date"
          className="block text-sm font-bold text-gray-900 sm:text-base"
        >
          Միջոցառման ամսաթիվ
        </label>

        <input
          id="event-date"
          type="date"
          min={today}
          value={selectedDate}
          onChange={(event) => onSelectDate(event.target.value)}
          className="mt-4 min-h-14 w-full rounded-2xl border border-black/[0.08] bg-[#fffaf2] px-4 text-base text-gray-900 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10 sm:px-5 sm:py-4 sm:text-lg"
        />

        {/* Selected date */}
        {selectedDate && (
          <div className="mt-5 rounded-2xl border border-orange-100 bg-[#fff3e3] p-4 sm:mt-6 sm:p-5">
            <p className="text-xs font-medium text-[#777] sm:text-sm">
              Ընտրված ամսաթիվ
            </p>

            <p className="mt-1 text-lg font-black text-gray-900 sm:text-xl">
              {new Date(
                `${selectedDate}T12:00:00`
              ).toLocaleDateString("hy-AM", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
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
          disabled={!selectedDate}
          onClick={onNext}
          className="min-h-14 w-full rounded-2xl bg-[#f28c28] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7817] hover:shadow-[0_15px_35px_rgba(242,140,40,.24)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[160px] sm:rounded-full sm:text-base"
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
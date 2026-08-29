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
    <section className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 02
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Ե՞րբ է քո մեծ օրը։
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#666]">
          Ընտրիր միջոցառման ամսաթիվը։ Հետագայում այստեղ կարող ենք ցույց տալ
          նաև մեր մասնագետների ազատ և զբաղված օրերը։
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <label
          htmlFor="event-date"
          className="block text-sm font-semibold"
        >
          Միջոցառման ամսաթիվ
        </label>

        <input
          id="event-date"
          type="date"
          min={today}
          value={selectedDate}
          onChange={(event) => onSelectDate(event.target.value)}
          className="mt-4 w-full rounded-2xl border border-black/10 bg-[#fffaf2] px-5 py-4 text-lg outline-none transition focus:border-[#f28c28]"
        />

        {selectedDate && (
          <div className="mt-6 rounded-2xl bg-[#fff3e3] p-5">
            <p className="text-sm text-[#777]">
              Ընտրված ամսաթիվ
            </p>

            <p className="mt-1 text-xl font-bold">
              {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                "hy-AM",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-black/10 bg-white px-7 py-3 font-semibold transition hover:bg-black hover:text-white"
        >
          ← Հետ
        </button>

        <button
          type="button"
          disabled={!selectedDate}
          onClick={onNext}
          className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white transition hover:bg-[#df7817] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Հաջորդը →
        </button>
      </div>
    </section>
  );
}
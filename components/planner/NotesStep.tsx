type NotesStepProps = {
  notes: string;
  onChangeNotes: (notes: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function NotesStep({
  notes,
  onChangeNotes,
  onNext,
  onBack,
}: NotesStepProps) {
  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* Title */}
      <div className="mx-auto max-w-3xl px-1 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f28c28] sm:text-sm sm:tracking-[0.25em]">
          ՔԱՅԼ 08
        </p>

        <h1 className="mt-4 text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 min-[380px]:text-[2.2rem] sm:text-4xl md:text-5xl">
          Ասա մեզ քո գաղափարները։
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666] sm:mt-5 sm:text-lg sm:leading-8">
          Այստեղ գրիր ամեն ինչ։ Նույնիսկ եթե դեռ վստահ չես։
          Արևը կարող է օգնել գաղափարդ վերածել իրական պլանի։
        </p>
      </div>

      {/* Notes card */}
      <div className="mt-8 rounded-[24px] border border-black/[0.08] bg-white p-5 shadow-[0_10px_35px_rgba(31,31,31,.05)] sm:mt-12 sm:rounded-[2rem] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <label
              htmlFor="event-notes"
              className="text-base font-black text-gray-900 sm:text-lg"
            >
              Քո նշումները
            </label>

            <p className="mt-1 text-xs leading-5 text-[#888] sm:text-sm">
              Գրիր ցանկացած մանրուք, որը կարևոր է քեզ համար։
            </p>
          </div>

          <div className="hidden shrink-0 rounded-full bg-[#fff3e3] px-3 py-1.5 text-xs font-bold text-[#f28c28] sm:block">
            {notes.length} նիշ
          </div>
        </div>

        <textarea
          id="event-notes"
          value={notes}
          onChange={(event) => onChangeNotes(event.target.value)}
          placeholder="Օրինակ՝ ուզում եմ շատ ծաղիկներ, տաք լուսավորություն, հատուկ ֆոտոզոնա, հյուրերի համար անակնկալ..."
          maxLength={3000}
          className="mt-5 min-h-[240px] w-full resize-y rounded-[20px] border border-black/[0.08] bg-[#fffaf2] p-4 text-sm leading-7 text-gray-900 outline-none transition-all duration-200 hover:border-[#f28c28]/30 focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10 sm:min-h-[300px] sm:rounded-3xl sm:p-6 sm:text-base"
        />

        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#888] sm:text-sm">
          <span>
            {notes.length === 0
              ? "Կարող ես գրել ազատ ձևով։"
              : "Ձեր գաղափարը պահպանվում է։"}
          </span>

          <span className="shrink-0 font-medium">
            {notes.length}/3000
          </span>
        </div>
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
          onClick={onNext}
          className="min-h-14 w-full rounded-2xl bg-[#f28c28] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(242,140,40,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df7817] hover:shadow-[0_15px_35px_rgba(242,140,40,.24)] sm:w-auto sm:min-w-[180px] sm:rounded-full sm:text-base"
        >
          Ամփոփել →
        </button>
      </div>
    </section>
  );
}
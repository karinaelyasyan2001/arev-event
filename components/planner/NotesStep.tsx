
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
    <section className="mx-auto w-full max-w-4xl px-6 py-16">

      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 08
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Ասա մեզ քո գաղափարները։
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#666]">
          Այստեղ գրիր ամեն ինչ։ Նույնիսկ եթե դեռ վստահ չես։
          Արևը կարող է օգնել գաղափարդ վերածել իրական պլանի։
        </p>

      </div>

      <div className="mt-12 rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">

        <label
          htmlFor="event-notes"
          className="font-semibold"
        >
          Քո նշումները
        </label>

        <textarea
          id="event-notes"
          value={notes}
          onChange={(event) =>
            onChangeNotes(event.target.value)
          }
          placeholder="Օրինակ՝ ուզում եմ շատ ծաղիկներ, տաք լուսավորություն, հատուկ ֆոտոզոնա, հյուրերի համար անակնկալ..."
          className="mt-5 min-h-[280px] w-full resize-none rounded-3xl border border-black/10 bg-[#fffaf2] p-6 leading-7 outline-none transition focus:border-[#f28c28]"
        />

        <div className="mt-4 text-sm text-[#888]">
          {notes.length} նիշ
        </div>

      </div>

      <div className="mt-10 flex justify-between">

        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-black/10 bg-white px-7 py-3 font-semibold hover:bg-black hover:text-white"
        >
          ← Հետ
        </button>

        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white hover:bg-[#df7817]"
        >
          Ամփոփել →
        </button>

      </div>

    </section>
  );
}


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
    <section className="mx-auto w-full max-w-5xl px-6 py-16">

      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 06
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Ի՞նչ ծառայություններ են պետք։
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#666]">
          Ընտրիր այն ամենը, ինչ ցանկանում ես ունենալ քո միջոցառմանը։
          Հետագայում այստեղ կարող ենք ցույց տալ համապատասխան մասնագետներին։
        </p>

      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

        {services.map(([id, icon, title]) => {
          const selected = selectedServices.includes(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggleService(id)}
              className={`rounded-3xl border p-6 text-left transition duration-300 ${
                selected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-lg"
                  : "border-black/10 bg-white hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between">

                <span className="text-3xl">
                  {icon}
                </span>

                {selected && (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f28c28] text-sm text-white">
                    ✓
                  </span>
                )}

              </div>

              <h2 className="mt-5 font-bold">
                {title}
              </h2>

            </button>
          );
        })}

      </div>

      <div className="mt-10 text-center text-sm text-[#777]">
        Ընտրված է՝{" "}
        <span className="font-bold text-[#252525]">
          {selectedServices.length}
        </span>{" "}
        ծառայություն
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
  disabled={selectedServices.length === 0}
  onClick={onNext}
  className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white hover:bg-[#df7817] disabled:cursor-not-allowed disabled:opacity-40"
>
  Հաջորդը →
</button>

      </div>

    </section>
  );
}

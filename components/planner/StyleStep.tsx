
type StyleStepProps = {
  style: string;
  onSelectStyle: (style: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const styles = [
  ["elegant", "✨", "Elegant", "Նրբագեղ և դասական"],
  ["modern", "🖤", "Modern", "Ժամանակակից և մինիմալ"],
  ["romantic", "🌹", "Romantic", "Ռոմանտիկ և ջերմ"],
  ["luxury", "👑", "Luxury", "Շքեղ և տպավորիչ"],
  ["nature", "🌿", "Nature", "Բնական և հանգիստ"],
  ["colorful", "🎨", "Colorful", "Գունավոր և ուրախ"],
  ["traditional", "🏺", "Traditional", "Ավանդական և հայկական"],
  ["creative", "💡", "Creative", "Ամբողջությամբ քո գաղափարով"],
];

export default function StyleStep({
  style,
  onSelectStyle,
  onNext,
  onBack,
}: StyleStepProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">

      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f28c28]">
          ՔԱՅԼ 07
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Ինչպիսի՞ մթնոլորտ ես պատկերացնում։
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-[#666]">
          Ընտրիր այն ոճը, որը ամենամոտն է քո պատկերացմանը։
        </p>

      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">

        {styles.map(([id, icon, title, description]) => {
          const selected = style === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectStyle(id)}
              className={`rounded-3xl border p-6 text-left transition duration-300 ${
                selected
                  ? "border-[#f28c28] bg-[#fff3e3] shadow-lg"
                  : "border-black/10 bg-white hover:-translate-y-1 hover:shadow-lg"
              }`}
            >

              <div className="text-4xl">
                {icon}
              </div>

              <h2 className="mt-5 font-bold">
                {title}
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                {description}
              </p>

            </button>
          );
        })}

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
          disabled={!style}
          onClick={onNext}
          className="rounded-full bg-[#f28c28] px-8 py-4 font-semibold text-white hover:bg-[#df7817] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Հաջորդը →
        </button>

      </div>

    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const eventTypes = [
  { id: "wedding", name: "Հարսանիք", base: 300000 },
  { id: "birthday", name: "Ծննդյան տարեդարձ", base: 150000 },
  { id: "engagement", name: "Նշանադրություն", base: 200000 },
  { id: "corporate", name: "Կորպորատիվ միջոցառում", base: 250000 },
  { id: "party", name: "Խնջույք", base: 180000 },
];

const locations = [
  { id: "hall", name: "Սրահ", price: 300000 },
  { id: "restaurant", name: "Ռեստորան", price: 250000 },
  { id: "hotel", name: "Հյուրանոց", price: 400000 },
  { id: "outdoor", name: "Բացօթյա", price: 200000 },
  { id: "home", name: "Տանը", price: 50000 },
];

const services = [
  { id: "photo", name: "📸 Լուսանկարիչ", price: 120000 },
  { id: "video", name: "🎥 Տեսանկարահանում", price: 180000 },
  { id: "dj", name: "🎧 DJ", price: 100000 },
  { id: "host", name: "🎤 Հաղորդավար", price: 150000 },
  { id: "decor", name: "🌸 Դեկորացիա", price: 200000 },
  { id: "music", name: "🎵 Երաժշտական խումբ", price: 250000 },
  { id: "makeup", name: "💄 Դիմահարդարում", price: 35000 },
  { id: "flowers", name: "💐 Ծաղիկներ", price: 50000 },
];

export default function CalculatorPage() {
  const [eventType, setEventType] = useState("wedding");
  const [guests, setGuests] = useState(50);
  const [location, setLocation] = useState("hall");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const total = useMemo(() => {
    const event = eventTypes.find((item) => item.id === eventType);
    const place = locations.find((item) => item.id === location);

    const servicesTotal = services
      .filter((service) => selectedServices.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);

    const guestCost = guests * 5000;

    return (event?.base ?? 0) + (place?.price ?? 0) + guestCost + servicesTotal;
  }, [eventType, guests, location, selectedServices]);

  function toggleService(id: string) {
    setSelectedServices((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] py-16">
      <div className="arev-container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f28c28]">
              Արև Իվենթ
            </p>

            <h1 className="arev-title">
              Միջոցառման բյուջեի հաշվիչ
            </h1>

            <p className="arev-subtitle mx-auto mt-4 max-w-2xl">
              Նշիր միջոցառման հիմնական տվյալները և ստացիր նախնական
              բյուջեի հաշվարկ։
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="arev-card">
              <div className="space-y-7">
                <div>
                  <label className="mb-2 block font-semibold">
                    Միջոցառման տեսակ
                  </label>

                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="arev-select"
                  >
                    {eventTypes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Հյուրերի քանակ
                  </label>

                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={guests}
                    onChange={(e) =>
                      setGuests(Math.max(1, Number(e.target.value)))
                    }
                    className="arev-input"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Միջոցառման վայր
                  </label>

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="arev-select"
                  >
                    {locations.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-3 block font-semibold">
                    Լրացուցիչ ծառայություններ
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((service) => {
                      const selected = selectedServices.includes(service.id);

                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-[#f28c28] bg-orange-50"
                              : "border-gray-200 bg-white hover:border-[#f28c28]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">
                              {service.name}
                            </span>

                            <span className="text-sm text-gray-500">
                              {service.price.toLocaleString("hy-AM")} ֏
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <aside className="arev-card h-fit lg:sticky lg:top-24">
              <p className="text-sm font-medium text-gray-500">
                Նախնական արժեք
              </p>

              <div className="mt-3">
                <div className="text-4xl font-bold text-[#f28c28]">
                  {total.toLocaleString("hy-AM")} ֏
                </div>
              </div>

              <div className="my-6 h-px bg-gray-200" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span>Հյուրեր</span>
                  <strong>{guests}</strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Ծառայություններ</span>
                  <strong>{selectedServices.length}</strong>
                </div>
              </div>

              <p className="mt-6 text-sm leading-6 text-gray-500">
                Սա նախնական հաշվարկ է։ Վերջնական արժեքը կարող է փոխվել՝
                կախված ընտրված ծառայություններից, մասնագետներից և
                միջոցառման պայմաններից։
              </p>

              <Link
                href="/planner"
                className="arev-button mt-6 flex w-full justify-center"
              >
                Կազմակերպել միջոցառում →
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
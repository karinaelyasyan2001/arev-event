"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type EventData = {
  id: string;
  title: string;
  event_type: string | null;
  custom_event: string | null;
  event_date: string | null;
  location: string | null;
  custom_location: string | null;
  guests: number | null;
  budget: number | null;
  services: string[] | null;
  style: string | null;
  notes: string | null;
  status: string | null;
};

const eventTypes = [
  { id: "wedding", title: "Հարսանիք", icon: "💍" },
  { id: "birthday", title: "Ծնունդ", icon: "🎂" },
  { id: "engagement", title: "Նշանադրություն", icon: "💎" },
  { id: "corporate", title: "Կորպորատիվ", icon: "🏢" },
  { id: "children", title: "Մանկական", icon: "🎈" },
  { id: "party", title: "Փարթի", icon: "🎉" },
  { id: "graduation", title: "Ավարտական", icon: "🎓" },
  { id: "proposal", title: "Ամուսնության առաջարկ", icon: "❤️" },
];

const locations = [
  { id: "yerevan", title: "Երևան", icon: "🏙️" },
  { id: "abovyan", title: "Աբովյան", icon: "📍" },
  { id: "echmiadzin", title: "Էջմիածին", icon: "⛪" },
  { id: "dilijan", title: "Դիլիջան", icon: "🌲" },
  { id: "tsaghkadzor", title: "Ծաղկաձոր", icon: "🏔️" },
  { id: "garni", title: "Գառնի", icon: "🏛️" },
  { id: "other", title: "Այլ վայր", icon: "✨" },
];

const services = [
  { id: "host", title: "Հաղորդավար", icon: "🎤" },
  { id: "dj", title: "DJ", icon: "🎧" },
  { id: "photo", title: "Լուսանկարչություն", icon: "📸" },
  { id: "video", title: "Տեսանկարահանում", icon: "🎥" },
  { id: "decor", title: "Դեկորացիա", icon: "🌸" },
  { id: "lighting", title: "Լուսավորություն", icon: "💡" },
  { id: "music", title: "Երաժշտություն", icon: "🎵" },
  { id: "flowers", title: "Ծաղիկներ", icon: "💐" },
  { id: "cake", title: "Տորթ", icon: "🎂" },
  { id: "catering", title: "Քեյթրինգ", icon: "🍽️" },
  { id: "makeup", title: "Դիմահարդարում", icon: "💄" },
  { id: "effects", title: "Հատուկ էֆեկտներ", icon: "✨" },
];

const styles = [
  { id: "elegant", title: "Էլեգանտ", icon: "🥂" },
  { id: "modern", title: "Ժամանակակից", icon: "🏙️" },
  { id: "romantic", title: "Ռոմանտիկ", icon: "❤️" },
  { id: "luxury", title: "Luxury", icon: "👑" },
  { id: "nature", title: "Բնության ոճ", icon: "🌿" },
  { id: "colorful", title: "Գունավոր", icon: "🌈" },
  { id: "traditional", title: "Ավանդական", icon: "🏛️" },
  { id: "creative", title: "Կրեատիվ", icon: "🎨" },
];

const statuses = [
  { id: "draft", title: "Սևագիր" },
  { id: "planned", title: "Պլանավորված" },
  { id: "confirmed", title: "Հաստատված" },
  { id: "completed", title: "Ավարտված" },
  { id: "cancelled", title: "Չեղարկված" },
];

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();

  const rawId = params.id;
  const eventId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [event, setEvent] = useState<EventData | null>(null);

  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [customEvent, setCustomEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [style, setStyle] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) {
        setError("Միջոցառման ID-ն չի գտնվել։");
        setLoading(false);
        return;
      }

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw new Error(userError.message);
        }

        if (!user) {
          router.push("/login");
          return;
        }

        const { data, error: eventError } = await supabase
          .from("events")
          .select("*")
          .eq("id", eventId)
          .eq("user_id", user.id)
          .single();

        if (eventError) {
          throw new Error(
            eventError.message || "Միջոցառումը չգտնվեց։"
          );
        }

        if (!data) {
          throw new Error("Միջոցառումը չգտնվեց։");
        }

        const eventData = data as EventData;

        setEvent(eventData);

        setTitle(eventData.title || "");
        setEventType(eventData.event_type || "");
        setCustomEvent(eventData.custom_event || "");
        setEventDate(eventData.event_date || "");
        setLocation(eventData.location || "");
        setCustomLocation(eventData.custom_location || "");
        setGuests(
          eventData.guests !== null
            ? String(eventData.guests)
            : ""
        );
        setBudget(
          eventData.budget !== null
            ? String(eventData.budget)
            : ""
        );
        setSelectedServices(eventData.services || []);
        setStyle(eventData.style || "");
        setNotes(eventData.notes || "");
        setStatus(eventData.status || "draft");
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Միջոցառումը բեռնել չհաջողվեց։";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId, router]);

  const toggleService = (serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((item) => item !== serviceId)
        : [...current, serviceId]
    );
  };

  const saveChanges = async () => {
    if (!eventId || saving) return;

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      if (!user) {
        router.push("/login");
        return;
      }

      const finalTitle =
        customEvent.trim() ||
        title.trim() ||
        eventTypes.find((item) => item.id === eventType)?.title ||
        "Իմ միջոցառումը";

      const { error: updateError } = await supabase
        .from("events")
        .update({
          title: finalTitle,
          event_type: eventType || null,
          custom_event: customEvent.trim() || null,
          event_date: eventDate || null,
          location: location || null,
          custom_location: customLocation.trim() || null,
          guests:
            guests.trim() !== ""
              ? Number(guests)
              : null,
          budget:
            budget.trim() !== ""
              ? Number(budget)
              : null,
          services: selectedServices,
          style: style || null,
          notes: notes.trim() || null,
          status: status || "draft",
          updated_at: new Date().toISOString(),
        })
        .eq("id", eventId)
        .eq("user_id", user.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setSuccess(true);

      setTimeout(() => {
        router.push(`/events/${eventId}`);
        router.refresh();
      }, 700);
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Փոփոխությունները պահպանել չհաջողվեց։";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-black/5 bg-white p-10 text-center shadow-lg">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#f28c28]/20 border-t-[#f28c28]" />

            <h1 className="text-2xl font-bold text-gray-900">
              Բեռնվում է...
            </h1>

            <p className="mt-2 text-gray-500">
              Միջոցառման տվյալները բեռնվում են։
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !event) {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center">
            <div className="text-5xl">⚠️</div>

            <h1 className="mt-5 text-2xl font-bold text-red-800">
              Չհաջողվեց բեռնել միջոցառումը
            </h1>

            <p className="mt-3 leading-7 text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => router.back()}
              className="mt-6 rounded-2xl bg-[#f28c28] px-7 py-4 font-bold text-white transition hover:bg-[#e77d18]"
            >
              ← Վերադառնալ
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] px-4 py-8 text-[#252525] md:px-6 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* HEADER */}

        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.push(`/events/${eventId}`)}
            className="mb-6 text-sm font-semibold text-gray-500 transition hover:text-[#f28c28]"
          >
            ← Վերադառնալ միջոցառմանը
          </button>

          <div className="rounded-[2rem] bg-[#f28c28] px-6 py-8 text-white shadow-xl md:px-10">
            <p className="text-sm font-medium text-white/80">
              Միջոցառման կառավարում
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-5xl">
              Խմբագրել միջոցառումը
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-white/85">
              Փոփոխեք ձեր միջոցառման տվյալները և պահպանեք
              փոփոխությունները։
            </p>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">
            <strong>Սխալ․</strong> {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
            ✓ Փոփոխությունները պահպանվեցին։ Վերադարձ դեպի
            միջոցառման էջ...
          </div>
        )}

        <div className="space-y-6">
          {/* BASIC INFORMATION */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <SectionHeader
              icon="🎯"
              title="Հիմնական տվյալներ"
              description="Ընտրեք միջոցառման տեսակը և անվանումը։"
            />

            <div className="mt-8">
              <label className="mb-3 block text-sm font-bold text-gray-700">
                Միջոցառման անվանում
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Օրինակ՝ Աննայի հարսանիքը"
                className="w-full rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
              />
            </div>

            <div className="mt-8">
              <label className="mb-4 block text-sm font-bold text-gray-700">
                Միջոցառման տեսակ
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {eventTypes.map((item) => {
                  const selected = eventType === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setEventType(item.id);
                        setCustomEvent("");
                      }}
                      className={`rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-[#f28c28] bg-[#f28c28]/10 shadow-md"
                          : "border-black/10 bg-gray-50 hover:border-[#f28c28]/50 hover:bg-white"
                      }`}
                    >
                      <span className="text-2xl">
                        {item.icon}
                      </span>

                      <span className="mt-2 block font-semibold text-gray-900">
                        {item.title}
                      </span>

                      {selected && (
                        <span className="mt-1 block text-xs font-bold text-[#f28c28]">
                          Ընտրված է ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-sm font-bold text-gray-700">
                Այլ միջոցառում
              </label>

              <input
                type="text"
                value={customEvent}
                onChange={(e) => {
                  setCustomEvent(e.target.value);

                  if (e.target.value.trim()) {
                    setEventType("");
                  }
                }}
                placeholder="Եթե ցանկում չկա, գրեք ձեր տարբերակը"
                className="w-full rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
              />
            </div>
          </section>

          {/* DATE */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <SectionHeader
              icon="📅"
              title="Ամսաթիվ"
              description="Ընտրեք միջոցառման օրը։"
            />

            <div className="mt-8">
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
              />
            </div>
          </section>

          {/* LOCATION */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <SectionHeader
              icon="📍"
              title="Վայր"
              description="Ընտրեք միջոցառման անցկացման վայրը։"
            />

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {locations.map((item) => {
                const selected = location === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setLocation(item.id);

                      if (item.id !== "other") {
                        setCustomLocation("");
                      }
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-[#f28c28] bg-[#f28c28]/10 shadow-md"
                        : "border-black/10 bg-gray-50 hover:border-[#f28c28]/50 hover:bg-white"
                    }`}
                  >
                    <span className="text-2xl">
                      {item.icon}
                    </span>

                    <span className="mt-2 block font-semibold text-gray-900">
                      {item.title}
                    </span>

                    {selected && (
                      <span className="mt-1 block text-xs font-bold text-[#f28c28]">
                        Ընտրված է ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-sm font-bold text-gray-700">
                Այլ վայր
              </label>

              <input
                type="text"
                value={customLocation}
                onChange={(e) => {
                  setCustomLocation(e.target.value);

                  if (e.target.value.trim()) {
                    setLocation("other");
                  }
                }}
                placeholder="Օրինակ՝ Արմավիրի մարզ, հատուկ վայր"
                className="w-full rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
              />
            </div>
          </section>

          {/* GUESTS + BUDGET */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <SectionHeader
              icon="👥"
              title="Հյուրեր և բյուջե"
              description="Կարգավորեք միջոցառման հիմնական թվային տվյալները։"
            />

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-bold text-gray-700">
                  Հյուրերի քանակ
                </label>

                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Օրինակ՝ 120"
                  className="w-full rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-bold text-gray-700">
                  Բյուջե՝ դրամ
                </label>

                <input
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Օրինակ՝ 1500000"
                  className="w-full rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
                />
              </div>
            </div>
          </section>

          {/* SERVICES */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <SectionHeader
              icon="✨"
              title="Ծառայություններ"
              description="Ընտրեք այն ծառայությունները, որոնք անհրաժեշտ են ձեր միջոցառմանը։"
            />

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const selected =
                  selectedServices.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-[#f28c28] bg-[#f28c28]/10 shadow-md"
                        : "border-black/10 bg-gray-50 hover:border-[#f28c28]/50 hover:bg-white"
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                      {service.icon}
                    </span>

                    <span className="font-semibold text-gray-900">
                      {service.title}
                    </span>

                    <span className="ml-auto text-lg">
                      {selected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* STYLE */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <SectionHeader
              icon="🎨"
              title="Միջոցառման ոճ"
              description="Ընտրեք այն տրամադրությունն ու ոճը, որը ցանկանում եք։"
            />

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {styles.map((item) => {
                const selected = style === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStyle(item.id)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      selected
                        ? "border-[#f28c28] bg-[#f28c28]/10 shadow-md"
                        : "border-black/10 bg-gray-50 hover:border-[#f28c28]/50 hover:bg-white"
                    }`}
                  >
                    <span className="text-2xl">
                      {item.icon}
                    </span>

                    <span className="mt-3 block font-semibold text-gray-900">
                      {item.title}
                    </span>

                    {selected && (
                      <span className="mt-1 block text-xs font-bold text-[#f28c28]">
                        Ընտրված է ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* NOTES */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <SectionHeader
              icon="📝"
              title="Լրացուցիչ նշումներ"
              description="Գրեք ցանկացած կարևոր մանրուք, որը ցանկանում եք պահպանել։"
            />

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={7}
              placeholder="Օրինակ՝ ցանկանում եմ բացօթյա միջոցառում, հատուկ երաժշտություն, դեկորի նախընտրություններ և այլն..."
              className="mt-8 w-full resize-y rounded-2xl border border-black/10 bg-gray-50 px-5 py-4 leading-7 outline-none transition focus:border-[#f28c28] focus:bg-white focus:ring-4 focus:ring-[#f28c28]/10"
            />
          </section>

          {/* STATUS */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <SectionHeader
              icon="📊"
              title="Կարգավիճակ"
              description="Փոխեք միջոցառման ընթացիկ կարգավիճակը։"
            />

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {statuses.map((item) => {
                const selected = status === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStatus(item.id)}
                    className={`rounded-2xl border px-4 py-4 font-semibold transition ${
                      selected
                        ? "border-[#f28c28] bg-[#f28c28]/10 text-[#d66f12] shadow-md"
                        : "border-black/10 bg-gray-50 text-gray-700 hover:border-[#f28c28]/50 hover:bg-white"
                    }`}
                  >
                    {item.title}

                    {selected && (
                      <span className="ml-2">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ACTIONS */}

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-lg md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() =>
                  router.push(`/events/${eventId}`)
                }
                disabled={saving}
                className="rounded-2xl border border-black/10 px-7 py-4 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Չեղարկել
              </button>

              <button
                type="button"
                onClick={saveChanges}
                disabled={saving || success}
                className="rounded-2xl bg-[#f28c28] px-8 py-4 font-bold text-white shadow-lg shadow-[#f28c28]/20 transition hover:-translate-y-0.5 hover:bg-[#e77d18] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Պահպանվում է..."
                  : success
                    ? "Պահպանված է ✓"
                    : "Պահպանել փոփոխությունները"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f28c28]/10 text-2xl">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          {title}
        </h2>

        <p className="mt-1 leading-6 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
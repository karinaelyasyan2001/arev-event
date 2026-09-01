"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type EventData = {
  id: string;
  user_id: string;
  title: string;
  event_type: string | null;
  custom_event: string | null;
  event_date: string | null;
  location: string | null;
  custom_location: string | null;
  guests: number | null;
  budget: number | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  notes: string | null;
  services: string[] | null;
  style: string | null;
};

const eventNames: Record<string, string> = {
  wedding: "Հարսանիք",
  birthday: "Ծնունդ",
  engagement: "Նշանադրություն",
  corporate: "Կորպորատիվ միջոցառում",
  children: "Մանկական միջոցառում",
  party: "Փարթի",
  graduation: "Ավարտական միջոցառում",
  proposal: "Ամուսնության առաջարկ",
};

const locationNames: Record<string, string> = {
  yerevan: "Երևան",
  abovyan: "Աբովյան",
  echmiadzin: "Էջմիածին",
  dilijan: "Դիլիջան",
  tsaghkadzor: "Ծաղկաձոր",
  garni: "Գառնի",
  other: "Այլ վայր",
};

const serviceNames: Record<string, string> = {
  host: "Հաղորդավար",
  dj: "DJ",
  photo: "Լուսանկարչություն",
  video: "Տեսանկարահանում",
  decor: "Դեկորացիա",
  lighting: "Լուսավորություն",
  music: "Երաժշտություն",
  flowers: "Ծաղիկներ",
  cake: "Տորթ",
  catering: "Քեյթրինգ",
  makeup: "Դիմահարդարում",
  effects: "Հատուկ էֆեկտներ",
};

const styleNames: Record<string, string> = {
  elegant: "Էլեգանտ",
  modern: "Ժամանակակից",
  romantic: "Ռոմանտիկ",
  luxury: "Luxury",
  nature: "Բնության ոճ",
  colorful: "Գունավոր",
  traditional: "Ավանդական",
  creative: "Կրեատիվ",
};

const statusNames: Record<string, string> = {
  draft: "Սևագիր",
  planned: "Պլանավորված",
  confirmed: "Հաստատված",
  completed: "Ավարտված",
  cancelled: "Չեղարկված",
};

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) {
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
          .eq("id", id)
          .eq("user_id", user.id)
          .single();

        if (eventError) {
          throw new Error(eventError.message);
        }

        setEvent(data as EventData);
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
  }, [id, router]);

  const deleteEvent = async () => {
    if (!event || deleting) {
      return;
    }

    const confirmed = window.confirm(
      "Վստա՞հ եք, որ ցանկանում եք ջնջել այս միջոցառումը։ Այս գործողությունը հնարավոր չէ հետարկել։"
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const { error: deleteError } = await supabase
        .from("events")
        .delete()
        .eq("id", event.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      router.push("/planner");
      router.refresh();
    } catch (deleteErr) {
      const message =
        deleteErr instanceof Error
          ? deleteErr.message
          : "Միջոցառումը ջնջել չհաջողվեց։";

      setError(message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="animate-pulse">
            <div className="h-8 w-32 rounded bg-black/10" />
            <div className="mt-6 h-14 w-2/3 rounded bg-black/10" />

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <div className="h-32 rounded-3xl bg-black/10" />
              <div className="h-32 rounded-3xl bg-black/10" />
              <div className="h-32 rounded-3xl bg-black/10" />
              <div className="h-32 rounded-3xl bg-black/10" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf2] px-6">
        <div className="w-full max-w-xl rounded-[2rem] border border-red-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
            ⚠️
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Միջոցառումը չի գտնվել
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            {error || "Տվյալ միջոցառումը գոյություն չունի կամ հասանելի չէ։"}
          </p>

          <button
            type="button"
            onClick={() => router.push("/planner")}
            className="mt-7 rounded-2xl bg-[#f28c28] px-7 py-4 font-bold text-white transition hover:bg-[#e77d18]"
          >
            ← Վերադառնալ Planner
          </button>
        </div>
      </main>
    );
  }

  const title =
    event.custom_event?.trim() ||
    event.title ||
    eventNames[event.event_type || ""] ||
    "Իմ միջոցառումը";

  const location =
    event.custom_location?.trim() ||
    locationNames[event.location || ""] ||
    event.location ||
    "Չի նշվել";

  const formattedDate = event.event_date
    ? new Intl.DateTimeFormat("hy-AM", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(`${event.event_date}T00:00:00`))
    : "Չի նշվել";

  const formattedBudget =
    event.budget && event.budget > 0
      ? `${new Intl.NumberFormat("hy-AM").format(event.budget)} ֏`
      : "Չի նշվել";

  const formattedGuests =
    event.guests && event.guests > 0
      ? `${event.guests}+ հյուր`
      : "Չի նշվել";

  const style = styleNames[event.style || ""] || event.style || "Չի նշվել";

  const services = event.services || [];

  const status =
    statusNames[event.status || ""] ||
    event.status ||
    "Սևագիր";

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#252525]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-16">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => router.push("/planner")}
            className="w-fit rounded-2xl border border-black/10 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            ← Planner
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push(`/events/${event.id}/edit`)}
              className="rounded-2xl border border-[#f28c28] bg-white px-5 py-3 font-semibold text-[#d66f12] transition hover:bg-[#f28c28]/10"
            >
              ✏️ Խմբագրել
            </button>

            <button
              type="button"
              onClick={deleteEvent}
              disabled={deleting}
              className="rounded-2xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Ջնջվում է..." : "🗑 Ջնջել"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            {error}
          </div>
        )}

        {/* HERO */}
        <section className="overflow-hidden rounded-[2.5rem] bg-[#f28c28] p-7 text-white shadow-2xl shadow-[#f28c28]/20 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                Ձեր միջոցառումը
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                {title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
                Ձեր միջոցառման ամբողջ պլանը մեկ տեղում։
              </p>
            </div>

            <div className="w-fit rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">
              <p className="text-xs font-medium text-white/70">
                Կարգավիճակ
              </p>

              <p className="mt-1 font-bold">
                {status}
              </p>
            </div>
          </div>
        </section>

        {/* INFORMATION */}
        <section className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon="📅"
            title="Ամսաթիվ"
            value={formattedDate}
          />

          <InfoCard
            icon="📍"
            title="Վայր"
            value={location}
          />

          <InfoCard
            icon="👥"
            title="Հյուրեր"
            value={formattedGuests}
          />

          <InfoCard
            icon="💰"
            title="Բյուջե"
            value={formattedBudget}
          />
        </section>

        {/* SERVICES */}
        <section className="mt-7 rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm md:p-9">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f28c28]/10 text-2xl">
              ✨
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Ծառայություններ
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Ձեր միջոցառման համար ընտրված ծառայությունները
              </p>
            </div>
          </div>

          {services.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {services.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl bg-[#f28c28]/10 px-5 py-3 font-semibold text-[#c9670d]"
                >
                  ✓ {serviceNames[service] || service}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              Ծառայություններ չեն ընտրվել։
            </p>
          )}
        </section>

        {/* STYLE + NOTES */}
        <section className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm md:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f28c28]/10 text-2xl">
              🎨
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Միջոցառման ոճ
            </h2>

            <p className="mt-4 rounded-2xl bg-gray-50 px-5 py-4 font-semibold text-gray-800">
              {style}
            </p>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm md:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f28c28]/10 text-2xl">
              📝
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Լրացուցիչ նշումներ
            </h2>

            <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-600">
              {event.notes?.trim() || "Լրացուցիչ նշումներ չկան։"}
            </p>
          </div>
        </section>

        {/* FOOTER ACTIONS */}
        <section className="mt-7 rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm md:p-9">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Պատրա՞ստ եք շարունակել։
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Կարող եք ցանկացած պահի խմբագրել միջոցառման տվյալները։
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push(`/events/${event.id}/edit`)}
              className="rounded-2xl bg-[#f28c28] px-7 py-4 font-bold text-white shadow-lg shadow-[#f28c28]/20 transition hover:-translate-y-0.5 hover:bg-[#e77d18]"
            >
              Խմբագրել միջոցառումը →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f28c28]/10 text-2xl">
        {icon}
      </div>

      <p className="mt-5 text-sm font-semibold text-gray-500">
        {title}
      </p>

      <p className="mt-2 break-words text-lg font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}
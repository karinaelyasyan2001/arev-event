"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type EventPlan = {
  eventType: string;
  customEvent: string;
  date: string;
  location: string;
  customLocation: string;
  guests: number;
  budget: number;
  services: string[];
  style: string;
  notes: string;
};

type SummaryStepProps = {
  eventPlan: EventPlan;
  onBack: () => void;
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

export default function SummaryStep({
  eventPlan,
  onBack,
}: SummaryStepProps) {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const eventTitle =
    eventPlan.customEvent.trim() ||
    eventNames[eventPlan.eventType] ||
    eventPlan.eventType ||
    "Իմ միջոցառումը";

  const locationTitle =
    eventPlan.customLocation.trim() ||
    locationNames[eventPlan.location] ||
    eventPlan.location ||
    "Չի նշվել";

  const formattedDate = eventPlan.date
    ? new Intl.DateTimeFormat("hy-AM", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(`${eventPlan.date}T00:00:00`))
    : "Չի նշվել";

  const formattedBudget =
    eventPlan.budget > 0
      ? new Intl.NumberFormat("hy-AM").format(eventPlan.budget) + " ֏"
      : "Չի նշվել";

  const readableServices =
    eventPlan.services.length > 0
      ? eventPlan.services.map(
          (service) => serviceNames[service] || service
        )
      : [];

  const readableStyle =
    styleNames[eventPlan.style] || eventPlan.style || "Չի նշվել";

  const saveEvent = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
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
        throw new Error(
          "Միջոցառումը պահպանելու համար անհրաժեշտ է մուտք գործել ձեր հաշիվ։"
        );
      }

      const { data, error: insertError } = await supabase
        .from("events")
        .insert({
          user_id: user.id,
          title: eventTitle,
          event_type: eventPlan.eventType || null,
          custom_event: eventPlan.customEvent.trim() || null,
          event_date: eventPlan.date || null,
          location: eventPlan.location || null,
          custom_location: eventPlan.customLocation.trim() || null,
          guests: eventPlan.guests > 0 ? eventPlan.guests : null,
          budget: eventPlan.budget > 0 ? eventPlan.budget : null,
          services:
            eventPlan.services.length > 0 ? eventPlan.services : [],
          style: eventPlan.style || null,
          notes: eventPlan.notes.trim() || null,
          status: "draft",
        })
        .select("id")
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      }

      if (!data?.id) {
        throw new Error("Միջոցառման ID-ն չստացվեց։");
      }

      setSuccess(true);

      setTimeout(() => {
        router.push(`/events/${data.id}`);
        router.refresh();
      }, 700);
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Միջոցառումը պահպանել չհաջողվեց։";

      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-10 text-center">
        <span className="mb-4 inline-flex rounded-full bg-[#f28c28]/10 px-4 py-2 text-sm font-semibold text-[#f28c28]">
          Քայլ 9
        </span>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Ձեր միջոցառման ամփոփումը
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          Ստուգեք տվյալները և պահպանեք ձեր միջոցառման պլանը։
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl">
        <div className="bg-[#f28c28] px-6 py-8 text-white md:px-10">
          <p className="text-sm font-medium text-white/80">
            Ձեր միջոցառումը
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            {eventTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 md:p-10">
          <SummaryCard
            icon="📅"
            title="Ամսաթիվ"
            value={formattedDate}
          />

          <SummaryCard
            icon="📍"
            title="Վայր"
            value={locationTitle}
          />

          <SummaryCard
            icon="👥"
            title="Հյուրերի քանակ"
            value={
              eventPlan.guests > 0
                ? `${eventPlan.guests}+ հյուր`
                : "Չի նշվել"
            }
          />

          <SummaryCard
            icon="💰"
            title="Բյուջե"
            value={formattedBudget}
          />

          <SummaryCard
            icon="✨"
            title="Ոճ"
            value={readableStyle}
          />

          <div className="rounded-3xl border border-black/5 bg-gray-50 p-6">
            <p className="text-sm font-semibold text-gray-500">
              Ծառայություններ
            </p>

            {readableServices.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {readableServices.map((service, index) => (
                  <span
                    key={`${service}-${index}`}
                    className="rounded-full bg-[#f28c28]/10 px-3 py-2 text-sm font-semibold text-[#d66f12]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-gray-700">Չի նշվել</p>
            )}
          </div>

          <div className="rounded-3xl border border-black/5 bg-gray-50 p-6 md:col-span-2">
            <p className="text-sm font-semibold text-gray-500">
              Լրացուցիչ նշումներ
            </p>

            <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-800">
              {eventPlan.notes.trim() || "Լրացուցիչ նշումներ չկան։"}
            </p>
          </div>
        </div>

        {error && (
          <div className="mx-6 mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700 md:mx-10">
            <strong>Սխալ․</strong> {error}
          </div>
        )}

        {success && (
          <div className="mx-6 mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700 md:mx-10">
            ✓ Միջոցառումը հաջողությամբ պահպանվեց։ Բացվում է միջոցառման
            էջը...
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-black/5 p-6 sm:flex-row sm:justify-between md:p-10">
          <button
            type="button"
            onClick={onBack}
            disabled={isSaving}
            className="rounded-2xl border border-black/10 px-7 py-4 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Հետ
          </button>

          <button
            type="button"
            onClick={saveEvent}
            disabled={isSaving || success}
            className="rounded-2xl bg-[#f28c28] px-8 py-4 font-bold text-white shadow-lg shadow-[#f28c28]/20 transition hover:-translate-y-0.5 hover:bg-[#e77d18] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving
              ? "Պահպանվում է..."
              : success
                ? "Պահպանված է ✓"
                : "Պահպանել միջոցառումը"}
          </button>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-gray-50 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-500">{title}</p>

          <p className="mt-1 break-words text-lg font-bold text-gray-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
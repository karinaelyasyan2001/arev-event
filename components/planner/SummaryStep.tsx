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
  hall: "Միջոցառումների սրահ",
  restaurant: "Ռեստորան",
  hotel: "Հյուրանոց",
  outdoor: "Բացօթյա",
  home: "Տուն",
  rooftop: "Rooftop",
  other: "Այլ վայր",
  unknown: "Դեռ չեմ որոշել",
  yerevan: "Երևան",
  abovyan: "Աբովյան",
  echmiadzin: "Էջմիածին",
  dilijan: "Դիլիջան",
  tsaghkadzor: "Ծաղկաձոր",
  garni: "Գառնի",
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

const serviceIcons: Record<string, string> = {
  host: "🎤",
  dj: "🎧",
  photo: "📸",
  video: "🎥",
  decor: "🌸",
  lighting: "💡",
  music: "🎵",
  flowers: "💐",
  cake: "🍰",
  catering: "🍽️",
  makeup: "💄",
  effects: "✨",
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

const styleIcons: Record<string, string> = {
  elegant: "✨",
  modern: "🖤",
  romantic: "🌹",
  luxury: "👑",
  nature: "🌿",
  colorful: "🎨",
  traditional: "🏺",
  creative: "💡",
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
      }).format(new Date(`${eventPlan.date}T12:00:00`))
    : "Չի նշվել";

  const formattedBudget =
    eventPlan.budget > 0
      ? new Intl.NumberFormat("hy-AM").format(eventPlan.budget) + " ֏"
      : "Չի նշվել";

  const readableServices =
    eventPlan.services.length > 0
      ? eventPlan.services.map((service) => ({
          id: service,
          name: serviceNames[service] || service,
          icon: serviceIcons[service] || "✨",
        }))
      : [];

  const readableStyle =
    styleNames[eventPlan.style] || eventPlan.style || "Չի նշվել";

  const saveEvent = async () => {
    if (isSaving || success) {
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
      {/* Title */}
      <div className="mx-auto max-w-3xl px-1 text-center">
        <span className="mb-4 inline-flex rounded-full bg-[#f28c28]/10 px-4 py-2 text-xs font-bold text-[#f28c28] sm:text-sm">
          Քայլ 9 / 9
        </span>

        <h1 className="text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 min-[380px]:text-[2.2rem] sm:text-4xl md:text-5xl">
          Ձեր միջոցառման ամփոփումը
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-lg sm:leading-8">
          Ստուգեք տվյալները և պահպանեք ձեր միջոցառման պլանը։
        </p>
      </div>

      {/* Main summary card */}
      <div className="mt-8 overflow-hidden rounded-[24px] border border-black/[0.08] bg-white shadow-[0_15px_50px_rgba(31,31,31,.08)] sm:mt-12 sm:rounded-[2rem]">
        {/* Header */}
        <div className="relative overflow-hidden bg-[#f28c28] px-5 py-7 text-white sm:px-8 sm:py-10 md:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold text-white/75 sm:text-sm">
              Ձեր միջոցառումը
            </p>

            <h2 className="mt-2 break-words text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
              {eventTitle}
            </h2>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm sm:text-sm">
              <span>☀</span>
              <span>Արև Իվենթ</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-3 p-4 sm:gap-4 sm:p-6 md:grid-cols-2 md:p-10">
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
                ? `${eventPlan.guests.toLocaleString("hy-AM")} հյուր`
                : "Չի նշվել"
            }
          />

          <SummaryCard
            icon="💰"
            title="Բյուջե"
            value={formattedBudget}
          />

          {/* Style */}
          <div className="rounded-[22px] border border-black/[0.06] bg-gray-50 p-5 transition-all duration-300 hover:border-[#f28c28]/20 hover:shadow-sm sm:rounded-3xl sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm sm:h-14 sm:w-14">
                {styleIcons[eventPlan.style] || "✨"}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-500 sm:text-sm">
                  Ոճ
                </p>

                <p className="mt-1 break-words text-base font-black text-gray-900 sm:text-lg">
                  {readableStyle}
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="rounded-[22px] border border-black/[0.06] bg-gray-50 p-5 transition-all duration-300 hover:border-[#f28c28]/20 hover:shadow-sm sm:rounded-3xl sm:p-6">
            <p className="text-xs font-semibold text-gray-500 sm:text-sm">
              Ծառայություններ
            </p>

            {readableServices.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {readableServices.map((service) => (
                  <span
                    key={service.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-[#fff3e3] px-3 py-2 text-xs font-bold text-[#d66f12] sm:text-sm"
                  >
                    <span>{service.icon}</span>
                    <span>{service.name}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-700">
                Չի նշվել
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-[22px] border border-black/[0.06] bg-gray-50 p-5 md:col-span-2 sm:rounded-3xl sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                💬
              </div>

              <p className="text-sm font-black text-gray-900 sm:text-base">
                Լրացուցիչ նշումներ
              </p>
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 sm:p-5">
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-800 sm:text-base">
                {eventPlan.notes.trim() || "Լրացուցիչ նշումներ չկան։"}
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-4 mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-700 sm:mx-6 sm:mb-6 sm:px-5 md:mx-10">
            <strong>Սխալ․</strong> {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mx-4 mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm font-semibold leading-6 text-green-700 sm:mx-6 sm:mb-6 sm:px-5 md:mx-10">
            ✓ Միջոցառումը հաջողությամբ պահպանվեց։
            <span className="block sm:inline">
              {" "}
              Բացվում է միջոցառման էջը...
            </span>
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-black/[0.06] p-4 sm:p-6 md:p-10">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onBack}
              disabled={isSaving}
              className="min-h-14 w-full rounded-2xl border border-black/[0.08] bg-white px-7 py-4 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:rounded-full sm:text-base"
            >
              ← Հետ
            </button>

            <button
              type="button"
              onClick={saveEvent}
              disabled={isSaving || success}
              className="min-h-14 w-full rounded-2xl bg-[#f28c28] px-8 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(242,140,40,.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e77d18] hover:shadow-[0_18px_40px_rgba(242,140,40,.28)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[230px] sm:rounded-full sm:text-base"
            >
              {isSaving
                ? "Պահպանվում է..."
                : success
                  ? "Պահպանված է ✓"
                  : "Պահպանել միջոցառումը"}
            </button>
          </div>
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
    <div className="rounded-[22px] border border-black/[0.06] bg-gray-50 p-5 transition-all duration-300 hover:border-[#f28c28]/20 hover:shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm sm:h-14 sm:w-14">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-500 sm:text-sm">
            {title}
          </p>

          <p className="mt-1 break-words text-base font-black text-gray-900 sm:text-lg">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
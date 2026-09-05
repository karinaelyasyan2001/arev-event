
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { specialists } from "@/lib/specialists";

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
};

type EventItem = {
  id: string;
  title: string;
  event_type: string | null;
  event_date: string | null;
  location: string | null;
  custom_location: string | null;
  guests: number | null;
  budget: number | null;
  status: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
  services: string[] | null;
  style: string | null;
};

type BookingItem = {
  id: string;
  specialist_id: string;
  booking_date: string;
  status: "pending" | "confirmed" | "cancelled";
  notes: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  created_at: string;
};

const eventNames: Record<string, string> = {
  wedding: "Հարսանիք",
  birthday: "Ծնունդ",
  engagement: "Նշանադրություն",
  corporate: "Կորպորատիվ",
  children: "Մանկական",
  party: "Փարթի",
  graduation: "Ավարտական",
  proposal: "Ամուսնության առաջարկ",
};

const statusNames: Record<string, string> = {
  draft: "Սևագիր",
  pending: "Սպասման մեջ",
  confirmed: "Հաստատված",
  completed: "Ավարտված",
  cancelled: "Չեղարկված",
};

const serviceNames: Record<string, string> = {
  host: "Հաղորդավար",
  dj: "DJ",
  photo: "Լուսանկարիչ",
  video: "Տեսանկարահանում",
  decor: "Դեկոր",
  lighting: "Լուսավորություն",
  music: "Երաժշտություն",
  flowers: "Ծաղիկներ",
  cake: "Տորթ",
  catering: "Քեյթրինգ",
  makeup: "Դիմահարդարում",
  effects: "Հատուկ էֆեկտներ",
};

const bookingStatusNames: Record<BookingItem["status"], string> = {
  pending: "Սպասման մեջ",
  confirmed: "Հաստատված",
  cancelled: "Չեղարկված",
};

const bookingStatusStyles: Record<BookingItem["status"], string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

type FilterType =
  | "all"
  | "draft"
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

type SortType = "newest" | "date-asc" | "date-desc";

const statusStyles: Record<string, string> = {
  draft: "bg-neutral-100 text-neutral-700 border-neutral-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const armenianWeekdays = [
  "կիրակի",
  "երկուշաբթի",
  "երեքշաբթի",
  "չորեքշաբթի",
  "հինգշաբթի",
  "ուրբաթ",
  "շաբաթ",
];

const armenianMonths = [
  "հունվարի",
  "փետրվարի",
  "մարտի",
  "ապրիլի",
  "մայիսի",
  "հունիսի",
  "հուլիսի",
  "օգոստոսի",
  "սեպտեմբերի",
  "հոկտեմբերի",
  "նոյեմբերի",
  "դեկտեմբերի",
];

function formatDate(date: string | null) {
  if (!date) return "Ամսաթիվը նշված չէ";

  return new Intl.DateTimeFormat("hy-AM", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatShortDate(date: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("hy-AM", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

function formatBookingDate(date: string | null) {
  if (!date) return "Ամսաթիվը նշված չէ";

  const parsedDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Ամսաթիվը նշված չէ";
  }

  const weekday = armenianWeekdays[parsedDate.getDay()];
  const day = parsedDate.getDate();
  const month = armenianMonths[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${weekday}, ${month} ${day}, ${year}`;
}

function formatBudget(budget: number | null) {
  if (budget === null || budget === undefined) return "Չի նշվել";

  return `${new Intl.NumberFormat("hy-AM").format(budget)} ֏`;
}

function getEventName(event: EventItem) {
  return (
    event.title ||
    eventNames[event.event_type ?? ""] ||
    event.event_type ||
    "Միջոցառում"
  );
}

function getLocation(event: EventItem) {
  return event.custom_location || event.location || "Վայրը նշված չէ";
}

function getStatus(event: EventItem) {
  return event.status || "draft";
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "Ա";

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function isFutureOrToday(date: string | null) {
  if (!date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(`${date}T00:00:00`);

  return eventDate >= today;
}

function getSpecialistName(specialistId: string) {
  return (
    specialists.find((specialist) => specialist.id === specialistId)?.name ??
    "Մասնագետ"
  );
}

function getSpecialistService(specialistId: string) {
  return (
    specialists.find((specialist) => specialist.id === specialistId)?.service ??
    "Ծառայություն"
  );
}

function getSpecialistEmoji(specialistId: string) {
  return (
    specialists.find((specialist) => specialist.id === specialistId)?.emoji ??
    "✨"
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: string;
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="group rounded-[28px] border border-black/[0.06] bg-white p-5 shadow-[0_14px_45px_rgba(31,31,31,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(31,31,31,.1)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-neutral-500">{label}</p>

          <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#1f1f1f]">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-xl transition duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-neutral-400">
        {description}
      </p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-black/[0.05] bg-neutral-50/70 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-neutral-400">{label}</p>

        <p className="mt-1 truncate text-sm font-bold text-neutral-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-[#fffaf2]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-56 rounded-[32px] bg-neutral-200" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 rounded-[28px] bg-neutral-200"
              />
            ))}
          </div>

          <div className="mt-8 h-96 rounded-[32px] bg-neutral-200" />
        </div>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw new Error(userError.message);

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email ?? "");

      const [
        { data: profileData, error: profileError },
        { data: eventsData, error: eventsError },
        { data: bookingsData, error: bookingsError },
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, full_name, phone")
          .eq("id", user.id)
          .maybeSingle(),

        supabase
          .from("events")
          .select(
            "id, title, event_type, event_date, location, custom_location, guests, budget, status, notes, created_at, updated_at, services, style"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),

        supabase
          .from("bookings")
          .select(
            "id, specialist_id, booking_date, status, notes, customer_name, customer_phone, created_at"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (profileError) throw new Error(profileError.message);

      if (eventsError) throw new Error(eventsError.message);

      if (bookingsError) throw new Error(bookingsError.message);

      setProfile(profileData);

      setFullName(profileData?.full_name ?? "");

      setPhone(profileData?.phone ?? "");

      setEvents((eventsData as EventItem[]) ?? []);

      setBookings((bookingsData as BookingItem[]) ?? []);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Տվյալները բեռնել չհաջողվեց։"
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    if (savingProfile) return;

    setSavingProfile(true);
    setMessage("");
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: fullName.trim(),
          phone: phone.trim(),
        });

      if (updateError) throw new Error(updateError.message);

      setProfile({
        id: user.id,
        full_name: fullName.trim(),
        phone: phone.trim(),
      });

      setMessage("Անձնական տվյալները հաջողությամբ պահպանվեցին։");

      setTimeout(() => setMessage(""), 3000);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Տվյալները պահպանել չհաջողվեց։"
      );
    } finally {
      setSavingProfile(false);
    }
  }

  async function deleteEvent(eventId: string) {
    const confirmed = window.confirm(
      "Վստա՞հ եք, որ ցանկանում եք ջնջել այս միջոցառումը։"
    );

    if (!confirmed) return;

    setDeletingId(eventId);
    setError("");
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { error: deleteError } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId)
        .eq("user_id", user.id);

      if (deleteError) throw new Error(deleteError.message);

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event.id !== eventId)
      );

      setMessage("Միջոցառումը ջնջվեց։");

      setTimeout(() => setMessage(""), 3000);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Միջոցառումը ջնջել չհաջողվեց։"
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const statistics = useMemo(
    () => ({
      total: events.length,
      draft: events.filter((event) => event.status === "draft").length,
      pending: events.filter((event) => event.status === "pending").length,
      confirmed: events.filter((event) => event.status === "confirmed").length,
      completed: events.filter((event) => event.status === "completed").length,
    }),
    [events]
  );

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = events.filter((event) => {
      const matchesFilter =
        filter === "all" || getStatus(event) === filter;

      if (!matchesFilter) return false;

      if (!query) return true;

      const searchableText = [
        event.title,
        event.event_type,
        event.location,
        event.custom_location,
        event.style,
        event.notes,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    return [...result].sort((a, b) => {
      if (sort === "newest") {
        return (
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime()
        );
      }

      if (sort === "date-asc") {
        return (
          new Date(a.event_date ?? "9999-12-31").getTime() -
          new Date(b.event_date ?? "9999-12-31").getTime()
        );
      }

      return (
        new Date(b.event_date ?? "1900-01-01").getTime() -
        new Date(a.event_date ?? "1900-01-01").getTime()
      );
    });
  }, [events, search, filter, sort]);

  const upcomingEvent = useMemo(() => {
    return [...events]
      .filter(
        (event) =>
          getStatus(event) !== "cancelled" &&
          isFutureOrToday(event.event_date)
      )
      .sort(
        (a, b) =>
          new Date(a.event_date ?? "9999-12-31").getTime() -
          new Date(b.event_date ?? "9999-12-31").getTime()
      )[0];
  }, [events]);

  const displayName =
    profile?.full_name?.trim() || fullName.trim() || "Արևի ընկեր";

  const initials = getInitials(displayName);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] pb-16">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-56 top-32 h-[420px] w-[420px] rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute -right-56 top-[40%] h-[500px] w-[500px] rounded-full bg-yellow-200/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#1f1f1f] p-6 text-white shadow-[0_30px_80px_rgba(31,31,31,.18)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

          <div className="pointer-events-none absolute bottom-[-140px] left-[35%] h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-gradient-to-br from-orange-300 to-orange-500 text-2xl font-black text-white shadow-[0_15px_40px_rgba(242,140,40,.3)] sm:h-24 sm:w-24 sm:text-3xl">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="mb-2 text-sm font-semibold text-orange-300">
                  Բարի վերադարձ, ☀
                </p>

                <h1 className="truncate text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                  {displayName}
                </h1>

                <p className="mt-2 max-w-xl truncate text-sm text-white/55 sm:text-base">
                  {userEmail}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/planner"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 text-sm font-black text-white shadow-[0_12px_35px_rgba(242,140,40,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(242,140,40,.35)]"
              >
                + Նոր միջոցառում
              </Link>

              <button
                type="button"
                onClick={logout}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Դուրս գալ
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Միջոցառումներ
              </p>

              <p className="mt-1 text-lg font-black">
                {statistics.total}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Հաստատված
              </p>

              <p className="mt-1 text-lg font-black text-emerald-300">
                {statistics.confirmed}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Ավարտված
              </p>

              <p className="mt-1 text-lg font-black text-blue-300">
                {statistics.completed}
              </p>
            </div>
          </div>
        </section>

        {/* GLOBAL MESSAGES */}
        {message && (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
            ⚠ {error}
          </div>
        )}

        {/* STATS */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon="✨"
            label="Բոլոր միջոցառումները"
            value={statistics.total}
            description="Ձեր ստեղծած բոլոր նախագծերը"
          />

          <StatCard
            icon="📝"
            label="Սևագրեր"
            value={statistics.draft}
            description="Դեռ ընթացքի մեջ գտնվողները"
          />

          <StatCard
            icon="⏳"
            label="Սպասման մեջ"
            value={statistics.pending}
            description="Հաստատման սպասող նախագծեր"
          />

          <StatCard
            icon="✓"
            label="Հաստատված"
            value={statistics.confirmed}
            description="Պատրաստվող միջոցառումներ"
          />
        </section>

        {/* UPCOMING EVENT */}
        {upcomingEvent && (
          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-orange-500">
                  Մոտակա միջոցառում
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">
                  Ձեր հաջորդ մեծ օրը
                </h2>
              </div>

              <Link
                href={`/events/${upcomingEvent.id}`}
                className="hidden text-sm font-black text-orange-500 transition hover:text-orange-700 sm:block"
              >
                Դիտել →
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 p-6 text-white shadow-[0_25px_70px_rgba(242,140,40,.2)] sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
                    {statusNames[getStatus(upcomingEvent)] ??
                      "Միջոցառում"}
                  </div>

                  <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] sm:text-4xl">
                    {getEventName(upcomingEvent)}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-white/80 sm:text-base">
                    {formatDate(upcomingEvent.event_date)}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
                    <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">
                      📍 {getLocation(upcomingEvent)}
                    </span>

                    {upcomingEvent.guests !== null && (
                      <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">
                        👥 {upcomingEvent.guests} հյուր
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/events/${upcomingEvent.id}`}
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-black text-orange-600 shadow-lg transition hover:-translate-y-0.5"
                >
                  Բացել միջոցառումը →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* QUICK ACTIONS */}
        <section className="mt-8">
          <div className="mb-4">
            <p className="text-sm font-bold text-orange-500">
              Արագ գործողություններ
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">
              Կառավարեք ձեր Արևը
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/planner"
              className="group rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_14px_45px_rgba(31,31,31,.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(31,31,31,.1)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl transition group-hover:scale-110">
                ✨
              </div>

              <h3 className="mt-5 font-black">Ստեղծել միջոցառում</h3>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Սկսեք նոր միջոցառման պլանավորումը։
              </p>
            </Link>

            <a
              href="#events"
              className="group rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_14px_45px_rgba(31,31,31,.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(31,31,31,.1)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl transition group-hover:scale-110">
                📋
              </div>

              <h3 className="mt-5 font-black">Իմ միջոցառումները</h3>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Դիտեք և կառավարեք ձեր նախագծերը։
              </p>
            </a>

            <a
              href="#profile-settings"
              className="group rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_14px_45px_rgba(31,31,31,.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(31,31,31,.1)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl transition group-hover:scale-110">
                ⚙️
              </div>

              <h3 className="mt-5 font-black">Անձնական տվյալներ</h3>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Թարմացրեք ձեր կոնտակտային տվյալները։
              </p>
            </a>
          </div>
        </section>

        {/* BOOKINGS */}
        <section id="bookings" className="mt-12 scroll-mt-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-orange-500">
                Մասնագետների ամրագրումներ
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em]">
                Իմ ամրագրումները
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Այստեղ կարող եք տեսնել ձեր ուղարկած բոլոր ամրագրման հայտերը։
              </p>
            </div>

            <Link
              href="/specialists"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1f1f1f] px-5 text-sm font-black text-white transition hover:bg-orange-500"
            >
              Գտնել մասնագետ →
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {bookings.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-black/10 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                  📅
                </div>

                <h3 className="mt-5 text-xl font-black">
                  Դեռ ամրագրումներ չունեք
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
                  Գտեք ձեզ համապատասխան մասնագետ, ընտրեք ազատ օրը և ուղարկեք
                  ամրագրման հայտ։
                </p>

                <Link
                  href="/specialists"
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-black text-white transition hover:bg-orange-600"
                >
                  Դիտել մասնագետներին →
                </Link>
              </div>
            ) : (
              bookings.map((booking) => {
                const bookingStatus = booking.status;

                return (
                  <article
                    key={booking.id}
                    className="group rounded-[30px] border border-black/[0.06] bg-white p-5 shadow-[0_14px_45px_rgba(31,31,31,.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(31,31,31,.09)] sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex min-w-0 gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 text-2xl">
                          {getSpecialistEmoji(booking.specialist_id)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-black text-[#1f1f1f] sm:text-xl">
                              {getSpecialistName(booking.specialist_id)}
                            </h3>

                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${
                                bookingStatusStyles[bookingStatus]
                              }`}
                            >
                              {bookingStatusNames[bookingStatus]}
                            </span>
                          </div>

                          <p className="mt-1 text-sm font-semibold text-orange-500">
                            {getSpecialistService(booking.specialist_id)}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
                            <span>
                              📅 {formatBookingDate(booking.booking_date)}
                            </span>

                            <span>
                              📝 Հայտ #{booking.id.slice(0, 8)}
                            </span>
                          </div>

                          {booking.notes && (
                            <div className="mt-4 rounded-2xl bg-neutral-50 p-4">
                              <p className="text-xs font-bold text-neutral-400">
                                Ձեր նշումը
                              </p>

                              <p className="mt-1 text-sm leading-6 text-neutral-600">
                                {booking.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0">
                        <Link
                          href={`/specialists/${booking.specialist_id}`}
                          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-black text-neutral-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 sm:w-auto"
                        >
                          Դիտել մասնագետին →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="mt-12 scroll-mt-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-orange-500">
                Ձեր նախագծերը
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em]">
                Իմ միջոցառումները
              </h2>
            </div>

            <Link
              href="/planner"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1f1f1f] px-5 text-sm font-black text-white transition hover:bg-orange-500"
            >
              + Նոր միջոցառում
            </Link>
          </div>

          {/* SEARCH + FILTERS */}
          <div className="mt-6 rounded-[28px] border border-black/[0.06] bg-white p-4 shadow-[0_14px_45px_rgba(31,31,31,.05)] sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  🔎
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Փնտրել միջոցառում..."
                  className="arev-input pl-11"
                />
              </div>

              <select
                value={filter}
                onChange={(event) =>
                  setFilter(event.target.value as FilterType)
                }
                className="arev-select min-w-[190px]"
              >
                <option value="all">Բոլորը</option>
                <option value="draft">Սևագրեր</option>
                <option value="pending">Սպասման մեջ</option>
                <option value="confirmed">Հաստատված</option>
                <option value="completed">Ավարտված</option>
                <option value="cancelled">Չեղարկված</option>
              </select>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as SortType)
                }
                className="arev-select min-w-[190px]"
              >
                <option value="newest">Նորագույնները</option>
                <option value="date-asc">Ամսաթիվ՝ աճող</option>
                <option value="date-desc">Ամսաթիվ՝ նվազող</option>
              </select>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(
                [
                  ["all", "Բոլորը"],
                  ["draft", "Սևագիր"],
                  ["pending", "Սպասում"],
                  ["confirmed", "Հաստատված"],
                  ["completed", "Ավարտված"],
                  ["cancelled", "Չեղարկված"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-full px-4 py-2 text-xs font-black transition ${
                    filter === value
                      ? "bg-[#1f1f1f] text-white"
                      : "bg-neutral-100 text-neutral-500 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* EVENT LIST */}
          <div className="mt-5 space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-black/10 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                  ☀
                </div>

                <h3 className="mt-5 text-xl font-black">
                  Միջոցառում չի գտնվել
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
                  {events.length === 0
                    ? "Դեռ չունեք ստեղծված միջոցառումներ։ Սկսեք ձեր առաջին միջոցառման պլանավորումը։"
                    : "Փոխեք որոնման կամ ֆիլտրի պայմանները և փորձեք կրկին։"}
                </p>

                {events.length === 0 && (
                  <Link
                    href="/planner"
                    className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-black text-white transition hover:bg-orange-600"
                  >
                    Ստեղծել առաջին միջոցառումը →
                  </Link>
                )}
              </div>
            ) : (
              filteredEvents.map((event) => {
                const status = getStatus(event);

                return (
                  <article
                    key={event.id}
                    className="group rounded-[30px] border border-black/[0.06] bg-white p-5 shadow-[0_14px_45px_rgba(31,31,31,.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(31,31,31,.09)] sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex min-w-0 gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 text-2xl">
                          {event.event_type === "wedding"
                            ? "💍"
                            : event.event_type === "birthday"
                              ? "🎂"
                              : event.event_type === "corporate"
                                ? "💼"
                                : event.event_type === "children"
                                  ? "🎈"
                                  : "☀️"}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-lg font-black text-[#1f1f1f] sm:text-xl">
                              {getEventName(event)}
                            </h3>

                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${
                                statusStyles[status] ??
                                statusStyles.draft
                              }`}
                            >
                              {statusNames[status] ?? status}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
                            <span>
                              📅 {formatShortDate(event.event_date)}
                            </span>

                            <span>
                              📍 {getLocation(event)}
                            </span>

                            {event.guests !== null && (
                              <span>👥 {event.guests}</span>
                            )}

                            {event.budget !== null && (
                              <span>💰 {formatBudget(event.budget)}</span>
                            )}
                          </div>

                          {event.services &&
                            event.services.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {event.services.slice(0, 5).map((service) => (
                                  <span
                                    key={service}
                                    className="rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold text-neutral-500"
                                  >
                                    {serviceNames[service] ?? service}
                                  </span>
                                ))}

                                {event.services.length > 5 && (
                                  <span className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-orange-600">
                                    +{event.services.length - 5}
                                  </span>
                                )}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1f1f1f] px-5 text-sm font-black text-white transition hover:bg-orange-500"
                        >
                          Դիտել
                        </Link>

                        <Link
                          href={`/events/${event.id}/edit`}
                          className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-black text-neutral-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                        >
                          Խմբագրել
                        </Link>

                        <button
                          type="button"
                          onClick={() => deleteEvent(event.id)}
                          disabled={deletingId === event.id}
                          className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-100 bg-red-50 px-5 text-sm font-black text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === event.id
                            ? "Ջնջվում է..."
                            : "Ջնջել"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* PROFILE SETTINGS */}
        <section
          id="profile-settings"
          className="mt-12 scroll-mt-28 grid gap-6 lg:grid-cols-[1.2fr_.8fr]"
        >
          {/* Personal information */}
          <div className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-[0_14px_45px_rgba(31,31,31,.05)] sm:p-8">
            <div>
              <p className="text-sm font-bold text-orange-500">
                Անձնական տվյալներ
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">
                Ձեր պրոֆիլը
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Թարմացրեք ձեր անունը և կապի տվյալները։
              </p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-black"
                >
                  Անուն և ազգանուն
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Օր․ Արմեն Հակոբյան"
                  className="arev-input"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-black"
                >
                  Հեռախոսահամար
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+374 XX XX XX XX"
                  autoComplete="tel"
                  className="arev-input"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={saveProfile}
              disabled={savingProfile}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-7 text-sm font-black text-white shadow-[0_12px_30px_rgba(242,140,40,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(242,140,40,.28)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {savingProfile ? "Պահպանվում է..." : "Պահպանել տվյալները"}
            </button>
          </div>

          {/* Security */}
          <div className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-[0_14px_45px_rgba(31,31,31,.05)] sm:p-8">
            <p className="text-sm font-bold text-orange-500">
              Հաշիվ և անվտանգություն
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">
              Հաշվի տվյալներ
            </h2>

            <div className="mt-6 space-y-3">
              <InfoRow
                icon="✉️"
                label="Էլ․ փոստ"
                value={userEmail || "Նշված չէ"}
              />

              <InfoRow
                icon="🛡️"
                label="Հաշվի կարգավիճակ"
                value="Ակտիվ"
              />

              <InfoRow
                icon="📋"
                label="Միջոցառումների քանակ"
                value={`${events.length}`}
              />

              <InfoRow
                icon="📅"
                label="Ամրագրումների քանակ"
                value={`${bookings.length}`}
              />
            </div>

            <Link
              href="/forgot-password"
              className="mt-5 flex min-h-12 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-black text-neutral-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              🔐 Փոխել գաղտնաբառը
            </Link>
          </div>
        </section>

        {/* ACCOUNT FOOTER */}
        <section className="mt-8 rounded-[32px] bg-[#1f1f1f] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-orange-300">
                Արև Իվենթ
              </p>

              <h2 className="mt-1 text-xl font-black">
                Ձեր օրը։ Ձեր պատմությունը։ Ձեր Արևը։
              </h2>

              <p className="mt-2 text-sm text-white/45">
                Ստեղծեք, պլանավորեք և կառավարեք ձեր կարևոր պահերը։
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-black transition hover:bg-white/10"
            >
              ← Գլխավոր էջ
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

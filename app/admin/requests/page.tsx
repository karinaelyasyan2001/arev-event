"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
type ClientRequest = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: "new" | "contacted" | "completed" | "cancelled";
  created_at: string;
};

const statusLabels: Record<ClientRequest["status"], string> = {
  new: "Նոր",
  contacted: "Կապ հաստատված",
  completed: "Ավարտված",
  cancelled: "Չեղարկված",
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();
if (!user) {
  setError("Մուտք գործեք համակարգ՝ հայտերը տեսնելու համար։");
  setLoading(false);
  return;
}
if (user.email !== "karinaelyasyan2001@gmail.com") {
  setError("Այս էջը հասանելի է միայն ադմինին։");
  setLoading(false);
  return;
}
  

    const { data, error } = await supabase
      .from("client_requests")
      .select(
        "id, name, phone, email, message, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Չհաջողվեց բեռնել հայտերը։");
      setLoading(false);
      return;
    }

    setRequests(data ?? []);
    setLoading(false);
  }

  async function updateStatus(
    id: string,
    status: ClientRequest["status"]
  ) {
    const { error } = await supabase
      .from("client_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Չհաջողվեց փոխել կարգավիճակը։");
      return;
    }

     setRequests((current) =>
    current.map((request) =>
      request.id === id
        ? { ...request, status }
        : request
    )
  );
}

    async function deleteRequest(id: string) {
  const confirmed = window.confirm(
    "Վստա՞հ եք, որ ցանկանում եք ջնջել այս հայտը։"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("client_requests")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Չհաջողվեց ջնջել հայտը։");
    return;
  }

  setRequests((current) =>
    current.filter((request) => request.id !== id)
  );
}


  return (
    <main className="min-h-screen bg-[var(--arev-cream)] py-10">
      <div className="arev-container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--arev-orange)]">
              Admin
            </p>

            <h1 className="arev-title">
              Հաճախորդների հայտեր
            </h1>

            <p className="arev-subtitle mt-3">
              Այստեղ կարող եք տեսնել կայքից ստացված բոլոր հայտերը։
            </p>
          </div>

          <Link
            href="/"
            className="arev-button arev-button-secondary"
          >
            ← Գլխավոր
          </Link>
        </div>

        {loading && (
          <div className="arev-card p-8 text-center">
            Բեռնում...
          </div>
        )}

        {!loading && error && (
          <div className="arev-card p-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="arev-card p-10 text-center">
            <div className="mb-4 text-5xl">📭</div>

            <h2 className="text-xl font-bold">
              Հայտեր դեռ չկան
            </h2>

            <p className="mt-2 text-gray-600">
              Երբ հաճախորդը հայտ ուղարկի, այն այստեղ կհայտնվի։
            </p>
          </div>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="space-y-5">
            {requests.map((request) => (
              <article
                key={request.id}
                className="arev-card overflow-hidden p-5 sm:p-7"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-900">
                        {request.name}
                      </h2>

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        {statusLabels[request.status]}
                      </span>
                    </div>

                    <div className="grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                      <p>
                        <strong>📞 Հեռախոս՝</strong>{" "}
                        {request.phone}
                      </p>

                      {request.email && (
                        <p className="break-all">
                          <strong>✉️ Email՝</strong>{" "}
                          {request.email}
                        </p>
                      )}

                      <p>
                        <strong>📅 Ամսաթիվ՝</strong>{" "}
                        {new Date(
                          request.created_at
                        ).toLocaleString("hy-AM")}
                      </p>
                    </div>

                    <div className="mt-5 rounded-2xl bg-white/70 p-4">
                      <p className="mb-2 text-sm font-semibold text-gray-900">
                        Հաղորդագրություն
                      </p>

                      <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                        {request.message}
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-56">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Կարգավիճակ
                    </label>

                    <select
                      value={request.status}
                      
                      onChange={(e) =>
                        updateStatus(
                          request.id,
                          e.target.value as ClientRequest["status"]
                        )
                      }
                      className="arev-select w-full"
                    >


                      <option value="new">Նոր</option>
                      <option value="contacted">
                        Կապ հաստատված
                      </option>
                      <option value="completed">
                        Ավարտված
                      </option>
                      <option value="cancelled">
                        Չեղարկված
                      </option>
                    </select>

<button
  type="button"
  onClick={() => deleteRequest(request.id)}
  className="mt-3 w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
>
  🗑️ Ջնջել հայտը
</button>


                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
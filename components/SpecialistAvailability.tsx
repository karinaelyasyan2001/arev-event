"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Availability = {
  available_date: string;
  is_available: boolean;
};

type Props = {
  specialistId: string;
};

type SelectedDateProps = {
  onSelectDate?: (date: string) => void;
};

const weekdays = [
  "կիրակի",
  "երկուշաբթի",
  "երեքշաբթի",
  "չորեքշաբթի",
  "հինգշաբթի",
  "ուրբաթ",
  "շաբաթ",
];

const months = [
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

function formatDate(date: string) {
  const parsedDate = new Date(`${date}T12:00:00`);

  const weekday = weekdays[parsedDate.getDay()];
  const day = parsedDate.getDate();
  const month = months[parsedDate.getMonth()];

  return `${weekday}, ${month} ${day}`;
}

export default function SpecialistAvailability({
  specialistId,
  onSelectDate,
}: Props & SelectedDateProps) {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAvailability() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("specialist_availability")
        .select("available_date, is_available")
        .eq("specialist_id", specialistId)
        .order("available_date", { ascending: true });

      if (error) {
        console.error(error);
        setError("Չհաջողվեց բեռնել մասնագետի ազատ օրերը։");
        setLoading(false);
        return;
      }

      setAvailability(data ?? []);
      setLoading(false);
    }

    loadAvailability();
  }, [specialistId]);

  if (loading) {
    return (
      <section className="arev-section">
        <div
          className="arev-container"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div className="arev-card" style={{ padding: 30 }}>
            <h2 style={{ marginTop: 0 }}>📅 Ազատ օրեր</h2>

            <p style={{ color: "#777", marginBottom: 0 }}>
              Բեռնում ենք ազատ օրերը...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="arev-section">
        <div
          className="arev-container"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div className="arev-card" style={{ padding: 30 }}>
            <h2 style={{ marginTop: 0 }}>📅 Ազատ օրեր</h2>

            <p
              style={{
                color: "#c0392b",
                marginBottom: 0,
              }}
            >
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="arev-section">
      <div
        className="arev-container"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 25 }}>
          <div
            style={{
              color: "#f28c28",
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            AVAILABILITY
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              margin: "0 0 10px",
            }}
          >
            📅 Ազատ օրեր
          </h2>

          <p
            style={{
              color: "#666",
              margin: 0,
            }}
          >
            Տեսեք, թե որ օրերին է մասնագետը հասանելի։
          </p>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            marginBottom: 20,
            color: "#555",
            fontWeight: 700,
          }}
        >
          <span>🟢 Ազատ</span>
          <span>🔴 Զբաղված</span>
        </div>

        {/* Dates */}
        {availability.length === 0 ? (
          <div
            className="arev-card"
            style={{
              padding: 30,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 45,
                marginBottom: 10,
              }}
            >
              📅
            </div>

            <h3 style={{ margin: "0 0 8px" }}>
              Տվյալներ դեռ չկան
            </h3>

            <p
              style={{
                color: "#777",
                margin: 0,
              }}
            >
              Այս մասնագետի համար ազատ օրեր դեռ ավելացված չեն։
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {availability.map((item) => (
              <div
                key={item.available_date}
                className="arev-card"
                style={{
                  padding: 22,
                  border: item.is_available
                    ? "1px solid #b8dfc0"
                    : "1px solid #f0c1c1",
                  background: item.is_available
                    ? "#f5fff7"
                    : "#fff7f7",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {item.is_available ? "🟢" : "🔴"}
                  </span>

                  <strong
                    style={{
                      fontSize: 17,
                      textTransform: "capitalize",
                    }}
                  >
                    {formatDate(item.available_date)}
                  </strong>
                </div>

                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: item.is_available
                      ? "#27833f"
                      : "#b33a3a",
                    marginBottom: item.is_available ? 15 : 0,
                  }}
                >
                  {item.is_available ? "Ազատ է" : "Զբաղված է"}
                </div>

                {item.is_available && (
                  <button
                    type="button"
                    onClick={() =>
                      onSelectDate?.(item.available_date)
                    }
                    style={{
                      width: "100%",
                      border: "none",
                      borderRadius: 12,
                      padding: "11px 16px",
                      background: "#f28c28",
                      color: "#fff",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: 14,
                    }}
                  >
                    Ընտրել այս օրը →
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import SpecialistAvailability from "@/components/SpecialistAvailability";
import { supabase } from "@/lib/supabase";

type Props = {
  specialistId: string;
};

export default function SpecialistAvailabilitySection({
  specialistId,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  function formatSelectedDate(date: string) {
    const parsedDate = new Date(`${date}T12:00:00`);

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

    return `${weekdays[parsedDate.getDay()]}, ${
      months[parsedDate.getMonth()]
    } ${parsedDate.getDate()}, ${parsedDate.getFullYear()}`;
  }

  async function handleBooking() {
    setMessage("");
    setMessageType("");

    if (!selectedDate) {
      setMessage("Խնդրում ենք ընտրել ամրագրման օրը։");
      setMessageType("error");
      return;
    }

    if (!name.trim()) {
      setMessage("Խնդրում ենք լրացնել անունը։");
      setMessageType("error");
      return;
    }

    if (!phone.trim()) {
      setMessage("Խնդրում ենք լրացնել հեռախոսահամարը։");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setMessage(
          "Ամրագրելու համար նախ պետք է մուտք գործեք ձեր հաշիվ։"
        );
        setMessageType("error");
        setIsSubmitting(false);
        return;
      }

      // Ստուգում ենք՝ օրը դեռ ազատ է, թե ոչ
      const { data: availability, error: availabilityError } =
        await supabase
          .from("specialist_availability")
          .select("is_available")
          .eq("specialist_id", specialistId)
          .eq("available_date", selectedDate)
          .maybeSingle();

      if (availabilityError) {
        throw availabilityError;
      }

      if (!availability || !availability.is_available) {
        setMessage(
          "Ցավոք, այս օրը այլևս հասանելի չէ։ Խնդրում ենք ընտրել մեկ այլ օր։"
        );
        setMessageType("error");
        setSelectedDate(null);
        setIsSubmitting(false);
        return;
      }

      // Ստեղծում ենք իրական ամրագրում
      const { error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          specialist_id: specialistId,
          booking_date: selectedDate,
          status: "pending",
          notes: notes.trim() || null,
          customer_name: name.trim(),
          customer_phone: phone.trim(),
        });

      if (bookingError) {
        // Unique index-ի պատճառով նույն օրը երկրորդ booking-ը չի անցնի
        if (bookingError.code === "23505") {
          setMessage(
            "Այս մասնագետի համար այս օրը արդեն ամրագրված է։ Խնդրում ենք ընտրել մեկ այլ օր։"
          );
          setMessageType("error");
          setSelectedDate(null);
          setIsSubmitting(false);
          return;
        }

        throw bookingError;
      }

      setMessage(
        "Ամրագրման հայտը հաջողությամբ ուղարկվեց։ Մենք շուտով կապ կհաստատենք ձեզ հետ։"
      );
      setMessageType("success");

      setName("");
      setPhone("");
      setNotes("");
    } catch (error) {
      console.error("Booking error:", error);

      setMessage(
        "Չհաջողվեց ուղարկել ամրագրման հայտը։ Խնդրում ենք կրկին փորձել։"
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <SpecialistAvailability
        specialistId={specialistId}
        onSelectDate={setSelectedDate}
      />

      {selectedDate && (
        <div
          className="arev-section"
          style={{
            paddingTop: 0,
          }}
        >
          <div
            className="arev-container"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {/* Selected date */}
            <div
              className="arev-card"
              style={{
                padding: 25,
                background:
                  "linear-gradient(135deg, #fff4df, #fffaf2)",
                border: "1px solid #f7d8ad",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
                marginBottom: 25,
              }}
            >
              <div>
                <div
                  style={{
                    color: "#f28c28",
                    fontSize: 13,
                    fontWeight: 800,
                    marginBottom: 6,
                  }}
                >
                  ԸՆՏՐՎԱԾ ՕՐ
                </div>

                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                  }}
                >
                  📅 {formatSelectedDate(selectedDate)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                style={{
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#555",
                  borderRadius: 12,
                  padding: "10px 16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Փոխել օրը
              </button>
            </div>

            {/* Booking form */}
            <div
              className="arev-card"
              style={{
                padding: 30,
                maxWidth: 700,
                margin: "0 auto",
              }}
            >
              <div style={{ marginBottom: 25 }}>
                <div
                  style={{
                    color: "#f28c28",
                    fontSize: 13,
                    fontWeight: 800,
                    marginBottom: 8,
                  }}
                >
                  BOOKING
                </div>

                <h2
                  style={{
                    margin: "0 0 10px",
                    fontSize: "clamp(26px, 4vw, 34px)",
                  }}
                >
                  Ամրագրել մասնագետին
                </h2>

                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Լրացրեք ձեր տվյալները, որպեսզի կարողանաք ուղարկել
                  ամրագրման հայտը։
                </p>
              </div>

              {/* Name */}
              <div style={{ marginBottom: 18 }}>
                <label
                  htmlFor="booking-name"
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 700,
                  }}
                >
                  Անուն *
                </label>

                <input
                  id="booking-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Օրինակ՝ Աննա"
                  className="arev-input"
                  style={{
                    width: "100%",
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: 18 }}>
                <label
                  htmlFor="booking-phone"
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 700,
                  }}
                >
                  Հեռախոսահամար *
                </label>

                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+374 XX XX XX XX"
                  className="arev-input"
                  style={{
                    width: "100%",
                  }}
                />
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 22 }}>
                <label
                  htmlFor="booking-notes"
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 700,
                  }}
                >
                  Լրացուցիչ նշումներ
                </label>

                <textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Օրինակ՝ միջոցառման վայրը, հյուրերի քանակը կամ այլ մանրամասներ..."
                  className="arev-textarea"
                  rows={5}
                  style={{
                    width: "100%",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Selected date summary */}
              <div
                style={{
                  padding: 16,
                  borderRadius: 14,
                  background: "#fff8ec",
                  border: "1px solid #f7d8ad",
                  marginBottom: 22,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "#777",
                    marginBottom: 5,
                  }}
                >
                  Ամրագրման ընտրված օրը
                </div>

                <strong
                  style={{
                    color: "#9b580e",
                  }}
                >
                  📅 {formatSelectedDate(selectedDate)}
                </strong>
              </div>

              {/* Message */}
              {message && (
                <div
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    marginBottom: 20,
                    background:
                      messageType === "success"
                        ? "#eefaf1"
                        : "#fff1f1",
                    border:
                      messageType === "success"
                        ? "1px solid #b9e4c2"
                        : "1px solid #f0bcbc",
                    color:
                      messageType === "success"
                        ? "#28743a"
                        : "#a33a3a",
                    lineHeight: 1.6,
                    fontWeight: 600,
                  }}
                >
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                className="arev-button"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontSize: 16,
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onClick={handleBooking}
              >
                {isSubmitting
                  ? "Ուղարկվում է..."
                  : "Ուղարկել ամրագրման հայտը →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
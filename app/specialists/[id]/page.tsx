import Link from "next/link";
import { notFound } from "next/navigation";
import { specialists } from "@/lib/specialists";
import SpecialistAvailabilitySection from "@/components/SpecialistAvailabilitySection";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return specialists.map((specialist) => ({
    id: specialist.id,
  }));
}

export default async function SpecialistProfilePage({ params }: Props) {
  const { id } = await params;

  const specialist = specialists.find((item) => item.id === id);

  if (!specialist) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #fffaf2 0%, #fff3df 50%, #ffffff 100%)",
          padding: "70px 20px 60px",
        }}
      >
        <div
          className="arev-container"
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          <Link
            href="/specialists"
            className="arev-link"
            style={{
              display: "inline-flex",
              marginBottom: 35,
              fontWeight: 700,
            }}
          >
            ← Բոլոր մասնագետները
          </Link>

          <div
            className="arev-card"
            style={{
              padding: 35,
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: 35,
              alignItems: "center",
            }}
          >
            {/* Specialist avatar */}
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: 35,
                background:
                  "linear-gradient(135deg, #f28c28, #f7b955, #fff1d6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 75,
                boxShadow: "0 20px 50px rgba(242,140,40,.20)",
              }}
            >
              {specialist.emoji}
            </div>

            {/* Specialist information */}
            <div>
              {specialist.verified && (
                <div
                  style={{
                    display: "inline-flex",
                    padding: "7px 12px",
                    borderRadius: 999,
                    background: "#fff0d8",
                    color: "#b85c00",
                    fontSize: 13,
                    fontWeight: 800,
                    marginBottom: 15,
                  }}
                >
                  ✓ Ստուգված մասնագետ
                </div>
              )}

              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  margin: "0 0 8px",
                  fontWeight: 900,
                }}
              >
                {specialist.name}
              </h1>

              <div
                style={{
                  fontSize: 20,
                  color: "#f28c28",
                  fontWeight: 800,
                  marginBottom: 15,
                }}
              >
                {specialist.service}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 18,
                  color: "#666",
                  marginBottom: 20,
                }}
              >
                <span>📍 {specialist.city}</span>

                <span>
                  ⭐ <strong>{specialist.rating}</strong> (
                  {specialist.reviews} կարծիք)
                </span>
              </div>

              <p
                style={{
                  maxWidth: 700,
                  lineHeight: 1.8,
                  color: "#555",
                  fontSize: 16,
                  marginBottom: 25,
                }}
              >
                {specialist.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#777",
                    }}
                  >
                    Սկսած՝
                  </div>

                  <strong
                    style={{
                      fontSize: 25,
                    }}
                  >
                    {specialist.price}
                  </strong>
                </div>

                <Link
                  href={`/planner?service=${specialist.id}`}
                  className="arev-button"
                  style={{
                    marginLeft: 15,
                    textDecoration: "none",
                  }}
                >
                  Ընտրել մասնագետին →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About + Tags */}
      <section className="arev-section">
        <div
          className="arev-container"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 30,
          }}
        >
          <div
            className="arev-card"
            style={{
              padding: 30,
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 28,
              }}
            >
              Մասնագետի մասին
            </h2>

            <p
              style={{
                lineHeight: 1.9,
                color: "#555",
                marginBottom: 0,
              }}
            >
              {specialist.description} Արև Իվենթ հարթակի միջոցով կարող եք
              ուսումնասիրել մասնագետի աշխատանքները, ընտրել ծառայությունը և
              անցնել միջոցառման պլանավորմանը։
            </p>
          </div>

          <div
            className="arev-card"
            style={{
              padding: 30,
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 24,
              }}
            >
              Մասնագիտացում
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {specialist.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "9px 13px",
                    borderRadius: 999,
                    background: "#fff4e5",
                    color: "#9b580e",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Availability */}
      <SpecialistAvailabilitySection specialistId={specialist.id} />

      {/* Portfolio */}
      <section
        className="arev-section"
        style={{
          background: "#fffaf2",
        }}
      >
        <div
          className="arev-container"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              marginBottom: 30,
            }}
          >
            <div
              style={{
                color: "#f28c28",
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              PORTFOLIO
            </div>

            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 42px)",
                margin: 0,
              }}
            >
              Աշխատանքների օրինակներ
            </h2>

            <p
              style={{
                color: "#666",
                marginTop: 10,
              }}
            >
              Տեսեք մասնագետի աշխատանքի ոճը և ընտրեք այն, ինչ համապատասխանում
              է ձեր միջոցառմանը։
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {specialist.portfolio.map((item, index) => (
              <div
                key={item.title}
                style={{
                  minHeight: 240,
                  borderRadius: 25,
                  overflow: "hidden",
                  position: "relative",
                  background:
                    index % 2 === 0
                      ? "linear-gradient(135deg, #ffe0b2, #fff8ec)"
                      : "linear-gradient(135deg, #fce4ec, #fff8f9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 30px rgba(0,0,0,.07)",
                }}
              >
                <div
                  style={{
                    fontSize: 70,
                    opacity: 0.9,
                  }}
                >
                  {item.emoji}
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 18,
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,.65))",
                    color: "white",
                    fontWeight: 800,
                    paddingTop: 45,
                  }}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="arev-section">
        <div
          className="arev-container"
          style={{
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            className="arev-card"
            style={{
              padding: "45px 30px",
              background:
                "linear-gradient(135deg, #fff4df, #fffaf2)",
            }}
          >
            <div
              style={{
                fontSize: 45,
                marginBottom: 10,
              }}
            >
              ☀️
            </div>

            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                margin: "0 0 12px",
              }}
            >
              Պատրա՞ստ եք ստեղծել ձեր օրը
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: 1.7,
                maxWidth: 600,
                margin: "0 auto 25px",
              }}
            >
              Ընտրեք մասնագետին և շարունակեք ձեր միջոցառման անհատական
              պլանավորումը։
            </p>

            <Link
              href={`/planner?service=${specialist.id}`}
              className="arev-button"
              style={{
                textDecoration: "none",
              }}
            >
              Սկսել պլանավորումը →
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 760px) {
          .arev-card {
            grid-template-columns: 1fr !important;
          }

          .arev-card > div:first-child {
            margin: 0 auto;
          }

          .arev-card .arev-button {
            margin-left: 0 !important;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </main>
  );
}
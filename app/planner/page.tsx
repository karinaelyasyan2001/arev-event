"use client";

import { useState } from "react";

import EventStep from "@/components/planner/EventStep";
import DateStep from "@/components/planner/DateStep";
import LocationStep from "@/components/planner/LocationStep";
import GuestsStep from "@/components/planner/GuestsStep";
import BudgetStep from "@/components/planner/BudgetStep";
import ServicesStep from "@/components/planner/ServicesStep";
import StyleStep from "@/components/planner/StyleStep";
import NotesStep from "@/components/planner/NotesStep";
import SummaryStep from "@/components/planner/SummaryStep";

export default function PlannerPage() {
  const [step, setStep] = useState(1);

  const [eventPlan, setEventPlan] = useState({
    eventType: "",
    customEvent: "",
    date: "",
    location: "",
    customLocation: "",
    guests: 0,
    budget: 0,
    services: [] as string[],
    style: "",
    notes: "",
  });

  const nextStep = () => {
    setStep((currentStep) =>
      Math.min(currentStep + 1, 9)
    );
  };

  const previousStep = () => {
    setStep((currentStep) =>
      Math.max(currentStep - 1, 1)
    );
  };

  const toggleService = (service: string) => {
    setEventPlan((currentPlan) => ({
      ...currentPlan,
      services: currentPlan.services.includes(service)
        ? currentPlan.services.filter(
            (item) => item !== service
          )
        : [...currentPlan.services, service],
    }));
  };

  const progress = (step / 9) * 100;

  return (
    <main className="min-h-[calc(100svh-72px)] overflow-x-hidden bg-[#fffaf2] text-[#252525] sm:min-h-[calc(100svh-76px)]">
      {/* =================================
          PLANNER HEADER / PROGRESS
      ================================== */}
      <section className="sticky top-[72px] z-30 border-b border-black/[0.05] bg-[#fffaf2]/90 backdrop-blur-xl sm:top-[76px]">
        <div className="mx-auto w-[min(100%-24px,1024px)] py-4 sm:w-[min(100%-32px,1024px)] sm:py-6">
          {/* Top row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm text-orange-600 shadow-sm sm:h-10 sm:w-10 sm:rounded-2xl sm:text-base">
                ☀
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-black sm:text-base">
                  Event Planner
                </div>

                <div className="hidden text-xs text-neutral-400 min-[400px]:block">
                  Ստեղծեք ձեր միջոցառումը
                </div>
              </div>
            </div>

            <div className="shrink-0 rounded-full border border-orange-200/70 bg-white px-3 py-1.5 text-xs font-bold text-orange-600 shadow-sm sm:px-4 sm:py-2 sm:text-sm">
              Քայլ {step} / 9
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 sm:mt-5">
            <div className="h-2 overflow-hidden rounded-full bg-black/[0.07] sm:h-2.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-[0_0_15px_rgba(242,140,40,.25)] transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-neutral-400 sm:text-xs">
              <span>Սկիզբ</span>

              <span>{Math.round(progress)}% ավարտված</span>

              <span>Ավարտ</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================
          PLANNER CONTENT
      ================================== */}
      <div className="mx-auto w-full max-w-[1180px] px-3 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 lg:pt-8">
        {/* STEP 1 */}
        {step === 1 && (
          <EventStep
            selectedEvent={eventPlan.eventType}
            customEvent={eventPlan.customEvent}
            onSelectEvent={(event) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                eventType: event,
              }))
            }
            onChangeCustomEvent={(value) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                customEvent: value,
              }))
            }
            onNext={nextStep}
          />
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <DateStep
            selectedDate={eventPlan.date}
            onSelectDate={(date) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                date,
              }))
            }
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <LocationStep
            selectedLocation={eventPlan.location}
            customLocation={eventPlan.customLocation}
            onSelectLocation={(location) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                location,
              }))
            }
            onChangeCustomLocation={(value) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                customLocation: value,
              }))
            }
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <GuestsStep
            guests={eventPlan.guests}
            onSelectGuests={(guests) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                guests,
              }))
            }
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <BudgetStep
            budget={eventPlan.budget}
            onSelectBudget={(budget) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                budget,
              }))
            }
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <ServicesStep
            services={eventPlan.services}
            onToggleService={toggleService}
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {/* STEP 7 */}
        {step === 7 && (
          <StyleStep
            style={eventPlan.style}
            onSelectStyle={(style) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                style,
              }))
            }
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {/* STEP 8 */}
        {step === 8 && (
          <NotesStep
            notes={eventPlan.notes}
            onChangeNotes={(notes) =>
              setEventPlan((currentPlan) => ({
                ...currentPlan,
                notes,
              }))
            }
            onNext={nextStep}
            onBack={previousStep}
          />
        )}

        {/* STEP 9 */}
        {step === 9 && (
          <SummaryStep
            eventPlan={eventPlan}
            onBack={previousStep}
          />
        )}
      </div>
    </main>
  );
}
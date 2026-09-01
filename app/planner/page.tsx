
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

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#252525]">

      {/* =========================
          PROGRESS
      ========================== */}

      <div className="mx-auto w-full max-w-5xl px-6 pt-8">

        <div className="flex items-center gap-4">

          <span className="min-w-fit text-sm font-semibold">
            Քայլ {step} / 9
          </span>

          <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">

            <div
              className="h-full rounded-full bg-[#f28c28] transition-all duration-500"
              style={{
                width: `${(step / 9) * 100}%`,
              }}
            />

          </div>

        </div>

      </div>

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

    </main>
  );
}

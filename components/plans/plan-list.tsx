"use client";

import { ChevronLeftIcon } from "lucide-react";

import HudLabel from "../hud/hud-label";
import { Plan, PLANS } from "./types";

function PlanButton({
  plan,
  onSelect,
}: {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}) {
  return (
    /* cream outer ring */
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className="w-full rounded-full p-[5px] shadow-xl transition hover:scale-[1.02] active:scale-[0.98]"
      style={{ background: "#F0EAB0" }}
    >
      {/* metallic inner pill */}
      <div
        className="flex h-20 w-full flex-col items-center justify-center rounded-full"
        style={{ background: plan.gradient }}
      >
        <span
          className="font-display text-2xl uppercase leading-none tracking-widest text-[#3b1a0e]"
          style={{ textShadow: "0 1px 2px rgba(255,255,255,0.35)" }}
        >
          {plan.name}
        </span>
        <span className="mt-1 text-sm font-semibold text-[#3b1a0e]/80">
          {plan.speed} @ {plan.price}
        </span>
      </div>
    </button>
  );
}

type Props = {
  onSelect: (plan: Plan) => void;
  onBack: () => void;
};

function PlanList({ onSelect, onBack }: Props) {
  return (
    <div
      className="relative flex h-full flex-1 flex-col overflow-hidden rounded-none bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/assets/dashboard/placeholder.jpg')" }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-[#3b1a0e]/80" />

      <button
        type="button"
        onClick={onBack}
        className="relative z-10 mb-4 inline-flex items-center self-start cursor-pointer rounded-md bg-white px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-200"
      >
        <ChevronLeftIcon className="mr-1 h-4 w-4" />
        Back
      </button>

      <HudLabel className="relative z-10 mb-2">SELECT_PLAN</HudLabel>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* Tuko Live logo */}
        <div
          className="h-36 w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/plans/tuko-live-logo.png')" }}
        />

        {/* Plan buttons */}
        <div className="flex w-full flex-col gap-4">
          {PLANS.map((plan) => (
            <PlanButton key={plan.name} plan={plan} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanList;

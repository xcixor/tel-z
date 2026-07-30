"use client";

import { CheckIcon } from "lucide-react";
import Image from "next/image";

import HudLabel from "../hud/hud-label";
import { PaymentMethod } from "../payment-methods";
import { Plan } from "./types";

type Props = {
  plan: Plan;
  paymentMethod: PaymentMethod;
  onExit: () => void;
};

function PlanSuccess({ plan, paymentMethod, onExit }: Props) {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 bg-[#3b1a0e] p-6">
      <HudLabel className="self-start">COMPLETE</HudLabel>

      <div className="relative mb-2 h-24 w-full">
        <Image
          src="/assets/plans/tuko-live-logo.png"
          alt="Tuko Live"
          fill
          sizes="(max-width: 640px) 100vw, 390px"
          className="object-contain"
        />
      </div>

      {/* selected plan pill, dimmed under the completed card */}
      <div className="relative w-full">
        <div
          className="w-full rounded-full p-[5px] opacity-60 shadow-xl"
          style={{ background: "#F0EAB0" }}
        >
          <div
            className="flex h-20 w-full flex-col items-center justify-center rounded-full"
            style={{ background: plan.gradient }}
          >
            <span className="font-display text-2xl uppercase leading-none tracking-widest text-[#3b1a0e]">
              {plan.name}
            </span>
            <span className="mt-1 text-sm font-semibold text-[#3b1a0e]/80">
              {plan.speed} @ {plan.price}
            </span>
          </div>
        </div>

        <div className="absolute -top-4 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-200 bg-[#3b1a0e]">
          <CheckIcon className="h-5 w-5 text-amber-300" />
        </div>
      </div>

      <div className="w-full rounded-2xl bg-orange-600 p-6 text-center shadow-xl">
        <p className="text-lg font-bold text-amber-100">Congratulations!</p>
        <p className="font-display text-3xl uppercase tracking-wide text-white">
          Uko Live
        </p>
        <p className="mt-1 text-sm font-semibold text-amber-100">
          Unlimited For one month
        </p>
        <p className="mt-3 text-xs text-amber-100/80">
          Paid via {paymentMethod}
        </p>
      </div>

      <button
        type="button"
        onClick={onExit}
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90"
      >
        Done
      </button>
    </div>
  );
}

export default PlanSuccess;

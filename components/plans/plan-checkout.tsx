"use client";

import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import HudLabel from "../hud/hud-label";
import { PAYMENT_METHODS, PaymentMethod } from "../payment-methods";
import { Plan } from "./types";

const PROCESSING_DELAY_MS = 700;

type Props = {
  plan: Plan;
  onBack: () => void;
  onPurchased: (method: PaymentMethod) => void;
};

function PlanCheckout({ plan, onBack, onPurchased }: Props) {
  const [processingMethod, setProcessingMethod] =
    useState<PaymentMethod | null>(null);

  function handlePay(method: PaymentMethod) {
    if (processingMethod) return;
    setProcessingMethod(method);
    setTimeout(() => onPurchased(method), PROCESSING_DELAY_MS);
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto bg-[#3b1a0e] p-6">
      <button
        type="button"
        onClick={onBack}
        disabled={processingMethod !== null}
        className="mb-4 inline-flex items-center self-start cursor-pointer rounded-md bg-white px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeftIcon className="mr-1 h-4 w-4" />
        Back
      </button>

      <HudLabel className="mb-2">CHECKOUT</HudLabel>

      <div className="relative mb-4 h-24 w-full">
        <Image
          src="/assets/plans/tuko-live-logo.png"
          alt="Tuko Live"
          fill
          sizes="(max-width: 640px) 100vw, 390px"
          className="object-contain"
        />
      </div>

      {/* selected plan pill */}
      <div className="w-full rounded-full p-[5px] shadow-xl" style={{ background: "#F0EAB0" }}>
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
      </div>

      <p className="mt-3 text-center text-sm text-amber-100/80">
        {plan.description}
      </p>

      <p className="font-display mt-6 text-center text-lg uppercase tracking-wide text-amber-300">
        Purchase
      </p>

      <div className="relative mx-auto mt-3 h-24 w-40">
        <Image
          src="/assets/dashboard/wallet.png"
          alt="TLZ Wallet"
          fill
          sizes="160px"
          className="object-contain"
        />
      </div>

      <div className="mt-4 flex w-full flex-col gap-3">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => handlePay(method)}
            disabled={processingMethod !== null}
            className="w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {processingMethod === method ? "Processing…" : method}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlanCheckout;

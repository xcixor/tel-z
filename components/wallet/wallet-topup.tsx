"use client";

import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import HudLabel from "../hud/hud-label";
import { PAYMENT_METHODS, PaymentMethod } from "../payment-methods";
import { TOPUP_AMOUNTS } from "./types";

const PROCESSING_DELAY_MS = 700;

type Props = {
  onBack: () => void;
  onTopUp: (amount: number, method: PaymentMethod) => void;
};

function WalletTopUp({ onBack, onTopUp }: Props) {
  const [selectedAmount, setSelectedAmount] = useState<number>(
    TOPUP_AMOUNTS[1],
  );
  const [processingMethod, setProcessingMethod] =
    useState<PaymentMethod | null>(null);

  function handlePay(method: PaymentMethod) {
    if (processingMethod) return;
    setProcessingMethod(method);
    setTimeout(() => onTopUp(selectedAmount, method), PROCESSING_DELAY_MS);
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

      <HudLabel className="mb-2">LOAD_WALLET</HudLabel>

      <div className="relative mx-auto h-16 w-40">
        <Image
          src="/assets/dashboard/wallet.png"
          alt="TLZ Wallet"
          fill
          className="object-contain"
        />
      </div>

      <p className="font-display mt-4 text-center text-lg uppercase tracking-wide text-amber-300">
        Load Wallet
      </p>
      <p className="mt-1 text-center text-sm text-amber-100/70">
        Top up your Tel Z balance. Use it for plans anytime.
      </p>

      {/* amount chips */}
      <div className="mt-6 grid grid-cols-4 gap-2">
        {TOPUP_AMOUNTS.map((amount) => {
          const isSelected = amount === selectedAmount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => setSelectedAmount(amount)}
              disabled={processingMethod !== null}
              className={`rounded-xl py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected
                  ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-[#3b1a0e]"
                  : "bg-white/10 text-amber-100 hover:bg-white/20"
              }`}
            >
              {amount}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm font-bold uppercase tracking-wide text-amber-300">
        Pay With
      </p>

      <div className="mt-3 flex w-full flex-col gap-3">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => handlePay(method)}
            disabled={processingMethod !== null}
            className="w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {processingMethod === method
              ? "Processing…"
              : `${method} · KES ${selectedAmount}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WalletTopUp;

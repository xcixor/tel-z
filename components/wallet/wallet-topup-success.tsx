"use client";

import { CheckIcon } from "lucide-react";
import Image from "next/image";

import HudLabel from "../hud/hud-label";
import { PaymentMethod } from "../payment-methods";

type Props = {
  amount: number;
  paymentMethod: PaymentMethod;
  newBalance: number;
  onDone: () => void;
};

function WalletTopUpSuccess({
  amount,
  paymentMethod,
  newBalance,
  onDone,
}: Props) {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 bg-[#3b1a0e] p-6">
      <HudLabel className="self-start">TOPPED_UP</HudLabel>

      <div className="relative">
        <div className="relative h-16 w-40">
          <Image
            src="/assets/dashboard/wallet.png"
            alt="TLZ Wallet"
            fill
            className="object-contain opacity-60"
          />
        </div>
        <div className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber-200 bg-[#3b1a0e]">
          <CheckIcon className="h-5 w-5 text-amber-300" />
        </div>
      </div>

      <div className="w-full rounded-2xl bg-orange-600 p-6 text-center shadow-xl">
        <p className="text-lg font-bold text-amber-100">Topped Up!</p>
        <p className="font-display text-3xl uppercase tracking-wide text-white">
          KES {amount.toLocaleString()}
        </p>
        <p className="mt-1 text-sm font-semibold text-amber-100">
          added to your wallet
        </p>
        <p className="mt-3 text-xs text-amber-100/80">
          Paid via {paymentMethod}
        </p>
      </div>

      <p className="text-sm text-amber-100/70">
        New balance:{" "}
        <span className="font-bold text-amber-300">
          KES {newBalance.toLocaleString()}
        </span>
      </p>

      <button
        type="button"
        onClick={onDone}
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90"
      >
        Done
      </button>
    </div>
  );
}

export default WalletTopUpSuccess;

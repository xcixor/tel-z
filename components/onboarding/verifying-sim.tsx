"use client";

import { CheckIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import HudLabel from "../hud/hud-label";

const CHECKING_DELAY_MS = 1800;
const ACTIVATED_DELAY_MS = 700;

type Props = {
  onNext: () => void;
};

function VerifyingSim({ onNext }: Props) {
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const checkingTimer = setTimeout(() => setIsActivated(true), CHECKING_DELAY_MS);
    return () => clearTimeout(checkingTimer);
  }, []);

  useEffect(() => {
    if (!isActivated) return;
    const activatedTimer = setTimeout(onNext, ACTIVATED_DELAY_MS);
    return () => clearTimeout(activatedTimer);
  }, [isActivated, onNext]);

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 bg-[#3b1a0e] p-6">
      <HudLabel className="self-start">VERIFYING_SIM</HudLabel>

      <div className="relative h-24 w-full">
        <Image
          src="/assets/plans/tuko-live-logo.png"
          alt="Tuko Live"
          fill
          sizes="(max-width: 640px) 100vw, 390px"
          className="object-contain"
        />
      </div>

      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-300/40">
        {isActivated ? (
          <CheckIcon className="h-10 w-10 text-amber-300" />
        ) : (
          <Loader2Icon className="h-10 w-10 animate-spin text-amber-300" />
        )}
      </div>

      <div className="text-center">
        <p className="font-display text-xl uppercase tracking-wide text-white">
          {isActivated ? "eSIM Activated" : "Checking Compatibility"}
        </p>
        <p className="mt-1 text-sm text-amber-100/70">
          {isActivated
            ? "You're ready to go."
            : "Verifying your device and SIM, hang tight…"}
        </p>
      </div>
    </div>
  );
}

export default VerifyingSim;

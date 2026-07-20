"use client";

import { useState } from "react";

import VerifyingSim from "./verifying-sim";
import WhatsYourName from "./whats-your-name";

type Step = "verifying" | "name";

type Props = {
  onComplete: (name: string) => void;
};

function OnboardingFlow({ onComplete }: Props) {
  const [step, setStep] = useState<Step>("verifying");

  if (step === "name") {
    return <WhatsYourName onComplete={onComplete} />;
  }

  return <VerifyingSim onNext={() => setStep("name")} />;
}

export default OnboardingFlow;

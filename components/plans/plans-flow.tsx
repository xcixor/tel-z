"use client";

import { useState } from "react";

import { PaymentMethod } from "../payment-methods";
import PlanCheckout from "./plan-checkout";
import PlanList from "./plan-list";
import PlanSuccess from "./plan-success";
import { Plan } from "./types";

type Step = "list" | "checkout" | "success";

type Props = {
  onExit: () => void;
};

function PlansFlow({ onExit }: Props) {
  const [step, setStep] = useState<Step>("list");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null,
  );

  function handleSelectPlan(plan: Plan) {
    setSelectedPlan(plan);
    setStep("checkout");
  }

  function handlePurchased(method: PaymentMethod) {
    setSelectedPayment(method);
    setStep("success");
  }

  function handleDone() {
    setStep("list");
    setSelectedPlan(null);
    setSelectedPayment(null);
    onExit();
  }

  if (step === "checkout" && selectedPlan) {
    return (
      <PlanCheckout
        plan={selectedPlan}
        onBack={() => setStep("list")}
        onPurchased={handlePurchased}
      />
    );
  }

  if (step === "success" && selectedPlan && selectedPayment) {
    return (
      <PlanSuccess
        plan={selectedPlan}
        paymentMethod={selectedPayment}
        onExit={handleDone}
      />
    );
  }

  return <PlanList onSelect={handleSelectPlan} onBack={onExit} />;
}

export default PlansFlow;

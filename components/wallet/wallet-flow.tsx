"use client";

import { useState } from "react";

import { PaymentMethod } from "../payment-methods";
import { DUMMY_TRANSACTIONS, INITIAL_BALANCE, Transaction } from "./types";
import WalletHome from "./wallet-home";
import WalletTopUp from "./wallet-topup";
import WalletTopUpSuccess from "./wallet-topup-success";

type Step = "home" | "topup" | "success";

type Props = {
  onExit: () => void;
};

function WalletFlow({ onExit }: Props) {
  const [step, setStep] = useState<Step>("home");
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [transactions, setTransactions] =
    useState<Transaction[]>(DUMMY_TRANSACTIONS);
  const [lastTopUp, setLastTopUp] = useState<{
    amount: number;
    method: PaymentMethod;
  } | null>(null);

  function handleTopUp(amount: number, method: PaymentMethod) {
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [
      {
        id: `t-${Date.now()}`,
        label: `Wallet top-up via ${method}`,
        date: "Today",
        amount,
      },
      ...prev,
    ]);
    setLastTopUp({ amount, method });
    setStep("success");
  }

  if (step === "topup") {
    return <WalletTopUp onBack={() => setStep("home")} onTopUp={handleTopUp} />;
  }

  if (step === "success" && lastTopUp) {
    return (
      <WalletTopUpSuccess
        amount={lastTopUp.amount}
        paymentMethod={lastTopUp.method}
        newBalance={balance}
        onDone={() => setStep("home")}
      />
    );
  }

  return (
    <WalletHome
      balance={balance}
      transactions={transactions}
      onBack={onExit}
      onLoadWallet={() => setStep("topup")}
    />
  );
}

export default WalletFlow;

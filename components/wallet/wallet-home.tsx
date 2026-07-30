"use client";

import { ArrowDownCircle, ArrowUpCircle, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";

import HudLabel from "../hud/hud-label";
import { Transaction, WALLET_STATS } from "./types";

function formatKes(amount: number): string {
  return `KES ${Math.abs(amount).toLocaleString()}`;
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isCredit = transaction.amount >= 0;

  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-none">
      <div className="flex items-center gap-3">
        {isCredit ? (
          <ArrowDownCircle className="h-6 w-6 shrink-0 text-emerald-400" />
        ) : (
          <ArrowUpCircle className="h-6 w-6 shrink-0 text-amber-300" />
        )}
        <div>
          <p className="text-sm font-medium text-amber-50">
            {transaction.label}
          </p>
          <p className="text-xs text-amber-100/50">{transaction.date}</p>
        </div>
      </div>
      <p
        className={`text-sm font-bold ${
          isCredit ? "text-emerald-400" : "text-amber-100/80"
        }`}
      >
        {isCredit ? "+" : "-"}
        {formatKes(transaction.amount)}
      </p>
    </div>
  );
}

type Props = {
  balance: number;
  transactions: Transaction[];
  onBack: () => void;
  onLoadWallet: () => void;
};

function WalletHome({ balance, transactions, onBack, onLoadWallet }: Props) {
  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto bg-[#3b1a0e] p-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center self-start cursor-pointer rounded-md bg-white px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-200"
      >
        <ChevronLeftIcon className="mr-1 h-4 w-4" />
        Back
      </button>

      <HudLabel className="mb-2">WALLET</HudLabel>

      {/* balance card */}
      <div className="w-full rounded-3xl p-[5px] shadow-xl" style={{ background: "#F0EAB0" }}>
        <div className="flex w-full flex-col items-center gap-2 rounded-3xl bg-[#0B4B8B] px-6 py-6">
          <div className="relative h-10 w-24">
            <Image
              src="/assets/dashboard/wallet.png"
              alt="TLZ Wallet"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
          <p className="text-xs uppercase tracking-widest text-blue-100/80">
            Available Balance
          </p>
          <p className="font-display text-4xl text-white">{formatKes(balance)}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onLoadWallet}
        className="mt-4 w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90"
      >
        Load Wallet
      </button>

      {/* stat strip */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {WALLET_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-amber-200/20 bg-black/30 px-2 py-3 text-center"
          >
            <p className="font-display text-lg text-amber-300">{stat.value}</p>
            <p className="mt-1 text-[10px] uppercase leading-tight tracking-wide text-amber-100/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* recent activity */}
      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-amber-300">
        Recent Activity
      </p>
      <div className="mt-1">
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default WalletHome;

"use client";

import { ChevronLeftIcon, LogOutIcon } from "lucide-react";

import HudLabel from "../hud/hud-label";
import { PLANS } from "../plans/types";

const ACCOUNT_CREATED_LABEL = "4 May 2026";

const CURRENT_PLAN = PLANS.find((plan) => plan.name === "FAST") ?? PLANS[0];

type Props = {
  userName?: string;
  onBack: () => void;
  onSelect: (label: string) => void;
  onLogout: () => void;
};

function SettingsView({ userName, onBack, onSelect, onLogout }: Props) {
  const displayName = userName || "Rebel";
  const initial = displayName.charAt(0).toUpperCase();

  const accountInfo = [
    { label: "Full Name", value: displayName },
    { label: "Date of Birth", value: "12 June 2004" },
    { label: "Phone Number", value: "+254 712 345 000" },
    { label: "Account Created", value: ACCOUNT_CREATED_LABEL },
    { label: "Member Status", value: "Verified Rebel" },
  ];

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

      <HudLabel className="mb-2">SETTINGS</HudLabel>

      {/* profile */}
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 font-display text-xl text-white">
          {initial}
        </div>
        <div>
          <p className="font-display text-xl text-white">{displayName}</p>
          <p className="text-xs text-amber-100/60">
            Rebel since {ACCOUNT_CREATED_LABEL}
          </p>
        </div>
      </div>

      {/* account info */}
      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-amber-300">
        Account
      </p>
      <div className="mt-1">
        {accountInfo.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-none"
          >
            <span className="text-sm text-amber-100/60">{item.label}</span>
            <span className="text-sm font-semibold text-amber-50">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* current plan */}
      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-amber-300">
        Current Plan
      </p>
      <div
        className="mt-2 w-full rounded-full p-[5px] shadow-xl"
        style={{ background: "#F0EAB0" }}
      >
        <div
          className="flex h-16 w-full items-center justify-center gap-2 rounded-full"
          style={{ background: CURRENT_PLAN.gradient }}
        >
          <span className="font-display text-lg uppercase tracking-widest text-[#3b1a0e]">
            {CURRENT_PLAN.name}
          </span>
          <span className="text-xs font-semibold text-[#3b1a0e]/80">
            {CURRENT_PLAN.speed} @ {CURRENT_PLAN.price}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onSelect("Plans")}
        className="mt-3 w-full cursor-pointer rounded-full bg-white/10 py-2.5 text-xs font-bold uppercase tracking-wide text-amber-100 transition hover:bg-white/20"
      >
        Change Plan
      </button>

      {/* log out */}
      <button
        type="button"
        onClick={onLogout}
        className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-xs font-bold uppercase tracking-wide text-amber-100/70 transition hover:bg-white/5"
      >
        <LogOutIcon className="h-4 w-4" />
        Log Out
      </button>
    </div>
  );
}

export default SettingsView;

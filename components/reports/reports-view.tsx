"use client";

import { CheckIcon, ChevronLeftIcon, Share2Icon } from "lucide-react";
import { useState } from "react";

import HudLabel from "../hud/hud-label";

const SHARE_RESET_MS = 1500;

const REBEL_STATS = [
  { label: "DAYS CONNECTED", value: "87" },
  { label: "TOTAL SAVED", value: "KES 3,400" },
  { label: "REFERRALS SECURED", value: "12" },
];

const TIME_OF_DAY_USAGE = [
  { label: "Morning", percent: 20 },
  { label: "Afternoon", percent: 35 },
  { label: "Evening", percent: 65 },
  { label: "Night", percent: 45 },
];

const SHARE_TEXT =
  "I've stayed lit for 87 days, saved KES 3,400, and brought 12 rebels onto Tel Z. Stay Lit, Stay Connected.";

type Props = {
  onExit: () => void;
};

function ReportsView({ onExit }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Tel Z Rebel Drop", text: SHARE_TEXT });
      } catch {
        // user dismissed the native share sheet — nothing to do
      }
      return;
    }

    await navigator.clipboard.writeText(SHARE_TEXT);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), SHARE_RESET_MS);
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto bg-[#3b1a0e] p-6">
      <button
        type="button"
        onClick={onExit}
        className="mb-4 inline-flex items-center self-start cursor-pointer rounded-md bg-white px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-200"
      >
        <ChevronLeftIcon className="mr-1 h-4 w-4" />
        Back
      </button>

      <HudLabel className="mb-2">REPORTS</HudLabel>

      {/* Rebel Drops */}
      <p className="font-display text-2xl uppercase tracking-wide text-white">
        Your Data Freedom Report
      </p>
      <p className="mt-1 text-sm text-amber-100/70">Jul – Sep 2026 Rebel Drop</p>

      <div
        className="mt-4 rounded-3xl p-6 shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, #BA011A 0%, #E44F0A 55%, #F0A533 100%)",
        }}
      >
        <div className="grid grid-cols-3 gap-2">
          {REBEL_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl text-white">{stat.value}</p>
              <HudLabel className="mt-1 text-white/70">{stat.label}</HudLabel>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-white/90">
          You&apos;ve stayed lit for 87 days straight. That&apos;s rebel energy.
        </p>
      </div>

      <button
        type="button"
        onClick={handleShare}
        className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90"
      >
        {isCopied ? (
          <>
            <CheckIcon className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Share2Icon className="h-4 w-4" />
            Share My Drop
          </>
        )}
      </button>

      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-amber-300">
        Drop Activity by Time of Day
      </p>
      <div className="mt-3 flex h-28 gap-3">
        {TIME_OF_DAY_USAGE.map((entry) => (
          <div
            key={entry.label}
            className="flex flex-1 flex-col items-center justify-end gap-1"
          >
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-orange-500 to-amber-300"
              style={{ height: `${entry.percent}%` }}
            />
            <span className="text-[10px] uppercase text-amber-100/50">
              {entry.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsView;

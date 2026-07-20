"use client";

import { CheckIcon, ChevronLeftIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import HudLabel from "../hud/hud-label";

const REFERRAL_CODE = "SWA-4271";
const COPIED_RESET_MS = 1500;

type InvitedFriend = {
  id: string;
  name: string;
  status: "Joined" | "Pending";
  reward: string;
};

const INVITED_FRIENDS: InvitedFriend[] = [
  { id: "f1", name: "Brayo", status: "Joined", reward: "+500MB" },
  { id: "f2", name: "Shiko", status: "Joined", reward: "+500MB" },
  { id: "f3", name: "Amani", status: "Pending", reward: "—" },
  { id: "f4", name: "Njoki", status: "Joined", reward: "+500MB" },
];

type Props = {
  onExit: () => void;
};

function ReferralHub({ onExit }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(REFERRAL_CODE).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), COPIED_RESET_MS);
    });
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

      <HudLabel className="mb-2">REFERRAL</HudLabel>

      <p className="font-display text-2xl uppercase tracking-wide text-white">
        Invite &amp; Earn
      </p>
      <p className="mt-1 text-sm text-amber-100/70">
        Every friend who joins earns you both mutual data rewards.
      </p>

      {/* referral code pill */}
      <div
        className="mt-6 w-full rounded-full p-[5px] shadow-xl"
        style={{ background: "#F0EAB0" }}
      >
        <div className="flex w-full items-center justify-between rounded-full bg-[#0B4B8B] px-6 py-4">
          <span className="font-display text-lg tracking-widest text-white">
            {REFERRAL_CODE}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex cursor-pointer items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-100 transition hover:bg-white/20"
          >
            {isCopied ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-amber-100/80">
        You&apos;ve earned <span className="font-bold text-amber-300">3.2GB</span> from{" "}
        <span className="font-bold text-amber-300">4 referrals</span>
      </p>

      {/* invited friends */}
      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-amber-300">
        Invited Friends
      </p>
      <div className="mt-1">
        {INVITED_FRIENDS.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-none"
          >
            <div>
              <p className="text-sm font-medium text-amber-50">{friend.name}</p>
              <span
                className={`text-xs font-semibold ${
                  friend.status === "Joined"
                    ? "text-emerald-400"
                    : "text-amber-300/80"
                }`}
              >
                {friend.status}
              </span>
            </div>
            <p className="text-sm font-bold text-amber-100/80">
              {friend.reward}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReferralHub;

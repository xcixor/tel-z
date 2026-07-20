"use client";

import { CheckIcon, ChevronLeftIcon } from "lucide-react";
import { useState } from "react";

import HudLabel from "../hud/hud-label";

const CONFIRMATION_DISPLAY_MS = 1200;
const STARTING_BOOSTS = 3;
const MAX_BOOSTS = 5;

type SquadMember = {
  id: string;
  name: string;
  progress: number;
};

const SQUAD_MEMBERS: SquadMember[] = [
  { id: "m1", name: "ShadowRider", progress: 80 },
  { id: "m2", name: "NovaStrike", progress: 60 },
  { id: "m3", name: "ApexPred", progress: 40 },
  { id: "m4", name: "GhostHunt", progress: 90 },
];

type Props = {
  onExit: () => void;
};

function SquadHub({ onExit }: Props) {
  const [boostsAvailable, setBoostsAvailable] = useState(STARTING_BOOSTS);
  const [boostedIds, setBoostedIds] = useState<Set<string>>(new Set());
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  function handleSendBoost(memberId: string) {
    if (boostsAvailable <= 0 || boostedIds.has(memberId)) return;

    setBoostsAvailable((prev) => prev - 1);
    setBoostedIds((prev) => new Set(prev).add(memberId));
    setConfirmingId(memberId);
    setTimeout(() => setConfirmingId(null), CONFIRMATION_DISPLAY_MS);
  }

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto bg-[#3b1a0e] p-6">
      <button
        type="button"
        onClick={onExit}
        className="mb-4 inline-flex items-center self-start cursor-pointer rounded-md bg-white px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-200"
      >
        <ChevronLeftIcon className="mr-1 h-4 w-4" />
        Back
      </button>

      <HudLabel className="mb-2">SQUAD</HudLabel>

      <p className="font-display text-2xl uppercase tracking-wide text-white">
        Boost Your Squad
      </p>
      <p className="mt-1 text-sm text-amber-100/70">
        Available Boosts: {boostsAvailable}/{MAX_BOOSTS} · Resets weekly
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {SQUAD_MEMBERS.map((member) => {
          const isBoosted = boostedIds.has(member.id);
          return (
            <div key={member.id} className="rounded-2xl bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-amber-50">
                  {member.name}
                </p>
                <button
                  type="button"
                  onClick={() => handleSendBoost(member.id)}
                  disabled={isBoosted || boostsAvailable <= 0}
                  className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#3b1a0e] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isBoosted ? (
                    <>
                      <CheckIcon className="h-3.5 w-3.5" />
                      Boosted
                    </>
                  ) : (
                    "Send Boost"
                  )}
                </button>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300"
                  style={{ width: `${member.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {confirmingId && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-300/40 bg-[#3b1a0e] px-8 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-400">
              <CheckIcon className="h-7 w-7 text-emerald-400" />
            </div>
            <p className="font-display text-lg uppercase tracking-wide text-white">
              Boost Sent!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SquadHub;

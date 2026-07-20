"use client";

import { useState } from "react";

import HudLabel from "../hud/hud-label";

type Props = {
  onComplete: (name: string) => void;
};

function WhatsYourName({ onComplete }: Props) {
  const [name, setName] = useState("");
  const trimmedName = name.trim();

  function handleSubmit() {
    if (!trimmedName) return;
    onComplete(trimmedName);
  }

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 bg-[#3b1a0e] p-6">
      <HudLabel className="self-start">WELCOME</HudLabel>

      <div
        className="h-24 w-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/plans/tuko-live-logo.png')" }}
      />

      <div className="text-center">
        <p className="font-display text-2xl uppercase tracking-wide text-white">
          What should we call you?
        </p>
        <p className="mt-1 text-sm text-amber-100/70">
          Just your name, nothing else. No forms, no paperwork.
        </p>
      </div>

      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSubmit();
        }}
        placeholder="Your name"
        className="w-full rounded-full bg-white/10 px-5 py-3 text-center text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!trimmedName}
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}

export default WhatsYourName;

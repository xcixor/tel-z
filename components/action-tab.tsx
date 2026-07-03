"use client";

import { ChevronLeftIcon, XIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  label: string;
  onBack: () => void;
  onSelect: (label: string) => void;
};

/* ─── Plan primitives ─────────────────────────────────────── */

type Plan = {
  name: string;
  speed: string;
  price: string;
  gradient: string;
};

const PLANS: Plan[] = [
  {
    name: "CHILL",
    speed: "10mbps",
    price: "500/=pm",
    // bronze
    gradient:
      "linear-gradient(135deg, #6B3A1F 0%, #C47C3A 25%, #E8B882 50%, #C47C3A 75%, #6B3A1F 100%)",
  },
  {
    name: "FAST",
    speed: "30mbps",
    price: "1,000/=pm",
    // silver
    gradient:
      "linear-gradient(135deg, #5A5A5A 0%, #C0C4CC 25%, #F0F2F4 50%, #C0C4CC 75%, #5A5A5A 100%)",
  },
  {
    name: "SUPERSONIC",
    speed: "80mbps",
    price: "2,000/=pm",
    // gold
    gradient:
      "linear-gradient(135deg, #7A4F00 0%, #D4A017 25%, #F5D060 50%, #D4A017 75%, #7A4F00 100%)",
  },
];

function PlanModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xs rounded-3xl bg-[#3b1a0e] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-amber-200 hover:text-white"
        >
          <XIcon className="h-5 w-5" />
        </button>
        <p className="mb-1 text-center text-2xl font-black uppercase tracking-widest text-amber-300">
          {plan.name}
        </p>
        <p className="mb-4 text-center text-sm text-amber-100/70">
          {plan.speed} @ {plan.price}
        </p>
        <button
          type="button"
          className="w-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 font-bold uppercase tracking-wide text-[#3b1a0e] shadow-lg transition hover:opacity-90"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

function PlanButton({
  plan,
  onSelect,
}: {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}) {
  return (
    /* cream outer ring */
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className="w-full rounded-full p-[5px] shadow-xl transition hover:scale-[1.02] active:scale-[0.98]"
      style={{ background: "#F0EAB0" }}
    >
      {/* metallic inner pill */}
      <div
        className="flex h-20 w-full flex-col items-center justify-center rounded-full"
        style={{ background: plan.gradient }}
      >
        <span
          className="text-2xl font-black uppercase leading-none tracking-widest text-[#3b1a0e]"
          style={{ textShadow: "0 1px 2px rgba(255,255,255,0.35)" }}
        >
          {plan.name}
        </span>
        <span className="mt-1 text-sm font-semibold text-[#3b1a0e]/80">
          {plan.speed} @ {plan.price}
        </span>
      </div>
    </button>
  );
}

function PlansTab() {
  const [selected, setSelected] = useState<Plan | null>(null);

  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-between overflow-hidden rounded-none bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/assets/dashboard/placeholder.jpg')" }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-[#3b1a0e]/80" />

      {/* Tuko Live logo */}
      <div
        className="relative z-10 h-36 w-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/plans/tuko-live-logo.png')" }}
      />

      {/* Plan buttons */}
      <div className="relative z-10 flex w-full flex-col gap-4">
        {PLANS.map((plan) => (
          <PlanButton key={plan.name} plan={plan} onSelect={setSelected} />
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <PlanModal plan={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-4 inline-flex items-center cursor-pointer rounded-md bg-white px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-200"
    >
      <ChevronLeftIcon className="mr-1 h-4 w-4" />
      Back
    </button>
  );
}

function DashboardPlaceholder({
  onSelect,
}: {
  onSelect: (label: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 bg-white p-4">
      {/* Logo */}
      <div
        className="h-40 w-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/dashboard/logo.png')" }}
      />

      {/* Banner */}
      <div
        className="h-48 w-full rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/dashboard/banner.jpg')" }}
      />

      {/* Grid — 4 equal-height cells, left 2/3 / right 1/3 */}
      <div
        className="grid grid-cols-3 gap-3"
        style={{ gridTemplateRows: "140px 140px" }}
      >
        <button
          type="button"
          className="col-span-2 rounded-2xl bg-cover bg-center transition-opacity hover:opacity-80"
          style={{
            backgroundImage: "url('/assets/dashboard/placeholder.jpg')",
          }}
        />
        <button
          type="button"
          className="col-span-1 rounded-2xl bg-cover bg-center transition-opacity hover:opacity-80"
          style={{ backgroundImage: "url('/assets/dashboard/wallet.png')" }}
        />
        <button
          type="button"
          className="col-span-2 rounded-2xl bg-cover bg-center transition-opacity hover:opacity-80"
          style={{
            backgroundImage: "url('/assets/dashboard/placeholder.jpg')",
          }}
        />
        <button
          type="button"
          onClick={() => onSelect("Plans")}
          className="col-span-1 rounded-2xl bg-cover bg-center transition-opacity hover:opacity-80"
          style={{ backgroundImage: "url('/assets/dashboard/banner-2.jpg')" }}
        />
      </div>
    </div>
  );
}

function ActionBody({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (label: string) => void;
}) {
  switch (label) {
    case "Dashboard":
      return <DashboardPlaceholder onSelect={onSelect} />;
    case "Data":
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg bg-white p-4 text-sm text-slate-500">
          <p>
            Here you can manage your data. Upload, download, and analyze your
            datasets.
          </p>
        </div>
      );
    case "Reports":
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg bg-white p-4 text-sm text-slate-500">
          <p>Generate and view reports based on your data and activities.</p>
        </div>
      );
    case "Settings":
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg bg-white p-4 text-sm text-slate-500">
          <p>
            Adjust your preferences and configure the application settings here.
          </p>
        </div>
      );
    case "Plans":
      return <PlansTab />;
    default:
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg bg-white p-4 text-sm text-slate-500">
          <p>No content available.</p>
        </div>
      );
  }
}

function ActionTab({ label, onBack, onSelect }: Props) {
  return (
    <div className="flex h-full w-full flex-col transition-all duration-300">
      {label !== "Dashboard" && <BackButton onBack={onBack} />}
      <ActionBody label={label} onSelect={onSelect} />
    </div>
  );
}

export default ActionTab;

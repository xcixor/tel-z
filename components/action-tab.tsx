"use client";

import { ChevronLeftIcon } from "lucide-react";
import ActionsWrapper from "./actions-wrapper";
import CustomBtn from "./custom-btn";
import DataUsageView from "./data-usage/data-usage-view";
import HudLabel from "./hud/hud-label";
import PlansFlow from "./plans/plans-flow";
import ReferralHub from "./referral/referral-hub";
import SquadHub from "./squad/squad-hub";
import WalletFlow from "./wallet/wallet-flow";

type Props = {
  label: string;
  onBack: () => void;
  onSelect: (label: string) => void;
  userName?: string;
};

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
  userName,
}: {
  onSelect: (label: string) => void;
  userName?: string;
}) {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto bg-white p-4 justify-between space-y-2">
      <HudLabel className="text-slate-400">
        {`HEY ${(userName || "THERE").toUpperCase()}`}
      </HudLabel>

      {/* Logo */}
      <div
        className="h-20 w-auto bg-contain bg-left bg-no-repeat"
        style={{ backgroundImage: "url('/assets/dashboard/logo.png')" }}
      />

      <div
        className="h-52 w-full rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/dashboard/banner.jpg')" }}
      />

      <div
        className="grid grid-cols-3 gap-3"
        style={{ gridTemplateRows: "140px 140px" }}
      >
        <CustomBtn
          url="/assets/dashboard/a.png"
          className="col-span-2"
          onClick={() => onSelect("Referral")}
        />
        <CustomBtn
          url="/assets/dashboard/wallet.png"
          className="col-span-1"
          onClick={() => onSelect("Wallet")}
        />
        <CustomBtn
          url="/assets/dashboard/b.png"
          className="col-span-2"
          onClick={() => onSelect("Squad")}
        />
        <CustomBtn
          url="/assets/dashboard/guy.png"
          className="col-span-1 bg-[#441817]"
          onClick={() => onSelect("Plans")}
        />
      </div>

      <div>
        <HudLabel className="mb-2 text-slate-400">MENU</HudLabel>
        <ActionsWrapper onSelect={onSelect} />
      </div>
    </div>
  );
}

function ActionBody({
  label,
  onSelect,
  onBack,
  userName,
}: {
  label: string;
  onSelect: (label: string) => void;
  onBack: () => void;
  userName?: string;
}) {
  switch (label) {
    case "Dashboard":
      return <DashboardPlaceholder onSelect={onSelect} userName={userName} />;
    case "Data":
      return <DataUsageView />;
    case "Reports":
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center text-sm text-slate-500">
          <HudLabel className="text-slate-400">REPORTS</HudLabel>
          <p>Generate and view reports based on your data and activities.</p>
        </div>
      );
    case "Settings":
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center text-sm text-slate-500">
          <HudLabel className="text-slate-400">SETTINGS</HudLabel>
          <p>
            Adjust your preferences and configure the application settings here.
          </p>
        </div>
      );
    case "Plans":
      return <PlansFlow onExit={onBack} />;
    case "Wallet":
      return <WalletFlow onExit={onBack} />;
    case "Referral":
      return <ReferralHub onExit={onBack} />;
    case "Squad":
      return <SquadHub onExit={onBack} />;
    default:
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg bg-white p-4 text-sm text-slate-500">
          <p>No content available.</p>
        </div>
      );
  }
}

function ActionTab({ label, onBack, onSelect, userName }: Props) {
  // Plans, Wallet, Referral, and Squad each own their own back/close chrome.
  const showGenericBackButton = ![
    "Dashboard",
    "Plans",
    "Wallet",
    "Referral",
    "Squad",
  ].includes(label);

  return (
    <div className="flex h-full w-full flex-col transition-all duration-300">
      {showGenericBackButton && <BackButton onBack={onBack} />}
      <ActionBody
        label={label}
        onSelect={onSelect}
        onBack={onBack}
        userName={userName}
      />
    </div>
  );
}

export default ActionTab;

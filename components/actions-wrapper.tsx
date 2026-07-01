"use client";

import {
  ArrowRightLeftIcon,
  ArrowUpDownIcon,
  ChartNoAxesCombinedIcon,
  GiftIcon,
  HandCoinsIcon,
  PhoneOutgoingIcon,
} from "lucide-react";
import { useState } from "react";
import Action from "./action";
import ActionTab from "./action-tab";

const ActionsWrapper = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const isTabOpen = selectedAction !== null;

  const actions = [
    {
      label: "Buy Bundles",
      icon: ArrowUpDownIcon,
    },
    {
      label: "Top Up",
      icon: PhoneOutgoingIcon,
    },
    {
      label: "Transfer Bundles",
      icon: ArrowRightLeftIcon,
    },
    {
      label: "My usage",
      icon: ChartNoAxesCombinedIcon,
    },
    {
      label: "Points",
      icon: HandCoinsIcon,
    },
    {
      label: "Offers",
      icon: GiftIcon,
    },
  ];
  return (
    <div className="relative min-h-[280px] overflow-hidden">
      <div
        className={`grid grid-cols-3 gap-4 transition-all duration-300 ${
          isTabOpen
            ? "pointer-events-none translate-x-6 opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        {actions.map((action) => (
          <Action
            key={action.label}
            Icon={action.icon}
            label={action.label}
            onClick={() => setSelectedAction(action.label)}
          />
        ))}
      </div>

      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isTabOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-6 opacity-0"
        }`}
      >
        {selectedAction && (
          <ActionTab
            label={selectedAction}
            onBack={() => setSelectedAction(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ActionsWrapper;

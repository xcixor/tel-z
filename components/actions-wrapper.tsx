"use client";

import {
  DatabaseIcon,
  FileChartColumnIcon,
  HomeIcon,
  Settings,
} from "lucide-react";

import Action from "./action";

type Props = {
  onSelect: (label: string) => void;
};

const actions = [
  {
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    label: "Data",
    icon: DatabaseIcon,
  },
  {
    label: "Reports",
    icon: FileChartColumnIcon,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

function ActionsWrapper({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <Action
          key={action.label}
          Icon={action.icon}
          label={action.label}
          onClick={() => onSelect(action.label)}
        />
      ))}
    </div>
  );
}

export default ActionsWrapper;

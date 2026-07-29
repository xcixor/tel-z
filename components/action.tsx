import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  Icon: LucideIcon;
  label: string;
  onClick: () => void;
};

function Action({ Icon, label, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col items-center cursor-pointer justify-center gap-2 rounded-xl bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200"
    >
      <span className="bg-slate-200 p-2 rounded-full">
        <Icon size={16} />
      </span>
    </button>
  );
}

export default Action;

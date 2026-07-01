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
      className="flex w-full items-center gap-2 bg-slate-100 px-4 md:py-16 py-8 rounded-lg flex-col justify-center text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors"
    >
      <span className="bg-slate-200 p-2 rounded-full">
        <Icon />
      </span>
      <p className="text-sm text-muted-foreground text-center">{label}</p>
    </button>
  );
}

export default Action;

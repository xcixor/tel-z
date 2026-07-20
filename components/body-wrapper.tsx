"use client";

import ActionTab from "./action-tab";

type Props = {
  selectedAction: string | null;
  onSelect: (label: string) => void;
  onBack: () => void;
  userName?: string;
};

function BodyWrapper({ selectedAction, onSelect, onBack, userName }: Props) {
  if (!selectedAction) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl bg-slate-50 p-6 text-center text-slate-500">
        <p className="text-sm">Choose a tab to continue.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ActionTab
        label={selectedAction}
        onBack={onBack}
        onSelect={onSelect}
        userName={userName}
      />
    </div>
  );
}

export default BodyWrapper;

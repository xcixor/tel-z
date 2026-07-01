import { ChevronLeftIcon } from "lucide-react";

type Props = {
  label: string;
  onBack: () => void;
};

function ActionTab({ label, onBack }: Props) {
  return (
    <div className="size-full rounded-lg bg-slate-100 p-4 transition-all duration-300">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 cursor-pointer rounded-md bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-200 transition-colors"
      >
        <ChevronLeftIcon className="inline-block mr-1 h-4 w-4" />
      </button>
      <h2 className="text-lg font-semibold text-slate-700">{label}</h2>
      <p className="mt-2 text-sm text-slate-500">You selected {label}.</p>
    </div>
  );
}

export default ActionTab;

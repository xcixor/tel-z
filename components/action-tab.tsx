import { ChevronLeftIcon } from "lucide-react";

type Props = {
  label: string;
  onBack: () => void;
  onSelect: (label: string) => void;
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
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg bg-white p-4 text-sm text-slate-500">
          <p className="text-base font-semibold text-slate-700">Data Plans</p>
        </div>
      );
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

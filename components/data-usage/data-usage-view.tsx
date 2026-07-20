"use client";

import HudLabel from "../hud/hud-label";

const WEEKLY_USAGE = [
  { day: "Mon", gb: 3.2 },
  { day: "Tue", gb: 5.8 },
  { day: "Wed", gb: 2.1 },
  { day: "Thu", gb: 6.4 },
  { day: "Fri", gb: 8.9 },
  { day: "Sat", gb: 7.3 },
  { day: "Sun", gb: 4.6 },
];

const MAX_WEEKLY_GB = Math.max(...WEEKLY_USAGE.map((entry) => entry.gb));

const LIVE_STATS = [
  { label: "DOWNLOAD", value: "42Mbps" },
  { label: "UPLOAD", value: "18Mbps" },
  { label: "PING", value: "12ms" },
];

function DataUsageView() {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-lg bg-white p-4">
      <HudLabel className="text-slate-400">DATA</HudLabel>

      <div>
        <p className="font-display text-3xl text-slate-800">42.7 GB Used</p>
        <p className="mt-1 text-sm text-slate-500">
          No expiry. No fair-use throttling. Ever.
        </p>
      </div>

      {/* live stat strip */}
      <div className="grid grid-cols-3 gap-2">
        {LIVE_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-3 text-center"
          >
            <p className="font-display text-lg text-orange-500">
              {stat.value}
            </p>
            <HudLabel className="mt-1 text-slate-400">{stat.label}</HudLabel>
          </div>
        ))}
      </div>

      {/* 7-day bar chart */}
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-slate-600">
          This Week
        </p>
        <div className="mt-3 flex h-32 gap-2">
          {WEEKLY_USAGE.map((entry) => (
            <div
              key={entry.day}
              className="flex flex-1 flex-col items-center justify-end gap-1"
            >
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-orange-500 to-amber-300"
                style={{ height: `${(entry.gb / MAX_WEEKLY_GB) * 100}%` }}
              />
              <span className="text-[10px] uppercase text-slate-400">
                {entry.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataUsageView;

"use client";

import { GaugeIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MAX_SPEED_MBPS = 100;
const RAMP_DURATION_MS = 450;
const SETTLE_DURATION_MS = 250;
const OVERSHOOT_MBPS = 6;
const MIN_RESULT_MBPS = 60;
const MAX_RESULT_MBPS = 85;

const GAUGE_RADIUS = 90;
const GAUGE_CENTER_X = 100;
const GAUGE_CENTER_Y = 100;
const NEEDLE_LENGTH = GAUGE_RADIUS - 20;
const ARC_LENGTH = Math.PI * GAUGE_RADIUS;

function needleEndpoint(fraction: number) {
  const angleRad = ((180 - fraction * 180) * Math.PI) / 180;
  return {
    x: GAUGE_CENTER_X + NEEDLE_LENGTH * Math.cos(angleRad),
    y: GAUGE_CENTER_Y - NEEDLE_LENGTH * Math.sin(angleRad),
  };
}

function SpeedGauge() {
  const [speed, setSpeed] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function runSpeedTest() {
    if (isTesting) return;
    setIsTesting(true);
    setSpeed(0);

    const target =
      Math.floor(Math.random() * (MAX_RESULT_MBPS - MIN_RESULT_MBPS + 1)) +
      MIN_RESULT_MBPS;
    const overshoot = Math.min(target + OVERSHOOT_MBPS, MAX_SPEED_MBPS);

    function settle(now: number, settleStart: number) {
      const progress = Math.min((now - settleStart) / SETTLE_DURATION_MS, 1);
      setSpeed(Math.round(overshoot + (target - overshoot) * progress));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame((next) =>
          settle(next, settleStart),
        );
      } else {
        setIsTesting(false);
      }
    }

    function ramp(now: number, rampStart: number) {
      const progress = Math.min((now - rampStart) / RAMP_DURATION_MS, 1);
      setSpeed(Math.round(overshoot * progress));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame((next) =>
          ramp(next, rampStart),
        );
      } else {
        frameRef.current = requestAnimationFrame((next) => settle(next, next));
      }
    }

    frameRef.current = requestAnimationFrame((start) => ramp(start, start));
  }

  const fraction = Math.min(speed / MAX_SPEED_MBPS, 1);
  const needle = needleEndpoint(fraction);

  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5">
      <svg viewBox="0 0 200 110" className="w-full max-w-[220px]">
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          fill="none"
          stroke="url(#speedGaugeGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={ARC_LENGTH}
          strokeDashoffset={ARC_LENGTH - fraction * ARC_LENGTH}
        />
        <defs>
          <linearGradient
            id="speedGaugeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#E44F0A" />
            <stop offset="100%" stopColor="#F0A533" />
          </linearGradient>
        </defs>
        <line
          x1={GAUGE_CENTER_X}
          y1={GAUGE_CENTER_Y}
          x2={needle.x}
          y2={needle.y}
          stroke="#3b1a0e"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={GAUGE_CENTER_X} cy={GAUGE_CENTER_Y} r="6" fill="#3b1a0e" />
      </svg>

      <p className="font-display -mt-2 text-3xl text-slate-800">
        {speed}
        <span className="ml-1 font-sans text-sm text-slate-500">Mbps</span>
      </p>

      <button
        type="button"
        onClick={runSpeedTest}
        disabled={isTesting}
        className="mt-3 flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 text-xs font-bold uppercase tracking-wide text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GaugeIcon className="h-4 w-4" />
        {isTesting ? "Testing…" : "Run Speed Test"}
      </button>
    </div>
  );
}

export default SpeedGauge;

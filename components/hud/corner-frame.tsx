import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Deck-style corner registration marks — a framing device, not a per-card motif. */
function CornerFrame({ children, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <span className="pointer-events-none absolute left-3 top-3 z-50 h-4 w-4 border-l-2 border-t-2 border-amber-400/80" />
      <span className="pointer-events-none absolute right-3 top-3 z-50 h-4 w-[2px] bg-amber-400/80" />
    </div>
  );
}

export default CornerFrame;

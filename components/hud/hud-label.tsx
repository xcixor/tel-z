type Props = {
  children: string;
  className?: string;
};

/** Deck-style `// LABEL` micro-label used above section/screen headings. */
function HudLabel({ children, className = "" }: Props) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-widest text-amber-300/80 ${className}`}
    >
      {`// ${children}`}
    </p>
  );
}

export default HudLabel;

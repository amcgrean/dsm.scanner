const DELAYS = ["0s", "0.15s", "0.3s"];

export function EqualizerBars({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-3.5 items-end gap-0.5 ${className}`}
      aria-hidden="true"
    >
      {DELAYS.map((delay, i) => (
        <span
          key={i}
          className="eq-bar w-[3px] rounded-sm bg-neon-cyan"
          style={{ height: "100%", animationDelay: delay }}
        />
      ))}
    </span>
  );
}

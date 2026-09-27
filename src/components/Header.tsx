export function Header() {
  return (
    <header className="scanline-header border-b border-white/10 bg-ink-950/90 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-[0.15em] text-text-primary">
            DSM SCANNER
          </h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
            live des moines radio
          </p>
        </div>
        <span
          className="pulse-dot h-2.5 w-2.5 shrink-0 rounded-full bg-neon-magenta"
          aria-label="Live"
          role="img"
        />
      </div>
    </header>
  );
}

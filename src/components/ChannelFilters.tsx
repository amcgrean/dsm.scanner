import { CATEGORY_ORDER } from "@/lib/channels";

const ALL = "All";

export function ChannelFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}) {
  const chips = [ALL, ...CATEGORY_ORDER];

  return (
    <div className="space-y-3 border-b border-white/10 bg-ink-950/90 px-4 py-3 backdrop-blur">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          inputMode="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search all channels…"
          className="w-full rounded-lg border border-white/10 bg-ink-900/80 py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-neon-cyan/60 focus:outline-none focus:ring-1 focus:ring-neon-cyan/40"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chips.map((chip) => {
          const active = chip === category;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => onCategoryChange(chip)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                active
                  ? "border-neon-magenta/60 bg-neon-magenta/15 text-neon-magenta glow-magenta"
                  : "border-white/10 bg-white/5 text-text-muted hover:border-white/20 hover:text-text-primary"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { ALL as ALL_CATEGORIES };

import type { Channel } from "@/lib/types";
import { kindBadgeClass, kindLabel } from "@/lib/kind";
import { EqualizerBars } from "./EqualizerBars";

export function ChannelRow({
  channel,
  active,
  onSelect,
}: {
  channel: Channel;
  active: boolean;
  onSelect: (channel: Channel) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(channel)}
        className={`flex min-h-11 w-full items-center gap-3 border-l-2 px-4 py-3 text-left transition-colors ${
          active
            ? "border-neon-magenta bg-neon-magenta/10 glow-cyan"
            : "border-transparent hover:bg-white/5"
        }`}
      >
        <span
          className={`flex-1 truncate text-sm ${
            active ? "font-semibold text-text-primary" : "text-text-primary/90"
          }`}
        >
          {channel.name}
        </span>
        {active ? <EqualizerBars className="shrink-0" /> : null}
        <span
          className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${kindBadgeClass(
            channel.kind,
          )}`}
        >
          {kindLabel(channel.kind)}
        </span>
      </button>
    </li>
  );
}

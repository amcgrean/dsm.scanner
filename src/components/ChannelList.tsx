import type { Channel } from "@/lib/types";
import { ChannelRow } from "./ChannelRow";

export function ChannelList({
  groups,
  currentSlug,
  onSelect,
}: {
  groups: (readonly [string, Channel[]])[];
  currentSlug: string | null;
  onSelect: (channel: Channel) => void;
}) {
  if (groups.length === 0) {
    return (
      <div className="px-4 py-16 text-center text-sm text-text-muted">
        No channels match your search.
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/5">
      {groups.map(([category, channels]) => (
        <section key={category}>
          <h2 className="sticky top-0 z-10 bg-ink-900/95 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.15em] text-neon-cyan/90 backdrop-blur">
            {category}
          </h2>
          <ul>
            {channels.map((channel) => (
              <ChannelRow
                key={channel.slug}
                channel={channel}
                active={channel.slug === currentSlug}
                onSelect={onSelect}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

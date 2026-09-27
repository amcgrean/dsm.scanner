import type { Channel, PlayerStatus } from "@/lib/types";
import { EqualizerBars } from "./EqualizerBars";

export function NowPlayingBar({
  channel,
  status,
  nowPlaying,
  onStop,
}: {
  channel: Channel;
  status: PlayerStatus;
  nowPlaying: string;
  onStop: () => void;
}) {
  const isLoading = status === "loading";
  const isError = status === "error";

  return (
    <div className="glow-magenta shrink-0 border-t border-white/10 bg-ink-900/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-text-primary">
              {channel.name}
            </span>
            {status === "playing" ? <EqualizerBars /> : null}
          </div>
          <p
            className={`mt-0.5 truncate text-xs ${
              isError
                ? "text-red-400"
                : isLoading
                  ? "animate-pulse text-text-muted"
                  : "text-neon-cyan text-glow-cyan"
            }`}
          >
            {isError
              ? "Connection lost — tap a channel to retry"
              : isLoading
                ? "Connecting…"
                : nowPlaying || "Scanning…"}
          </p>
        </div>
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-text-primary transition-colors hover:border-neon-magenta/60 hover:text-neon-magenta"
        >
          <span className="h-3 w-3 rounded-[2px] bg-current" />
        </button>
      </div>
    </div>
  );
}

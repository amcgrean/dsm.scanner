"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Channel, PlayerStatus } from "./types";

// icecast-metadata-player ships no bundled types; declare the surface we use.
interface IcecastPlayerInstance {
  play: () => void;
  stop: () => Promise<void> | void;
}

interface IcyMetadata {
  StreamTitle?: string;
}

export function useScannerPlayer() {
  const playerRef = useRef<IcecastPlayerInstance | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [nowPlaying, setNowPlaying] = useState<string>("");
  const [current, setCurrent] = useState<Channel | null>(null);

  const teardown = useCallback(async () => {
    try {
      await playerRef.current?.stop();
    } catch {
      // stopping a half-initialized or already-dead player is a no-op
    }
    playerRef.current = null;
  }, []);

  const stop = useCallback(async () => {
    await teardown();
    setStatus("idle");
    setNowPlaying("");
    setCurrent(null);
  }, [teardown]);

  const play = useCallback(
    async (channel: Channel) => {
      // MUST be invoked synchronously from a user gesture on iOS Safari,
      // so keep this a direct tap-handler call, not deferred.
      await teardown();
      setCurrent(channel);
      setNowPlaying("");
      setStatus("loading");

      const { default: IcecastMetadataPlayer } = await import(
        "icecast-metadata-player"
      );

      const player = new IcecastMetadataPlayer(channel.url, {
        metadataTypes: ["icy"],
        onMetadata: (meta: IcyMetadata) => {
          const title = (meta?.StreamTitle ?? "").trim();
          setNowPlaying(!title || title === "Scanning..." ? "Scanning…" : title);
        },
        onPlay: () => setStatus("playing"),
        onStop: () => setStatus((s) => (s === "error" ? s : "idle")),
        onError: () => setStatus("error"),
      }) as unknown as IcecastPlayerInstance;

      playerRef.current = player;
      player.play();

      if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: channel.name,
          artist: "DSM Scanner",
          album: channel.category,
        });
        navigator.mediaSession.setActionHandler("stop", () => {
          void stop();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
          void stop();
        });
      }
    },
    [teardown, stop],
  );

  useEffect(() => {
    return () => {
      void teardown();
    };
  }, [teardown]);

  return {
    status,
    nowPlaying,
    current,
    currentSlug: current?.slug ?? null,
    play,
    stop,
  };
}

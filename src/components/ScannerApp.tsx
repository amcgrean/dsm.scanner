"use client";

import { useMemo, useState } from "react";
import { CHANNELS, CATEGORY_ORDER, DEFAULT_CATEGORY, byCategory } from "@/lib/channels";
import type { Channel } from "@/lib/types";
import { useScannerPlayer } from "@/lib/useScannerPlayer";
import { Header } from "./Header";
import { ChannelFilters, ALL_CATEGORIES } from "./ChannelFilters";
import { ChannelList } from "./ChannelList";
import { NowPlayingBar } from "./NowPlayingBar";
import { Footer } from "./Footer";

export function ScannerApp() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORY);
  const { status, nowPlaying, current, currentSlug, play, stop } =
    useScannerPlayer();

  const groups = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (query) {
      const matches = CHANNELS.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.slug.toLowerCase().includes(query),
      );
      const byCat = new Map<string, Channel[]>();
      for (const c of matches) {
        const list = byCat.get(c.category);
        if (list) list.push(c);
        else byCat.set(c.category, [c]);
      }
      return CATEGORY_ORDER.filter((k) => byCat.has(k)).map(
        (k) => [k, byCat.get(k)!] as const,
      );
    }

    if (category === ALL_CATEGORIES) {
      return byCategory();
    }

    return byCategory().filter(([cat]) => cat === category);
  }, [search, category]);

  const handleSelect = (channel: Channel) => {
    // Called directly from the row's onClick handler, so this still runs
    // inside the tap gesture — required for iOS Safari autoplay.
    void play(channel);
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="shrink-0">
        <Header />
        <ChannelFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>

      <main className="flex-1 overflow-y-auto">
        <ChannelList
          groups={groups}
          currentSlug={currentSlug}
          onSelect={handleSelect}
        />
        <Footer />
      </main>

      {current ? (
        <NowPlayingBar
          channel={current}
          status={status}
          nowPlaying={nowPlaying}
          onStop={() => void stop()}
        />
      ) : null}
    </div>
  );
}

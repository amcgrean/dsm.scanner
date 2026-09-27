import raw from "@/data/channels.json";
import type { Channel } from "./types";

export const CHANNELS = raw as Channel[];

export const CATEGORY_ORDER = [
  "Polk / Des Moines Metro",
  "ISICS Statewide / Interop",
  "ISICS Services",
  "ISICS Other Counties",
  "SARA (Eastern IA)",
  "Aircraft",
];

export const DEFAULT_CATEGORY = CATEGORY_ORDER[0];

export function byCategory(): (readonly [string, Channel[]])[] {
  const m = new Map<string, Channel[]>();
  for (const c of CHANNELS) {
    const list = m.get(c.category);
    if (list) {
      list.push(c);
    } else {
      m.set(c.category, [c]);
    }
  }
  return CATEGORY_ORDER.filter((k) => m.has(k)).map(
    (k) => [k, m.get(k)!] as const,
  );
}

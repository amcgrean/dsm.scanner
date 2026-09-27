export interface Channel {
  slug: string;
  name: string;
  category: string;
  kind: string; // law | fire | ems | air | interop | ...
  url: string; // https://dsmrad.io/stream/<slug>
}

export type PlayerStatus = "idle" | "loading" | "playing" | "error";

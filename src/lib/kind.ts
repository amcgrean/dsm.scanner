const KIND_STYLES: Record<string, string> = {
  law: "text-neon-magenta border-neon-magenta/40 bg-neon-magenta/10",
  fire: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  ems: "text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10",
  air: "text-neon-purple border-neon-purple/40 bg-neon-purple/10",
  interop: "text-amber-300 border-amber-300/40 bg-amber-300/10",
  "emergency-ops": "text-red-400 border-red-400/40 bg-red-400/10",
  multi: "text-indigo-300 border-indigo-300/40 bg-indigo-300/10",
  hospital: "text-rose-300 border-rose-300/40 bg-rose-300/10",
  military: "text-slate-300 border-slate-300/40 bg-slate-300/10",
  business: "text-teal-300 border-teal-300/40 bg-teal-300/10",
  "public-works": "text-lime-300 border-lime-300/40 bg-lime-300/10",
  transportation: "text-sky-300 border-sky-300/40 bg-sky-300/10",
  security: "text-fuchsia-300 border-fuchsia-300/40 bg-fuchsia-300/10",
  utilities: "text-emerald-300 border-emerald-300/40 bg-emerald-300/10",
  medcom: "text-cyan-300 border-cyan-300/40 bg-cyan-300/10",
};

const DEFAULT_STYLE =
  "text-text-muted border-text-muted/30 bg-text-muted/10";

export function kindBadgeClass(kind: string): string {
  return KIND_STYLES[kind] ?? DEFAULT_STYLE;
}

export function kindLabel(kind: string): string {
  return kind.replace(/-/g, " ");
}

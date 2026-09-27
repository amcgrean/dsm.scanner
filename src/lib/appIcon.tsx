import type { ReactElement } from "react";

export function AppIconMark({
  size,
  maskable = false,
}: {
  size: number;
  maskable?: boolean;
}): ReactElement {
  // Maskable icons get cropped to a shape by the OS, so keep the important
  // graphic inside the center ~80% "safe zone".
  const inset = maskable ? size * 0.22 : size * 0.14;
  const ringSize = size - inset * 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #0a0a18 0%, #12122a 100%)",
      }}
    >
      <div
        style={{
          width: ringSize,
          height: ringSize,
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `${Math.max(2, size * 0.018)}px solid #22d3ee`,
          boxShadow: "0 0 0 1px rgba(34,211,238,0.15)",
        }}
      >
        <div
          style={{
            width: ringSize * 0.62,
            height: ringSize * 0.62,
            borderRadius: "9999px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: ringSize * 0.045,
            background: "rgba(255,45,149,0.12)",
            border: `${Math.max(1, size * 0.008)}px solid #ff2d95`,
            paddingBottom: ringSize * 0.14,
          }}
        >
          {[0.34, 0.62, 0.46].map((h, i) => (
            <div
              key={i}
              style={{
                width: ringSize * 0.07,
                height: ringSize * 0.34 * h,
                borderRadius: 4,
                background: i === 1 ? "#ff2d95" : "#22d3ee",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

// icecast-metadata-player pulls in browser-only worker/WASM decoder code
// that cannot be bundled for the server, so this subtree is client-only.
// `ssr: false` requires a Client Component boundary, hence this wrapper.
const ScannerApp = dynamic(
  () => import("./ScannerApp").then((m) => m.ScannerApp),
  { ssr: false },
);

export function ScannerAppLoader() {
  return <ScannerApp />;
}

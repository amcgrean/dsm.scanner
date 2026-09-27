# DSM Scanner

A mobile-first Progressive Web App for listening to live Des Moines-area
police / fire / EMS / aircraft scanner audio in the browser, installable to
the home screen.

It's a thin client over the public [dsmrad.io](https://dsmrad.io) Icecast
server — no backend, no database, no proxy. CORS is fully open on the stream
endpoints, so playback and ICY metadata are read directly in the browser via
[`icecast-metadata-player`](https://www.npmjs.com/package/icecast-metadata-player).

## Stack

- Next.js 16 (App Router) + TypeScript, `src/` dir
- Tailwind CSS v4
- `icecast-metadata-player` for MP3 playback + live ICY metadata
- Media Session API for lock-screen / background controls
- A hand-rolled, network-first service worker for the app shell (audio
  streams are never cached or intercepted)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The channel catalog
(187 mounts) lives in `src/data/channels.json`; the player hook is
`src/lib/useScannerPlayer.ts`.

## Build

```bash
pnpm build
pnpm start
```

The service worker only registers in production builds.

## Notes

- Audio can only start from a direct user tap (iOS Safari autoplay
  restriction) — see the tap handler in `src/components/ScannerApp.tsx`.
- Only one stream plays at a time; switching channels fully tears down the
  previous player instance before starting the next one to avoid leaking
  `AudioContext`s.
- DSM-metro ISICS P25 traffic is unencrypted; this app only relays an
  already-public stream. See the in-app footer for the full disclaimer.

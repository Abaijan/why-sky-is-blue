# Why Is the Sky Blue? — Remotion project

1920×1080, 30 fps, ~10:00 (18 000 frames). 10 scenes, all animation is code (SVG), no stock footage.

## Run
```bash
npm install
npm run dev      # Remotion Studio: preview and scrub the timeline
npm run build    # renders out/sky-blue.mp4
```
Faster render on a strong machine: `npx remotion render SkyBlue out/sky-blue.mp4 --concurrency=8`.
Single frame check: `npx remotion still SkyBlue --frame=3000 out/frame.png`.

## Structure
- `src/narration.ts` — scene list, durations (s) and the narration text. Subtitles are built from it.
- `src/scenes/S01…S10.tsx` — one file per scene; every animation is timed in seconds inside the scene.
- `src/lib.tsx` — shared pieces (blueprint background, captions, helpers), `src/theme.ts` — colors, sizes.

## Voice-over
Put `public/audio/01-hook.mp3 … 10-outro.mp3` (names = scene ids) and set `USE_AUDIO = true` in `src/narration.ts`.
Subtitles and key beats are timed to the script at 160 wpm. If your voice-over is faster or slower, change `duration`
of the scene in `narration.ts` and shift the timestamps inside the scene file (they are plain numbers in seconds).

## Note
The script's 1.4× speed remark: the video is built for 10:00 at natural speed, as in the script.
# why-sky-is-blue

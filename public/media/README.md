# Media

Drop project videos, posters, and the profile photo here. Paths referenced by
`src/data/projects.ts` and `src/data/site.ts`:

- `/media/icl-demo.mp4` — In-Context Learning hero demo
- `/media/jas-kitchen-demo.mp4` — yam_jas_kitchen hero demo
- `/media/failure-prediction-demo.mp4` — failure prediction demo
- `/media/scrambled-egg-demo.mp4` — scrambled egg rollout
- `/media/so-101-demo.mp4` — SO-101 policy execution
- `/media/portrait.jpg` — profile photo (then set `profileImage` in `src/data/site.ts`)

Until a file exists, the site shows a quiet placeholder frame in its place —
the layout already reserves the space.

Tips for web-ready robot footage:
- H.264 MP4 (or WebM), 1080p max, ~2–6 Mbps; keep loops short (10–30s)
- `ffmpeg -i in.mov -an -vcodec libx264 -crf 26 -preset slow -movflags +faststart out.mp4`
- Add a poster frame: `ffmpeg -i out.mp4 -vframes 1 poster.jpg`

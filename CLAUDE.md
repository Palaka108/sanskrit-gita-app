# Gita Gift — Sanskrit Gita App

## Project Overview
Sanskrit Bhagavad Gita learning app with verse display, grammar analysis, audio (Gita Vibes), and nature video backgrounds.

## Stack
- **Frontend:** React + TypeScript + Vite
- **Backend:** Supabase (project: `qwlbbcrjdpuxkavwyjyg`)
- **Hosting:** Vercel at `gitagift.yogaofintelligence.com`
- **Repo:** `github.com/Palaka108/sanskrit-gita-app.git` (branch: master)

## Key Files
- `src/pages/VersePage.tsx` — Main verse display with video backgrounds
- `src/components/AudioButtons.tsx` — Audio player with playlist (prev/next/auto-play)
- `src/components/GrammarIntroSection.tsx` — Dynamic grammar concepts per verse
- `src/styles/globals.css` — All styles (2200+ lines)
- `public/audio/` — MP3 files named `{chapter}_{verse}.mp3`
- `public/videos/` — Background videos (ocean + clouds)

## Supabase Tables
- `verses` — Verse text (devanagari, transliteration, translation)
- `words` — Word-by-word breakdown per verse
- `commentaries` — Commentary entries per verse

## Audio Playlist (16 verses with Gita Vibe audio)
1.1, 2.14, 2.20, 3.13, 3.27, 3.37, 4.2, 4.8, 4.34, 5.29, 6.47, 7.3, 7.14, 8.5, 9.14, 18.66

## Video Backgrounds
- `meditation-intro.mp4` — Ocean water
- `nature-sunset.mp4` — Clouds
- Randomly selected per visit, playback slowed to 0.55x

## Pending Tasks
- [ ] Swap MP3s for verses **4.34**, **5.29**, **7.14** — user will create new Suno versions and upload later
- [ ] (Future) Add more verses with audio as new songs are created

## Deploy
```bash
npm run build && vercel --prod --yes
```

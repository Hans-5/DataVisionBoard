# 数据视界 · DataVisionBoard

A real-time data visualization dashboard built with **Vue 3 + Vite + ECharts**.

🔗 **Live Demo → [hans-5.github.io/DataVisionBoard](https://hans-5.github.io/DataVisionBoard/)**
<img width="1915" height="942" alt="image" src="https://github.com/user-attachments/assets/97e168bb-997d-4bd9-994f-8a2c9496407a" />

---

## Overview

DataVisionBoard is a full-featured big-screen analytics dashboard designed for educational data monitoring. All data is simulated with live-updating intervals so every chart animates in real time — no backend required.

## Features

- **Live KPI cards** — 4 metrics update independently every 2.5–4 s with dynamic percentage-change sub-text
- **Monthly trend chart** — rolling area chart, drops oldest month and appends a new value every 4 s
- **Service architecture network** — force-directed graph with draggable nodes, category color-coding, and glowing halos
- **User behaviour donut** — slice values shift every 4 s, outside labels with connector lines
- **City ranking bar chart** — horizontal bars with gradient fill, live ±6% jitter every 3 s
- **Capability radar** — polygon radar with ±15% drift every 5 s so shape changes are clearly visible
- **Activity ticker** — full-width scrolling event strip at the bottom, new events injected every 8 s
- **Panel badges** — each chart panel has a labelled tag badge (Trend / Dist / Overview / Ranking / Ability)
- **Smooth animations** — scan lines, border pulse, bracket blink, and value flash — all CSS keyframe loops with invisible resets (no flicker)

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite 5 |
| Charts | Apache ECharts 5 |
| Styling | Scoped CSS + global keyframes |
| Linting | ESLint flat config + Prettier |
| Tests | Vitest |
| CI/CD | GitHub Actions → GitHub Pages |

## Architecture

```
src/
├── core/
│   ├── api/          # apiClient — mock/API switch via VITE_USE_MOCK
│   ├── composables/  # useChart (ECharts lifecycle)
│   └── logger/       # structured logger + Vitest test
├── modules/
│   ├── overview/     # KPI cards + trend chart
│   ├── analytics/    # donut, bar, radar
│   ├── network/      # force-directed graph
│   └── activity/     # scrolling event ticker
├── shared/
│   └── components/   # ChartBox (reusable panel wrapper)
└── style/
    └── animations.css
```

## Local Development

```bash
# Install
npm install

# Dev server (opens browser automatically)
npm run dev

# Production build
npm run build

# Run tests
npm test
```

## Mock vs API

Set `VITE_USE_MOCK=true` in `.env` (default) to use local mock data.  
Set `VITE_USE_MOCK=false` and `VITE_API_BASE=<url>` in `.env.production` to point at a real API.

## License

MIT

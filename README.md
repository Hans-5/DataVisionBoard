# 数据视界 · DataVisionBoard

A real-time data visualization dashboard built with Vue 3, Vite, and ECharts. All data is simulated with live-updating intervals, so every chart animates without needing a backend or database connection.

<<<<<<< HEAD
🔗 **Live Demo → [hans-5.github.io/DataVisionBoard](https://hans-5.github.io/DataVisionBoard/)**
<img width="1915" height="942" alt="image" src="https://github.com/user-attachments/assets/97e168bb-997d-4bd9-994f-8a2c9496407a" />
=======
🔗 **Live Demo: [hans-5.github.io/DataVisionBoard](https://hans-5.github.io/DataVisionBoard/)**

<img width="1915" height="942" alt="image" src="https://github.com/user-attachments/assets/97e168bb-997d-4bd9-994f-8a2c9496407a" />
>>>>>>> 822a12c (docs: complete README with features, setup steps, structure, version history)

---

## What This Project Does

DataVisionBoard is a full-screen analytics dashboard designed for educational data monitoring. It shows six chart panels, four KPI cards, and a scrolling activity ticker. Each chart updates on its own interval so the dashboard always looks live.

This project is also a teaching example for how to build a modular Vue 3 application with real-time data, clean architecture, and production deployment through GitHub Actions.

---

## Features

| Feature | Details |
|---|---|
| KPI cards | 4 live metrics, each updates every 2.5 to 4 seconds with dynamic percentage change labels |
| Trend chart | Rolling area chart, drops the oldest month and adds a new value every 4 seconds |
| Network graph | Force-directed service architecture graph, draggable nodes, color-coded by layer |
| Behaviour donut | Slice values shift every 4 seconds, outside labels with connector lines |
| City bar chart | Horizontal bars with gradient fill, live values jitter every 3 seconds |
| Radar chart | Polygon radar with visible shape changes every 5 seconds |
| Activity ticker | Full-width scrolling event strip at the bottom, new events injected every 8 seconds |
| Panel badges | Each chart panel has a small tag badge in the top-right corner |
| Animations | Scan lines, border pulse, bracket blink, and value flash, all smooth CSS loops with no flicker |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 with Composition API and `<script setup>` |
| Build tool | Vite 5 |
| Charts | Apache ECharts 5 |
| Styling | Scoped CSS with global keyframe animations |
| Linting | ESLint flat config with Prettier |
| Tests | Vitest |
| CI/CD | GitHub Actions deploys to GitHub Pages on every push to main |

---

## Project Structure

```
src/
├── core/
│   ├── api/              # apiClient — switches between mock and real API via env flag
│   ├── composables/      # useChart — shared ECharts lifecycle management
│   └── logger/           # structured logger with Vitest unit test
├── modules/
│   ├── overview/         # KPI cards and monthly trend chart
│   ├── analytics/        # behaviour donut, city bar chart, radar
│   ├── network/          # force-directed service architecture graph
│   └── activity/         # scrolling live event ticker
├── shared/
│   └── components/       # ChartBox — reusable panel wrapper with title and badge
└── style/
    └── animations.css    # global keyframe definitions
```

Each module follows the same pattern: a `components/` folder for Vue components, a `composables/` folder for reactive data logic, and a `mock/` folder for simulated data.

---

## How to Run Locally

**Step 1 — Clone the repository**

```bash
git clone https://github.com/Hans-5/DataVisionBoard.git
cd DataVisionBoard
```

**Step 2 — Install dependencies**

```bash
npm install
```

**Step 3 — Start the development server**

```bash
npm run dev
```

The dashboard will open automatically at `http://localhost:5173/DataVisionBoard/`. All charts will start animating within a few seconds.

**Step 4 — Build for production (optional)**

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static hosting service.

**Step 5 — Run tests (optional)**

```bash
npm test
```

---

## Mock vs Real API

The project supports two data modes. This is controlled by the `VITE_USE_MOCK` environment variable.

**Mock mode (default for development)**

The `.env` file sets `VITE_USE_MOCK=true`. All data comes from local mock files in each module's `mock/` folder. No backend is needed.

**API mode (for production)**

Set `VITE_USE_MOCK=false` and `VITE_API_BASE=<your-api-url>` in `.env.production`. The `apiClient.js` file will switch to real API calls automatically.

---

## Deployment

This project uses GitHub Actions to build and deploy to GitHub Pages automatically on every push to the `main` branch. The workflow is defined in `.github/workflows/deploy.yml`.

To set up deployment for a forked version:

1. Go to **Settings → Pages** in your GitHub repository
2. Under **Source**, select **Deploy from a branch**
3. Set the branch to **gh-pages** and the folder to **/ (root)**
4. Click **Save**

The live link will be `https://<your-username>.github.io/DataVisionBoard/` after the first workflow run completes.

---

## Version History

| Version | Description |
|---|---|
| v1.0.0 | Project scaffold, folder structure, ESLint, Prettier, Vitest, Husky |
| v2.0.0 | Visual polish: animations, glow effects, enhanced header |
| v3.0.0 | Live data simulation on all charts |
| v4.0.0 | Visual improvements based on sample dashboard reference |
| v5.0.0 | Dynamic KPI sub-text, scan animation fix, pie chart labels |
| v6.0.0 | Network graph fix, radar live updates, horizontal bar chart |
| v7.0.0 | Larger text across all panels, fluid network graph, radar jitter fix |
| v8.0.0 | Header subtitle, panel badges, KPI accent border, activity ticker |
| v8.1.0 | Network graph panel proportions enlarged |
| v8.2.0 | Network graph config restored to v3 layout for better node spread |
| v8.3.0 | Removed unused composables, updated .gitignore |
| v8.4.0 | GitHub Actions deploy workflow, GitHub Pages live link |

---

## License

MIT

# PaperRead Official Website

Official introduction and interactive tour website (Single Page Application) for the open-source local-first AI research workspace **[PaperRead](https://github.com/YuriyLin/PaperRead)** (`v1.5.3`).

繁體中文｜English bilingual interface with **Paper Light Mode** and **Dark Mode** switching.

---

## Features

- **Interactive Hero & Live Workspace Mockup**: Kinetic 4-stage research pipeline (`Discover` → `Read & Ink` → `Analyze` → `Organize`) paired with interactive tabs and full-screen lightbox previews of real PaperRead interfaces (`readingpage.jpg`, `researchspace.jpg`, `route.jpg`, `handwrite.jpg`, `sticker.jpg`, `mindmap.jpg`, `chatAI.jpg`).
- **Pain Points & Open-Source Attribution**: Contrasts traditional fragmented research workflows with PaperRead's local-first approach and credits the upstream [EasyRead](https://github.com/YuriyLin/PaperRead) foundation.
- **Core Research Workflow (01–04)**: Interactive explorer covering OpenAlex discovery & Kanban, bilingual split reading & handwriting/stickers, cross-paper search & 2–5 paper comparison, and Obsidian `[[WikiLinks]]` export.
- **Flexible AI Model Architecture**: Explains offline no-AI mode, local CLI tools (`Antigravity CLI`, `Claude Code`, `Codex CLI`), cloud APIs, and air-gapped local models (`Ollama`, `LM Studio`) with an interactive `config.json` vs UI preview toggle.
- **Architecture, Releases & Community Contribution Guide**: Showcases system layers, release milestones (`v1.4.2` – `v1.5.3`), verifiable resolved GitHub Issues (`#6`, `#7`), and `CONTRIBUTING.md` Issue / PR conventions with one-click copyable test commands.
- **Cross-Platform Install & Local Storage Inspector**: Auto-detects Windows, macOS, Linux, or Docker instructions and lets visitors inspect the open JSON / Markdown / SQLite structure under `~/PaperRead`.

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation & Icons**: `motion` (`motion/react`) + `lucide-react`

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# TypeScript check
npm run lint

# Build production static files into dist/
npm run build

# Preview production build locally
npm run preview
```

---

## Deploy on GitHub Pages

This repository includes a ready-to-use GitHub Actions workflow at `.github/workflows/deploy.yml` and relative asset configuration in `vite.config.ts`.

### Setup Steps

1. Push this repository to GitHub (default branch: `main`).
2. Open your repository on GitHub and go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Every push to `main` (or manual trigger via **Actions** → **Deploy to GitHub Pages** → **Run workflow**) will automatically:
   - Install dependencies (`npm ci`)
   - Run TypeScript verification (`npm run lint`)
   - Detect your repository subpath (`/<repo-name>/` or `/` for `<username>.github.io`) and run `npm run build`
   - Publish `./dist` to GitHub Pages.

> Tip: If you deploy manually to another subpath, set `VITE_BASE_PATH=/your-subpath/` before running `npm run build`.

---

## Project Structure

```text
├── .github/workflows/deploy.yml  # GitHub Pages CI/CD workflow
├── public/paperread/             # Official PaperRead logos & UI screenshots
├── src/
│   ├── components/               # Section components (Hero, Workflow, AI, Install, etc.)
│   ├── i18n/translations.ts      # Traditional Chinese & English copy
│   ├── App.tsx                   # Theme, language, OS detection, page composition
│   └── index.css                 # Tailwind v4 & Paper Light / Dark theme tokens
├── index.html                    # Entry HTML & metadata
└── vite.config.ts                # Vite configuration with dynamic GitHub Pages base
```

---

## License & Credits

- Website code is open-sourced under the **MIT License**.
- Showcases the **[YuriyLin/PaperRead](https://github.com/YuriyLin/PaperRead)** open-source project (built upon **EasyRead**).

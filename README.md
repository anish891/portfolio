# Anish Tejwani — Portfolio

Source for my personal site: **[anishtejwani.dev](https://anishtejwani.dev)**.

I'm an AI / full-stack engineer based in Mumbai, India, building intelligent software systems, AI-powered applications and scalable web platforms.

## Featured projects

| Project | What it is | Stack |
| --- | --- | --- |
| [NIFTY OI Tracker](https://nifty-oi-tracker.vercel.app/) ([code](https://github.com/anish891/nifty-oi-tracker)) | Real-time NIFTY 50 options analytics: OI buildup, Max Pain, Gamma Exposure and volatility regimes from live NSE data. | JavaScript, Node.js, Express, Supabase, Vercel |
| Image Analysis Platform | Computer vision and OCR platform that extracts structured insights from images. | Python, OpenCV, Tesseract, Flask |
| Notes Application | Cross-platform note-taking app with cloud sync and authentication. | Flutter, Dart, Firebase |

All site content (projects, skills, links) lives in [`lib/data.ts`](lib/data.ts).

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 with OKLCH colour tokens, Radix UI primitives, Lucide icons
- **Motion:** Framer Motion (respects `prefers-reduced-motion`)
- **Theme:** system-aware light / dark mode, saved in `localStorage`

## Getting started

```bash
npm install
cp .env.local.example .env.local   # add your Web3Forms key
npm run dev
```

Open <http://localhost:3000>.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

### Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form delivery via [Web3Forms](https://web3forms.com). Restrict the key to your domain in their dashboard. Without it the form only simulates success in development and shows an error in production. |

## Notes

- The GitHub contribution heatmap is fetched through `app/api/github-contributions` and cached for an hour.
- CI (`.github/workflows/ci.yml`) runs lint, type-check and build on every push and pull request.

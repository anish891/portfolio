# Anish Tejwani — Portfolio

Source for my personal site: **[anishtejwani.dev](https://anishtejwani.dev)**.

I'm an AI / full-stack engineer based in Mumbai, India, building intelligent software systems, AI-powered applications and scalable web platforms.

## Featured projects

| Project | What it is | Stack |
| --- | --- | --- |
| [ChainDeck](https://chaindeck.vercel.app/) ([code](https://github.com/anish891/chaindeck)) | Live NIFTY 50 options analytics (formerly Nifty OI Tracker): OI buildup, Max Pain, Gamma Exposure, volatility panels and alerts from live NSE data. | JavaScript, Node.js, Express, Upstash Redis, Vercel |
| [Unbake](https://unbake.vercel.app/) ([code](https://github.com/anish891/unbake)) | Recovers the formulas behind a spreadsheet exported as plain values and finds the cells someone typed wrong. Runs entirely in the browser. | JavaScript, Web Workers, SheetJS |
| [GraphSentinel AI](https://graphsentinel-ai.vercel.app/) ([code](https://github.com/anish891/graph_sentinel)) | Explainable security investigation agent that traces attacks through a FalkorDB graph and proposes response actions for human approval. | Python, FastAPI, FalkorDB, React, TypeScript, Docker |

All site content (projects, skills, links, experience, education) lives in [`lib/data.ts`](lib/data.ts). The experience and education sections stay hidden until you add entries there.

## Site map

| Route | What it is |
| --- | --- |
| `/` | Intro, selected work, latest writing, experience, activity, stack, contact |
| `/projects`, `/projects/[slug]` | Case study per project, with related posts |
| `/blog`, `/blog/[slug]` | MDX blog, with RSS at `/feed.xml` |
| `/lab`, `/lab/[slug]` | Small interactive demos (register new ones in `lib/lab.ts` and `components/lab`) |
| `/about` | Background, interests, timelines, stack |

`⌘K` / `Ctrl+K` opens a palette that searches pages, projects and posts.

## Writing a post

Add `content/blog/<slug>.mdx`:

```md
---
title: My post
description: One sentence for the list and link previews.
date: 2026-10-20
tags: [nextjs]
project: chaindeck   # optional: a project id from lib/data.ts
draft: true          # optional: hides the post everywhere
---
```

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 with OKLCH colour tokens, Radix UI primitives, Lucide icons
- **Blog:** MDX files rendered at build time (`next-mdx-remote`, `rehype-pretty-code`)
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

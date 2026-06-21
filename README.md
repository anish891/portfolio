# Anish Tejwani — Portfolio

Personal portfolio of **Anish Tejwani** — AI Engineer, Full-Stack Developer, and Builder. A modern, animated, fully responsive single-page portfolio showcasing projects, skills, and experience.

**Live at:** [anishtejwani.dev](https://anishtejwani.dev) *(or your deployed URL)*

---

## ✨ Features

- **Animated Hero** — Typed.js multi-string typing animation with a live mouse-tracking radial gradient
- **Tech Stack Showcase** — Categorised skill grid with in-view reveal animations
- **Projects Gallery** — Filterable project cards with a full detail modal (description, features, tech stack)
- **Contact Section** — Direct email / social links with a contact form layout
- **Dark / Light Mode** — System-preference aware, flash-free theme toggle persisted to `localStorage`
- **Visitor Counter** — Live visit counter via the Abacus API
- **Glassmorphism UI** — Frosted-glass cards, glowing borders, and ambient orb effects throughout
- **Fully Responsive** — Mobile-first layout with animated hamburger mobile menu
- **Scroll-aware Navbar** — Active section tracking with smooth-scroll navigation
- **Animated scroll reveals** — Sections and cards animate in as they enter the viewport via `IntersectionObserver`

---

## 🛠 Tech Stack

### Core Framework
| Tech | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router, static export) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |

### Styling
| Tech | Purpose |
|---|---|
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS |
| [tw-animate-css](https://github.com/jamiebuilds/tw-animate-css) | Pre-built Tailwind animation utilities |
| [OKLCH color space](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) | Perceptually uniform, accessible color tokens |

### UI & Animation
| Tech | Purpose |
|---|---|
| [Framer Motion 12](https://www.framer.com/motion/) | Page & component animations |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Typed.js](https://mattboldt.com/demos/typed-js/) | Typing animation in the hero |
| [Radix UI](https://www.radix-ui.com/) | Accessible headless dialog primitives (via shadcn) |
| [shadcn/ui](https://ui.shadcn.com/) | Component scaffolding (Badge, Button, Dialog, Input, Textarea) |

### Utilities
| Tech | Purpose |
|---|---|
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/nicedoc/tailwind-merge) | Conditional class merging (`cn()` utility) |
| [class-variance-authority](https://cva.style/) | Variant-based component styling |
| [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) | Primary sans-serif typeface |

---

## 🗂 Project Structure

```
anish-portfolio/
├── app/
│   ├── globals.css          # Design tokens, dark mode, utilities, animations
│   ├── layout.tsx           # Root layout — fonts, metadata, theme flash prevention
│   └── page.tsx             # Main single-page composition
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Scroll-aware nav, mobile menu, theme toggle
│   │   └── Footer.tsx       # Social links, copyright
│   ├── sections/
│   │   ├── Hero.tsx         # Typing animation, mouse-tracking gradient, CTA
│   │   ├── About.tsx        # Bio, interests, in-view animation
│   │   ├── TechStack.tsx    # Skill categories grid
│   │   ├── Projects.tsx     # Filterable project cards + modal
│   │   └── Contact.tsx      # Contact form layout, social links
│   └── ui/
│       ├── ThemeToggle.tsx  # Dark/light mode toggle (Sun ↔ Moon)
│       ├── GlassCard.tsx    # Glassmorphism card wrapper
│       ├── ProjectModal.tsx # Full-screen project detail dialog
│       ├── VisitorCounter.tsx # Live visit counter
│       ├── badge.tsx        # shadcn Badge
│       ├── button.tsx       # shadcn Button
│       ├── dialog.tsx       # shadcn Dialog (Radix UI)
│       ├── icons.tsx        # Custom SVG icons (GitHub, LinkedIn)
│       ├── input.tsx        # shadcn Input
│       └── textarea.tsx     # shadcn Textarea
├── hooks/
│   ├── useInView.ts         # IntersectionObserver hook for scroll reveal
│   ├── useTypingEffect.ts   # Typed.js wrapper hook
│   └── useMousePosition.ts  # Mouse coordinate tracking hook
└── lib/
    ├── data.ts              # All site content — nav, hero, projects, tech stack, socials
    └── utils.ts             # cn() class merging utility
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- npm / yarn / pnpm / bun

### Installation

```bash
# Clone the repository
git clone https://github.com/anish891/anish-portfolio.git
cd anish-portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 🎨 Customisation

All site content lives in a single file — **[`lib/data.ts`](./lib/data.ts)**. Update it to personalise the portfolio:

```ts
// Hero
export const heroContent = { name: "Your Name", ... }

// Projects
export const projects: Project[] = [ { title: "My Project", ... } ]

// Tech stack categories
export const techStack: SkillCategory[] = [ ... ]

// Social links
export const socialLinks: SocialLink[] = [ ... ]
```

Design tokens (colours, spacing, typography) are defined as CSS custom properties in **[`app/globals.css`](./app/globals.css)** using the OKLCH colour space for both light and dark themes.

---

## 🌙 Dark Mode

The theme toggle appears in the navbar. The preferred theme is:

1. **Read from `localStorage`** on every page load via an inline script injected into `<head>` — this runs before the first paint, preventing any flash of the wrong theme.
2. **Falls back to the OS preference** (`prefers-color-scheme: dark`) if no saved preference exists.
3. **Persisted to `localStorage`** whenever the user manually toggles.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Create optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## 🚢 Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/):

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deployments on every push.

For other platforms (Netlify, Cloudflare Pages, etc.), run `npm run build` and deploy the `.next` output directory.

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.

---

<p align="center">Built with ❤️ by <a href="https://github.com/anish891">Anish Tejwani</a></p>

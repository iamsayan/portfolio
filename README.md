# Sayan Datta — Senior Developer Portfolio

A premium, high-performance developer portfolio built with **Astro v7**, **React**, **Tailwind CSS v4**, and **Inter & JetBrains Mono** typography. This project showcases deep full-stack product engineering, WooCommerce payment integrations, and modular frontend components.

---

## 🚀 Key Features

- **Inter & JetBrains Mono Typography**: Uses universally crisp `Inter` and `JetBrains Mono` typefaces, optimized for pixel-perfect readability and sub-pixel hinting on all monitor resolutions.
- **Dynamic JSON Data Layer**: The entire website content is powered by structural schemas in `src/data/`. Updating these JSON files updates the site content dynamically.
- **Preconfigured Linter & Formatter**: Uses modern ESLint v10 flat configs (`eslint.config.js`) and Prettier formatting configs (`.prettierrc.mjs`) to enforce strict codebase consistency and syntax parsing.
- **Reusable Page Banners**: Centralizes page hero banners, background ambient spotlights, and scroll-entry animations using the reusable `<PageHero />` component.
- **Unified Phosphor Icon Pack**: Purges inline raw SVG path code in favor of the lightweight `<Icon />` component imported from the `astro-icon` library.
- **Interactive IDE Mockup with GitHub Telemetry**: Features an interactive mockup IDE on the homepage. Users can browse real-world WooCommerce UPI payment gateway architecture across PHP, TS, and JSON files, or click the `github.log` (`GIT`) tab to pull Sayan's real-time public commits and repository creation logs via a client-side on-demand GitHub API fetcher with graceful rate-limit fallbacks.
- **Responsive Services Explorer**: Includes an interactive vertical sidebar panel (desktop) / horizontal swipe-snapping buttons (mobile) tab layout that dynamically reveals service capabilities, code architectures, and proof points with smooth themed active-glow transitions.
- **Real Contact Form Routing**: Integrates directly with **Formspree AJAX API** with built-in loading states, visual validation logs, and a clean fallback email action if routing gets blocked.
- **SEO & Crawl Engine Optimization**:
  - Full structured schema data (`application/ld+json`).
  - Dynamic XML sitemaps using `@astrojs/sitemap`.
  - robots.txt crawl directives.
  - Proper canonical URL linkages and Open Graph meta fallbacks.
- **WCAG AA Accessibility Compliant**: Keyboard focus indicators (`:focus-visible`), aria screen-reader descriptions, and skip-to-content links.

---

## 📂 Project Structure

```text
/
├── .agents/                 # AI coding assistant customizations
│   └── AGENTS.md            # Project-scoped codebase guidelines & standards
├── .prettierrc.mjs          # Prettier formatting configurations
├── eslint.config.js         # ESLint flat config with Astro & TypeScript rules
├── public/                  # Static assets
│   ├── resume.pdf           # Sayan's professional printable resume
│   └── favicon.svg          # Portfolio favicon logo
├── src/
├── src/
│   ├── components/          # Reusable Astro layouts
│   │   ├── Header.astro     # Responsive navigation menu
│   │   ├── Footer.astro     # System health and copyright bar
│   │   └── PageHero.astro   # Reusable header banner layout
│   ├── data/                # Data storage layer (JSON)
│   │   ├── profile.json     # Personal details & Formspree credentials
│   │   ├── statistics.json  # Metric count stats
│   │   ├── skills.json      # Structured skill categories & contexts
│   │   ├── experience.json  # Metrics-driven career timeline
│   │   ├── projects.json    # Double-column project case logs
│   │   └── testimonials.json# Verified references list
│   ├── layouts/
│   │   └── Layout.astro     # Core HTML layout & SEO header configuration
│   ├── lib/                 # Core TypeScript data fetching handlers
│   │   ├── data.ts          # JSON data layer controllers
│   │   └── blog.ts          # Staged upcoming blog posts
│   └── pages/               # Routing layer
│       ├── index.astro      # Main landing & interactive editor mockup
│       ├── about-me.astro   # Personal biography, timeline & references
│       ├── skills.astro     # Detailed skills catalog
│       ├── services.astro   # Architectural blueprints & focus matrices
│       ├── projects.astro   # Filters & project case descriptions
│       ├── contact.astro    # Real-time contact terminal
│       └── blog/            # Staged feed & upcoming drafts index
├── package.json             # Core dependency manifest
└── astro.config.mjs         # Astro site definition & XML sitemap setup
```

---

## ⚙️ Development Commands

All terminal commands are run from the project root directory:

| Command           | Action                                                                |
| :---------------- | :-------------------------------------------------------------------- |
| `npm install`     | Installs project dependency nodes.                                    |
| `npm run dev`     | Starts local development server at `localhost:4321` (live-reloading). |
| `npm run lint`    | Runs ESLint syntax verification across the workspace.                 |
| `npm run format`  | Runs Prettier to auto-format files.                                   |
| `npm run build`   | Compiles a production-ready static bundle under `dist/`.              |
| `npm run preview` | Spins up a local preview server for built static pages.               |

---

## 📝 Updating Portfolio Content

To update the data rendered on the portfolio, modify the respective schemas in the `/src/data/` folder:

### 1. Personal & Contact Settings (`profile.json`)

Manage locations, email addresses, bios, social channels, and Formspree credentials:

```json
{
  "name": "Sayan Datta",
  "title": "Senior Full Stack Developer",
  "email": "hello@sayandatta.co.in",
  "formspreeId": "xwpveyob",
  "location": "Kolkata, India",
  "socials": {
    "github": "https://github.com/iamsayan",
    "linkedin": "https://linkedin.com/in/meetsayan",
    "twitter": "https://twitter.com/im_sayaan"
  }
}
```

### 2. Experience Milestones (`experience.json`)

Describe career timelines. Focus on outcomes, measurable speedups, and engineering metrics:

```json
[
  {
    "company": "TeamUpdraft",
    "position": "Senior Developer",
    "duration": "Sep 2021 - Present",
    "description": "Led development of UpdraftCentral backups management.",
    "bullets": [
      "Reduced latency by 15% across server operations.",
      "Optimized query structures leading to 20% lower CPU overhead."
    ]
  }
]
```

### 3. Project Showcase Logs (`projects.json`)

Document projects in a problem-solution format, listing development roles, technical stacks, and measurable impact:

```json
[
  {
    "title": "UPI Payments Gateway",
    "category": "wordpress",
    "type": "WooCommerce Extension",
    "downloads": "1M+ downloads",
    "tech": ["PHP", "WooCommerce", "UPI", "REST API"],
    "overview": "Developed direct payment plugins within the WooCommerce ecosystem.",
    "problem": "Legacy API configurations caused cart abandonments.",
    "solution": "Built low-latency direct integrations bypassing middle layers.",
    "role": "Lead Architect",
    "challenges": "Hardening queries against race conditions.",
    "impact": "Successfully acquired after gaining strong adoption within the WooCommerce ecosystem."
  }
]
```

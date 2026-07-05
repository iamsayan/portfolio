# Instructions for AI Coding Agents (AGENTS.md)

Welcome! This document outlines architectural principles, coding rules, and constraints for any AI coding agent or developer working on Sayan Datta's Developer Portfolio.

---

## 🛠 Development & Command Guidelines

1. **Local Dev Server**: Always start the Astro local development server in background mode:
   ```bash
   astro dev --background
   ```
   To check, manage, or debug the background server, use the standard wrappers:
   - Check status: `astro dev status`
   - Read server logs: `astro dev logs`
   - Stop server: `astro dev stop`
2. **Build Audits**: Before concluding any change, always run a full production build check to ensure zero type issues and correct static compilation:
   ```bash
   npm run build
   ```
3. **Linter & Formatter Code Check**: Run ESLint checks and Prettier formatting before committing changes:
   ```bash
   npm run lint
   npm run format
   ```

---

## 🎨 Styling & Design Tokens (Tailwind CSS v4)

- **No Arbitrary CSS Brackets**: Avoid using arbitrary Tailwind variables in inline markup (e.g. do NOT use `bg-[var(--bg-surface)]` or `text-[var(--text-primary)]`).
- **Design System Class Mappings**: Use the custom theme variables registered in Sayan's `@theme inline` block in `src/styles/global.css`:
  - Backgrounds: `bg-surface`, `bg-deep`, `bg-raised`
  - Borders: `border-subtle`, `border-strong`
  - Typography Colors: `text-primary`, `text-secondary`, `text-muted`
  - Accents & Glows: `text-accent`, `bg-accent`, `bg-accent-glow`, `bg-success-glow`
  - Typography Fonts: `font-sans` (Inter), `font-mono` (JetBrains Mono), `font-display` (Inter)
- **Preserve Aesthetics**: Do not redesign or change the visual identity (glassmorphism overlays, color schemes, font display, and interactive hover scales).

---

## 🏗 Reusable Banner Layout Component (`PageHero.astro`)

- **Never Duplicate Banners**: All inner page banners (about, skills, services, projects, blog) must use the central `PageHero` component in `src/components/PageHero.astro`.
- **Nesting Spans/Custom Headings**: To pass custom HTML highlights like `<span class="t-accent">code.</span>` to the header, use Astro's `title` slot fragment:
  ```astro
  <PageHero badge="Category" description="Intro text.">
    <Fragment slot="title">Main Title <span class="t-accent">Highlight</span></Fragment>
  </PageHero>
  ```

---

## 📦 Unified SVG Icon Library

- **Use Astro Icon**: Never write custom, raw inline SVGs for standard icons. Always use the `astro-icon` library with Phosphor Icon pack (`@iconify-json/ph`).
- **Syntax**:
  ```astro
  import { Icon } from "astro-icon/components";
  
  <Icon name="ph:arrow-right" class="w-4 h-4" aria-hidden="true" />
  ```
- **Exceptions**: Custom graphic shapes representing custom coordinate vector charts (such as load speed line graphs) may remain as inline path elements.

---

## 📊 Data Layer Integrity

- **Never Hardcode Data**: All page details (including bio descriptions, skill tags, timeline bullet points, projects detail blocks, and statistics counts) must be loaded dynamically from the JSON data files under `src/data/` via the data loader controllers in `src/lib/data.ts`.
- **Acquisition Terminology**: If editing acquired plugin metadata, never print numerical purchase amounts. Always use the exact phrase:
  > _"Successfully acquired after gaining strong adoption within the WooCommerce ecosystem."_
- **Formspree AJAX Fallbacks**: Contact forms must target Formspree API layers using standard AJAX. Always maintain the loading spinner status bar, validation alerts, and the **"Open Fallback Email Draft"** failover button pointing to Sayan's primary email.

---

## ♿ Accessibility (a11y) & SEO Directives

- **Skip Link Targets**: Ensure every page layout starts with the accessibility skip-to-content anchor targets (`<main id="main-content">`) so screen readers can jump the main header navigation menu.
- **Focus States**: Do not disable standard keyboard focus ring outlines. Keep the high-contrast custom outlines defined under `:focus-visible` in `global.css`.
- **Decorative Items**: Always apply `aria-hidden="true"` to structural borders, glow spotlights, background dots, and emojis.
- **SEO Metadata**:
  - Every route must use the core `<Layout>` component.
  - Layout props must specify unique `title`, `description`, and `image` elements.
  - The canonical link header (`<link rel="canonical" href={canonicalURL.href} />`) must be dynamically pre-calculated on every render path.
- **JSX Loop Comments**: Never use raw HTML comments (`<!-- comment -->`) inside map or array loops inside Astro files. They cause syntax parse errors. Always use JSX javascript comment blocks: `{/* comment */}`.

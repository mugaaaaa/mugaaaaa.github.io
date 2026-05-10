# Personal Blog Liquid Glass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Astro + React + Tailwind personal blog prototype using Touhou imagery and Liquid Glass floating UI.

**Architecture:** Astro renders the static blog shell and content. React hydrates only the floating overlay that imports the self-contained `LiquidGlass` component. Tailwind and a small global stylesheet provide the flat editorial layout.

**Tech Stack:** Astro, React, Tailwind CSS, TypeScript, local static image assets.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `postcss.config.mjs`
- Create: `tsconfig.json`

- [ ] Add package scripts for `dev`, `build`, `preview`, and `astro`.
- [ ] Configure Astro with the React integration.
- [ ] Configure Tailwind content paths for Astro and React files.

### Task 2: Assets And Components

**Files:**
- Create: `public/images/touhou/*`
- Create: `src/components/LiquidGlass.tsx`
- Create: `src/components/FloatingGlass.tsx`

- [ ] Copy selected Touhou images into `public/images/touhou`.
- [ ] Copy the React Liquid Glass component from `../liquid-glass/react/LiquidGlass.tsx`.
- [ ] Build floating navigation/status/action widgets with `LiquidGlass`.

### Task 3: Page And Styling

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/styles/global.css`

- [ ] Build a high-impact hero with a large Touhou image and heavy type.
- [ ] Build flat article, project, character, and footer sections.
- [ ] Add responsive styling and keep floating glass elements legible.

### Task 4: Verification

**Commands:**
- `npm install`
- `npm run build`
- `npm run dev -- --host 127.0.0.1`

- [ ] Install dependencies.
- [ ] Run the production build.
- [ ] Open the local site in Chromium and verify hero, layout, images, and glass widgets.

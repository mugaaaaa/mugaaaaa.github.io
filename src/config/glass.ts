// =============================================================
// glass.ts — optical tuning for every LiquidGlass surface.
//
// One preset per glass shell so the look can be tuned from here
// without touching component markup. Only the *optical* params live
// here; each component keeps its own `className` (layout / position /
// shadow), since that's structural rather than a tuning knob.
//
// `tintColor` is always the themed `var(--glass-tint)` (see theme.ts).
// `tintAlpha` is the default — article pages override it per instance
// through the `glassTintAlpha` prop (PostDetailPage.astro).
// =============================================================

export type GlassPreset = {
  chroma: number; // chromatic aberration strength (0–1)
  blur: number; // backdrop blur in px
  distort: number; // max edge displacement in px
  bezelRatio: number; // where the bezel meets the center plateau
  saturate: number; // backdrop saturate in %
  tintColor: string; // tint fed into the glass (themed var)
  tintAlpha: number; // default tint opacity (0–1)
};

const TINT = 'var(--glass-tint)';

export const glassPresets = {
  // FloatingGlass — top toolbar (search / theme / language)
  toolbar: { chroma: 0.38, blur: 1.6, distort: 28, bezelRatio: 0.76, saturate: 155, tintColor: TINT, tintAlpha: 0.08 },
  // FloatingGlass — left vertical rail (desktop)
  sideRail: { chroma: 0.34, blur: 1.6, distort: 30, bezelRatio: 0.88, saturate: 150, tintColor: TINT, tintAlpha: 0.16 },
  // FloatingGlass — language + mobile dropdown popovers
  menu: { chroma: 0.46, blur: 2.8, distort: 36, bezelRatio: 0.8, saturate: 170, tintColor: TINT, tintAlpha: 0.3 },
  // CommandPalette — ⌘K search modal
  commandPalette: { chroma: 0.36, blur: 2.8, distort: 32, bezelRatio: 0.82, saturate: 155, tintColor: TINT, tintAlpha: 0.3 },
  // NowQueueGlass — bottom-right "now drafting" card
  nowQueue: { chroma: 0.38, blur: 2.2, distort: 30, bezelRatio: 4, saturate: 160, tintColor: TINT, tintAlpha: 0.2 },
  // PostFilterGlass — sticky tag-filter bar
  postFilter: { chroma: 0.34, blur: 2.2, distort: 26, bezelRatio: 0.88, saturate: 155, tintColor: TINT, tintAlpha: 0.3 },
  // MobileGlassDock — bottom floating dock (mobile)
  mobileDock: { chroma: 0.36, blur: 1.6, distort: 28, bezelRatio: 0.86, saturate: 160, tintColor: TINT, tintAlpha: 0.1 },
  // HeroGlass — homepage hero side card
  hero: { chroma: 0.42, blur: 2.2, distort: 30, bezelRatio: 0.84, saturate: 160, tintColor: TINT, tintAlpha: 0.3 },
  // ProgressGlass — right-side reading-progress rail
  progress: { chroma: 0.36, blur: 2.2, distort: 50, bezelRatio: 4, saturate: 155, tintColor: TINT, tintAlpha: 0.2 },

  // HomePage — hero carousel arrows + volume pager buttons (shared look)
  carousel: { chroma: 0.34, blur: 2.4, distort: 30, bezelRatio: 0.88, saturate: 150, tintColor: TINT, tintAlpha: 0.3 },
  // HomePage — segmented view switcher above the volume grid
  segmented: { chroma: 0.36, blur: 2.4, distort: 28, bezelRatio: 0.88, saturate: 155, tintColor: TINT, tintAlpha: 0.3 },
  // HomePage — small floating pill (e.g. socials count)
  pill: { chroma: 0.28, blur: 2.2, distort: 22, bezelRatio: 0.88, saturate: 130, tintColor: TINT, tintAlpha: 0.3 },
} satisfies Record<string, GlassPreset>;

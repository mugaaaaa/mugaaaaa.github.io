// =============================================================
// theme.ts — single source of truth for all theme colors.
//
// Four sets: { home, article } x { light, dark }.
// `home` covers the landing + posts-index browsing chrome,
// `article` covers the post-detail reading view.
//
// Every value below is emitted as a CSS custom property
// (e.g. `paper` -> `--paper`) by ThemeStyle.astro, scoped to
// `:root` (light) and `:root[data-theme="dark"]` (dark).
// Tune the look entirely from here — no need to touch CSS.
// =============================================================

export type ThemeSurface = 'home' | 'article';
export type ThemeMode = 'light' | 'dark';

// Keep keys identical across every set so the generated CSS is uniform.
export type ThemeTokens = {
  // base palette
  ink: string;
  paper: string;
  muted: string;
  line: string;
  red: string;
  cyan: string;
  leaf: string;
  violet: string;
  gold: string;
  // surfaces
  surface: string; // card background (flat-card / article-shell)
  raised: string; // elevated solid block (was bg-stone-950 content pills)
  'grid-line': string; // paper-grid faint grid
  'volume-bg': string; // home "volume" section band
  // prose / article reading
  'prose-text': string;
  'code-bg': string;
  'code-text': string;
  'code-border': string;
  'inline-code-bg': string;
  'inline-code-border': string;
  'quote-bg': string;
  'quote-text': string;
  'th-bg': string;
  'vertical-bg': string;
  // liquid glass chrome
  'glass-tint': string; // tint color fed into LiquidGlass
  'glass-ink': string; // primary text on glass
  'glass-ink-soft': string; // secondary text on glass
  'glass-fill': string; // opaque pill fill (was bg-white)
  'glass-hover': string; // hover / focus background
  'glass-accent': string; // active solid (was #050505)
  'glass-accent-ink': string; // text on the active solid
  'glass-divider': string; // hairline divider on glass
};

const lightBase: ThemeTokens = {
  ink: '#101014',
  paper: '#f7f4ee',
  muted: '#6f6b62',
  line: '#ded7ca',
  red: '#d53c32',
  cyan: '#00a6b2',
  leaf: '#4f8b45',
  violet: '#7856c7',
  gold: '#d99b21',
  surface: '#fffdf8',
  raised: '#0c0a09',
  'grid-line': 'rgba(16, 16, 20, 0.055)',
  'volume-bg': '#edf5f4',
  'prose-text': '#242018',
  'code-bg': '#15120f',
  'code-text': '#fff8ec',
  'code-border': '#29251f',
  'inline-code-bg': '#f5efe4',
  'inline-code-border': '#ded7ca',
  'quote-bg': '#f4efe6',
  'quote-text': '#4f483e',
  'th-bg': '#f0e8dc',
  'vertical-bg': '#fbf7ef',
  'glass-tint': '#ffffff',
  'glass-ink': '#0c0a09',
  'glass-ink-soft': '#44403c',
  'glass-fill': 'rgba(255, 255, 255, 0.85)',
  'glass-hover': 'rgba(255, 255, 255, 0.5)',
  'glass-accent': '#050505',
  'glass-accent-ink': '#ffffff',
  'glass-divider': 'rgba(12, 10, 9, 0.12)',
};

export const themeTokens: Record<ThemeSurface, Record<ThemeMode, ThemeTokens>> = {
  home: {
    light: { ...lightBase },
    dark: {
      // Cool slate. Elevation ladder: paper < surface < raised, with
      // distinctly lighter steps so cards/sections read as panels, not a void.
      ink: '#e8eaed',
      paper: '#15161b',
      muted: '#a1a7b2',
      line: '#353944',
      red: '#f06a60',
      cyan: '#38c5d2',
      leaf: '#7cb86f',
      violet: '#b095ee',
      gold: '#e6b34a',
      surface: '#1d1f26',
      raised: '#282b34',
      'grid-line': 'rgba(255, 255, 255, 0.05)',
      'volume-bg': '#141b1f',
      'prose-text': '#cdc9c0',
      'code-bg': '#121319',
      'code-text': '#e8eaed',
      'code-border': '#2c2f38',
      'inline-code-bg': '#23252d',
      'inline-code-border': '#373a44',
      'quote-bg': '#1c1e25',
      'quote-text': '#b6bac4',
      'th-bg': '#23262e',
      'vertical-bg': '#1a1c22',
      'glass-tint': '#1c1e25',
      'glass-ink': '#e8eaed',
      'glass-ink-soft': '#aab0bb',
      'glass-fill': 'rgba(255, 255, 255, 0.12)',
      'glass-hover': 'rgba(255, 255, 255, 0.16)',
      'glass-accent': '#e8eaed',
      'glass-accent-ink': '#16171c',
      'glass-divider': 'rgba(255, 255, 255, 0.13)',
    },
  },
  article: {
    light: { ...lightBase },
    dark: {
      // Warm sepia-dark for comfortable long-form reading. Same elevation
      // discipline as home, but the base carries a warm brown cast (not black)
      // and prose text is a soft cream rather than pure white.
      ink: '#ece6d8',
      paper: '#17150f',
      muted: '#b1a991',
      line: '#3a342a',
      red: '#ef6a5e',
      cyan: '#3fc0c9',
      leaf: '#82b870',
      violet: '#b598ee',
      gold: '#ecb84a',
      surface: '#211d15',
      raised: '#2c2719',
      'grid-line': 'rgba(255, 255, 255, 0.045)',
      'volume-bg': '#1b1810',
      'prose-text': '#d8d2c4',
      'code-bg': '#14120c',
      'code-text': '#f0e8d8',
      'code-border': '#322c20',
      'inline-code-bg': '#2a2518',
      'inline-code-border': '#3d3527',
      'quote-bg': '#221d12',
      'quote-text': '#c4bca8',
      'th-bg': '#29241a',
      'vertical-bg': '#1d1a12',
      'glass-tint': '#1c180f',
      'glass-ink': '#ece6d8',
      'glass-ink-soft': '#bbb39d',
      'glass-fill': 'rgba(255, 255, 255, 0.1)',
      'glass-hover': 'rgba(255, 255, 255, 0.14)',
      'glass-accent': '#ece6d8',
      'glass-accent-ink': '#17150f',
      'glass-divider': 'rgba(255, 255, 255, 0.12)',
    },
  },
};

/** Serialize a token set into `--key: value;` declarations. */
export function tokensToCss(tokens: ThemeTokens): string {
  return Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${value};`)
    .join(' ');
}

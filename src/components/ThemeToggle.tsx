import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_EVENT = 'theme-change';

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

type ThemeToggleProps = {
  label?: string;
  /** Layout: compact round icon button (toolbar) or full row (mobile menu). */
  variant?: 'icon' | 'row';
};

export default function ThemeToggle({ label = 'Theme', variant = 'icon' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(readTheme());
    const sync = () => setTheme(readTheme());
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
    setTheme(next);
    window.dispatchEvent(new CustomEvent(THEME_EVENT));
  };

  const isDark = theme === 'dark';
  const nextLabel = isDark ? `${label}: light` : `${label}: dark`;

  if (variant === 'row') {
    return (
      <button
        type="button"
        role="menuitem"
        aria-label={nextLabel}
        className="flex items-center justify-between rounded-full bg-transparent px-3 py-2 text-xs font-black text-stone-900 transition hover:bg-white/58 focus-visible:bg-white/58"
        onClick={toggle}
      >
        <span>{label}</span>
        {isDark ? <MoonIcon /> : <SunIcon />}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={nextLabel}
      aria-pressed={isDark}
      className="grid size-9 place-items-center rounded-full bg-transparent text-stone-900 transition hover:bg-white/55 focus-visible:bg-white/55"
      onClick={toggle}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

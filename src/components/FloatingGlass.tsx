import { useEffect, useRef, useState } from 'react';
import {
  getTranslations,
  languageOptions,
  languageSwitchPath,
  localizedPath,
  type Locale,
} from '../i18n/ui';
import { LiquidGlass } from './LiquidGlass';

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        d="M12 19V5m0 0 6 6M12 5l-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        d="M5 5h5v5H5zm9 0h5v5h-5zM5 14h5v5H5zm9 0h5v5h-5z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        d="m20 20-4.5-4.5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

type FloatingGlassProps = {
  locale?: Locale;
  currentPath?: string;
};

export default function FloatingGlass({ locale = 'zh', currentPath = '/' }: FloatingGlassProps) {
  const t = getTranslations(locale);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const activeLanguage = languageOptions.find((option) => option.locale === locale) ?? languageOptions[0];
  const navItems = [
    { label: t.nav.home, href: localizedPath(locale, '/') },
    { label: t.nav.volume, href: localizedPath(locale, '/#volume') },
    { label: t.nav.posts, href: localizedPath(locale, '/#notes') },
    { label: t.nav.socials, href: localizedPath(locale, '/#socials'), mobileHidden: true },
  ];

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  useEffect(() => {
    const closeLanguageMenu = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLanguageOpen(false);
      }
    };

    window.addEventListener('click', closeLanguageMenu);
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('click', closeLanguageMenu);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <LiquidGlass
        className="pointer-events-auto fixed left-1/2 top-4 flex w-[calc(100%-2rem)] max-w-[840px] -translate-x-1/2 items-center justify-start gap-2 rounded-full px-3 py-2 text-stone-950 shadow-[0_24px_70px_-34px_rgba(10,10,10,0.55)] sm:justify-between"
        chroma={0.38}
        blur={2.4}
        distort={28}
        bezelRatio={0.86}
        tintColor="#ffffff"
        tintAlpha={0.08}
        saturate={155}
      >
        <a href={localizedPath(locale, '/')} className="shrink-0 rounded-full bg-transparent px-3 py-2 text-sm font-black transition hover:bg-white/45 focus-visible:bg-white/45 sm:px-4">
          Mugaaaaa's Blog
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-2 py-2 text-[11px] font-bold text-stone-900/80 transition hover:bg-white/45 sm:px-3 sm:text-xs ${
                item.mobileHidden ? 'hidden sm:block' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-label={t.nav.searchPosts}
          className="ml-auto hidden rounded-full bg-transparent px-3 py-2 text-xs font-black text-stone-900 transition hover:bg-white/55 focus-visible:bg-white/55 sm:block"
          onClick={openSearch}
        >
          {t.nav.search}
        </button>
        <div ref={languageMenuRef} className="relative hidden sm:block">
          <button
            type="button"
            aria-label={t.nav.language}
            aria-haspopup="menu"
            aria-expanded={languageOpen}
            className="rounded-full bg-transparent px-3 py-2 text-xs font-black text-stone-900 transition hover:bg-white/55 focus-visible:bg-white/55"
            onClick={() => setLanguageOpen((open) => !open)}
          >
            {activeLanguage.shortLabel}
          </button>
          {languageOpen && (
            <LiquidGlass
              className="absolute right-0 top-[calc(100%+0.75rem)] grid w-40 gap-1 rounded-[18px] px-2 py-2 text-stone-950 shadow-[0_28px_80px_-36px_rgba(10,10,10,0.72)]"
              chroma={0.36}
              blur={2.4}
              distort={30}
              bezelRatio={0.84}
              tintColor="#ffffff"
              tintAlpha={0.2}
              saturate={155}
            >
              <div role="menu" aria-label={t.nav.language} className="grid gap-1">
                {languageOptions.map((option) => {
                  const active = option.locale === locale;

                  return (
                    <a
                      key={option.locale}
                      href={languageSwitchPath(option.locale, currentPath)}
                      role="menuitem"
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between rounded-full px-3 py-2 text-xs font-black transition ${
                        active
                          ? 'bg-stone-950 text-white'
                          : 'bg-transparent text-stone-900 hover:bg-white/58 focus-visible:bg-white/58'
                      }`}
                    >
                      <span>{option.label}</span>
                      <span className={active ? 'text-white/66' : 'text-stone-500'}>{option.shortLabel}</span>
                    </a>
                  );
                })}
              </div>
            </LiquidGlass>
          )}
        </div>
      </LiquidGlass>

      <LiquidGlass
        className="pointer-events-auto fixed left-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full px-2 py-2 text-stone-950 shadow-[0_24px_70px_-38px_rgba(10,10,10,0.7)] md:flex"
        chroma={0.34}
        blur={2}
        distort={30}
        bezelRatio={0.88}
        tintColor="#ffffff"
        tintAlpha={0.16}
        saturate={150}
      >
        <a
          href="#top"
          aria-label={t.nav.backTop}
          className="grid size-10 place-items-center rounded-full bg-transparent transition hover:bg-white/55 focus-visible:bg-white/55"
        >
          <ArrowUpIcon />
        </a>
        <a
          href={localizedPath(locale, '/#volume')}
          aria-label={t.nav.volume}
          className="grid size-10 place-items-center rounded-full bg-transparent transition hover:bg-white/55 focus-visible:bg-white/55"
        >
          <GridIcon />
        </a>
        <a
          href={localizedPath(locale, '/#notes')}
          aria-label={t.nav.posts}
          className="grid size-10 place-items-center rounded-full bg-transparent transition hover:bg-white/55 focus-visible:bg-white/55"
        >
          <SearchIcon />
        </a>
        <button
          type="button"
          aria-label={t.nav.searchPosts}
          className="grid size-10 place-items-center rounded-full bg-stone-950 text-white transition hover:bg-stone-800"
          onClick={openSearch}
        >
          <SearchIcon />
        </button>
      </LiquidGlass>
    </div>
  );
}

import { glassPresets } from '../config/glass';
import { getTranslations, localizedPath, type Locale } from '../i18n/ui';
import { LiquidGlass } from './LiquidGlass';

function DockIcon({ type }: { type: 'home' | 'posts' | 'search' | 'top' }) {
  const paths = {
    home: 'M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4z',
    posts: 'M6 5h12M6 10h12M6 15h8M6 20h10',
    search: 'm20 20-4.5-4.5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
    top: 'M12 19V5m0 0 6 6M12 5l-6 6',
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d={paths[type]}
        fill={type === 'home' ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

type MobileGlassDockProps = {
  locale?: Locale;
  glassTintAlpha?: number;
};

export default function MobileGlassDock({ locale = 'zh', glassTintAlpha }: MobileGlassDockProps) {
  const t = getTranslations(locale);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <LiquidGlass
      className="pointer-events-auto fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-2 text-stone-950 shadow-[0_30px_88px_-32px_rgba(10,10,10,0.86)] md:hidden"
      {...glassPresets.mobileDock}
      tintAlpha={glassTintAlpha ?? glassPresets.mobileDock.tintAlpha}
    >
      <a href={localizedPath(locale, '/')} aria-label={t.nav.home} className="grid size-11 place-items-center rounded-full bg-transparent transition hover:bg-white/45 focus-visible:bg-white/45">
        <DockIcon type="home" />
      </a>
      <a href={localizedPath(locale, '/#notes')} aria-label={t.nav.latestPosts} className="grid size-11 place-items-center rounded-full bg-transparent transition hover:bg-white/45 focus-visible:bg-white/45">
        <DockIcon type="posts" />
      </a>
      <button
        type="button"
        aria-label={t.nav.search}
        className="grid size-11 place-items-center rounded-full bg-stone-950 text-white"
        onClick={openSearch}
      >
        <DockIcon type="search" />
      </button>
      <a href="#top" aria-label={t.nav.backTop} className="grid size-11 place-items-center rounded-full bg-transparent transition hover:bg-white/45 focus-visible:bg-white/45">
        <DockIcon type="top" />
      </a>
    </LiquidGlass>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { getTranslations, type Locale } from '../i18n/ui';
import type { PostSearchItem } from '../lib/posts';
import { LiquidGlass } from './LiquidGlass';

type CommandPaletteProps = {
  posts: PostSearchItem[];
  locale?: Locale;
  glassTintAlpha?: number;
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
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

export default function CommandPalette({ posts, locale = 'zh', glassTintAlpha }: CommandPaletteProps) {
  const t = getTranslations(locale);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts.slice(0, 6);

    return posts
      .filter((post) => {
        const haystack = [
          post.title,
          post.category,
          post.description,
          ...post.tags,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 8);
  }, [posts, query]);

  useEffect(() => {
    const openPalette = () => setOpen(true);
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const inTextInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }

      if (!inTextInput && event.key === '/') {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('open-command-palette', openPalette);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('open-command-palette', openPalette);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-start bg-black/34 px-4 pt-24 backdrop-blur-[2px] md:place-items-center md:pt-0">
      <button
        type="button"
        aria-label={t.search.close}
        className="absolute inset-0 cursor-default"
        onClick={() => setOpen(false)}
      />
      <LiquidGlass
        className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-[24px] px-4 py-4 text-stone-950 shadow-[0_36px_110px_-38px_rgba(0,0,0,0.86)] md:px-5"
        chroma={0.36}
        blur={2.8}
        distort={32}
        bezelRatio={0.82}
        tintColor="#ffffff"
        tintAlpha={glassTintAlpha ?? 0.3}
        saturate={155}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-white/72" />
        <div className="relative">
          <div className="flex items-center gap-3 border-b border-stone-950/12 pb-3">
            <SearchIcon />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search.placeholder}
              className="min-w-0 flex-1 bg-transparent text-lg font-black outline-none placeholder:text-stone-600/65"
            />
            <span className="hidden rounded-full bg-white/72 px-2 py-1 text-[11px] font-black uppercase text-stone-700 md:block">
              Esc
            </span>
          </div>

          <div className="mt-3 grid max-h-[58vh] gap-2 overflow-y-auto">
            {results.length > 0 ? (
              results.map((post) => (
                <a
                  key={post.href}
                  href={post.href}
                  className="rounded-[14px] px-3 py-3 transition hover:bg-white/78 focus-visible:bg-white/78"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-black leading-5">{post.title}</p>
                    <time className="shrink-0 text-[11px] font-black text-stone-600">
                      {post.date}
                    </time>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-stone-600">
                    {post.description}
                  </p>
                </a>
              ))
            ) : (
              <p className="px-3 py-8 text-center text-sm font-black text-stone-600">
                {t.search.empty}
              </p>
            )}
          </div>
        </div>
      </LiquidGlass>
    </div>
  );
}

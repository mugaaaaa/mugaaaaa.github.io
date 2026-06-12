import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { glassPresets } from '../config/glass';
import { getTranslations, type Locale } from '../i18n/ui';
import { LiquidGlass } from './LiquidGlass';

type PostFilterGlassProps = {
  tags: string[];
  relatedTagsByTag?: Record<string, string[]>;
  baseHref?: string;
  activeTags?: string[];
  fixedTag?: string | null;
  interactive?: boolean;
  tone?: 'light' | 'dark';
  locale?: Locale;
};

type FilterSelection = {
  activeTags: string[];
  fixedTag: string | null;
};

export default function PostFilterGlass({
  tags,
  relatedTagsByTag = {},
  baseHref = '/posts/',
  activeTags: initialTags = [],
  fixedTag: initialFixedTag = null,
  interactive = false,
  tone = 'light',
  locale = 'zh',
}: PostFilterGlassProps) {
  const t = getTranslations(locale);
  const readSelection = (search?: string): FilterSelection => {
    if (typeof window === 'undefined' && search === undefined) {
      return {
        activeTags: initialTags,
        fixedTag: initialFixedTag,
      };
    }

    const params = new URLSearchParams(search ?? window.location.search);
    const nextFixedTag = params.get('volume') ?? initialFixedTag;

    return {
      fixedTag: nextFixedTag,
      activeTags: params.getAll('tag').filter((tag) => tag && tag !== nextFixedTag),
    };
  };
  const [{ activeTags, fixedTag }, setSelection] = useState<FilterSelection>(() => readSelection());
  const visibleTags = useMemo(() => {
    const sourceTags = fixedTag && relatedTagsByTag[fixedTag]
      ? relatedTagsByTag[fixedTag]
      : tags;
    const selectableTags = sourceTags.filter((tag, index) => sourceTags.indexOf(tag) === index && tag !== fixedTag);
    const prioritizedTags = [...activeTags, ...selectableTags].filter(
      (tag, index, list) => tag && list.indexOf(tag) === index && tag !== fixedTag,
    );

    if (fixedTag) {
      return [fixedTag, ...prioritizedTags.slice(0, 7)];
    }

    return [t.filter.all, ...prioritizedTags.slice(0, 7)];
  }, [activeTags, fixedTag, relatedTagsByTag, tags, t.filter.all]);
  const darkTone = tone === 'dark';

  const dispatchFilterChange = (selection: FilterSelection) => {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(new CustomEvent('posts-filter-change', {
      detail: {
        ...selection,
        requiredTags: [
          ...(selection.fixedTag ? [selection.fixedTag] : []),
          ...selection.activeTags,
        ],
      },
    }));
  };

  useEffect(() => {
    const syncFromLocation = () => {
      const nextSelection = readSelection();
      setSelection(nextSelection);
      dispatchFilterChange(nextSelection);
    };

    syncFromLocation();
    if (!interactive) return;

    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, [interactive, initialFixedTag]);

  const buildHref = (nextTags: string[], nextFixedTag = fixedTag) => {
    const params = new URLSearchParams();
    if (nextFixedTag) {
      params.set('volume', nextFixedTag);
    }

    nextTags.forEach((tag) => {
      if (tag && tag !== nextFixedTag) {
        params.append('tag', tag);
      }
    });

    const query = params.toString();
    return query ? `${baseHref}?${query}` : baseHref;
  };

  const handleFilterClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      !interactive ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      typeof window === 'undefined'
    ) {
      return;
    }

    event.preventDefault();
    const url = new URL(href, window.location.href);
    const nextSelection = readSelection(url.search);
    window.history.pushState({}, '', url);
    setSelection(nextSelection);
    dispatchFilterChange(nextSelection);
  };

  return (
    <LiquidGlass
      className={`no-scrollbar pointer-events-auto sticky top-20 z-30 mx-auto mb-8 flex w-full max-w-7xl items-center gap-2 overflow-x-auto rounded-full px-2 py-2 shadow-[0_24px_78px_-30px_rgba(10,10,10,0.82)] ${
        darkTone ? 'text-white' : 'text-stone-950'
      }`}
      {...glassPresets.postFilter}
    >
      <span className="shrink-0 rounded-full bg-stone-950 px-3 py-2 text-xs font-black uppercase text-white">
        {t.filter.label}
      </span>
      {visibleTags.map((tag) => {
        const fixed = tag === fixedTag;
        const active = fixed || activeTags.includes(tag);
        const nextTags = active
          ? activeTags.filter((activeTag) => activeTag !== tag)
          : [...activeTags, tag];
        const href = tag === t.filter.all ? baseHref : buildHref(nextTags);

        const className = `shrink-0 rounded-full px-3 py-2 text-xs font-black transition ${
          active
            ? ''
            : darkTone
              ? 'text-white/82 hover:bg-white/18 focus-visible:bg-white/18'
              : 'text-stone-800/76 hover:bg-white/58 focus-visible:bg-white/58'
        }`;

        if (fixed) {
          return (
            <span
              key={tag}
              data-filter={tag}
              aria-current="true"
              style={{ backgroundColor: 'var(--glass-accent)', color: 'var(--glass-accent-ink)' }}
              className={className}
            >
              {tag}
            </span>
          );
        }

        return (
          <a
            key={tag}
            href={href}
            data-filter={tag}
            aria-current={active ? 'true' : undefined}
            onClick={(event) => handleFilterClick(event, href)}
            style={active ? { backgroundColor: 'var(--glass-accent)', color: 'var(--glass-accent-ink)' } : undefined}
            className={className}
          >
            {tag}
          </a>
        );
      })}
    </LiquidGlass>
  );
}

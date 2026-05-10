import { useEffect, useMemo, useState } from 'react';
import { LiquidGlass } from './LiquidGlass';

type PostFilterGlassProps = {
  tags: string[];
  baseHref?: string;
  activeTag?: string;
  tone?: 'light' | 'dark';
};

export default function PostFilterGlass({
  tags,
  baseHref = '/posts/',
  activeTag: initialTag = 'All',
  tone = 'light',
}: PostFilterGlassProps) {
  const [activeTag, setActiveTag] = useState(initialTag);
  const visibleTags = useMemo(() => ['All', ...tags.slice(0, 7)], [tags]);
  const darkTone = tone === 'dark';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveTag(params.get('tag') ?? initialTag);
  }, [initialTag]);

  return (
    <LiquidGlass
      className={`pointer-events-auto sticky top-20 z-30 mx-auto mb-8 flex w-full max-w-7xl items-center gap-2 overflow-x-auto rounded-full px-2 py-2 shadow-[0_18px_60px_-34px_rgba(10,10,10,0.6)] ${
        darkTone ? 'text-white' : 'text-stone-950'
      }`}
      chroma={0.34}
      blur={2.2}
      distort={26}
      bezelRatio={0.88}
      tintColor="#ffffff"
      tintAlpha={0.16}
      saturate={155}
    >
      <span className="shrink-0 rounded-full bg-stone-950 px-3 py-2 text-xs font-black uppercase text-white">
        Filter
      </span>
      {visibleTags.map((tag) => {
        const active = tag === activeTag;
        const href = tag === 'All' ? baseHref : `${baseHref}?tag=${encodeURIComponent(tag)}`;

        return (
          <a
            key={tag}
            href={href}
            data-filter={tag}
            style={active ? { backgroundColor: '#050505', color: '#ffffff' } : undefined}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-black transition ${
              active
                ? ''
                : darkTone
                  ? 'text-white/82 hover:bg-white/18 focus-visible:bg-white/18'
                  : 'text-stone-800/76 hover:bg-white/58 focus-visible:bg-white/58'
            }`}
          >
            {tag}
          </a>
        );
      })}
    </LiquidGlass>
  );
}

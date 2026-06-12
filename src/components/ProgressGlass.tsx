import { useEffect, useMemo, useState } from 'react';
import { LiquidGlass } from './LiquidGlass';

type ProgressSection = {
  id: string;
  label: string;
  depth?: number;
};

type ProgressGlassProps = {
  title?: string;
  sections?: ProgressSection[];
  details?: Array<{ label: string; value: string }>;
  links?: Array<{ label: string; href: string }>;
  glassTintAlpha?: number;
};

const defaultSections: ProgressSection[] = [
  { id: 'top', label: 'Hero' },
  { id: 'volume', label: 'Volume' },
  { id: 'notes', label: 'Posts' },
  { id: 'socials', label: 'Socials' },
];

export default function ProgressGlass({
  title = 'Progress',
  sections = defaultSections,
  details = [],
  links = [],
  glassTintAlpha,
}: ProgressGlassProps) {
  const normalizedSections = useMemo(
    () => sections.map((section) => ({ ...section, depth: section.depth ?? 0 })),
    [sections],
  );
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(normalizedSections[0]?.id ?? '');
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(() => new Set());

  const activeSection = useMemo(
    () => normalizedSections.find((section) => section.id === activeId) ?? normalizedSections[0],
    [activeId, normalizedSections],
  );

  const hasNestedChildren = (index: number) => {
    const section = normalizedSections[index];
    if (!section || section.depth === 0) return false;

    for (let nextIndex = index + 1; nextIndex < normalizedSections.length; nextIndex += 1) {
      const nextDepth = normalizedSections[nextIndex].depth ?? 0;
      if (nextDepth <= section.depth) return false;
      if (nextDepth > section.depth) return true;
    }

    return false;
  };

  const isHiddenByCollapsedParent = (index: number) => {
    const section = normalizedSections[index];
    if (!section || section.depth === 0) return false;

    let childDepth = section.depth;
    for (let parentIndex = index - 1; parentIndex >= 0; parentIndex -= 1) {
      const parent = normalizedSections[parentIndex];
      const parentDepth = parent.depth ?? 0;

      if (parentDepth < childDepth) {
        if (collapsedIds.has(parent.id)) return true;
        childDepth = parentDepth;
      }
    }

    return false;
  };

  const visibleSections = useMemo(
    () => normalizedSections
      .map((section, index) => ({ section, index }))
      .filter((item) => !isHiddenByCollapsedParent(item.index)),
    [collapsedIds, normalizedSections],
  );

  const activeVisibleId = useMemo(() => {
    const activeIndex = normalizedSections.findIndex((section) => section.id === activeId);
    if (activeIndex < 0 || !isHiddenByCollapsedParent(activeIndex)) return activeId;

    let childDepth = normalizedSections[activeIndex].depth ?? 0;
    for (let parentIndex = activeIndex - 1; parentIndex >= 0; parentIndex -= 1) {
      const parent = normalizedSections[parentIndex];
      const parentDepth = parent.depth ?? 0;

      if (parentDepth < childDepth) {
        if (!isHiddenByCollapsedParent(parentIndex)) return parent.id;
        childDepth = parentDepth;
      }
    }

    return activeId;
  }, [activeId, collapsedIds, normalizedSections]);

  const toggleSection = (id: string) => {
    setCollapsedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    setCollapsedIds((current) => {
      const availableIds = new Set(normalizedSections.map((section) => section.id));
      const next = new Set([...current].filter((id) => availableIds.has(id)));
      return next.size === current.size ? current : next;
    });
  }, [normalizedSections]);

  useEffect(() => {
    const update = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = documentHeight > 0 ? window.scrollY / documentHeight : 0;
      setProgress(Math.min(100, Math.max(0, Math.round(nextProgress * 100))));

      const threshold = window.innerHeight * 0.42;
      let current = normalizedSections[0];
      for (const section of normalizedSections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) {
          current = section;
        }
      }

      setActiveId(current?.id ?? '');
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [normalizedSections]);

  return (
    <LiquidGlass
      className="pointer-events-auto fixed right-4 top-1/2 z-40 hidden w-[188px] -translate-y-1/2 rounded-[18px] px-4 py-4 text-stone-950 shadow-[0_34px_100px_-34px_rgba(10,10,10,0.86)] lg:block"
      chroma={0.36}
      blur={2.4}
      distort={50}
      bezelRatio={2}
      tintColor="var(--glass-tint)"
      tintAlpha={glassTintAlpha ?? 0.2}
      saturate={155}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-stone-700">
            {title}
          </p>
          <p className="mt-1 text-sm font-black">{activeSection?.label}</p>
        </div>
        <p className="text-2xl font-black tabular-nums">{progress}</p>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-950/12">
        <div
          className="h-full rounded-full bg-stone-950 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 grid max-h-[52vh] gap-1 overflow-y-auto pr-1">
        {visibleSections.map(({ section, index }) => {
          const active = section.id === activeVisibleId;
          const childSection = hasNestedChildren(index);
          const collapsed = collapsedIds.has(section.id);
          const depth = Math.max(0, section.depth ?? 0);
          const baseIndent = 0.625;
          const indent = `${baseIndent + Math.max(0, depth - 1) * 0.42}rem`;

          return (
            <div
              key={section.id}
              style={{
                ...(active ? { backgroundColor: 'var(--glass-accent)', color: 'var(--glass-accent-ink)' } : {}),
                paddingLeft: indent,
              }}
              className={`flex min-w-0 items-center gap-1.5 rounded-full py-1.5 pr-2 text-xs font-black transition ${
                active ? '' : 'text-stone-900/78 hover:bg-white/58 focus-visible:bg-white/58'
              }`}
            >
              <a
                href={`#${section.id}`}
                aria-current={active ? 'location' : undefined}
                className="min-w-0 flex-1 truncate"
              >
                {section.label}
              </a>
              {childSection ? (
                <button
                  type="button"
                  aria-expanded={!collapsed}
                  aria-label={`${collapsed ? 'Expand' : 'Collapse'} ${section.label}`}
                  onClick={() => toggleSection(section.id)}
                  className="grid size-5 shrink-0 place-items-center rounded-full bg-white/40 text-[10px] leading-none transition hover:bg-white/70 focus-visible:bg-white/70"
                >
                  {collapsed ? '+' : '-'}
                </button>
              ) : (
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
              )}
            </div>
          );
        })}
      </div>

      {(details.length > 0 || links.length > 0) && (
        <div className="mt-4 border-t border-stone-950/12 pt-3">
          {details.length > 0 && (
            <div className="grid gap-2">
              {details.map((detail) => (
                <div
                  key={`${detail.label}-${detail.value}`}
                  className="flex items-center justify-between gap-3 rounded-full bg-white/30 px-2.5 py-2 text-[11px] font-black"
                >
                  <span className="text-stone-700/70">{detail.label}</span>
                  <span className="max-w-[92px] truncate text-right">{detail.value}</span>
                </div>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="mt-2 grid gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{ backgroundColor: 'var(--glass-accent)', color: 'var(--glass-accent-ink)' }}
                  className="rounded-full px-3 py-2 text-center text-xs font-black transition hover:opacity-90"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </LiquidGlass>
  );
}

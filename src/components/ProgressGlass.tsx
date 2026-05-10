import { useEffect, useMemo, useState } from 'react';
import { LiquidGlass } from './LiquidGlass';

type ProgressSection = {
  id: string;
  label: string;
};

type ProgressGlassProps = {
  title?: string;
  sections?: ProgressSection[];
  details?: Array<{ label: string; value: string }>;
  links?: Array<{ label: string; href: string }>;
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
}: ProgressGlassProps) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeId) ?? sections[0],
    [activeId, sections],
  );

  useEffect(() => {
    const update = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = documentHeight > 0 ? window.scrollY / documentHeight : 0;
      setProgress(Math.min(100, Math.max(0, Math.round(nextProgress * 100))));

      const threshold = window.innerHeight * 0.42;
      let current = sections[0];
      for (const section of sections) {
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
  }, [sections]);

  return (
    <LiquidGlass
      className="pointer-events-auto fixed right-4 top-1/2 z-40 hidden w-[188px] -translate-y-1/2 rounded-[18px] px-4 py-4 text-stone-950 shadow-[0_28px_80px_-36px_rgba(10,10,10,0.72)] lg:block"
      chroma={0.36}
      blur={2.4}
      distort={30}
      bezelRatio={0.84}
      tintColor="#ffffff"
      tintAlpha={0.3}
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

      <div className="mt-4 grid gap-2">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active ? 'location' : undefined}
              style={active ? { backgroundColor: '#050505', color: '#ffffff' } : undefined}
              className={`flex min-w-0 items-center justify-between gap-2 rounded-full px-2.5 py-2 text-xs font-black transition ${
                active ? '' : 'text-stone-900/78 hover:bg-white/58 focus-visible:bg-white/58'
              }`}
            >
              <span className="min-w-0 truncate">{section.label}</span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            </a>
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
                  style={{ backgroundColor: '#050505', color: '#ffffff' }}
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

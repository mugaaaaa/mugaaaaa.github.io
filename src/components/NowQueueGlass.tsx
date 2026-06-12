import { glassPresets } from '../config/glass';
import { getTranslations, type Locale } from '../i18n/ui';
import { LiquidGlass } from './LiquidGlass';

type NowQueueGlassProps = {
  currentTitle: string;
  nextTitle?: string;
  postCount: number;
  tagCount: number;
  locale?: Locale;
};

export default function NowQueueGlass({
  currentTitle,
  nextTitle,
  postCount,
  tagCount,
  locale = 'zh',
}: NowQueueGlassProps) {
  const t = getTranslations(locale);

  return (
    <LiquidGlass
      className="glass-ink-lock pointer-events-auto fixed bottom-8 right-8 z-40 hidden w-72 rounded-[22px] px-4 py-4 text-black shadow-[0_38px_110px_-38px_rgba(0,0,0,0.9)] xl:block"
      {...glassPresets.nowQueue}
    >
      <p className="inline-flex rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black">
        {t.nowQueue.title}
      </p>
      <h2 className="mt-2 text-xl font-black leading-6">{currentTitle}</h2>
      <div className="mt-4 grid gap-3 border-t border-stone-950/12 pt-3 text-xs font-black text-black">
        <div className="flex items-center justify-between gap-3 px-1">
          <span>{t.nowQueue.next}</span>
          <span className="max-w-[160px] truncate text-right">{nextTitle ?? t.nowQueue.draftFallback}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="px-1 py-1">
            <p className="text-2xl font-black tabular-nums">{postCount}</p>
            <p className="text-[10px] uppercase text-black">{t.common.posts}</p>
          </div>
          <div className="px-1 py-1">
            <p className="text-2xl font-black tabular-nums">{tagCount}</p>
            <p className="text-[10px] uppercase text-black">{t.common.tags}</p>
          </div>
        </div>
      </div>
    </LiquidGlass>
  );
}

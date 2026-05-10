import { LiquidGlass } from './LiquidGlass';

type NowQueueGlassProps = {
  currentTitle: string;
  nextTitle?: string;
  postCount: number;
  tagCount: number;
};

export default function NowQueueGlass({
  currentTitle,
  nextTitle,
  postCount,
  tagCount,
}: NowQueueGlassProps) {
  return (
    <LiquidGlass
      className="pointer-events-auto fixed bottom-8 right-8 z-40 hidden w-72 rounded-[22px] px-4 py-4 text-stone-950 shadow-[0_30px_90px_-42px_rgba(0,0,0,0.78)] xl:block"
      chroma={0.38}
      blur={2.5}
      distort={30}
      bezelRatio={0.84}
      tintColor="#ffffff"
      tintAlpha={0.16}
      saturate={160}
    >
      <p className="inline-flex rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-stone-700">
        Now / Queue
      </p>
      <h2 className="mt-2 text-xl font-black leading-6">{currentTitle}</h2>
      <div className="mt-4 grid gap-3 border-t border-stone-950/12 pt-3 text-xs font-black text-stone-700">
        <div className="flex items-center justify-between gap-3 px-1">
          <span>Next</span>
          <span className="max-w-[160px] truncate text-right">{nextTitle ?? 'New draft'}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="px-1 py-1">
            <p className="text-2xl font-black tabular-nums">{postCount}</p>
            <p className="text-[10px] uppercase text-stone-600">Posts</p>
          </div>
          <div className="px-1 py-1">
            <p className="text-2xl font-black tabular-nums">{tagCount}</p>
            <p className="text-[10px] uppercase text-stone-600">Tags</p>
          </div>
        </div>
      </div>
    </LiquidGlass>
  );
}

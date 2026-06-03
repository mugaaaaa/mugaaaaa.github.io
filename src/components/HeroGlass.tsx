import { LiquidGlass } from './LiquidGlass';

export default function HeroGlass() {
  return (
    <LiquidGlass
      className="absolute right-8 top-32 z-20 hidden w-72 rounded-[28px] px-5 py-4 text-stone-950 shadow-[0_36px_100px_-38px_rgba(10,10,10,0.88)] lg:block"
      chroma={0.42}
      blur={2.2}
      distort={30}
      bezelRatio={0.84}
      tintColor="#ffffff"
      tintAlpha={0.3}
      saturate={160}
    >
      <p className="text-[11px] font-black uppercase text-stone-700">Now drafting</p>
      <p className="mt-2 text-2xl font-black leading-none">幻想乡手记</p>
      <p className="mt-2 text-xs font-semibold leading-5 text-stone-700/85">
        UI notes, drawing logs, and front-end experiments.
      </p>
    </LiquidGlass>
  );
}

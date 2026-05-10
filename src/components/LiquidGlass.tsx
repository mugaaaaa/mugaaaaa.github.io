'use client';
// =============================================================
// LiquidGlass — single-file React component
// Drop into any React 18+ project. No deps beyond react.
// Browser support: Chromium only (backdrop-filter SVG url()).
// =============================================================

import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';
import {
  forwardRef,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// ---------- Surface profile (1D Snell) ----------
type SurfaceFn = (u: number) => number;

const smootherstep = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
};

export const surfaces: Record<string, SurfaceFn> = {
  convexCircle: (u) => Math.sqrt(Math.max(0, 1 - (1 - u) * (1 - u))),
  convexSquircle: (u) => {
    const v = 1 - u;
    return Math.pow(Math.max(0, 1 - v * v * v * v), 1 / 4);
  },
  concave: (u) => 1 - Math.sqrt(Math.max(0, 1 - (1 - u) * (1 - u))),
  lip: (u) => {
    const conv = Math.sqrt(Math.max(0, 1 - (1 - u) * (1 - u)));
    const conc = 1 - conv;
    const m = smootherstep(u);
    return conv * (1 - m) + conc * m;
  },
};

interface BuildProfileOpts {
  samples?: number;
  bezelRatio: number;
  n2?: number;
  surfaceFn: SurfaceFn;
}

function buildProfile({ samples = 192, bezelRatio, n2 = 1.5, surfaceFn }: BuildProfileOpts) {
  const arr = new Float32Array(samples);
  const eps = 1e-3;
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    if (t >= bezelRatio) { arr[i] = 0; continue; }
    const u = t / bezelRatio;
    const u0 = Math.max(0, u - eps);
    const u1 = Math.min(1, u + eps);
    const dhdu = (surfaceFn(u1) - surfaceFn(u0)) / (u1 - u0 || eps);
    const slope = dhdu / bezelRatio;
    const theta1 = Math.atan(slope);
    const sinT2 = Math.max(-1, Math.min(1, Math.sin(theta1) / n2));
    const theta2 = Math.asin(sinT2);
    arr[i] = Math.tan(theta1 - theta2);
  }
  let max = 0;
  for (const v of arr) if (Math.abs(v) > max) max = Math.abs(v);
  if (max > 0) for (let i = 0; i < samples; i++) arr[i] /= max;
  return arr;
}

// ---------- Module-level LRU caches (shared across all instances) ----------
const AA_WIDTH = 1.5;
const CACHE_LIMIT = 32;

function cacheGet<V>(cache: Map<string, V>, key: string): V | undefined {
  if (!cache.has(key)) return undefined;
  const v = cache.get(key) as V;
  cache.delete(key); cache.set(key, v);
  return v;
}
function cacheSet<V>(cache: Map<string, V>, key: string, value: V) {
  if (cache.has(key)) cache.delete(key);
  cache.set(key, value);
  if (cache.size > CACHE_LIMIT) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

const profileCache = new Map<string, Float32Array>();
const dispMapCache = new Map<string, string>();
const specMapCache = new Map<string, string>();

function getProfile(surfaceKey: string, bezelRatio: number) {
  const k = `${surfaceKey}|${bezelRatio.toFixed(3)}`;
  let p = profileCache.get(k);
  if (!p) {
    p = buildProfile({
      samples: 192,
      bezelRatio,
      surfaceFn: surfaces[surfaceKey] || surfaces.convexSquircle,
    });
    profileCache.set(k, p);
  }
  return { key: k, profile: p };
}

function generateDispMap(W: number, H: number, R: number, profileKey: string, profile: Float32Array): string {
  const halfMin = Math.min(W, H) / 2;
  const r = Math.max(0.5, Math.min(R, halfMin));
  const cacheKey = `m|${W}|${H}|${r}|${profileKey}`;
  const cached = cacheGet(dispMapCache, cacheKey);
  if (cached) return cached;

  const samples = profile.length;
  const lastIdx = samples - 1;
  const profMax = profile[0];

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  const img = ctx.createImageData(W, H);
  const data = img.data;

  const innerLeft = r, innerRight = W - r;
  const innerTop = r, innerBottom = H - r;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const cx = x < innerLeft ? innerLeft : (x > innerRight ? innerRight : x);
      const cy = y < innerTop ? innerTop : (y > innerBottom ? innerBottom : y);
      const dx = x - cx;
      const dy = y - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * W + x) * 4;
      const dist = r - d;

      if (dist < -AA_WIDTH) {
        data[idx] = 128; data[idx + 1] = 128; data[idx + 2] = 128; data[idx + 3] = 0;
        continue;
      }

      let mag: number;
      let alpha = 255;
      if (dist >= 0) {
        const t = Math.min(1, dist / r);
        mag = profile[Math.round(t * lastIdx)];
      } else {
        const fade = 1 + dist / AA_WIDTH;
        mag = profMax * fade;
        alpha = Math.round(255 * fade);
      }

      let dxN = 0, dyN = 0;
      if (d > 1e-4) {
        dxN = -(dx / d) * mag;
        dyN = -(dy / d) * mag;
      }
      data[idx] = Math.max(0, Math.min(255, Math.round(128 + dxN * 127)));
      data[idx + 1] = Math.max(0, Math.min(255, Math.round(128 + dyN * 127)));
      data[idx + 2] = 128;
      data[idx + 3] = alpha;
    }
  }
  ctx.putImageData(img, 0, 0);
  const url = canvas.toDataURL();
  cacheSet(dispMapCache, cacheKey, url);
  return url;
}

function generateSpecMap(
  W: number, H: number, R: number,
  profileKey: string, profile: Float32Array,
  opts: { angleDeg: number; shininess: number; intensity: number },
): string {
  const { angleDeg, shininess, intensity } = opts;
  const halfMin = Math.min(W, H) / 2;
  const r = Math.max(0.5, Math.min(R, halfMin));
  const cacheKey = `s|${W}|${H}|${r}|${profileKey}|${angleDeg}|${shininess}|${intensity}`;
  const cached = cacheGet(specMapCache, cacheKey);
  if (cached) return cached;

  const samples = profile.length;
  const lastIdx = samples - 1;
  const profMax = Math.abs(profile[0]);
  const angle = (angleDeg * Math.PI) / 180;
  const sx = Math.cos(angle);
  const sy = Math.sin(angle);

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  const img = ctx.createImageData(W, H);
  const data = img.data;

  const innerLeft = r, innerRight = W - r;
  const innerTop = r, innerBottom = H - r;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const cx = x < innerLeft ? innerLeft : (x > innerRight ? innerRight : x);
      const cy = y < innerTop ? innerTop : (y > innerBottom ? innerBottom : y);
      const dx = x - cx;
      const dy = y - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * W + x) * 4;
      const dist = r - d;
      if (dist < -AA_WIDTH) { data[idx + 3] = 0; continue; }

      let mag: number;
      if (dist >= 0) {
        const t = Math.min(1, dist / r);
        mag = Math.abs(profile[Math.round(t * lastIdx)]);
      } else {
        const fade = 1 + dist / AA_WIDTH;
        mag = profMax * fade;
      }
      if (mag < 1e-4) { data[idx + 3] = 0; continue; }

      let nxOut = 0, nyOut = 0;
      if (d > 1e-4) { nxOut = dx / d; nyOut = dy / d; }
      const dotted = nxOut * sx + nyOut * sy;
      const phong = Math.pow(Math.max(0, dotted), shininess);
      const v = mag * phong * intensity;
      const c = Math.max(0, Math.min(255, Math.round(v * 255)));
      data[idx] = c; data[idx + 1] = c; data[idx + 2] = c; data[idx + 3] = c;
    }
  }
  ctx.putImageData(img, 0, 0);
  const url = canvas.toDataURL();
  cacheSet(specMapCache, cacheKey, url);
  return url;
}

function hexToRgba(hex: string, a: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return `rgba(255,255,255,${a})`;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

// ---------- Component ----------
export interface LiquidGlassProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  /** Bezel cross-section shape. Default 'convexSquircle'. */
  surface?: keyof typeof surfaces;
  /** Where bezel meets center plateau. Range 0.30–0.95. Default 0.7. */
  bezelRatio?: number;
  /** Max edge displacement in pixels. Range 0–40. Default 14. */
  distort?: number;
  /** Chromatic aberration strength. Range 0–1. Default 0 (single-pass). */
  chroma?: number;
  /** Hex color for tint overlay. Default '#ffffff'. */
  tintColor?: string;
  /** Tint alpha. Range 0–1. 0 leaves CSS background untouched. Default 0. */
  tintAlpha?: number;
  /** CSS blur in px. Range 0–20. Default 6. */
  blur?: number;
  /** CSS saturate in %. Range 100–220. Default 140. */
  saturate?: number;
  /** Edge highlight intensity. Range 0–1. Default 0.55. */
  specular?: number;
  /** Highlight direction in degrees. Range -180–180. Default -60. */
  lightAngle?: number;
  /** Corner radius in px. If omitted, reads computed `border-radius`; falls back to capsule (min(W,H)/2). */
  radius?: number;
  /** Forwarded to the inner div. */
  style?: CSSProperties;
  /** Content rendered inside the glass element. */
  children?: ReactNode;
}

export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(function LiquidGlass(
  {
    surface = 'convexSquircle',
    bezelRatio = 0.7,
    distort = 14,
    chroma = 0,
    tintColor = '#ffffff',
    tintAlpha = 0,
    blur = 6,
    saturate = 140,
    specular = 0.55,
    lightAngle = -60,
    radius,
    className,
    style,
    children,
    ...rest
  },
  forwardedRef,
) {
  // useId() returns ":r1:" — strip colons so url(#…) is a clean ident
  const filterId = `lg-${useId().replace(/:/g, '')}`;
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ W: number; H: number; R: number }>({ W: 0, H: 0, R: 0 });

  const setRefs = (node: HTMLDivElement | null) => {
    innerRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  // Measure size + resolve effective radius (prop > computed border-radius > capsule)
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => {
      const W = Math.max(1, Math.round(el.offsetWidth));
      const H = Math.max(1, Math.round(el.offsetHeight));
      const halfMin = Math.min(W, H) / 2;
      let R: number;
      if (radius != null) {
        R = Math.max(0.5, Math.min(radius, halfMin));
      } else {
        const cs = getComputedStyle(el);
        const computedR = parseFloat(cs.borderTopLeftRadius) || 0;
        R = computedR > 0 ? Math.max(0.5, Math.min(computedR, halfMin)) : halfMin;
      }
      setSize((prev) => (prev.W === W && prev.H === H && prev.R === R ? prev : { W, H, R }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius]);

  const { mapUrl, specUrl } = useMemo(() => {
    if (!size.W || !size.H) return { mapUrl: '', specUrl: '' };
    const { key: profileKey, profile } = getProfile(surface as string, bezelRatio);
    return {
      mapUrl: generateDispMap(size.W, size.H, size.R, profileKey, profile),
      specUrl: generateSpecMap(size.W, size.H, size.R, profileKey, profile, {
        angleDeg: lightAngle, shininess: 6, intensity: specular,
      }),
    };
  }, [size.W, size.H, size.R, surface, bezelRatio, lightAngle, specular]);

  const useSplit = chroma > 0;
  const baseScale = distort * 2.0;
  const spread = useSplit ? baseScale * chroma * 0.15 : 0;

  const tintBg = tintAlpha > 0 ? hexToRgba(tintColor, tintAlpha) : undefined;
  const cssFilter = `blur(${blur}px) saturate(${saturate}%) url(#${filterId})`;

  // SVG <defs> renders next to the glass div; #filterId is global so both find each other
  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={size.W || 1}
            height={size.H || 1}
          >
            {mapUrl && (
              <feImage
                result="map" x="0" y="0"
                width={size.W} height={size.H}
                preserveAspectRatio="none"
                href={mapUrl} xlinkHref={mapUrl}
              />
            )}
            {specUrl && (
              <feImage
                result="spec" x="0" y="0"
                width={size.W} height={size.H}
                preserveAspectRatio="none"
                href={specUrl} xlinkHref={specUrl}
              />
            )}

            {useSplit ? (
              <>
                <feColorMatrix in="SourceGraphic" type="matrix"
                  values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="srcR" />
                <feColorMatrix in="SourceGraphic" type="matrix"
                  values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="srcG" />
                <feColorMatrix in="SourceGraphic" type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="srcB" />
                <feDisplacementMap in="srcR" in2="map"
                  xChannelSelector="R" yChannelSelector="G"
                  scale={baseScale - spread} result="dispR" />
                <feDisplacementMap in="srcG" in2="map"
                  xChannelSelector="R" yChannelSelector="G"
                  scale={baseScale} result="dispG" />
                <feDisplacementMap in="srcB" in2="map"
                  xChannelSelector="R" yChannelSelector="G"
                  scale={baseScale + spread} result="dispB" />
                <feBlend in="dispR" in2="dispG" mode="screen" result="dispRG" />
                <feBlend in="dispRG" in2="dispB" mode="screen" result="refracted" />
              </>
            ) : (
              <feDisplacementMap
                in="SourceGraphic" in2="map"
                xChannelSelector="R" yChannelSelector="G"
                scale={baseScale} result="refracted"
              />
            )}

            <feBlend in="spec" in2="refracted" mode="screen" />
          </filter>
        </defs>
      </svg>

      <div
        ref={setRefs}
        className={className}
        style={{
          backdropFilter: cssFilter,
          WebkitBackdropFilter: cssFilter,
          backgroundColor: tintBg,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    </>
  );
});

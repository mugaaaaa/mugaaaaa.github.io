import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

const filesWithLiquidGlass = [
  'src/components/CommandPalette.tsx',
  'src/components/FloatingGlass.tsx',
  'src/components/HeroGlass.tsx',
  'src/components/MobileGlassDock.tsx',
  'src/components/NowQueueGlass.tsx',
  'src/components/PostFilterGlass.tsx',
  'src/components/ProgressGlass.tsx',
  'src/components/pages/HomePage.astro',
];

describe('LiquidGlass shadow classes', () => {
  it('uses strengthened outer shadow opacity on every LiquidGlass instance', async () => {
    const weakShadows = [];

    for (const file of filesWithLiquidGlass) {
      const source = await readFile(file, 'utf8');
      const matches = source.matchAll(/<LiquidGlass\b([\s\S]*?)>/g);

      for (const match of matches) {
        const props = match[1];
        const isTopToolbar = file.endsWith('FloatingGlass.tsx') && props.includes('fixed left-1/2 top-4');
        if (isTopToolbar) continue;

        const shadowMatch = props.match(/shadow-\[([^\]]+)\]/);
        const alphas = shadowMatch
          ? [...shadowMatch[1].matchAll(/rgba\([^)]*,([0-9.]+)\)/g)].map((alphaMatch) => Number(alphaMatch[1]))
          : [];
        const alpha = Math.max(0, ...alphas);

        if (alpha < 0.8) {
          weakShadows.push(`${file}:${source.slice(0, match.index).split('\n').length}`);
        }
      }
    }

    assert.deepEqual(weakShadows, []);
  });

  it('casts the side toolbar shadow toward the page instead of straight down', async () => {
    const source = await readFile('src/components/FloatingGlass.tsx', 'utf8');
    const toolbarMatch = source.match(
      /className="([^"]*fixed left-5 top-1\/2[^"]*shadow-\[([^\]]+)\][^"]*)"/,
    );

    assert.ok(toolbarMatch, 'missing side toolbar shadow class');
    assert.match(toolbarMatch[2], /^[1-9][0-9]*px_/);
  });

  it('gives the top toolbar a soft broad shadow matching the side toolbar style', async () => {
    const source = await readFile('src/components/FloatingGlass.tsx', 'utf8');
    const toolbarMatch = source.match(
      /className="([^"]*fixed left-1\/2 top-4[^"]*shadow-\[([^\]]+)\][^"]*)"/,
    );

    assert.ok(toolbarMatch, 'missing top toolbar shadow class');
    assert.equal(
      toolbarMatch[2],
      '0_28px_96px_-24px_rgba(10,10,10,0.58)',
    );
  });
});

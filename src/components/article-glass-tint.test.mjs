import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

const articleGlassComponents = [
  'FloatingGlass',
  'MobileGlassDock',
  'CommandPalette',
  'ProgressGlass',
];

describe('article page LiquidGlass tint', () => {
  it('sets every article page glass shell to tint alpha 0.7', async () => {
    const source = await readFile('src/components/pages/PostDetailPage.astro', 'utf8');

    assert.match(
      source,
      /const articleGlassTintAlpha = 0\.7;/,
      'article page should keep the glass tint override in one place',
    );

    for (const component of articleGlassComponents) {
      assert.match(
        source,
        new RegExp(`<${component}\\b[\\s\\S]*?glassTintAlpha={articleGlassTintAlpha}[\\s\\S]*?client:load`),
        `${component} should receive the article glass tint override`,
      );
    }
  });

  it('keeps the homepage on component defaults', async () => {
    const source = await readFile('src/components/pages/HomePage.astro', 'utf8');

    for (const component of articleGlassComponents) {
      assert.doesNotMatch(
        source,
        new RegExp(`<${component}\\b[\\s\\S]*?glassTintAlpha=`),
        `${component} should not override glassTintAlpha on the homepage`,
      );
    }
  });

  it('lets shared glass shells fall back to their config preset tint defaults', async () => {
    // Tint defaults now live in the glass config; each shell falls back to its
    // preset's tintAlpha via `glassTintAlpha ?? glassPresets.<preset>.tintAlpha`.
    const config = await readFile('src/config/glass.ts', 'utf8');

    const expectations = [
      ['src/components/FloatingGlass.tsx', ['toolbar', 'menu', 'sideRail']],
      ['src/components/MobileGlassDock.tsx', ['mobileDock']],
      ['src/components/CommandPalette.tsx', ['commandPalette']],
      ['src/components/ProgressGlass.tsx', ['progress']],
    ];

    for (const [file, presets] of expectations) {
      const source = await readFile(file, 'utf8');

      assert.match(source, /glassTintAlpha\?: number/, `${file} should expose glassTintAlpha`);
      for (const preset of presets) {
        assert.match(
          config,
          new RegExp(`${preset}:\\s*{[^}]*tintAlpha:\\s*[0-9.]+`),
          `glass config should define a ${preset} preset with a tintAlpha`,
        );
        assert.match(
          source,
          new RegExp(`tintAlpha={glassTintAlpha \\?\\? glassPresets\\.${preset}\\.tintAlpha}`),
          `${file} should fall back to the ${preset} preset tint default`,
        );
      }
    }
  });
});

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

  it('lets shared glass shells fall back to their existing tint defaults', async () => {
    const expectations = [
      ['src/components/FloatingGlass.tsx', [0.08, 0.3, 0.16]],
      ['src/components/MobileGlassDock.tsx', [0.1]],
      ['src/components/CommandPalette.tsx', [0.3]],
      ['src/components/ProgressGlass.tsx', [0.3]],
    ];

    for (const [file, defaults] of expectations) {
      const source = await readFile(file, 'utf8');

      assert.match(source, /glassTintAlpha\?: number/, `${file} should expose glassTintAlpha`);
      for (const defaultAlpha of defaults) {
        assert.match(
          source,
          new RegExp(`tintAlpha={glassTintAlpha \\?\\? ${defaultAlpha}}`),
          `${file} should preserve default tint alpha ${defaultAlpha}`,
        );
      }
    }
  });
});

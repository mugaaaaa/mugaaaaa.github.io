import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

describe('post detail layout', () => {
  it('uses the horizontal article area as a single full-width body column', async () => {
    const source = await readFile('src/components/pages/PostDetailPage.astro', 'utf8');

    assert.doesNotMatch(
      source,
      /lg:grid-cols-\[minmax\(0,760px\)_280px\]/,
      'horizontal posts should not reserve a right sidebar column',
    );
    assert.doesNotMatch(
      source,
      /<aside\b/,
      'horizontal posts should not render the Outline/Adjacent sidebar',
    );
    assert.match(
      source,
      /isVerticalLayout\s*\?\s*'vertical-page-shell mx-auto max-w-6xl'\s*:\s*'mx-auto max-w-6xl'/,
      'horizontal posts should use a single full-width body container',
    );
  });
});

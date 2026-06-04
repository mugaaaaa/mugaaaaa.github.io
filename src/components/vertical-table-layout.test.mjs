import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

describe('vertical article table layout', () => {
  it('keeps tables vertical inside vertical articles', async () => {
    const source = await readFile('src/styles/global.css', 'utf8');

    assert.doesNotMatch(
      source,
      /\.prose-content-vertical-page table,[\s\S]*?writing-mode:\s*horizontal-tb;/,
      'vertical article tables should not be part of the horizontal fallback group',
    );

    const tableRule = source.match(/\.prose-content-vertical-page table \{([\s\S]*?)\n\}/);
    assert.ok(tableRule, 'missing vertical article table rule');
    assert.match(tableRule[1], /display:\s*table;/);
    assert.match(tableRule[1], /writing-mode:\s*vertical-rl;/);
    assert.match(tableRule[1], /text-orientation:\s*mixed;/);
  });
});

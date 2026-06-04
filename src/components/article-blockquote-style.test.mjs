import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

describe('article blockquote style', () => {
  it('rounds the article blockquote render box', async () => {
    const source = await readFile('src/styles/global.css', 'utf8');
    const blockquoteRule = source.match(/\.prose-content blockquote \{([\s\S]*?)\n\}/);

    assert.ok(blockquoteRule, 'missing .prose-content blockquote rule');
    assert.match(
      blockquoteRule[1],
      /border-radius:\s*8px;/,
      'article blockquote boxes should have rounded corners',
    );
  });
});

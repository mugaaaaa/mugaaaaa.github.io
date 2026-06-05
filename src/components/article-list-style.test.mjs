import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

describe('article list style', () => {
  it('restores native markers for unordered and ordered article lists', async () => {
    const source = await readFile('src/styles/global.css', 'utf8');

    assert.match(
      source,
      /^\.prose-content ul \{\n\s*list-style-type:\s*disc;\n\}/m,
      'unordered article lists should render disc markers',
    );
    assert.match(
      source,
      /^\.prose-content ol \{\n\s*list-style-type:\s*decimal;\n\}/m,
      'ordered article lists should render decimal markers',
    );
  });
});

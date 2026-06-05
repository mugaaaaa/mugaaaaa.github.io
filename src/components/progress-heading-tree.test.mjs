import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

describe('article progress heading tree', () => {
  it('passes markdown heading depth through to ProgressGlass', async () => {
    const source = await readFile('src/components/pages/PostDetailPage.astro', 'utf8');

    assert.match(
      source,
      /depth:\s*heading\.depth/,
      'article progress sections should preserve markdown heading depth',
    );
    assert.doesNotMatch(
      source,
      /\.slice\(0,\s*5\)/,
      'article progress should not flatten the outline by truncating headings before rendering hierarchy',
    );
  });

  it('renders collapsible nested heading controls in ProgressGlass', async () => {
    const source = await readFile('src/components/ProgressGlass.tsx', 'utf8');

    assert.match(source, /depth\?:\s*number/, 'progress sections should support heading depth');
    assert.match(source, /collapsedIds/, 'progress outline should keep collapsed section state');
    assert.match(source, /aria-expanded/, 'collapse controls should expose expanded state');
    assert.match(source, /isHiddenByCollapsedParent/, 'nested headings should hide under collapsed parents');
  });

  it('keeps top-level progress items aligned with the same base left padding', async () => {
    const source = await readFile('src/components/ProgressGlass.tsx', 'utf8');

    assert.match(source, /baseIndent/, 'progress items should define a shared base indent');
    assert.doesNotMatch(
      source,
      /const indent = depth > 0 \?[\s\S]*?: undefined;/,
      'top-level progress items should not drop their left padding',
    );
  });
});

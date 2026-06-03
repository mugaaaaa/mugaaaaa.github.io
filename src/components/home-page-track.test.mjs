import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

describe('home page post track', () => {
  it('limits Latest Posts through an adjustable constant', async () => {
    const source = await readFile('src/components/pages/HomePage.astro', 'utf8');

    assert.match(
      source,
      /const latestPostsLimit = 8;/,
      'Latest Posts count should be controlled by one editable constant',
    );
    assert.match(
      source,
      /const latestPosts = allPosts\.slice\(0, latestPostsLimit\);/,
      'Latest Posts should use the configured limit',
    );
  });

  it('renders Latest Posts with the same horizontal track pattern as Volume', async () => {
    const source = await readFile('src/components/pages/HomePage.astro', 'utf8');
    const trackShellCount = [...source.matchAll(/data-home-track-shell/g)].length;

    assert.ok(trackShellCount >= 2, 'Volume and Latest Posts should both use home track shells');
    assert.match(source, /data-latest-posts-track/, 'Latest Posts should identify its track shell');
    assert.match(source, /data-home-track-rail/, 'Latest Posts should use the shared track rail hook');
    assert.match(source, /data-home-track-card/, 'Latest Posts cards should use the shared track card hook');
    assert.doesNotMatch(
      source,
      /<div class="grid gap-4 md:grid-cols-3">\s*\{\s*latestPosts\.map/,
      'Latest Posts should no longer render as a three-column grid',
    );
  });

  it('boots shared homepage interactions from a reusable module', async () => {
    const source = await readFile('src/components/pages/HomePage.astro', 'utf8');

    assert.match(
      source,
      /import \{ bindHomePageInteractions \} from '\.\.\/\.\.\/lib\/home-interactions\.js';/,
      'HomePage should import the shared interaction binder',
    );
    assert.match(
      source,
      /bindHomePageInteractions\(\);/,
      'HomePage should initialize shared track and anchor interactions',
    );
  });
});

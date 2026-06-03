import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  clampTrackScroll,
  getTrackScrollDistance,
  resolveSamePageHashTarget,
} from './home-interactions.js';

describe('homepage interaction helpers', () => {
  it('clamps track scroll targets inside the scrollable range', () => {
    assert.equal(clampTrackScroll(-20, 400), 0);
    assert.equal(clampTrackScroll(220, 400), 220);
    assert.equal(clampTrackScroll(520, 400), 400);
    assert.equal(clampTrackScroll(100, -1), 0);
  });

  it('calculates a page-sized horizontal track jump', () => {
    assert.equal(getTrackScrollDistance(240, 16, 3), 768);
    assert.equal(getTrackScrollDistance(240, 0, 2), 480);
    assert.equal(getTrackScrollDistance(0, 16, 3), 0);
  });

  it('recognizes only same-page hash links for URL-preserving anchor scroll', () => {
    const currentUrl = 'https://example.com/en/?theme=light';

    assert.equal(resolveSamePageHashTarget('/en/?theme=light#volume', currentUrl), '#volume');
    assert.equal(resolveSamePageHashTarget('#notes', currentUrl), '#notes');
    assert.equal(resolveSamePageHashTarget('/en/?theme=light#socials', currentUrl), '#socials');
    assert.equal(resolveSamePageHashTarget('/en/#volume', currentUrl), '#volume');
    assert.equal(resolveSamePageHashTarget('/posts/#volume', currentUrl), null);
    assert.equal(resolveSamePageHashTarget('https://other.example/en/?theme=light#volume', currentUrl), null);
    assert.equal(resolveSamePageHashTarget('/en/?theme=light', currentUrl), null);
  });
});

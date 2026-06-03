import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  getAdjacentHeroSlideIndex,
  getHeroNearestSlideIndex,
  getHeroPagerState,
  getHeroTrackScrollLeft,
  getHeroSwipeDirection,
  normalizeHeroSlideIndex,
} from './hero-carousel.js';

describe('hero carousel helpers', () => {
  it('keeps slide indexes inside the track range', () => {
    assert.equal(normalizeHeroSlideIndex(0, 4), 0);
    assert.equal(normalizeHeroSlideIndex(4, 4), 3);
    assert.equal(normalizeHeroSlideIndex(-1, 4), 0);
    assert.equal(getAdjacentHeroSlideIndex(3, 4, 1), 3);
    assert.equal(getAdjacentHeroSlideIndex(0, 4, -1), 0);
  });

  it('only treats deliberate horizontal swipes as slide changes', () => {
    assert.equal(getHeroSwipeDirection(-64, 44), 1);
    assert.equal(getHeroSwipeDirection(64, 44), -1);
    assert.equal(getHeroSwipeDirection(-20, 44), 0);
    assert.equal(getHeroSwipeDirection(20, 44), 0);
  });

  it('maps slide indexes to horizontal track positions', () => {
    assert.equal(getHeroTrackScrollLeft(0, 390), 0);
    assert.equal(getHeroTrackScrollLeft(2, 390), 780);
    assert.equal(getHeroTrackScrollLeft(-1, 390), 0);
    assert.equal(getHeroTrackScrollLeft(2, 0), 0);
  });

  it('selects the nearest slide from a natural track scroll position', () => {
    assert.equal(getHeroNearestSlideIndex(0, 390, 4), 0);
    assert.equal(getHeroNearestSlideIndex(194, 390, 4), 0);
    assert.equal(getHeroNearestSlideIndex(196, 390, 4), 1);
    assert.equal(getHeroNearestSlideIndex(1200, 390, 4), 3);
    assert.equal(getHeroNearestSlideIndex(-40, 390, 4), 0);
  });

  it('only shows direction controls when another slide exists that way', () => {
    assert.deepEqual(getHeroPagerState(0, 3), { canGoPrevious: false, canGoNext: true });
    assert.deepEqual(getHeroPagerState(1, 3), { canGoPrevious: true, canGoNext: true });
    assert.deepEqual(getHeroPagerState(2, 3), { canGoPrevious: true, canGoNext: false });
    assert.deepEqual(getHeroPagerState(0, 1), { canGoPrevious: false, canGoNext: false });
  });

});

const defaultSwipeThreshold = 44;

const HERO_CAROUSEL_SHOW_BUTTONS = false;

export function normalizeHeroSlideIndex(index, slideCount) {
  if (!Number.isFinite(index) || !Number.isFinite(slideCount) || slideCount < 1) {
    return 0;
  }

  return Math.min(slideCount - 1, Math.max(0, index));
}

export function getAdjacentHeroSlideIndex(currentIndex, slideCount, direction) {
  const step = direction < 0 ? -1 : 1;
  return normalizeHeroSlideIndex(currentIndex + step, slideCount);
}

export function getHeroSwipeDirection(deltaX, threshold = defaultSwipeThreshold) {
  if (Math.abs(deltaX) < threshold) {
    return 0;
  }

  return deltaX < 0 ? 1 : -1;
}

export function getHeroTrackScrollLeft(index, slideWidth) {
  if (!Number.isFinite(index) || !Number.isFinite(slideWidth) || slideWidth < 1) {
    return 0;
  }

  return Math.max(0, index) * slideWidth;
}

export function getHeroNearestSlideIndex(scrollLeft, slideWidth, slideCount) {
  if (
    !Number.isFinite(scrollLeft) ||
    !Number.isFinite(slideWidth) ||
    !Number.isFinite(slideCount) ||
    slideWidth < 1 ||
    slideCount < 1
  ) {
    return 0;
  }

  const nearestIndex = Math.round(scrollLeft / slideWidth);
  return Math.min(slideCount - 1, Math.max(0, nearestIndex));
}

export function getHeroPagerState(index, slideCount) {
  const normalizedIndex = normalizeHeroSlideIndex(index, slideCount);

  return {
    canGoPrevious: slideCount > 1 && normalizedIndex > 0,
    canGoNext: slideCount > 1 && normalizedIndex < slideCount - 1,
  };
}

export function bindHeroImageCarousel(root = document) {
  root.querySelectorAll('[data-hero-carousel]').forEach((carousel) => {
    if (carousel.dataset.heroCarouselReady === 'true') return;

    const track = carousel.querySelector('[data-hero-track]');
    const slides = Array.from(carousel.querySelectorAll('[data-hero-slide]'));
    const prevShell = carousel.querySelector('[data-hero-prev-shell]');
    const nextShell = carousel.querySelector('[data-hero-next-shell]');
    const prevButton = carousel.querySelector('[data-hero-prev]');
    const nextButton = carousel.querySelector('[data-hero-next]');

    if (!track || slides.length < 2 || !prevShell || !nextShell || !prevButton || !nextButton) return;

    carousel.dataset.heroCarouselReady = 'true';

    let currentIndex = Math.max(
      0,
      slides.findIndex((slide) => slide.dataset.active === 'true'),
    );
    let pointerStartX = null;
    let dragStartScrollLeft = 0;
    let dragStartIndex = currentIndex;
    let isDragging = false;
    let frame = 0;

    const getSlideWidth = () => track.clientWidth || carousel.clientWidth;

    const setPagerVisibility = () => {
      const { canGoPrevious, canGoNext } = getHeroPagerState(currentIndex, slides.length);

      if (!HERO_CAROUSEL_SHOW_BUTTONS) {
        prevShell.hidden = true;
        nextShell.hidden = true;
        prevButton.disabled = true;
        nextButton.disabled = true;
        prevButton.tabIndex = -1;
        nextButton.tabIndex = -1;
        return;
      }

      prevShell.hidden = !canGoPrevious;
      nextShell.hidden = !canGoNext;
      prevButton.disabled = !canGoPrevious;
      nextButton.disabled = !canGoNext;
      prevButton.tabIndex = canGoPrevious ? 0 : -1;
      nextButton.tabIndex = canGoNext ? 0 : -1;
    };

    const syncActiveSlide = (nextIndex) => {
      currentIndex = Math.min(slides.length - 1, Math.max(0, nextIndex));
      carousel.dataset.heroCarouselIndex = String(currentIndex);

      slides.forEach((slide, index) => {
        slide.dataset.active = index === currentIndex ? 'true' : 'false';
      });
      setPagerVisibility();
    };

    const setActiveSlide = (nextIndex, behavior = 'smooth') => {
      const normalizedIndex = normalizeHeroSlideIndex(nextIndex, slides.length);
      syncActiveSlide(normalizedIndex);

      track.scrollTo({
        left: getHeroTrackScrollLeft(normalizedIndex, getSlideWidth()),
        behavior,
      });
    };

    const goToAdjacentSlide = (direction) => {
      const nearestIndex = getHeroNearestSlideIndex(track.scrollLeft, getSlideWidth(), slides.length);
      setActiveSlide(getAdjacentHeroSlideIndex(nearestIndex, slides.length, direction));
    };

    const updateActiveFromTrack = () => {
      frame = 0;
      syncActiveSlide(getHeroNearestSlideIndex(track.scrollLeft, getSlideWidth(), slides.length));
    };

    const scheduleTrackUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveFromTrack);
    };

    prevButton.addEventListener('click', () => goToAdjacentSlide(-1));
    nextButton.addEventListener('click', () => goToAdjacentSlide(1));
    track.addEventListener('scroll', scheduleTrackUpdate, { passive: true });
    window.addEventListener('resize', () => setActiveSlide(currentIndex, 'auto'));

    carousel.addEventListener(
      'pointerdown',
      (event) => {
        if (event.target instanceof Element && event.target.closest('button, a')) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        pointerStartX = event.clientX;
        dragStartScrollLeft = track.scrollLeft;
        dragStartIndex = getHeroNearestSlideIndex(track.scrollLeft, getSlideWidth(), slides.length);
        isDragging = false;
        carousel.setPointerCapture?.(event.pointerId);
      },
      { passive: true },
    );

    carousel.addEventListener('pointermove', (event) => {
      if (pointerStartX === null) return;

      const deltaX = event.clientX - pointerStartX;
      if (Math.abs(deltaX) < 4 && !isDragging) return;

      isDragging = true;
      track.scrollLeft = dragStartScrollLeft - deltaX;
      event.preventDefault();
    });

    carousel.addEventListener(
      'pointerup',
      (event) => {
        if (pointerStartX === null) return;

        const direction = getHeroSwipeDirection(event.clientX - pointerStartX);
        const nearestIndex = getHeroNearestSlideIndex(track.scrollLeft, getSlideWidth(), slides.length);
        pointerStartX = null;
        carousel.releasePointerCapture?.(event.pointerId);

        if (!isDragging) return;

        if (nearestIndex === dragStartIndex && direction) {
          setActiveSlide(getAdjacentHeroSlideIndex(dragStartIndex, slides.length, direction));
        } else {
          setActiveSlide(nearestIndex);
        }
      }
    );

    carousel.addEventListener(
      'pointercancel',
      (event) => {
        pointerStartX = null;
        isDragging = false;
        carousel.releasePointerCapture?.(event.pointerId);
      },
      { passive: true },
    );

    setActiveSlide(currentIndex, 'auto');
  });
}

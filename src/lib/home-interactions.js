const defaultTrackCardsPerPage = 3;
const scrollTolerance = 2;

export function clampTrackScroll(value, max) {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max < 0) {
    return 0;
  }

  return Math.min(max, Math.max(0, value));
}

export function getTrackScrollDistance(cardWidth, gap, cardsPerPage = defaultTrackCardsPerPage) {
  if (
    !Number.isFinite(cardWidth) ||
    !Number.isFinite(gap) ||
    !Number.isFinite(cardsPerPage) ||
    cardWidth < 1 ||
    cardsPerPage < 1
  ) {
    return 0;
  }

  return (cardWidth + Math.max(0, gap)) * Math.floor(cardsPerPage);
}

export function resolveSamePageHashTarget(href, currentUrl) {
  if (!href || !currentUrl) return null;

  try {
    const targetUrl = new URL(href, currentUrl);
    const baseUrl = new URL(currentUrl);

    if (!targetUrl.hash || targetUrl.hash === '#') return null;
    if (targetUrl.origin !== baseUrl.origin || targetUrl.pathname !== baseUrl.pathname) return null;

    return targetUrl.hash;
  } catch {
    return null;
  }
}

const setPagerVisibility = (glass, button, isVisible) => {
  if (!glass || !button) return;

  glass.hidden = !isVisible;
  button.disabled = !isVisible;
  button.tabIndex = isVisible ? 0 : -1;
};

const getRailScrollDistance = (rail, cardsPerPage) => {
  const card = rail.querySelector('[data-home-track-card]');
  if (!card) return rail.clientWidth;

  const railStyle = window.getComputedStyle(rail);
  const gap = parseFloat(railStyle.columnGap || railStyle.gap || '0') || 0;

  return getTrackScrollDistance(card.getBoundingClientRect().width, gap, cardsPerPage) || rail.clientWidth;
};

const scrollByCards = (rail, direction, cardsPerPage) => {
  const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
  const target = clampTrackScroll(
    rail.scrollLeft + getRailScrollDistance(rail, cardsPerPage) * direction,
    maxScrollLeft,
  );

  rail.scrollTo({ left: target, behavior: 'smooth' });
};

export function bindHomeTrackPagination(root = document) {
  root.querySelectorAll('[data-home-track-shell]').forEach((shell) => {
    if (shell.dataset.homeTrackReady === 'true') return;

    const rail = shell.querySelector('[data-home-track-rail]');
    const prevGlass = shell.querySelector('[data-home-track-prev]');
    const nextGlass = shell.querySelector('[data-home-track-next]');
    const prevButton = prevGlass?.querySelector('button');
    const nextButton = nextGlass?.querySelector('button');
    const cardsPerPage = Number(shell.dataset.homeTrackCardsPerPage) || defaultTrackCardsPerPage;

    if (!rail || !prevGlass || !nextGlass || !prevButton || !nextButton) return;

    shell.dataset.homeTrackReady = 'true';

    let frame = 0;
    const updatePagerVisibility = () => {
      frame = 0;
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      setPagerVisibility(prevGlass, prevButton, rail.scrollLeft > scrollTolerance);
      setPagerVisibility(nextGlass, nextButton, rail.scrollLeft < maxScrollLeft - scrollTolerance);
    };

    const scheduleVisibilityUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updatePagerVisibility);
    };

    prevButton.addEventListener('click', () => scrollByCards(rail, -1, cardsPerPage));
    nextButton.addEventListener('click', () => scrollByCards(rail, 1, cardsPerPage));
    rail.addEventListener('scroll', scheduleVisibilityUpdate, { passive: true });
    window.addEventListener('resize', scheduleVisibilityUpdate);

    updatePagerVisibility();
  });
}

export function bindSamePageAnchorNavigation(root = document) {
  root.querySelectorAll('a[href]').forEach((anchor) => {
    if (anchor.dataset.homeAnchorReady === 'true') return;

    const hash = resolveSamePageHashTarget(anchor.getAttribute('href'), window.location.href);
    if (!hash) return;

    anchor.dataset.homeAnchorReady = 'true';
    anchor.addEventListener('click', (event) => {
      const targetId = decodeURIComponent(hash.slice(1));
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

export function bindHomePageInteractions(root = document) {
  bindHomeTrackPagination(root);
  bindSamePageAnchorNavigation(root);
}

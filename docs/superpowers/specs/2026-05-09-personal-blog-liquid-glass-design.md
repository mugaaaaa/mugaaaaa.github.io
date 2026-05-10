# Personal Blog Liquid Glass Design

## Goal

Create a first-pass personal blog in Astro, React, and Tailwind. The page should feel editorial and sharp, with a high-impact Touhou hero image, bold typography, flat content sections, and floating controls rendered with the Liquid Glass component from `../liquid-glass`.

## Structure

The site is a single home page for now. Astro owns the static page, Tailwind owns layout and styling, and React is limited to the floating glass overlay so the refraction effect can measure and render in the browser.

## Visual Direction

The hero uses a full-width image with oversized black-and-white typography over it. Content below the hero stays flat: simple grids, thin borders, squared cards, and clear hierarchy. The only glass surfaces are the floating navigation, status badge, and small action widgets layered above the hero and content.

## Assets

Touhou images are copied from `/Users/mugaaaaa/Documents/pictures/touhou` into `public/images/touhou`. Wide images are used for hero and section imagery; portrait images are used as character cards.

## Verification

Run `npm run build` for Astro compilation and start the dev server for visual browser verification. The liquid refraction is Chromium-oriented; non-Chromium browsers fall back to blur.

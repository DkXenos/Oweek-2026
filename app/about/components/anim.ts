import type { Variants } from "motion/react";

/**
 * Shared entrance variants for the about page.
 *
 * Everything here animates transform and opacity only — no filters, no blend
 * modes, no full-viewport layers. Entrances are one-shot, so they cost nothing
 * once they've played.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Rises into place. The workhorse. */
export const fadeUp = (delay: number, y = 40): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  },
});

/** Settles in from a slightly larger scale — good for wide backdrop art. */
export const fadeScale = (delay: number, from = 1.04): Variants => ({
  hidden: { opacity: 0, scale: from },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay, ease: EASE_OUT },
  },
});

/** Slides in horizontally — for the pillars pinned to each edge. */
export const slideX = (delay: number, from: number): Variants => ({
  hidden: { opacity: 0, x: from },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  },
});

/** Drops from above with a little overshoot — for the hanging balloons. */
export const dropIn = (delay: number, y = -90): Variants => ({
  hidden: { opacity: 0, y, rotate: 0 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 110, damping: 12, delay },
  },
});

/**
 * Spins in fast and decelerates into place, like a wheel that's been given a
 * shove. EASE_OUT is heavily front-loaded, so most of the 300° is covered in
 * the first third of the duration and it coasts to a near-stop — which is what
 * lets the slow idle spin pick up afterwards without a visible seam.
 */
export const spinIn = (delay: number, from = -300): Variants => ({
  hidden: { opacity: 0, scale: 0.7, rotate: from },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.6, delay, ease: EASE_OUT },
  },
});

/** Springy pop — for the ring and the mascots themselves. */
export const popIn = (delay: number, from = 0.82): Variants => ({
  hidden: { opacity: 0, scale: from },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 16, delay },
  },
});

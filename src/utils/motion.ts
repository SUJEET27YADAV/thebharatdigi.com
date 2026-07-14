export const easeOut = [0.23, 1, 0.32, 1] as const;
export const easeInOut = [0.77, 0, 0.175, 1] as const;
export const spring = { type: "spring" as const, duration: 0.5, bounce: 0.15 };

export function viewFade(
  reduced: boolean | null,
  duration = 0.4,
  margin?: string,
) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, ...(margin ? { margin } : {}) },
    transition: { duration, ease: easeOut },
  };
}

export function viewFadeLeft(
  reduced: boolean | null,
  duration = 0.5,
  margin?: string,
) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, ...(margin ? { margin } : {}) },
    transition: { duration, ease: easeOut },
  };
}

export function viewFadeRight(
  reduced: boolean | null,
  duration = 0.5,
  margin?: string,
) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, ...(margin ? { margin } : {}) },
    transition: { duration, ease: easeOut },
  };
}

export function viewScale(
  reduced: boolean | null,
  duration = 0.4,
  margin?: string,
) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, ...(margin ? { margin } : {}) },
    transition: { duration, ease: easeOut },
  };
}

export function enterFade(reduced: boolean | null, duration = 0.5) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, ease: easeOut },
  };
}

export function staggerDelay(
  reduced: boolean | null,
  index: number,
  step = 0.06,
) {
  return reduced ? 0 : index * step;
}

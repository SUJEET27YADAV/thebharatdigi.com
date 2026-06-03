export const easeOut = [0.23, 1, 0.32, 1] as const;

export function viewFade(
  reduced: boolean | null,
  duration = 0.22,
  margin?: string,
) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, ...(margin ? { margin } : {}) },
    transition: { duration, ease: easeOut },
  };
}

export function enterFade(reduced: boolean | null, duration = 0.25) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, ease: easeOut },
  };
}

export function staggerDelay(
  reduced: boolean | null,
  index: number,
  step = 0.04,
) {
  return reduced ? 0 : index * step;
}

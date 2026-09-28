import { useCallback, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './hooks';
/**
 * Autoplay for a strip of frames, scoped to one section:
 * - runs only while the section is on screen;
 * - any interaction (hover, tap, arrow, video) holds it;
 * - the hold lasts until the section fully leaves the viewport — coming back
 *   re-arms autoplay. Reduced motion: never runs.
 */
export function useSectionAutoplay(ref, total, stepMs) {
  const calm = usePrefersReducedMotion();
  const [at, setAt] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (!e.isIntersecting) setHeld(false);
    });
    io.observe(node);
    return () => io.disconnect();
  }, [ref]);
  const running = !calm && !held && visible && total > 1;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setAt(i => (i + 1) % total), stepMs);
    return () => window.clearInterval(id);
  }, [running, total, stepMs]);
  /* Keep the index valid when the number of stops changes (resize). */
  useEffect(() => {
    setAt(i => Math.min(i, Math.max(0, total - 1)));
  }, [total]);
  const hold = useCallback(() => setHeld(true), []);
  const go = useCallback(i => {
    setHeld(true);
    setAt(Math.max(0, Math.min(total - 1, i)));
  }, [total]);
  return {
    at,
    go,
    hold,
    running
  };
}

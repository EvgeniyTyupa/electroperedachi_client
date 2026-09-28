import { useEffect, useState } from 'react';
/** Scale factor (≤ 1) that fits a fixed-width drawing into its container. */
export function useFitScale(ref, naturalWidth) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / naturalWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, naturalWidth]);
  return scale;
}

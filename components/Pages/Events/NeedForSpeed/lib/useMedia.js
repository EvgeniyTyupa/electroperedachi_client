import { useEffect, useState } from 'react';
export function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}
/** Desktop layout (Figma "03 · Landing · 1440") from 1024px up. */
export const DESKTOP_QUERY = '(min-width: 1024px)';
export const useIsDesktop = () => useMedia(DESKTOP_QUERY);

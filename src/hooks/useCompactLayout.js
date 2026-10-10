import { useSyncExternalStore } from 'react';

// Matches the existing section reflow boundary, including phone landscape.
export const COMPACT_QUERY = '(max-width: 899px), (max-width: 1023px) and (max-height: 500px)';
const read = () => window.matchMedia(COMPACT_QUERY).matches;
const subscribe = notify => {
  const media = window.matchMedia(COMPACT_QUERY);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
export default function useCompactLayout() {
  return useSyncExternalStore(subscribe, read, () => false);
}

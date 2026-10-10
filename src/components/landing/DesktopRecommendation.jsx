import { useState } from 'react';
import { LuX } from 'react-icons/lu';
import './desktop-recommendation.css';

const DISMISSED_KEY = 'portfolio:desktop-recommendation:dismissed';

export default function DesktopRecommendation({ compact, active, introPhase, returnFocusRef }) {
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISSED_KEY) === 'true'; }
    catch { return false; }
  });
  const [eligible, setEligible] = useState(active);
  // Landing stays mounted between sections. Retire this visit's notice as soon
  // as navigation starts, even if the visitor leaves before the intro finishes.
  if (!active && eligible) setEligible(false);

  if (!compact || !active || !eligible || dismissed || introPhase !== 'complete') return null;

  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISSED_KEY, 'true'); }
    catch { /* Dismissal still works when browser storage is unavailable. */ }
    returnFocusRef.current?.focus({ preventScroll: true });
  };

  return (
    <aside className="desktop-recommendation" aria-labelledby="desktop-recommendation-title">
      <div>
        <h2 id="desktop-recommendation-title">A bigger screen. A fuller experience.</h2>
        <p>This portfolio has enhanced visuals and animations on desktop. You can explore everything here on mobile, too.</p>
      </div>
      <button type="button" onClick={dismiss} aria-label="Dismiss desktop recommendation"><LuX aria-hidden="true" /></button>
    </aside>
  );
}

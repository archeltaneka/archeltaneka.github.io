import { useId } from 'react';
import useCompactLayout from '../../hooks/useCompactLayout';

// Fixed seeds keep the water stable across renders and menu selection changes.
const BUBBLES = Array.from({ length: 10 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  size: `${4 + (index * 7) % 12}px`,
  duration: `${11 + (index * 3) % 10}s`,
  delay: `${-((index * 7) % 19)}s`,
  drift: `${(index % 2 ? 1 : -1) * (28 + index * 3)}px`,
  sway: `${2.8 + (index % 5) * .4}s`,
}));

export function UnderwaterBackground() {
  const reflectionId = useId();
  const compact = useCompactLayout();
  return (
    <div className="landing-environment" aria-hidden="true">
      <div className="environment-light" />
      <div className="water-rays" />
      <svg className="water-surface" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
        <defs>
          <pattern id={reflectionId} width="440" height="130" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <path d="M-40 36Q35 6 105 34T255 30T465 34M-55 80Q10 48 86 76T256 75T480 72M55 130Q140 90 230 115T410 105" />
            <path d="M55 34Q95 56 86 76M255 30Q290 50 256 75M355 30Q310 0 300-20M230 115Q208 93 200 83" />
          </pattern>
        </defs>
        <rect width="1440" height="320" fill={`url(#${reflectionId})`} />
      </svg>
      <div className="water-bubbles">
        {(compact ? BUBBLES.slice(0, 3) : BUBBLES).map((bubble, index) => <i key={index} className="water-bubble" style={{ '--bubble-left': bubble.left, '--bubble-size': bubble.size, '--bubble-duration': bubble.duration, '--bubble-delay': bubble.delay, '--bubble-drift': bubble.drift, '--bubble-sway': bubble.sway }} />)}
      </div>
    </div>
  );
}

export default function UnderwaterScene() {
  return <>
    <UnderwaterBackground />
    <div className="character-backdrop" aria-hidden="true" />
  </>;
}

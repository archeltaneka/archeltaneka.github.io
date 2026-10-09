import { useEffect, useRef, useState } from 'react';
import { about } from '../../data/about';
import './buoyant-identity.css';

function FloatingPhrase({ children, index, disabled }) {
  const text = useRef(null);
  const impulse = useRef(null);
  useEffect(() => {
    if (disabled) impulse.current?.cancel();
    return () => impulse.current?.cancel();
  }, [disabled]);

  const push = event => {
    if (disabled || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const dx = (bounds.left + bounds.width / 2 - event.clientX) / (bounds.width / 2);
    const dy = (bounds.top + bounds.height / 2 - event.clientY) / (bounds.height / 2);
    const length = Math.hypot(dx, dy) || 1;
    const x = dx / length * 48;
    const y = (length === 1 && !dx && !dy ? -1 : dy / length) * 32;
    const current = new DOMMatrixReadOnly(getComputedStyle(text.current).transform);
    const angle = Math.atan2(current.b, current.a) * 180 / Math.PI;
    impulse.current?.cancel();
    // Sample a damped spring once. The browser runs the transform animation;
    // no per-frame JavaScript or React updates are needed.
    const frames = Array.from({ length: 49 }, (_, step) => {
      const t = step / 48;
      const decay = Math.exp(-5 * t);
      const wave = Math.sin(12 * t) * decay;
      const residual = Math.cos(12 * t) * decay;
      return { transform: step === 48 ? 'translate(0px, 0px) rotate(0deg)' :
        `translate(${current.e * residual + x * wave}px, ${current.f * residual + y * wave}px) rotate(${angle * residual + x * wave * .09}deg)` };
    });
    impulse.current = text.current.animate(frames, { duration: 1600, easing: 'linear' });
  };

  return <span className="buoyant-zone" style={{ '--phrase': index }} onPointerEnter={push}>
    <span className="buoyant-drift"><span ref={text} className="buoyant-text">{children}</span></span>
  </span>;
}

export default function BuoyantIdentity({ compact, paused }) {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(preference.matches);
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  const disabled = compact || paused || reduced;
  return <header className="landing-identity" data-buoyancy={disabled ? 'off' : 'on'}>
    <h1 className={compact ? undefined : 'sr-only'}>{about.name.join(' ')}</h1>
    <p className="landing-role"><FloatingPhrase index={0} disabled={disabled}><span className="role-product">Product</span>{' '}Data Scientist</FloatingPhrase></p>
    <p className="landing-specialization">{['Experimentation', 'Causal inference', 'Product ML'].map((phrase, index) =>
      <FloatingPhrase key={phrase} index={index + 1} disabled={disabled}>{phrase}</FloatingPhrase>)}</p>
  </header>;
}

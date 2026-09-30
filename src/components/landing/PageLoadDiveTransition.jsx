import { useEffect } from 'react';
import './page-load-dive.css';
import { LANDING_MOTION, LANDING_MOTION_STYLE } from './landing-motion';

// Original contours, authored for this transition. No reference media is shipped.
const SHEET = 'M-500-700H2100V20C1870-55 1740 180 1550 95C1450 55 1500 270 1350 250C1250 235 1340 400 1180 355C1050 295 1175 590 995 498C920 460 964 577 1012 574C942 721 848 522 795 652C740 795 808 852 661 756C531 671 574 470 470 535C320 590 430 365 285 380C140 390 210 185 65 235C-130 300-170 110-500 200Z';
const OPENING = 'M675 430C692 370 750 395 775 350C820 290 875 352 925 330C1000 300 972 408 1030 432C1095 475 1020 507 1050 558C1080 620 990 608 978 670C955 730 890 674 851 715C800 760 774 671 720 689C655 715 678 625 622 609C550 586 624 530 605 480C590 434 650 471 675 430Z';
const DROPS = [
  [34, 31, -46, -49, 23, 120], [61, 27, 36, -43, 13, 170],
  [70, 49, 55, 10, 26, 210], [29, 61, -49, 39, 16, 150],
  [48, 73, -10, 51, 32, 240], [55, 42, 31, -55, 11, 290],
  [39, 48, -56, -12, 18, 250], [65, 66, 46, 49, 15, 180],
  [45, 24, -24, -54, 10, 310], [77, 37, 49, -24, 19, 330],
  [22, 42, -45, -35, 12, 350], [57, 59, 20, 59, 21, 280],
];

export default function PageLoadDiveTransition({ onReveal, onSettle, onComplete }) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => onComplete();
    const handlePreference = () => { if (preference.matches) finish(); };
    const handleVisibility = () => { if (document.hidden) finish(); };
    // Start deadlines with the first rendered frame, not before initial paint.
    // One frame callback, no animation loop; deadlines match page-dive-clear.
    let handoff;
    let settling;
    let completion;
    const firstFrame = window.requestAnimationFrame(() => {
      handoff = window.setTimeout(onReveal, LANDING_MOTION.reveal);
      settling = window.setTimeout(onSettle, LANDING_MOTION.settle);
      completion = window.setTimeout(finish, LANDING_MOTION.complete);
    });
    preference.addEventListener('change', handlePreference);
    document.addEventListener('visibilitychange', handleVisibility);
    for (const event of ['pointerdown', 'keydown', 'focusin']) document.addEventListener(event, finish, true);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearTimeout(handoff);
      window.clearTimeout(settling);
      window.clearTimeout(completion);
      preference.removeEventListener('change', handlePreference);
      document.removeEventListener('visibilitychange', handleVisibility);
      for (const event of ['pointerdown', 'keydown', 'focusin']) document.removeEventListener(event, finish, true);
    };
  }, [onReveal, onSettle, onComplete]);

  return (
    <div className="page-load-dive" style={LANDING_MOTION_STYLE} aria-hidden="true">
      <svg className="page-dive-water" viewBox="0 0 1600 1000" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="entry-water-depth" x1="350" y1="0" x2="1100" y2="1000" gradientUnits="userSpaceOnUse">
            <stop stopColor="#057fd6" /><stop offset=".45" stopColor="#0948dc" /><stop offset="1" stopColor="#082979" />
          </linearGradient>
          <mask id="entry-water-clear" maskUnits="userSpaceOnUse" x="-800" y="-600" width="3200" height="2200">
            <rect x="-800" y="-600" width="3200" height="2200" fill="white" />
            <path className="page-dive-opening" d={OPENING} fill="black" />
          </mask>
        </defs>
        <g mask="url(#entry-water-clear)">
          <path fill="#020918" d="M-800-600H2400V1600H-800Z" />
          <g className="page-dive-sheet page-dive-sheet--far">
            <path d={SHEET} fill="#087acb" stroke="#37dce9" strokeWidth="48" strokeLinejoin="round" />
          </g>
          <g transform="translate(1600 1000) rotate(180)">
            <g className="page-dive-sheet page-dive-sheet--counter">
              <path d={SHEET} fill="#0745bd" stroke="#27bce4" strokeWidth="54" strokeLinejoin="round" />
            </g>
          </g>
          <g className="page-dive-sheet page-dive-sheet--near">
            <path d={SHEET} fill="url(#entry-water-depth)"  />
            <path fill="#bafaff" d="M120-20C175 70 103 125 208 165C300 200 226 253 302 293C334 310 318 350 298 362C235 317 246 265 194 251C120 229 176 168 116 137C59 108 90 22 120-20ZM552-90C665 5 545 121 642 202C743 285 635 335 717 429C755 470 744 571 792 614C683 587 715 522 659 478C590 423 672 350 603 312C506 259 604 173 551 123C491 68 551-12 552-90ZM1080-80C1135 12 1065 100 1149 144C1205 171 1129 210 1152 268C1174 323 1134 340 1111 336C1133 278 1077 251 1097 200C1124 129 1051 141 1046 71C1039 3 1090-20 1080-80Z" />
          </g>
          <rect className="page-dive-submerged" x="-800" y="-600" width="3200" height="2200" fill="url(#entry-water-depth)" />
        </g>
        <path className="page-dive-opening page-dive-lip" d={OPENING} stroke="#52d9ed" strokeWidth="9" />
      </svg>
      <div className="page-dive-spray">
        {DROPS.map(([x, y, dx, dy, size, delay], index) => (
          <svg key={index} className="page-dive-drop" viewBox="0 0 40 52" style={{
            '--x': `${x}%`, '--y': `${y}%`, '--dx': `${dx}vw`, '--dy': `${dy}vh`,
            '--size': `${size}px`, '--delay': `${delay}ms`,
          }}>
            <path d="M18 3C28-2 36 12 33 20C30 26 41 31 34 42C30 52 18 47 14 43C3 45 0 32 6 24C10 18 4 9 18 3Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

import useCompactLayout from '../../hooks/useCompactLayout';
import { useEffect } from 'react';
import './page-load-dive.css';
import { LANDING_MOTION, LANDING_MOTION_STYLE, COMPACT_LANDING_MOTION, COMPACT_LANDING_STYLE } from './landing-motion';

// Original contours, authored for this transition. No reference media is shipped.
// A broad descending volume, with unequal shoulders and a narrow trailing tongue.
const SHEET = 'M-440-700H2100V-80C1880-40 1770 92 1630 130C1510 162 1518 298 1402 328C1280 360 1360 462 1240 508C1132 549 1180 675 1057 702C979 722 1040 855 923 918C836 966 889 1120 752 1190C709 1027 613 1061 598 924C582 794 447 881 449 727C454 610 333 688 290 578C244 460 119 524 129 391C141 279-40 340-100 214C-165 80-338 161-440 70Z';
// The reveal is a rising asymmetric channel, not a circular iris.
const OPENING = 'M675 1290C573 1183 596 1063 641 991C704 896 620 845 702 751C743 703 715 657 770 607C796 582 783 543 815 504C826 570 893 568 883 648C871 735 966 711 959 800C947 892 1062 907 1089 1014C1110 1090 1165 1180 1100 1290Z';
const FOAM_LEFT = 'M-200-300H625C592-139 541-88 548 22C554 67 510 68 520 106C526 132 482 128 490 153C496 170 516 166 508 182C526 239 472 260 500 321C523 373 484 408 535 470C572 518 543 578 598 652C631 698 606 738 660 799C581 765 580 701 535 682C475 658 483 600 440 578C384 550 430 507 385 477C334 441 299 481 247 449C198 420 141 450 111 396C79 336 131 284 182 280C217 278 204 230 250 208C290 189 315 229 343 201C371 168 340 129 369 94C401 48 354 23 376-26C413-120 275-146 198-154L-200-120Z';
const FOAM_CENTER = 'M645-340H1040C1048-185 1002-100 941-29C908 9 916 39 950 45C987 51 1012 88 983 117C961 141 941 119 925 148C951 180 918 216 886 205C867 217 900 231 875 254C838 309 905 331 923 383C945 447 916 466 944 536C970 600 931 646 949 710C961 766 929 854 910 881C872 829 900 774 861 730C846 767 852 803 830 836C808 782 825 702 794 652C758 594 791 550 758 491C722 428 749 395 698 355C671 333 665 304 682 276C639 302 650 347 619 387C590 422 610 481 572 519C593 427 551 399 574 341C610 251 568 201 605 145C638 95 591 65 620 12C653-51 613-101 645-340Z';
const FOAM_RIGHT = 'M1320-320H1910V180C1807 151 1761 247 1660 228C1594 215 1587 254 1522 213C1499 197 1486 228 1458 208C1442 198 1450 180 1434 185C1419 189 1410 192 1414 174C1378 116 1328 150 1331 214C1336 314 1268 302 1260 382C1256 460 1202 468 1195 541C1186 608 1155 610 1150 689C1146 761 1098 801 1073 879C1061 811 1100 749 1094 701C1087 644 1131 605 1124 549C1115 480 1177 455 1178 403C1178 356 1225 329 1224 288C1219 221 1280 202 1267 143C1252 78 1308 49 1288-9C1264-81 1346-155 1320-320Z';
const FOAM_LOWER = 'M-150 870C-182 812-98 758-49 792C-12 817 15 765 53 798C89 742 148 783 153 816C185 782 232 811 222 845C249 861 284 844 301 875C320 909 279 926 301 952C339 994 387 970 405 1022C429 1093 330 1110 306 1067C276 1019 246 1054 216 1026C184 1000 207 972 167 966C124 960 106 1008 64 984C32 964 54 935 18 942C-38 953-39 1007-103 975C-169 944-120 907-150 870ZM1210 1100C1189 1063 1235 1028 1267 1034C1233 992 1272 958 1303 970C1280 930 1323 899 1354 923C1345 870 1406 856 1430 886C1451 854 1490 877 1490 909C1526 889 1568 922 1553 958C1588 973 1560 1018 1531 1010C1539 1044 1486 1064 1467 1044C1448 1082 1410 1061 1403 1095C1396 1141 1330 1163 1302 1130C1265 1157 1236 1126 1210 1100Z';
const DROPS = [
  [34, 31, -46, -49, 23, 120], [61, 27, 36, -43, 13, 170],
  [70, 49, 55, 10, 26, 210], [29, 61, -49, 39, 16, 150],
  [48, 73, -10, 51, 32, 240], [55, 42, 31, -55, 11, 290],
  [39, 48, -56, -12, 18, 250], [65, 66, 46, 49, 15, 180],
  [45, 24, -24, -54, 10, 310], [77, 37, 49, -24, 19, 330],
  [22, 42, -45, -35, 12, 350], [57, 59, 20, 59, 21, 280],
];

export default function PageLoadDiveTransition({ onReveal, onSettle, onComplete }) {
  const compact = useCompactLayout();
  useEffect(() => {
    const timing = compact ? COMPACT_LANDING_MOTION : LANDING_MOTION;
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
      handoff = window.setTimeout(onReveal, timing.reveal);
      settling = window.setTimeout(onSettle, timing.settle);
      completion = window.setTimeout(finish, timing.complete);
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
  }, [onReveal, onSettle, onComplete, compact]);

  return (
    <div className="page-load-dive" data-compact={compact} style={compact ? COMPACT_LANDING_STYLE : LANDING_MOTION_STYLE} aria-hidden="true">
      <svg className="page-dive-water" viewBox="0 0 1600 1000" preserveAspectRatio="none" fill="none" focusable="false">
        <defs>
          <linearGradient id="entry-water-depth" x1="600" y1="0" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
            <stop stopColor="#05cfe9" /><stop offset=".32" stopColor="#086be1" /><stop offset=".75" stopColor="#123dc9" /><stop offset="1" stopColor="#102c9b" />
          </linearGradient>
          <mask id="entry-water-clear" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1000">
            <rect x="0" y="0" width="1600" height="1000" fill="white" />
            <path className="page-dive-opening" d={OPENING} fill="black" />
          </mask>
        </defs>
        <g className="page-dive-volume">
          <g className="page-dive-sheet page-dive-sheet--far">
            <path d={SHEET} fill="#103cc5" />
          </g>
          <g className="page-dive-sheet page-dive-sheet--near">
            <path d={SHEET} fill="url(#entry-water-depth)" />
            <path d="M-100-240H1850V-30C1610 66 1480 23 1290 116C1110 191 1102 95 956 159C825 218 827 135 717 207C582 291 603 143 479 219C310 320 272 197 138 231L-100 124Z" fill="#0be0ef" />
            <path d="M160 260C355 170 413 451 528 382C649 309 670 586 811 543C1009 484 1136 319 1451 245C1320 375 1280 547 1111 653C981 735 1010 908 831 1037C691 864 629 868 582 703C472 740 473 526 341 568C269 591 257 381 160 260Z" fill="#1236c0" opacity=".5" />
          </g>
          <rect className="page-dive-submerged" x="0" y="0" width="1600" height="1000" fill="url(#entry-water-depth)" />
          <g className="page-dive-foam page-dive-foam--left"><path d={FOAM_LEFT} fill="#9eeffa" /></g>
          <g className="page-dive-foam page-dive-foam--center"><path d={FOAM_CENTER} fill="#b2f3fb" />
            <path d="M811 105C837 80 855 112 839 134C826 154 849 171 831 190C803 184 817 157 801 148C789 137 794 118 811 105Z" fill="#53d9ed" opacity=".72" />
            <path d="M698-30C672 94 722 144 684 222C662 264 685 297 674 329C732 263 704 218 742 173C777 120 728 89 754 23L782-30Z" fill="#e5fcff" />
          </g>
          <g className="page-dive-foam page-dive-foam--right"><path d={FOAM_RIGHT} fill="#9deff9" /></g>
          <g className="page-dive-foam page-dive-foam--lower"><path d={FOAM_LOWER} fill="#a8f5fc" /></g>
          <g className="page-dive-fragments" fill="#aaf4fc">
            <path d="M306 417C288 393 319 367 337 381C353 365 375 389 366 406C386 424 364 450 346 438C329 458 301 444 306 417ZM1030 204C1008 176 1033 158 1056 170C1081 159 1103 190 1080 209C1086 233 1055 246 1045 225C1026 233 1015 215 1030 204ZM1379 603C1351 586 1360 553 1387 561C1406 540 1436 565 1425 587C1444 602 1425 628 1407 618C1394 638 1370 625 1379 603ZM487 706C468 686 487 665 506 674C529 661 549 686 531 704C539 726 516 741 500 722C486 735 471 719 487 706Z" />
            <path d="M288 487C274 468 249 480 255 499C262 518 288 516 291 502M1310 699C1288 675 1261 701 1276 724C1288 741 1315 729 1310 710" fill="none" stroke="#bff8ff" strokeWidth="8" strokeLinecap="round" />
          </g>
          <g className="page-dive-contours" stroke="#65e8f7" strokeWidth="5" strokeLinecap="round">
            <path d="M398 95C363 192 427 214 407 301M1008 80C1041 127 963 163 983 209M1350 340C1284 418 1318 453 1253 515" />
            <path d="M360 574C338 554 319 572 325 596C331 628 367 614 360 591M1224 692C1193 664 1160 705 1186 732C1207 749 1233 728 1224 713M1370 508C1344 486 1321 521 1339 545" />
          </g>
        </g>
      </svg>
      <div className="page-dive-spray">
        {(compact ? DROPS.slice(0, 3) : DROPS).map(([x, y, dx, dy, size, delay], index) => (
          <svg focusable="false" key={index} className="page-dive-drop" viewBox="0 0 40 52" style={{
            '--x': `${x}%`, '--y': `${y}%`, '--dx': `${dx}vw`, '--dy': `${dy}vh`,
            '--size': `${size}px`, '--delay': `${delay}ms`,
          }}>
            <path d={index % 3 === 0
              ? 'M29 42C17 49 2 34 7 22C12 7 28 6 32 20C35 29 29 34 22 29'
              : index % 3 === 1 ? 'M18 3C28-2 36 12 33 20C30 26 41 31 34 42C30 52 18 47 14 43C3 45 0 32 6 24C10 18 4 9 18 3Z'
                : 'M9 7C24 0 33 13 29 22C25 31 33 36 22 45C14 49 4 37 8 29C14 20 1 15 9 7Z'} />
          </svg>
        ))}
      </div>
    </div>
  );
}

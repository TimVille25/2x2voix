import { useEffect, useRef } from 'react';

// ── Geometry constants ────────────────────────────────────────
const SPRING_Y   = 210;   // px from arch-scene top where arch meets columns
const ARCH_RATIO = 0.54;  // arch height ÷ half-span (taller = more Gothic)
const COL_W      = 24;    // pier/column width (px)
const RING_THICK = 26;    // arch ring thickness at crown (px)
const NOTE_BELOW = 64;    // px from scene bottom for piano notes

// Voussoir division lines at these angles (degrees from vertical)
const VOUSSOIR_DEG = [15, 30, 45, 60, 75];

function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
function n(x) { return x.toFixed(2); }            // SVG number format
function rad(deg) { return deg * Math.PI / 180; }

// ── Piano notes (five quarter notes, melodic arch shape) ──────
const NOTES = [
  { dx: -64, dy: 10 },
  { dx: -32, dy:  2 },
  { dx:   0, dy: -8 },
  { dx:  32, dy:  2 },
  { dx:  64, dy: 10 },
];

export default function ArchDraw() {
  const outerLRef  = useRef(null);
  const outerRRef  = useRef(null);
  const innerLRef  = useRef(null);
  const innerRRef  = useRef(null);
  const detailsRef = useRef(null);
  const notesRef   = useRef(null);

  useEffect(() => {
    const el = outerLRef.current;
    if (!el) return;

    let lens = {};

    function remeasure() {
      const scene = el.closest('.arch-scene');
      const about = document.getElementById('quatuor');
      if (!scene || !about) return;

      const sr = scene.getBoundingClientRect();
      const ar = about.getBoundingClientRect();
      const h  = scene.offsetHeight;

      // Column outer / inner faces
      const olx = ar.left  - sr.left + 8;   // outer left  x
      const orx = ar.right - sr.left - 8;   // outer right x
      const ilx = olx + COL_W;              // inner left  x
      const irx = orx - COL_W;              // inner right x
      const cx  = (olx + orx) / 2;          // horizontal center

      // Ellipse radii – both arches share center (cx, SPRING_Y)
      const ORX = (orx - olx) / 2;
      const ORY = ORX * ARCH_RATIO;
      const IRX = ORX - COL_W;
      const IRY = ORY - RING_THICK;

      // Crown y values (top of each arch ring face)
      const oCy = SPRING_Y - ORY;   // outer (extrados) crown
      const iCy = SPRING_Y - IRY;   // inner (intrados) crown

      const by  = h - NOTE_BELOW - 14;  // pillar bottom

      // ── Four main paths: arch half + pillar, each from its crown ──
      // Outer arcs use sweep 0 (CCW) for left, 1 (CW) for right
      // Inner arcs mirror
      outerLRef.current?.setAttribute('d',
        `M ${n(cx)} ${n(oCy)} A ${n(ORX)} ${n(ORY)} 0 0 0 ${n(olx)} ${SPRING_Y} L ${n(olx)} ${n(by)}`
      );
      outerRRef.current?.setAttribute('d',
        `M ${n(cx)} ${n(oCy)} A ${n(ORX)} ${n(ORY)} 0 0 1 ${n(orx)} ${SPRING_Y} L ${n(orx)} ${n(by)}`
      );
      innerLRef.current?.setAttribute('d',
        `M ${n(cx)} ${n(iCy)} A ${n(IRX)} ${n(IRY)} 0 0 0 ${n(ilx)} ${SPRING_Y} L ${n(ilx)} ${n(by)}`
      );
      innerRRef.current?.setAttribute('d',
        `M ${n(cx)} ${n(iCy)} A ${n(IRX)} ${n(IRY)} 0 0 1 ${n(irx)} ${SPRING_Y} L ${n(irx)} ${n(by)}`
      );

      // ── Details: voussoirs + keystone + capitals + bases ──────────

      // Voussoir lines: radiate from center (cx, SPRING_Y), crossing ring
      const voussoirs = VOUSSOIR_DEG.map(deg => {
        const t = rad(deg);
        const sin = Math.sin(t), cos = Math.cos(t);
        const oL = [cx - ORX * sin, SPRING_Y - ORY * cos];
        const iL = [cx - IRX * sin, SPRING_Y - IRY * cos];
        const oR = [cx + ORX * sin, SPRING_Y - ORY * cos];
        const iR = [cx + IRX * sin, SPRING_Y - IRY * cos];
        return `M ${n(oL[0])} ${n(oL[1])} L ${n(iL[0])} ${n(iL[1])} M ${n(oR[0])} ${n(oR[1])} L ${n(iR[0])} ${n(iR[1])}`;
      }).join(' ');

      // Keystone: diamond between the two crown points
      const km = (oCy + iCy) / 2;
      const ks = 5.5;  // half-width of keystone diamond
      const keystone = [
        `M ${n(cx)} ${n(oCy - 7)} L ${n(cx - ks)} ${n(km)} L ${n(cx)} ${n(iCy + 7)} L ${n(cx + ks)} ${n(km)} Z`,
        // Horizontal serifs at the keystone tip
        `M ${n(cx - 9)} ${n(oCy - 1)} L ${n(cx + 9)} ${n(oCy - 1)}`,
      ].join(' ');

      // Capital (impost) lines at spring points — top and lower band
      const capitals = [
        `M ${n(olx - 3)} ${SPRING_Y} L ${n(ilx + 3)} ${SPRING_Y}`,
        `M ${n(olx - 1)} ${SPRING_Y + 6} L ${n(ilx + 1)} ${SPRING_Y + 6}`,
        `M ${n(irx - 3)} ${SPRING_Y} L ${n(orx + 3)} ${SPRING_Y}`,
        `M ${n(irx - 1)} ${SPRING_Y + 6} L ${n(orx + 1)} ${SPRING_Y + 6}`,
      ].join(' ');

      // Base plates at pillar bottoms — two horizontal bands
      const bases = [
        `M ${n(olx - 5)} ${n(by)} L ${n(ilx + 5)} ${n(by)}`,
        `M ${n(olx - 3)} ${n(by + 6)} L ${n(ilx + 3)} ${n(by + 6)}`,
        `M ${n(irx - 5)} ${n(by)} L ${n(orx + 5)} ${n(by)}`,
        `M ${n(irx - 3)} ${n(by + 6)} L ${n(orx + 3)} ${n(by + 6)}`,
      ].join(' ');

      detailsRef.current?.setAttribute('d', [voussoirs, keystone, capitals, bases].join(' '));
      notesRef.current?.setAttribute('transform', `translate(${n(cx)},${n(h - NOTE_BELOW)})`);

      // Cache total lengths for dashoffset animation
      for (const [k, ref] of [['oL', outerLRef], ['oR', outerRRef], ['iL', innerLRef], ['iR', innerRRef]]) {
        if (!ref.current) continue;
        const len = ref.current.getTotalLength();
        lens[k] = len;
        ref.current.style.strokeDasharray  = `${len}`;
        ref.current.style.strokeDashoffset = `${len}`;
      }
    }

    function tick() {
      const scene = el.closest('.arch-scene');
      if (!scene || !lens.oL) return;

      const rect = scene.getBoundingClientRect();
      // progress: 0 when About enters viewport bottom, 1 when Agenda leaves
      const p = clamp((-rect.top + window.innerHeight * 0.75) / scene.offsetHeight, 0, 1);

      // Phase 1 (0 → 75%): arch + pillars draw from crown downward
      const ap = clamp(p / 0.75, 0, 1);
      for (const [k, ref] of [['oL', outerLRef], ['oR', outerRRef], ['iL', innerLRef], ['iR', innerRRef]]) {
        if (ref.current && lens[k]) {
          ref.current.style.strokeDashoffset = `${lens[k] * (1 - ap)}`;
        }
      }

      // Phase 2 (30 → 68%): architectural details materialize
      const dp = clamp((p - 0.30) / 0.38, 0, 1);
      if (detailsRef.current) detailsRef.current.style.opacity = `${dp}`;

      // Phase 3 (82 → 100%): piano notes appear
      const np = clamp((p - 0.82) / 0.18, 0, 1);
      if (notesRef.current) notesRef.current.style.opacity = `${np}`;
    }

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      remeasure();
      for (const ref of [outerLRef, outerRRef, innerLRef, innerRRef]) {
        if (ref.current) ref.current.style.strokeDashoffset = '0';
      }
      if (detailsRef.current) detailsRef.current.style.opacity = '1';
      if (notesRef.current)   notesRef.current.style.opacity   = '1';
      return;
    }

    const onResize = () => { remeasure(); tick(); };
    remeasure();
    tick();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', tick, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', tick);
    };
  }, []);

  return (
    <svg className="arch-draw" aria-hidden="true">
      {/* Four main drawing paths — each starts at its own crown */}
      <path ref={outerLRef}  className="arch-draw__line" />
      <path ref={outerRRef}  className="arch-draw__line" />
      <path ref={innerLRef}  className="arch-draw__line" />
      <path ref={innerRRef}  className="arch-draw__line" />
      {/* Architectural details — voussoirs, keystone, capitals, bases */}
      <path ref={detailsRef} className="arch-draw__detail" opacity="0" />
      {/* Piano notes separator */}
      <g ref={notesRef} className="arch-draw__notes" opacity="0">
        {NOTES.map(({ dx, dy }, i) => (
          <g key={i} transform={`translate(${dx},${dy})`}>
            <ellipse cx="0" cy="0" rx="5" ry="3.8" transform="rotate(-18,0,0)" />
            <line x1="4.6" y1="-0.5" x2="4.6" y2="-20" />
          </g>
        ))}
      </g>
    </svg>
  );
}

import { useEffect, useRef } from 'react';

// ── Arch geometry constants ───────────────────────────────────
const SPRING_Y   = 210;   // px from arch-scene top where arch meets columns
const ARCH_RATIO = 0.54;  // ORY / ORX — arch height-to-half-span ratio
const COL_W      = 24;    // pier/column face width
const RING_THICK = 26;    // arch ring thickness (outer ry − inner ry)
const LM_PROJ    = 18;    // label mold (dripstone) projection beyond outer arch
const TY_RATIO   = 0.42;  // tympanum span as fraction of inner arch half-span
const NOTE_BELOW = 64;    // px from scene bottom for piano notes

// Voussoir joint lines at these angles from vertical (7 per half = 14 total)
const VOUSSOIR_DEG = [10, 21, 32, 43, 54, 65, 75];

function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
function n(x)   { return x.toFixed(2); }
function rad(d) { return d * Math.PI / 180; }

// Circle as SVG path (two 180° clockwise arcs, avoids degenerate arc)
function circle(cx, cy, r) {
  return `M ${n(cx - r)} ${n(cy)} A ${n(r)} ${n(r)} 0 0 1 ${n(cx + r)} ${n(cy)} A ${n(r)} ${n(r)} 0 0 1 ${n(cx - r)} ${n(cy)}`;
}

const NOTES = [
  { dx: -64, dy: 10 }, { dx: -32, dy: 2 }, { dx: 0, dy: -8 },
  { dx: 32,  dy:  2 }, { dx:  64, dy: 10 },
];

export default function ArchDraw() {
  const outerLRef  = useRef(null);
  const outerRRef  = useRef(null);
  const innerLRef  = useRef(null);
  const innerRRef  = useRef(null);
  const labelLRef  = useRef(null);
  const labelRRef  = useRef(null);
  const detailsRef = useRef(null);
  const ornamRef   = useRef(null);
  const notesRef   = useRef(null);

  useEffect(() => {
    const el = outerLRef.current;
    if (!el) return;

    let lens = {};

    function remeasure() {
      const scene = el.closest('.arch-scene');
      const about = document.getElementById('quatuor');
      if (!scene || !about) return;

      const sr  = scene.getBoundingClientRect();
      const ar  = about.getBoundingClientRect();
      const h   = scene.offsetHeight;

      // ── Column geometry ───────────────────────────────────────
      const olx = ar.left  - sr.left + 8;   // outer left face x
      const orx = ar.right - sr.left - 8;   // outer right face x
      const ilx = olx + COL_W;              // inner left face x
      const irx = orx - COL_W;              // inner right face x
      const cx  = (olx + orx) / 2;          // arch horizontal center

      // ── Arch ellipse radii (shared center: cx, SPRING_Y) ─────
      const ORX = (orx - olx) / 2;
      const ORY = ORX * ARCH_RATIO;
      const IRX = ORX - COL_W;
      const IRY = ORY - RING_THICK;

      // Crown y for each arch face
      const oCy = SPRING_Y - ORY;   // outer (extrados) crown
      const iCy = SPRING_Y - IRY;   // inner (intrados) crown
      const by  = h - NOTE_BELOW - 14;   // pillar bottom y

      // ── Label mold (dripstone / hood mold) ────────────────────
      // Third and outermost archivolt, with characteristic drop + stop
      const LM_ORX = ORX + LM_PROJ;
      const LM_ORY = ORY + LM_PROJ * (ORY / ORX);
      const lmCy   = SPRING_Y - LM_ORY;
      const lmLx   = cx - LM_ORX;
      const lmRx   = cx + LM_ORX;
      const DROP   = 20;    // vertical drop at label stop
      const STOP   = 15;    // horizontal return length

      // Each label mold path is one continuous stroke: arc → drop → stop → serif
      labelLRef.current?.setAttribute('d', [
        `M ${n(cx)} ${n(lmCy)}`,
        `A ${n(LM_ORX)} ${n(LM_ORY)} 0 0 0 ${n(lmLx)} ${SPRING_Y}`,
        `L ${n(lmLx)} ${n(SPRING_Y + DROP)}`,
        `L ${n(lmLx + STOP)} ${n(SPRING_Y + DROP)}`,
        `L ${n(lmLx + STOP)} ${n(SPRING_Y + DROP - 6)}`,
        `L ${n(lmLx + STOP)} ${n(SPRING_Y + DROP + 6)}`,
      ].join(' '));
      labelRRef.current?.setAttribute('d', [
        `M ${n(cx)} ${n(lmCy)}`,
        `A ${n(LM_ORX)} ${n(LM_ORY)} 0 0 1 ${n(lmRx)} ${SPRING_Y}`,
        `L ${n(lmRx)} ${n(SPRING_Y + DROP)}`,
        `L ${n(lmRx - STOP)} ${n(SPRING_Y + DROP)}`,
        `L ${n(lmRx - STOP)} ${n(SPRING_Y + DROP - 6)}`,
        `L ${n(lmRx - STOP)} ${n(SPRING_Y + DROP + 6)}`,
      ].join(' '));

      // ── Main arch + pillar paths (crown → arc → pillar) ───────
      outerLRef.current?.setAttribute('d',
        `M ${n(cx)} ${n(oCy)} A ${n(ORX)} ${n(ORY)} 0 0 0 ${n(olx)} ${SPRING_Y} L ${n(olx)} ${n(by)}`);
      outerRRef.current?.setAttribute('d',
        `M ${n(cx)} ${n(oCy)} A ${n(ORX)} ${n(ORY)} 0 0 1 ${n(orx)} ${SPRING_Y} L ${n(orx)} ${n(by)}`);
      innerLRef.current?.setAttribute('d',
        `M ${n(cx)} ${n(iCy)} A ${n(IRX)} ${n(IRY)} 0 0 0 ${n(ilx)} ${SPRING_Y} L ${n(ilx)} ${n(by)}`);
      innerRRef.current?.setAttribute('d',
        `M ${n(cx)} ${n(iCy)} A ${n(IRX)} ${n(IRY)} 0 0 1 ${n(irx)} ${SPRING_Y} L ${n(irx)} ${n(by)}`);

      // ── Architectural details (fade in) ───────────────────────

      // Voussoir joint lines — radiate from (cx, SPRING_Y) through ring
      const voussoirs = VOUSSOIR_DEG.flatMap(deg => {
        const t = rad(deg), s = Math.sin(t), c = Math.cos(t);
        return [
          `M ${n(cx - ORX*s)} ${n(SPRING_Y - ORY*c)} L ${n(cx - IRX*s)} ${n(SPRING_Y - IRY*c)}`,
          `M ${n(cx + ORX*s)} ${n(SPRING_Y - ORY*c)} L ${n(cx + IRX*s)} ${n(SPRING_Y - IRY*c)}`,
        ];
      }).join(' ');

      // Keystone: elongated diamond with crown serif and internal scoring
      const km  = (oCy + iCy) / 2;
      const kW  = 6.5;
      const kH1 = oCy - 10;  // tip above outer crown
      const kH2 = iCy + 10;  // tip below inner crown
      const keystone = [
        // Diamond outline (closed = slight fill from arch-draw__detail)
        `M ${n(cx)} ${n(kH1)} L ${n(cx - kW)} ${n(km)} L ${n(cx)} ${n(kH2)} L ${n(cx + kW)} ${n(km)} Z`,
        // Crown horizontal serif (resting on the label mold line)
        `M ${n(cx - 12)} ${n(oCy - 2)} L ${n(cx + 12)} ${n(oCy - 2)}`,
        // Two scoring lines subdividing the keystone vertically
        `M ${n(cx - kW * 0.55)} ${n(km - 9)} L ${n(cx + kW * 0.55)} ${n(km - 9)}`,
        `M ${n(cx - kW * 0.55)} ${n(km + 9)} L ${n(cx + kW * 0.55)} ${n(km + 9)}`,
      ].join(' ');

      // Column capitals (impost) — 3-band stepped profile
      const caps = [
        `M ${n(olx - 5)} ${SPRING_Y}       L ${n(ilx + 5)} ${SPRING_Y}`,
        `M ${n(olx - 3)} ${SPRING_Y + 5}   L ${n(ilx + 3)} ${SPRING_Y + 5}`,
        `M ${n(olx - 1)} ${SPRING_Y + 10}  L ${n(ilx + 1)} ${SPRING_Y + 10}`,
        `M ${n(irx - 5)} ${SPRING_Y}       L ${n(orx + 5)} ${SPRING_Y}`,
        `M ${n(irx - 3)} ${SPRING_Y + 5}   L ${n(orx + 3)} ${SPRING_Y + 5}`,
        `M ${n(irx - 1)} ${SPRING_Y + 10}  L ${n(orx + 1)} ${SPRING_Y + 10}`,
      ].join(' ');

      // Column base plates — stepped profile
      const bases = [
        `M ${n(olx - 6)} ${n(by)}     L ${n(ilx + 6)} ${n(by)}`,
        `M ${n(olx - 4)} ${n(by + 5)} L ${n(ilx + 4)} ${n(by + 5)}`,
        `M ${n(irx - 6)} ${n(by)}     L ${n(orx + 6)} ${n(by)}`,
        `M ${n(irx - 4)} ${n(by + 5)} L ${n(orx + 4)} ${n(by + 5)}`,
      ].join(' ');

      detailsRef.current?.setAttribute('d', [voussoirs, keystone, caps, bases].join(' '));

      // ── Ornaments (fade in later) ─────────────────────────────
      const ornParts = [];

      // Tympanum: two-center pointed arch (lancet) inside the inner arch
      const TY_SPAN  = IRX * TY_RATIO;
      const TY_APX_Y = SPRING_Y - TY_SPAN * Math.sqrt(3) / 2;

      if (TY_APX_Y > iCy + 8) {
        // Pointed arch baseline at SPRING_Y; two arcs meeting at apex
        ornParts.push([
          `M ${n(cx - TY_SPAN)} ${SPRING_Y}`,
          `A ${n(TY_SPAN)} ${n(TY_SPAN)} 0 0 1 ${n(cx)} ${n(TY_APX_Y)}`,
          `A ${n(TY_SPAN)} ${n(TY_SPAN)} 0 0 1 ${n(cx + TY_SPAN)} ${SPRING_Y}`,
        ].join(' '));

        // Oculus — round window in the space between tympanum apex and inner crown
        const ocCy  = (TY_APX_Y + iCy) / 2;
        const maxR  = Math.min(20, (TY_APX_Y - iCy) / 2 - 4, TY_SPAN * 0.3);
        if (maxR > 7) {
          const oR  = maxR;
          const oR2 = oR * 0.50;
          ornParts.push(circle(cx, ocCy, oR));
          ornParts.push(circle(cx, ocCy, oR2));
          // 6 spokes of the wheel tracery
          for (let i = 0; i < 6; i++) {
            const a = rad(i * 60);
            ornParts.push(
              `M ${n(cx + oR2 * Math.cos(a))} ${n(ocCy + oR2 * Math.sin(a))}` +
              ` L ${n(cx + oR  * Math.cos(a))} ${n(ocCy + oR  * Math.sin(a))}`
            );
          }
        }
      }

      // Shaft rings — two banding rings per column at 1/3 and 2/3 of pillar height
      const r1y = SPRING_Y + (by - SPRING_Y) * 0.33;
      const r2y = SPRING_Y + (by - SPRING_Y) * 0.66;
      for (const [xa, xb] of [[olx, ilx], [irx, orx]]) {
        for (const ry of [r1y, r2y]) {
          ornParts.push(`M ${n(xa - 3)} ${n(ry)} L ${n(xb + 3)} ${n(ry)}`);
          ornParts.push(`M ${n(xa - 3)} ${n(ry + 5)} L ${n(xb + 3)} ${n(ry + 5)}`);
        }
      }

      ornamRef.current?.setAttribute('d', ornParts.join(' '));

      // Piano notes group position
      notesRef.current?.setAttribute('transform', `translate(${n(cx)},${n(h - NOTE_BELOW)})`);

      // Cache total path lengths; initialise fully hidden
      const animated = [
        ['oL', outerLRef], ['oR', outerRRef],
        ['iL', innerLRef], ['iR', innerRRef],
        ['lL', labelLRef], ['lR', labelRRef],
      ];
      for (const [k, ref] of animated) {
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
      const p    = clamp((-rect.top + window.innerHeight * 0.75) / scene.offsetHeight, 0, 1);

      // All 6 arch + pillar strokes draw simultaneously from their crowns
      const ap = clamp(p / 0.82, 0, 1);
      for (const [k, ref] of [
        ['oL', outerLRef], ['oR', outerRRef],
        ['iL', innerLRef], ['iR', innerRRef],
        ['lL', labelLRef], ['lR', labelRRef],
      ]) {
        if (ref.current && lens[k])
          ref.current.style.strokeDashoffset = `${lens[k] * (1 - ap)}`;
      }

      // Voussoirs, keystone, capitals, bases materialise mid-scroll
      if (detailsRef.current)
        detailsRef.current.style.opacity = `${clamp((p - 0.28) / 0.38, 0, 1)}`;

      // Tympanum, oculus, shaft rings appear a little later
      if (ornamRef.current)
        ornamRef.current.style.opacity = `${clamp((p - 0.46) / 0.34, 0, 1)}`;

      // Piano notes at the very end
      if (notesRef.current)
        notesRef.current.style.opacity = `${clamp((p - 0.85) / 0.15, 0, 1)}`;
    }

    // Prefers-reduced-motion: reveal everything at once
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      remeasure();
      for (const ref of [outerLRef, outerRRef, innerLRef, innerRRef, labelLRef, labelRRef])
        if (ref.current) ref.current.style.strokeDashoffset = '0';
      for (const ref of [detailsRef, ornamRef, notesRef])
        if (ref.current) ref.current.style.opacity = '1';
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
      {/* Label mold — outermost archivolt with characteristic drop & stop */}
      <path ref={labelLRef} className="arch-draw__line arch-draw__line--lm" />
      <path ref={labelRRef} className="arch-draw__line arch-draw__line--lm" />
      {/* Outer arch (extrados) + left/right pillars */}
      <path ref={outerLRef} className="arch-draw__line" />
      <path ref={outerRRef} className="arch-draw__line" />
      {/* Inner arch (intrados) + left/right pillars */}
      <path ref={innerLRef} className="arch-draw__line" />
      <path ref={innerRRef} className="arch-draw__line" />
      {/* Voussoir joints, keystone diamond, stepped capitals & bases */}
      <path ref={detailsRef} className="arch-draw__detail" opacity="0" />
      {/* Tympanum pointed arch, oculus wheel tracery, shaft rings */}
      <path ref={ornamRef}   className="arch-draw__ornament" opacity="0" />
      {/* Piano notes separator (Agenda → Répertoire) */}
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

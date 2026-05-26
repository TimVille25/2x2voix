import { useEffect, useRef } from 'react';
import archSvgRaw from '../assets/arche.svg?raw';

const NOTES = [
  { dx: -64, dy: 10 }, { dx: -32, dy: 2 }, { dx: 0, dy: -8 },
  { dx: 32,  dy:  2 }, { dx:  64, dy: 10 },
];
const NOTE_BELOW = 64;

function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

// Reverse an SVG path's `d` so its M point is the original end. Supports the
// subset used in arche.svg: absolute M / L / Q. Returns input unchanged for
// any path containing an unsupported command.
function reversePathD(d) {
  const tokens = d.match(/[MLQmlq]|-?\d*\.?\d+(?:e-?\d+)?/g);
  if (!tokens) return d;
  const anchors = [];
  const segs = [];
  let i = 0;
  let cmd = null;
  while (i < tokens.length) {
    const t = tokens[i];
    if (/^[MLQmlq]$/.test(t)) { cmd = t.toUpperCase(); i++; continue; }
    if (cmd === 'M') {
      anchors.push([+tokens[i], +tokens[i + 1]]);
      i += 2;
      cmd = 'L';
    } else if (cmd === 'L') {
      anchors.push([+tokens[i], +tokens[i + 1]]);
      segs.push({ type: 'L' });
      i += 2;
    } else if (cmd === 'Q') {
      const ctrl = [+tokens[i], +tokens[i + 1]];
      anchors.push([+tokens[i + 2], +tokens[i + 3]]);
      segs.push({ type: 'Q', ctrl });
      i += 4;
    } else {
      return d;
    }
  }
  if (anchors.length < 2) return d;
  const last = anchors[anchors.length - 1];
  let out = `M${last[0]},${last[1]}`;
  for (let j = segs.length - 1; j >= 0; j--) {
    const prev = anchors[j];
    if (segs[j].type === 'L') {
      out += ` L${prev[0]},${prev[1]}`;
    } else {
      out += ` Q${segs[j].ctrl[0]},${segs[j].ctrl[1]} ${prev[0]},${prev[1]}`;
    }
  }
  return out;
}

export default function ArchDraw() {
  const containerRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector('svg');
    if (!svg) return;

    // Let the SVG scale into the arch-scene; preserve the arch's proportions
    // and anchor it to the top so the apex sits above About.
    svg.setAttribute('preserveAspectRatio', 'xMidYMin meet');
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('class', 'arch-draw__svg');

    // Architectural strokes (arches + pillars + base): top-level group, NOT the
    // clipped tympanum group. We draw these progressively with stroke-dashoffset.
    const archGroup = svg.querySelector('g[stroke-width="1.6"]');
    const tympGroup = svg.querySelector('g[clip-path="url(#tymp)"]');

    const archEls = archGroup
      ? Array.from(archGroup.children).filter(el => {
          const tag = el.tagName.toLowerCase();
          return tag === 'path' || tag === 'line';
        })
      : [];

    // Flip the direction of any element that currently draws bottom→top so
    // the whole arch renders from the apex downward. Paths in arche.svg start
    // at the pillar base; <line> elements there already go top→bottom.
    for (const el of archEls) {
      if (el.tagName.toLowerCase() === 'path') {
        const d = el.getAttribute('d');
        if (d) el.setAttribute('d', reversePathD(d));
      }
    }

    const lens = [];
    for (const el of archEls) {
      const len = el.getTotalLength();
      lens.push(len);
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    }

    if (tympGroup) {
      tympGroup.style.opacity = '0';
      tympGroup.style.transition = 'opacity 0.6s ease-out';
    }

    function tick() {
      const scene = container.closest('.arch-scene');
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const p = clamp((-rect.top + window.innerHeight) / scene.offsetHeight, 0, 1);

      // Architectural outline draws over the first ~45% of scroll progress.
      const ap = clamp(p / 0.45, 0, 1);
      for (let i = 0; i < archEls.length; i++) {
        archEls[i].style.strokeDashoffset = `${lens[i] * (1 - ap)}`;
      }

      // Tympanum tracery fades in once the outline is mostly drawn.
      if (tympGroup) {
        tympGroup.style.opacity = `${clamp((p - 0.40) / 0.30, 0, 1)}`;
      }

      if (notesRef.current) {
        notesRef.current.style.opacity = `${clamp((p - 0.78) / 0.18, 0, 1)}`;
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (const el of archEls) el.style.strokeDashoffset = '0';
      if (tympGroup) tympGroup.style.opacity = '1';
      if (notesRef.current) notesRef.current.style.opacity = '1';
      return;
    }

    tick();
    const onScroll = () => tick();
    const onResize = () => tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="arch-draw" aria-hidden="true">
      <div
        ref={containerRef}
        className="arch-draw__inline"
        dangerouslySetInnerHTML={{ __html: archSvgRaw }}
      />
      <svg className="arch-draw__notes-svg">
        <g ref={notesRef} className="arch-draw__notes" opacity="0">
          {NOTES.map(({ dx, dy }, i) => (
            <g key={i} transform={`translate(${dx},${dy})`}>
              <ellipse cx="0" cy="0" rx="5" ry="3.8" transform="rotate(-18,0,0)" />
              <line x1="4.6" y1="-0.5" x2="4.6" y2="-20" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

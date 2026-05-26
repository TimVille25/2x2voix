import { useEffect, useRef } from 'react';
import archSvgRaw from '../assets/arche.svg?raw';

const NOTES = [
  { dx: -64, dy: 10 }, { dx: -32, dy: 2 }, { dx: 0, dy: -8 },
  { dx: 32,  dy:  2 }, { dx:  64, dy: 10 },
];
const NOTE_BELOW = 64;

function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

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

    const lens = [];
    for (const el of archEls) {
      const len = el.getTotalLength();
      lens.push(len);
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    }

    if (tympGroup) {
      tympGroup.style.opacity = '0';
      tympGroup.style.transition = 'opacity 0.2s ease-out';
    }

    function tick() {
      const scene = container.closest('.arch-scene');
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      // p = 0 quand le haut de la scène entre dans le viewport par le bas,
      // p = 1 après une hauteur d'écran de défilement dans la section.
      const p = clamp(-rect.top / window.innerHeight, 0, 1);

      // Architectural outline draws over the first 65% of scroll progress.
      const ap = clamp(p / 0.20, 0, 1);
      for (let i = 0; i < archEls.length; i++) {
        archEls[i].style.strokeDashoffset = `${lens[i] * (1 - ap)}`;
      }

      // Tympanum tracery fades in once the outline is mostly drawn.
      if (tympGroup) {
        tympGroup.style.opacity = `${clamp((p - 0.05) / 0.30, 0, 1)}`;
      }

      if (notesRef.current) {
        notesRef.current.style.opacity = `${clamp((p - 0.85) / 0.15, 0, 1)}`;
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

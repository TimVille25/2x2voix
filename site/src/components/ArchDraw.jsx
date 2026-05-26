import { useEffect, useRef } from 'react';
import archSvgRaw from '../assets/arche.svg?raw';

function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

export default function ArchDraw() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector('svg');
    if (!svg) return;

    // Le SVG se règle en hauteur (100 % de la section About) ; la largeur
    // est automatique selon le viewBox carré 680×680.
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

    // Les arches courbes (d contient Q) partent immédiatement.
    // Les piliers droits (lines + paths sans Q) démarrent plus tard.
    const PILLAR_DELAY = 0.75;
    const delays = archEls.map(el => {
      if (el.tagName.toLowerCase() === 'line') return PILLAR_DELAY;
      const d = el.getAttribute('d') || '';
      return d.includes('Q') ? 0 : PILLAR_DELAY;
    });

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
      const anchor = document.getElementById('quatuor');
      if (!anchor) return;
      const anchorRect = anchor.getBoundingClientRect();
      // p = 0 quand #quatuor est à 25 % du bas de l'écran (top = 75 % de innerHeight),
      // p = 1 quand #quatuor est à 90 % du bas de l'écran (top = 10 % de innerHeight).
      const p = clamp(
        (window.innerHeight * 0.75 - anchorRect.top) / (window.innerHeight * 0.65),
        0, 1
      );

      // Arches courbes : progression directe.
      // Piliers droits : démarrent après PILLAR_DELAY.
      for (let i = 0; i < archEls.length; i++) {
        const d = delays[i];
        const ep = d < 1 ? clamp((p - d) / (1 - d), 0, 1) : 0;
        archEls[i].style.strokeDashoffset = `${lens[i] * (1 - ep)}`;
      }

      // Remplissage du tympan apparaît dans la seconde moitié.
      if (tympGroup) {
        tympGroup.style.opacity = `${clamp((p - 0.55) / 0.35, 0, 1)}`;
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (const el of archEls) el.style.strokeDashoffset = '0';
      if (tympGroup) tympGroup.style.opacity = '1';
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
    </div>
  );
}

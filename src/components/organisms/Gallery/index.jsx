import { useState } from 'react';
import { GALLERY } from '../../../data.js';
import GalleryItem from '../../molecules/GalleryItem';
import Lightbox from '../../molecules/Lightbox';
import './style.css';

// Auto-discovers every photo dropped in assets/gallery/: no import or map
// entry needed per file, only the GALLERY entry in data.js.
const fullModules = import.meta.glob('../../../assets/gallery/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});
const thumbModules = import.meta.glob('../../../assets/gallery/*-thumb.webp', {
  eager: true,
  import: 'default',
});

const filename = (path) => path.split('/').pop();
const stripExt = (name) => name.replace(/\.[^.]+$/, '');

const FULL_MAP = Object.fromEntries(
  Object.entries(fullModules).map(([path, mod]) => [filename(path), mod])
);

const THUMB_MAP = Object.fromEntries(
  Object.keys(FULL_MAP)
    .map((file) => {
      const thumbPath = Object.keys(thumbModules).find(
        (path) => filename(path) === `${stripExt(file)}-thumb.webp`
      );
      return thumbPath ? [file, thumbModules[thumbPath]] : null;
    })
    .filter(Boolean)
);

const PHOTOS = GALLERY
  .map((g, i) => ({
    ...g,
    gridIdx: i,
    src: g.file ? THUMB_MAP[g.file] ?? null : null,
    fullSrc: g.file ? FULL_MAP[g.file] ?? null : null,
  }))
  .filter((g) => g.src !== null);

const Gallery = () => {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <section id="galerie" className="section bg-alt">
      <div className="section__inner">
        <h2 className="section__label">Galerie</h2>
        <div className="section__title">Quelques images.</div>
        <p className="section__lede">
          Concerts a cappella, répétitions et lieux traversés — le quatuor vocal 2x2 Voix dans les
          églises, cloîtres et salles de caractère qui l'ont accueilli.
        </p>
        <div className="gallery">
          {GALLERY.map((g, i) => {
            const src = g.file ? THUMB_MAP[g.file] ?? null : null;
            const photoIdx = src ? PHOTOS.findIndex((p) => p.gridIdx === i) : -1;
            return (
              <GalleryItem
                key={i}
                item={g}
                idx={i}
                src={src}
                onOpen={photoIdx >= 0 ? () => setLightboxIdx(photoIdx) : undefined}
              />
            );
          })}
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          src={PHOTOS[lightboxIdx].fullSrc}
          label={PHOTOS[lightboxIdx].label}
          index={lightboxIdx}
          total={PHOTOS.length}
          onClose={() => setLightboxIdx(null)}
          onPrev={lightboxIdx > 0 ? () => setLightboxIdx((i) => i - 1) : null}
          onNext={lightboxIdx < PHOTOS.length - 1 ? () => setLightboxIdx((i) => i + 1) : null}
        />
      )}
    </section>
  );
};

export default Gallery;

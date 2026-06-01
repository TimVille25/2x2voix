import { useState } from 'react';
import { GALLERY } from '../../../data.js';
import jardinThumb from '../../../assets/Jardin.webp';
import egliseThumb from '../../../assets/Visuel-eglise-sans-texte.webp';
import jardinFull from '../../../assets/Jardin.jpg';
import eglisFull from '../../../assets/Visuel-eglise-sans-texte.jpg';
import GalleryItem from '../../molecules/GalleryItem';
import Lightbox from '../../molecules/Lightbox';
import './style.css';

const THUMB_MAP = {
  'Jardin.jpg': jardinThumb,
  'Visuel-eglise-sans-texte.jpg': egliseThumb,
};

const FULL_MAP = {
  'Jardin.jpg': jardinFull,
  'Visuel-eglise-sans-texte.jpg': eglisFull,
};

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

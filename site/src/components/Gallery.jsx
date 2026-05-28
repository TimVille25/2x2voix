import { useState, useEffect, useCallback } from 'react';
import { GALLERY } from '../data.js';
import jardinImg from '../assets/Jardin.jpg';
import egliseImg from '../assets/Visuel-eglise-sans-texte.jpg';

const IMAGE_MAP = {
  'Jardin.jpg': jardinImg,
  'Visuel-eglise-sans-texte.jpg': egliseImg,
};

const PHOTOS = GALLERY.filter((g) => g.file);

const GRADIENTS = [
  'linear-gradient(135deg, #2C5242 0%, #5A8C78 100%)',
  'linear-gradient(160deg, #C4722A 0%, #7A3F18 100%)',
  'linear-gradient(135deg, #1C3228 0%, #2C5242 100%)',
  'linear-gradient(120deg, #5A4A2E 0%, #2C5242 100%)',
  'linear-gradient(150deg, #B85C1E 0%, #2C5242 100%)',
  'linear-gradient(135deg, #2C5242 0%, #1C3228 100%)',
];

const GalleryItem = ({ item, idx, onOpen }) => {
  const src = item.file ? IMAGE_MAP[item.file] : null;
  const photoIdx = src ? PHOTOS.indexOf(item) : -1;
  return (
    <div
      className={`gallery__item${item.layout === 'wide' ? ' gallery__item--wide' : ''}${item.layout === 'tall' ? ' gallery__item--tall' : ''}${src ? ' gallery__item--photo' : ''}`}
      style={src ? undefined : { background: GRADIENTS[idx % GRADIENTS.length] }}
      onClick={src ? () => onOpen(photoIdx) : undefined}
    >
      {src
        ? <img src={src} alt={item.label} className="gallery__img" />
        : <div className="gallery__placeholder">photo · {String(idx + 1).padStart(2, '0')}</div>
      }
      <div className="gallery__caption">{item.label}</div>
    </div>
  );
};

const Lightbox = ({ photoIdx, onClose, onPrev, onNext }) => {
  const item = PHOTOS[photoIdx];
  const src = IMAGE_MAP[item.file];
  const hasPrev = photoIdx > 0;
  const hasNext = photoIdx < PHOTOS.length - 1;

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    if (e.key === 'ArrowRight' && hasNext) onNext();
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.label}>
      <button className="lightbox__close" onClick={onClose} aria-label="Fermer">✕</button>

      {hasPrev && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Photo précédente"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <img
        src={src}
        alt={item.label}
        className="lightbox__img"
        onClick={(e) => e.stopPropagation()}
      />

      {hasNext && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Photo suivante"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="lightbox__caption">
        {item.label}
        {PHOTOS.length > 1 && (
          <span className="lightbox__counter"> · {photoIdx + 1} / {PHOTOS.length}</span>
        )}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [photoIdx, setPhotoIdx] = useState(null);

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
          {GALLERY.map((g, i) => (
            <GalleryItem key={i} item={g} idx={i} onOpen={setPhotoIdx} />
          ))}
        </div>
      </div>
      {photoIdx !== null && (
        <Lightbox
          photoIdx={photoIdx}
          onClose={() => setPhotoIdx(null)}
          onPrev={() => setPhotoIdx((i) => i - 1)}
          onNext={() => setPhotoIdx((i) => i + 1)}
        />
      )}
    </section>
  );
};

export default Gallery;

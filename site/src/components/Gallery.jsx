import { GALLERY } from '../data.js';

const GRADIENTS = [
  'linear-gradient(135deg, #2C5242 0%, #5A8C78 100%)',
  'linear-gradient(160deg, #C4722A 0%, #7A3F18 100%)',
  'linear-gradient(135deg, #1C3228 0%, #2C5242 100%)',
  'linear-gradient(120deg, #5A4A2E 0%, #2C5242 100%)',
  'linear-gradient(150deg, #B85C1E 0%, #2C5242 100%)',
  'linear-gradient(135deg, #2C5242 0%, #1C3228 100%)',
];

const GalleryItem = ({ item, idx }) => (
  <div
    className={`gallery__item${item.layout === 'wide' ? ' gallery__item--wide' : ''}${item.layout === 'tall' ? ' gallery__item--tall' : ''}`}
    style={{ background: GRADIENTS[idx % GRADIENTS.length] }}
  >
    <div className="gallery__placeholder">photo · {String(idx + 1).padStart(2, '0')}</div>
    <div className="gallery__caption">{item.label}</div>
  </div>
);

const Gallery = () => (
  <section id="galerie" className="section bg-alt">
    <div className="section__label">Galerie</div>
    <h2 className="section__title">Quelques images.</h2>
    <p className="section__lede">
      Répétitions, concerts, lieux qui nous ont accueillis. Les photos
      authentiques remplaceront ces placeholders dès la prochaine séance.
    </p>
    <div className="gallery">
      {GALLERY.map((g, i) => <GalleryItem key={i} item={g} idx={i} />)}
    </div>
  </section>
);

export default Gallery;

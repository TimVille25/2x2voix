import './style.css';

const GRADIENTS = [
  'linear-gradient(135deg, #2C5242 0%, #5A8C78 100%)',
  'linear-gradient(160deg, #C4722A 0%, #7A3F18 100%)',
  'linear-gradient(135deg, #1C3228 0%, #2C5242 100%)',
  'linear-gradient(120deg, #5A4A2E 0%, #2C5242 100%)',
  'linear-gradient(150deg, #B85C1E 0%, #2C5242 100%)',
  'linear-gradient(135deg, #2C5242 0%, #1C3228 100%)',
];

const GalleryItem = ({ item, idx, src, onOpen }) => {
  const classNames = [
    'gallery__item',
    item.layout === 'wide' && 'gallery__item--wide',
    item.layout === 'tall' && 'gallery__item--tall',
    src && 'gallery__item--photo',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      style={src ? undefined : { background: GRADIENTS[idx % GRADIENTS.length] }}
      onClick={src && onOpen ? onOpen : undefined}
    >
      {src
        ? <img src={src} alt={item.label} className="gallery__img" loading="lazy" decoding="async" />
        : <div className="gallery__placeholder">photo · {String(idx + 1).padStart(2, '0')}</div>
      }
      <div className="gallery__caption">{item.label}</div>
    </div>
  );
};

export default GalleryItem;

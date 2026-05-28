import Icon from '../../atoms/Icon';
import { formatTime } from '../../../utils/format';
import './style.css';

const Track = ({ track, isPlaying, onToggle, progress, duration }) => {
  const resolvedDuration = duration || track.duration;
  const progressPercent = resolvedDuration > 0
    ? Math.min(100, (progress / resolvedDuration) * 100)
    : 0;
  const unavailable = !track.file;

  return (
    <article className={`track ${isPlaying ? 'is-playing' : ''} ${unavailable ? 'track--unavailable' : ''}`}>
      <div className="track__head">
        <button
          className={`track__play ${isPlaying ? 'is-playing' : ''}`}
          onClick={unavailable ? undefined : onToggle}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
          disabled={unavailable}
          title={unavailable ? 'Fichier audio non disponible' : undefined}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={18} />
        </button>
        <div className="track__info">
          <div className="track__title">{track.title}</div>
          <div className="track__sub">{track.sub}</div>
        </div>
      </div>
      <div className="track__bar">
        <div className="track__bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="track__time">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(resolvedDuration)}</span>
      </div>
    </article>
  );
};

export default Track;

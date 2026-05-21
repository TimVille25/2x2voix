import { useState, useEffect, useRef } from 'react';
import { TRACKS } from '../data.js';
import Icon from './Icon.jsx';

const fmt = (s) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

const Track = ({ track, isPlaying, onToggle, progress }) => {
  const pct = Math.min(100, (progress / track.duration) * 100);
  return (
    <article className={`track ${isPlaying ? 'is-playing' : ''}`}>
      <div className="track__head">
        <button
          className={`track__play ${isPlaying ? 'is-playing' : ''}`}
          onClick={onToggle}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={18} />
        </button>
        <div className="track__info">
          <div className="track__title">{track.title}</div>
          <div className="track__sub">{track.sub}</div>
        </div>
      </div>
      <div className="track__bar">
        <div className="track__bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="track__time">
        <span>{fmt(progress)}</span>
        <span>{fmt(track.duration)}</span>
      </div>
    </article>
  );
};

const Listen = () => {
  const [playingIdx, setPlayingIdx] = useState(null);
  const [progress, setProgress] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    if (playingIdx === null) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setProgress(p => {
        const cur = p[playingIdx] || 0;
        const dur = TRACKS[playingIdx].duration;
        if (cur >= dur) {
          setPlayingIdx(null);
          return { ...p, [playingIdx]: 0 };
        }
        return { ...p, [playingIdx]: cur + 1 };
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [playingIdx]);

  const toggle = (i) => setPlayingIdx(cur => cur === i ? null : i);

  return (
    <section id="ecouter" className="section">
      <div className="section__label">Écouter</div>
      <h2 className="section__title">Quelques extraits.</h2>
      <p className="section__lede">
        Trois pièces tirées de nos répétitions récentes — captées sur le vif,
        sans retouche. De quoi se faire une idée de notre couleur d'ensemble.
      </p>
      <div className="listen__grid">
        {TRACKS.map((t, i) => (
          <Track
            key={i}
            track={t}
            isPlaying={playingIdx === i}
            onToggle={() => toggle(i)}
            progress={progress[i] || 0}
          />
        ))}
      </div>
    </section>
  );
};

export default Listen;

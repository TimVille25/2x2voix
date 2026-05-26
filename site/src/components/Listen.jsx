import { useState, useEffect, useRef } from 'react';
import { TRACKS } from '../data.js';
import Icon from './Icon.jsx';

const base = import.meta.env.BASE_URL;                      // '/2x2voix/' en prod, '/' en dev
const audioUrl = (file) => `${base}audio/${file}`;

const fmt = (s) => {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

const Track = ({ track, isPlaying, onToggle, progress, duration }) => {
  const dur = duration || track.duration;
  const pct = dur > 0 ? Math.min(100, (progress / dur) * 100) : 0;
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
        <div className="track__bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="track__time">
        <span>{fmt(progress)}</span>
        <span>{fmt(dur)}</span>
      </div>
    </article>
  );
};

const Listen = () => {
  const [playingIdx, setPlayingIdx] = useState(null);
  const [progress, setProgress]     = useState({});
  const [durations, setDurations]   = useState({});
  const audioRef = useRef(null);

  // Nettoyer l'audio à la destruction du composant
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggle = (i) => {
    const track = TRACKS[i];
    if (!track.file) return;

    // Pause de la piste en cours
    if (playingIdx === i) {
      audioRef.current?.pause();
      setPlayingIdx(null);
      return;
    }

    // Arrêter la piste précédente
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended      = null;
    }

    const audio = new Audio(audioUrl(track.file));
    audioRef.current = audio;

    audio.onloadedmetadata = () =>
      setDurations(d => ({ ...d, [i]: audio.duration }));

    audio.ontimeupdate = () =>
      setProgress(p => ({ ...p, [i]: audio.currentTime }));

    audio.onended = () => {
      setPlayingIdx(null);
      setProgress(p => ({ ...p, [i]: 0 }));
    };

    audio.play().catch(() => setPlayingIdx(null));
    setPlayingIdx(i);
  };

  return (
    <section id="ecouter" className="section">
      <div className="section__inner">
        <div className="section__label">Écouter</div>
        <h2 className="section__title">Quelques extraits.</h2>
        <p className="section__lede">
          Quelques pièces tirées de nos répétitions récentes — captées sur le vif,
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
              duration={durations[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listen;

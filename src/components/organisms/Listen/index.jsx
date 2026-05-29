import { useState, useEffect, useRef } from 'react';
import { TRACKS } from '../../../data.js';
import Track from '../../molecules/Track';
import './style.css';

const BASE_URL = import.meta.env.BASE_URL;
const audioUrl = (file) => `${BASE_URL}audio/${file}`;

const Listen = () => {
  const [playingIdx, setPlayingIdx] = useState(null);
  const [progress, setProgress] = useState({});
  const [durations, setDurations] = useState({});
  const audioRef = useRef(null);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggle = (i) => {
    const track = TRACKS[i];
    if (!track.file) return;

    if (playingIdx === i) {
      audioRef.current?.pause();
      setPlayingIdx(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended = null;
    }

    const audio = new Audio(audioUrl(track.file));
    audioRef.current = audio;

    audio.onloadedmetadata = () =>
      setDurations((d) => ({ ...d, [i]: audio.duration }));

    audio.ontimeupdate = () =>
      setProgress((p) => ({ ...p, [i]: audio.currentTime }));

    audio.onended = () => {
      setPlayingIdx(null);
      setProgress((p) => ({ ...p, [i]: 0 }));
    };

    audio.play().catch(() => setPlayingIdx(null));
    setPlayingIdx(i);
  };

  return (
    <section id="ecouter" className="section">
      <div className="section__inner">
        <h2 className="section__label">Écouter</h2>
        <div className="section__title">Quelques extraits.</div>
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

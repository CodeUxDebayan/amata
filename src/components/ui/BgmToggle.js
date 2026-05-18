import { useEffect, useRef, useState } from 'react';
import { MusicNotes, MusicNotesSimple } from '@phosphor-icons/react';
import styles from './BgmToggle.module.css';

export default function BgmToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('/audio/bgm.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <button
      className={`${styles.toggle} ${!playing ? styles.paused : ''}`}
      onClick={toggle}
      aria-label="Toggle background music"
    >
      {playing
        ? <MusicNotes size={20} weight="fill" />
        : <MusicNotesSimple size={20} />
      }
    </button>
  );
}

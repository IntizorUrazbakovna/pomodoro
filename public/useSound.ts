import { useState, useEffect } from 'react';

export function useTickSound(src: string) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioObj = new Audio(src);
    audioObj.preload = 'auto';
    setAudio(audioObj);

    return () => {
      audioObj.pause();
    };
  }, [src]);

  const play = () => {
    if (audio) {
      audio.currentTime = 0; // Ovozni qayta boshlash
      audio.play().catch(e => console.log("Ovozni chalishda xato:", e));
    }
  };

  return play;
}
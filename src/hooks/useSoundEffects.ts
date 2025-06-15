
import { useState, useCallback, useRef } from 'react';

export type SoundMode = 'random' | 'ai' | 'logic' | 'sassy' | 'reverse' | 'party';

export const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('meme-sounds-enabled');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('meme-sounds-volume');
    return saved ? parseFloat(saved) : 0.7;
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastPlayedSound, setLastPlayedSound] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle on/off
  const toggleSound = useCallback(() => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('meme-sounds-enabled', JSON.stringify(newState));
  }, [soundEnabled]);

  // Clamp and set volume
  const setVolumeLevel = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    localStorage.setItem('meme-sounds-volume', clampedVolume.toString());
  }, []);

  // Fetch the list of user-provided audio files and play a random one
  const playSound = useCallback(async () => {
    if (!soundEnabled) return null;

    try {
      const res = await fetch('/sounds/filelist.json');
      const files: string[] = await res.json();
      if (!files.length) return null;

      const randomFile = files[Math.floor(Math.random() * files.length)];

      // Stop previous audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(`/sounds/${randomFile}`);
      audio.volume = volume;
      audioRef.current = audio;
      setIsPlaying(true);
      setLastPlayedSound(randomFile);

      await audio.play();

      // Optional: haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 100, 50]);
      }

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);

      return randomFile;
    } catch (error) {
      setIsPlaying(false);
      console.warn('Sound playback failed:', error);
      if ('vibrate' in navigator) navigator.vibrate([100]);
      return null;
    }
  }, [soundEnabled, volume]);

  const replayLastSound = useCallback(async () => {
    if (soundEnabled && lastPlayedSound) {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        const audio = new Audio(`/sounds/${lastPlayedSound}`);
        audio.volume = volume;
        audioRef.current = audio;
        setIsPlaying(true);
        await audio.play();
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
      } catch (error) {
        setIsPlaying(false);
      }
    }
  }, [soundEnabled, lastPlayedSound, volume]);


  // Since we only have one "user sounds" mode, getSoundEffects is now a stub
  const getSoundEffects = useCallback(() => [], []);

  return {
    soundEnabled,
    volume,
    isPlaying,
    lastPlayedSound,
    toggleSound,
    setVolumeLevel,
    playSound,
    replayLastSound,
    getSoundEffects
  };
};

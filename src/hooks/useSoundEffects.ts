
import { useState, useCallback, useRef } from 'react';

export type SoundMode = 'random' | 'ai' | 'logic' | 'sassy' | 'reverse' | 'party';

interface SoundEffect {
  id: string;
  name: string;
  fileName: string;
  duration: number;
}

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
  const [lastPlayedSound, setLastPlayedSound] = useState<SoundEffect | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create sound effects for each mode
  const createSoundEffects = useCallback((): Record<SoundMode, SoundEffect[]> => ({
    random: [
      { id: 'bruh', name: 'Bruh Sound', fileName: 'bruh.mp3', duration: 1.0 },
      { id: 'vine-boom', name: 'Vine Boom', fileName: 'vine-boom.mp3', duration: 0.8 },
      { id: 'yeet', name: 'Yeet!', fileName: 'yeet.mp3', duration: 0.6 }
    ],
    ai: [
      { id: 'beep-boop', name: 'Beep Boop', fileName: 'beep-boop.mp3', duration: 1.2 },
      { id: 'robot', name: 'Robot Sound', fileName: 'robot.mp3', duration: 1.0 },
      { id: 'startup', name: 'Startup Sound', fileName: 'startup.mp3', duration: 1.5 }
    ],
    logic: [
      { id: 'calculator', name: 'Calculator Beep', fileName: 'calculator.mp3', duration: 0.3 },
      { id: 'thinking', name: 'Thinking Sound', fileName: 'thinking.mp3', duration: 1.0 },
      { id: 'eureka', name: 'Eureka!', fileName: 'eureka.mp3', duration: 1.2 }
    ],
    sassy: [
      { id: 'snip', name: 'Snip Snap', fileName: 'snip.mp3', duration: 0.8 },
      { id: 'attitude', name: 'Attitude Sound', fileName: 'attitude.mp3', duration: 1.0 },
      { id: 'periodt', name: 'Periodt!', fileName: 'periodt.mp3', duration: 0.6 }
    ],
    reverse: [
      { id: 'record-scratch', name: 'Record Scratch', fileName: 'scratch.mp3', duration: 0.5 },
      { id: 'confused', name: 'Confused Sound', fileName: 'confused.mp3', duration: 0.8 },
      { id: 'plot-twist', name: 'Plot Twist!', fileName: 'twist.mp3', duration: 1.0 }
    ],
    party: [
      { id: 'airhorn', name: 'Airhorn', fileName: 'airhorn.mp3', duration: 1.0 },
      { id: 'party-horn', name: 'Party Horn', fileName: 'party-horn.mp3', duration: 0.8 },
      { id: 'celebration', name: 'Celebration!', fileName: 'celebration.mp3', duration: 1.5 }
    ]
  }), []);

  const toggleSound = useCallback(() => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('meme-sounds-enabled', JSON.stringify(newState));
  }, [soundEnabled]);

  const setVolumeLevel = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    localStorage.setItem('meme-sounds-volume', clampedVolume.toString());
  }, []);

  const playSound = useCallback(async (mode: SoundMode, surpriseMe: boolean = false) => {
    if (!soundEnabled) return null;

    try {
      const soundEffects = createSoundEffects();
      const modeEffects = surpriseMe 
        ? Object.values(soundEffects).flat()
        : soundEffects[mode] || soundEffects.random;
      
      const randomEffect = modeEffects[Math.floor(Math.random() * modeEffects.length)];
      
      // Stop previous audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio(`/sounds/${randomEffect.fileName}`);
      audio.volume = volume;
      audioRef.current = audio;

      setIsPlaying(true);
      setLastPlayedSound(randomEffect);

      // Play the sound
      await audio.play();

      // Add haptic feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 100, 50]);
      }

      // Handle audio end
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        console.warn(`Failed to load sound: ${randomEffect.fileName}`);
        setIsPlaying(false);
      };

      return randomEffect;
    } catch (error) {
      console.warn('Sound playback failed:', error);
      setIsPlaying(false);
      
      // Provide haptic feedback as fallback
      if ('vibrate' in navigator) {
        navigator.vibrate([100]);
      }
      
      return null;
    }
  }, [soundEnabled, volume, createSoundEffects]);

  const replayLastSound = useCallback(async () => {
    if (soundEnabled && lastPlayedSound) {
      try {
        // Stop previous audio if playing
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        const audio = new Audio(`/sounds/${lastPlayedSound.fileName}`);
        audio.volume = volume;
        audioRef.current = audio;

        setIsPlaying(true);
        await audio.play();

        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
      } catch (error) {
        console.warn('Sound replay failed:', error);
        setIsPlaying(false);
      }
    }
  }, [soundEnabled, lastPlayedSound, volume]);

  const getSoundEffects = useCallback((mode: SoundMode) => {
    const soundEffects = createSoundEffects();
    return soundEffects[mode] || soundEffects.random;
  }, [createSoundEffects]);

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


import { useState, useCallback, useRef } from 'react';

export type SoundMode = 'random' | 'ai' | 'logic' | 'sassy' | 'reverse' | 'party';

interface SoundEffect {
  id: string;
  name: string;
  url: string;
  duration: number;
}

// Note: These audio files don't exist in the current environment
// In a real deployment, you would add these MP3 files to the public/sounds folder
const SOUND_EFFECTS: Record<SoundMode, SoundEffect[]> = {
  random: [
    { id: 'bruh', name: 'Bruh', url: '/sounds/bruh.mp3', duration: 1.2 },
    { id: 'vine-boom', name: 'Vine Boom', url: '/sounds/vine-boom.mp3', duration: 1.0 },
    { id: 'yeet', name: 'Yeet!', url: '/sounds/yeet.mp3', duration: 0.8 }
  ],
  ai: [
    { id: 'beep-boop', name: 'Beep Boop', url: '/sounds/beep-boop.mp3', duration: 1.5 },
    { id: 'calculating', name: 'Calculating...', url: '/sounds/calculating.mp3', duration: 2.0 },
    { id: 'windows-xp', name: 'Windows XP', url: '/sounds/windows-xp.mp3', duration: 1.8 }
  ],
  logic: [
    { id: 'math', name: 'Math! MATH!', url: '/sounds/math.mp3', duration: 1.3 },
    { id: 'calculator', name: 'Calculator', url: '/sounds/calculator.mp3', duration: 1.0 },
    { id: 'big-brain', name: 'Big Brain Time', url: '/sounds/big-brain.mp3', duration: 1.4 }
  ],
  sassy: [
    { id: 'yas-queen', name: 'Yas Queen!', url: '/sounds/yas-queen.mp3', duration: 1.1 },
    { id: 'nicki-laugh', name: 'Attitude Laugh', url: '/sounds/nicki-laugh.mp3', duration: 1.6 },
    { id: 'periodt', name: 'Periodt!', url: '/sounds/periodt.mp3', duration: 0.9 }
  ],
  reverse: [
    { id: 'record-scratch', name: 'Record Scratch', url: '/sounds/record-scratch.mp3', duration: 1.5 },
    { id: 'confused-huh', name: 'Confused Huh?', url: '/sounds/confused-huh.mp3', duration: 0.7 },
    { id: 'plot-twist', name: 'Plot Twist!', url: '/sounds/plot-twist.mp3', duration: 1.2 }
  ],
  party: [
    { id: 'airhorn', name: 'Airhorn', url: '/sounds/airhorn.mp3', duration: 1.0 },
    { id: 'lets-go', name: "Let's Gooo!", url: '/sounds/lets-go.mp3', duration: 1.3 },
    { id: 'party-horn', name: 'Party Horn', url: '/sounds/party-horn.mp3', duration: 0.8 }
  ]
};

export const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('meme-sounds-enabled');
    return saved ? JSON.parse(saved) : false; // Default OFF
  });
  
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('meme-sounds-volume');
    return saved ? parseFloat(saved) : 0.7; // Default medium volume
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastPlayedSound, setLastPlayedSound] = useState<SoundEffect | null>(null);

  const toggleSound = useCallback(() => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('meme-sounds-enabled', JSON.stringify(newState));
  }, [soundEnabled]);

  const setVolumeLevel = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    localStorage.setItem('meme-sounds-volume', clampedVolume.toString());
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  const playSound = useCallback(async (mode: SoundMode, surpriseMe: boolean = false) => {
    if (!soundEnabled) return null;

    try {
      const modeEffects = surpriseMe 
        ? Object.values(SOUND_EFFECTS).flat()
        : SOUND_EFFECTS[mode] || SOUND_EFFECTS.random;
      
      const randomEffect = modeEffects[Math.floor(Math.random() * modeEffects.length)];
      
      // Stop any currently playing sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio(randomEffect.url);
      audio.volume = volume;
      audioRef.current = audio;

      setIsPlaying(true);
      setLastPlayedSound(randomEffect);

      // Handle audio events
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        console.warn(`Audio file not found: ${randomEffect.name} (${randomEffect.url})`);
        console.log('💡 To hear sounds, add MP3 files to public/sounds/ folder');
        setIsPlaying(false);
        
        // Show visual feedback instead of sound
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
      };

      await audio.play();
      
      // Add haptic feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 100, 50]);
      }

      return randomEffect;
    } catch (error) {
      console.warn('Sound playback failed - audio files not available in demo environment');
      console.log('💡 In production, add sound files to public/sounds/ folder');
      setIsPlaying(false);
      
      // Provide visual feedback as fallback
      if ('vibrate' in navigator) {
        navigator.vibrate([100]);
      }
      
      return null;
    }
  }, [soundEnabled, volume]);

  const replayLastSound = useCallback(() => {
    if (audioRef.current && soundEnabled && lastPlayedSound) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.warn('Replay failed - audio files not available');
      });
      setIsPlaying(true);
    }
  }, [soundEnabled, lastPlayedSound]);

  const getSoundEffects = useCallback((mode: SoundMode) => {
    return SOUND_EFFECTS[mode] || SOUND_EFFECTS.random;
  }, []);

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

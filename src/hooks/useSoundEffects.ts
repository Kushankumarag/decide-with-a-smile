
import { useState, useCallback, useRef } from 'react';

export type SoundMode = 'random' | 'ai' | 'logic' | 'sassy' | 'reverse' | 'party';

interface SoundEffect {
  id: string;
  name: string;
  generator: () => void;
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
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastPlayedSound, setLastPlayedSound] = useState<SoundEffect | null>(null);

  // Initialize audio context
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Sound generators
  const generateTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [volume, getAudioContext]);

  const generateNoise = useCallback((duration: number) => {
    const audioContext = getAudioContext();
    const bufferSize = audioContext.sampleRate * duration;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    noise.buffer = buffer;
    noise.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    noise.start();
  }, [volume, getAudioContext]);

  const generateDrum = useCallback(() => {
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(volume * 0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }, [volume, getAudioContext]);

  // Create sound effects for each mode
  const createSoundEffects = useCallback((): Record<SoundMode, SoundEffect[]> => ({
    random: [
      {
        id: 'bruh',
        name: 'Bruh Sound',
        generator: () => {
          generateTone(200, 0.3, 'sawtooth');
          setTimeout(() => generateTone(150, 0.4, 'sawtooth'), 300);
        },
        duration: 0.8
      },
      {
        id: 'vine-boom',
        name: 'Vine Boom',
        generator: () => generateDrum(),
        duration: 0.5
      },
      {
        id: 'yeet',
        name: 'Yeet!',
        generator: () => {
          generateTone(400, 0.1, 'square');
          setTimeout(() => generateTone(600, 0.1, 'square'), 100);
          setTimeout(() => generateTone(800, 0.2, 'square'), 200);
        },
        duration: 0.5
      }
    ],
    ai: [
      {
        id: 'beep-boop',
        name: 'Beep Boop',
        generator: () => {
          generateTone(800, 0.2, 'square');
          setTimeout(() => generateTone(400, 0.2, 'square'), 300);
          setTimeout(() => generateTone(600, 0.2, 'square'), 600);
        },
        duration: 1.0
      },
      {
        id: 'calculating',
        name: 'Calculating...',
        generator: () => {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => generateTone(300 + i * 50, 0.1, 'sine'), i * 150);
          }
        },
        duration: 1.0
      },
      {
        id: 'windows-xp',
        name: 'Startup Sound',
        generator: () => {
          const notes = [523, 659, 784, 1047];
          notes.forEach((freq, i) => {
            setTimeout(() => generateTone(freq, 0.3, 'sine'), i * 200);
          });
        },
        duration: 1.2
      }
    ],
    logic: [
      {
        id: 'math',
        name: 'Math Sound',
        generator: () => {
          generateTone(440, 0.2, 'triangle');
          setTimeout(() => generateTone(554, 0.2, 'triangle'), 200);
          setTimeout(() => generateTone(659, 0.3, 'triangle'), 400);
        },
        duration: 0.8
      },
      {
        id: 'calculator',
        name: 'Calculator Beep',
        generator: () => generateTone(1000, 0.1, 'square'),
        duration: 0.2
      },
      {
        id: 'big-brain',
        name: 'Big Brain Time',
        generator: () => {
          generateTone(300, 0.5, 'sine');
          setTimeout(() => generateTone(400, 0.5, 'sine'), 250);
        },
        duration: 0.8
      }
    ],
    sassy: [
      {
        id: 'yas-queen',
        name: 'Yas Queen!',
        generator: () => {
          generateTone(500, 0.2, 'triangle');
          setTimeout(() => generateTone(700, 0.3, 'triangle'), 200);
          setTimeout(() => generateTone(900, 0.2, 'triangle'), 500);
        },
        duration: 0.8
      },
      {
        id: 'attitude-laugh',
        name: 'Attitude Laugh',
        generator: () => {
          for (let i = 0; i < 4; i++) {
            setTimeout(() => generateTone(400 + i * 100, 0.1, 'sawtooth'), i * 100);
          }
        },
        duration: 0.6
      },
      {
        id: 'periodt',
        name: 'Periodt!',
        generator: () => {
          generateTone(600, 0.1, 'square');
          setTimeout(() => generateDrum(), 150);
        },
        duration: 0.4
      }
    ],
    reverse: [
      {
        id: 'record-scratch',
        name: 'Record Scratch',
        generator: () => generateNoise(0.3),
        duration: 0.3
      },
      {
        id: 'confused-huh',
        name: 'Confused Huh?',
        generator: () => {
          generateTone(300, 0.2, 'sine');
          setTimeout(() => generateTone(250, 0.3, 'sine'), 200);
        },
        duration: 0.6
      },
      {
        id: 'plot-twist',
        name: 'Plot Twist!',
        generator: () => {
          generateTone(200, 0.3, 'triangle');
          setTimeout(() => generateTone(400, 0.3, 'triangle'), 200);
          setTimeout(() => generateTone(800, 0.4, 'triangle'), 400);
        },
        duration: 1.0
      }
    ],
    party: [
      {
        id: 'airhorn',
        name: 'Airhorn',
        generator: () => {
          generateTone(200, 0.8, 'sawtooth');
          generateTone(300, 0.8, 'sawtooth');
          generateTone(400, 0.8, 'sawtooth');
        },
        duration: 0.8
      },
      {
        id: 'lets-go',
        name: "Let's Gooo!",
        generator: () => {
          generateTone(400, 0.2, 'square');
          setTimeout(() => generateTone(600, 0.3, 'square'), 200);
          setTimeout(() => generateTone(800, 0.4, 'square'), 500);
        },
        duration: 1.0
      },
      {
        id: 'party-horn',
        name: 'Party Horn',
        generator: () => {
          const frequencies = [500, 600, 700, 800, 900];
          frequencies.forEach((freq, i) => {
            setTimeout(() => generateTone(freq, 0.1, 'triangle'), i * 50);
          });
        },
        duration: 0.5
      }
    ]
  }), [generateTone, generateNoise, generateDrum]);

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
      // Resume audio context if suspended (required by some browsers)
      const audioContext = getAudioContext();
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const soundEffects = createSoundEffects();
      const modeEffects = surpriseMe 
        ? Object.values(soundEffects).flat()
        : soundEffects[mode] || soundEffects.random;
      
      const randomEffect = modeEffects[Math.floor(Math.random() * modeEffects.length)];
      
      setIsPlaying(true);
      setLastPlayedSound(randomEffect);

      // Play the sound
      randomEffect.generator();

      // Add haptic feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 100, 50]);
      }

      // Stop playing after duration
      setTimeout(() => setIsPlaying(false), randomEffect.duration * 1000);

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
  }, [soundEnabled, getAudioContext, createSoundEffects]);

  const replayLastSound = useCallback(() => {
    if (soundEnabled && lastPlayedSound) {
      setIsPlaying(true);
      lastPlayedSound.generator();
      setTimeout(() => setIsPlaying(false), lastPlayedSound.duration * 1000);
    }
  }, [soundEnabled, lastPlayedSound]);

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

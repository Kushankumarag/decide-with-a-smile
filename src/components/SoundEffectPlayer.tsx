
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useSoundEffects, SoundMode } from '../hooks/useSoundEffects';

interface SoundEffectPlayerProps {
  mode: SoundMode;
  autoPlay?: boolean;
  onSoundPlayed?: (soundName: string) => void;
}

const SoundEffectPlayer = ({ mode, autoPlay = true, onSoundPlayed }: SoundEffectPlayerProps) => {
  const { soundEnabled, isPlaying, playSound, replayLastSound, lastPlayedSound } = useSoundEffects();
  const [soundWaves, setSoundWaves] = useState(false);
  const [attemptedPlay, setAttemptedPlay] = useState(false);

  useEffect(() => {
    if (autoPlay && soundEnabled && !attemptedPlay) {
      const timer = setTimeout(async () => {
        const sound = await playSound(mode);
        setAttemptedPlay(true);
        
        if (sound) {
          onSoundPlayed?.(sound.name);
          
          // Trigger sound wave animation
          setSoundWaves(true);
          setTimeout(() => setSoundWaves(false), sound.duration * 1000);
        }
      }, 500); // Small delay after result appears

      return () => clearTimeout(timer);
    }
  }, [mode, autoPlay, soundEnabled, playSound, onSoundPlayed, attemptedPlay]);

  const handleReplaySound = () => {
    replayLastSound();
    setSoundWaves(true);
    if (lastPlayedSound) {
      setTimeout(() => setSoundWaves(false), lastPlayedSound.duration * 1000);
    }
  };

  if (!soundEnabled) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
        <VolumeX className="h-3 w-3" />
        <span>Sounds are off</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 justify-center">
      <div className="flex items-center gap-3">
        {/* Sound waves animation */}
        <div className={`flex items-center gap-1 transition-opacity duration-300 ${soundWaves ? 'opacity-100' : 'opacity-30'}`}>
          <div className={`w-1 bg-purple-500 rounded-full ${soundWaves ? 'animate-pulse h-4' : 'h-2'}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-1 bg-purple-500 rounded-full ${soundWaves ? 'animate-pulse h-6' : 'h-2'}`} style={{ animationDelay: '100ms' }}></div>
          <div className={`w-1 bg-purple-500 rounded-full ${soundWaves ? 'animate-pulse h-3' : 'h-2'}`} style={{ animationDelay: '200ms' }}></div>
          <div className={`w-1 bg-purple-500 rounded-full ${soundWaves ? 'animate-pulse h-5' : 'h-2'}`} style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Replay button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReplaySound}
          disabled={isPlaying}
          className="text-xs gap-1 hover:bg-purple-50 disabled:opacity-50"
        >
          {isPlaying ? (
            <>
              <Volume2 className="h-3 w-3 animate-pulse" />
              Playing...
            </>
          ) : (
            <>
              <RotateCcw className="h-3 w-3" />
              Replay Sound
            </>
          )}
        </Button>
      </div>

      {/* Last played sound name */}
      {lastPlayedSound && (
        <span className="text-xs text-purple-600 font-medium">
          🎵 "{lastPlayedSound.name}"
        </span>
      )}
    </div>
  );
};

export default SoundEffectPlayer;

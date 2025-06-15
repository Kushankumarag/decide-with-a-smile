
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const SoundSettings = () => {
  const { soundEnabled, volume, toggleSound, setVolumeLevel, playSound } = useSoundEffects();

  const testSound = () => {
    playSound('random', true); // Play a random sound for testing
  };

  return (
    <div className="border-t pt-4 mt-6 space-y-4">
      {/* Main Toggle */}
      <Button
        variant="outline"
        className="w-full p-4 h-auto text-left justify-start"
        onClick={toggleSound}
      >
        <div className="flex items-center gap-4 w-full">
          <div className="text-2xl">🎧</div>
          <div className="flex-1">
            <h3 className="font-semibold text-base">Meme Sounds</h3>
            <p className="text-sm text-gray-600 mt-1">
              {soundEnabled ? 'ON - Ready to vibe! 🔥' : 'OFF - Silent mode'}
            </p>
          </div>
          {soundEnabled ? (
            <Volume2 className="h-5 w-5 text-green-600" />
          ) : (
            <VolumeX className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </Button>

      {/* Volume Control */}
      {soundEnabled && (
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Volume</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={testSound}
              className="text-xs hover:bg-purple-50"
            >
              Test Sound 🔊
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Low</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-500">High</span>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-purple-600 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              Each mode has unique sounds!
              <Sparkles className="h-3 w-3" />
            </p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="px-4">
        <p className="text-xs text-gray-500 text-center">
          {soundEnabled 
            ? '🎵 Sounds auto-play when decisions are revealed'
            : '🔇 Enable sounds for extra meme energy!'
          }
        </p>
      </div>
    </div>
  );
};

export default SoundSettings;

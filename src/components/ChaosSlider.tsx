
import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ChaosSliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const ChaosSlider = ({ value, onChange, className }: ChaosSliderProps) => {
  const getVibeText = (level: number) => {
    if (level < 20) return "😇 Saint Mode";
    if (level < 40) return "😊 Playing it Safe";
    if (level < 60) return "🤔 Balanced Vibes";
    if (level < 80) return "😈 Spicy Choices";
    return "🌪️ Chaotic Evil";
  };

  const getVibeColor = (level: number) => {
    if (level < 20) return "from-blue-200 to-blue-300";
    if (level < 40) return "from-green-200 to-green-300";
    if (level < 60) return "from-yellow-200 to-yellow-300";
    if (level < 80) return "from-orange-200 to-orange-300";
    return "from-red-200 to-red-300";
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            🎚️ Chaos Level
          </label>
          <span className="text-sm font-bold text-purple-600">
            {getVibeText(value)}
          </span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8B5CF6 0%, #EC4899 ${value}%, #E5E7EB ${value}%, #E5E7EB 100%)`
            }}
          />
          <div 
            className={`absolute top-6 left-0 right-0 h-8 bg-gradient-to-r ${getVibeColor(value)} rounded-lg opacity-30 pointer-events-none`}
            style={{ width: `${value}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>😇 Safe</span>
          <span>😈 Chaos</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 text-center">
        Higher chaos = wilder suggestions! 🌪️
      </p>
    </Card>
  );
};

export default ChaosSlider;

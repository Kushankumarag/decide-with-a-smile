
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SpinWheelProps {
  options: string[];
  onResult: (option: string) => void;
  onSkip: () => void;
}

const SpinWheel = ({ options, onResult, onSkip }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const colors = ['#8B5CF6', '#A855F7', '#EC4899', '#F472B6', '#06B6D4', '#0891B2'];
  const segmentAngle = 360 / options.length;

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomSpins = Math.floor(Math.random() * 5) + 5; // 5-10 full rotations
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (randomSpins * 360) + randomAngle;
    
    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedAngle = totalRotation % 360;
      const selectedIndex = Math.floor((360 - normalizedAngle) / segmentAngle) % options.length;
      const selected = options[selectedIndex];
      
      setSelectedOption(selected);
      setIsSpinning(false);
      
      setTimeout(() => {
        onResult(selected);
      }, 1000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="p-8 max-w-lg w-full bg-gradient-to-br from-purple-50 to-pink-50 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          🎡 Spin the Wheel of Fate!
        </h2>
        
        <div className="relative mx-auto mb-8" style={{ width: '300px', height: '300px' }}>
          {/* Wheel SVG */}
          <svg
            width="300"
            height="300"
            className="rounded-full border-4 border-gray-800"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {options.map((option, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
              const x1 = 150 + 130 * Math.cos(startAngle);
              const y1 = 150 + 130 * Math.sin(startAngle);
              const x2 = 150 + 130 * Math.cos(endAngle);
              const y2 = 150 + 130 * Math.sin(endAngle);
              const largeArcFlag = segmentAngle > 180 ? 1 : 0;
              
              const pathData = [
                `M 150 150`,
                `L ${x1} ${y1}`,
                `A 130 130 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');

              const textAngle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
              const textX = 150 + 80 * Math.cos(textAngle);
              const textY = 150 + 80 * Math.sin(textAngle);

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={colors[index % colors.length]}
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    transform={`rotate(${index * segmentAngle + segmentAngle / 2}, ${textX}, ${textY})`}
                  >
                    {option.length > 12 ? option.substring(0, 12) + '...' : option}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-6 h-8 bg-yellow-400 border-2 border-gray-800" 
                 style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}>
            </div>
          </div>
        </div>

        {selectedOption && !isSpinning && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-dashed border-orange-300">
            <p className="text-lg font-bold text-orange-800">
              🎉 The wheel has chosen: <span className="text-purple-600">{selectedOption}</span>!
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3"
          >
            {isSpinning ? '🌪️ Spinning...' : '🎡 Spin the Wheel!'}
          </Button>
          <Button
            onClick={onSkip}
            variant="outline"
            className="border-2 border-gray-300 text-gray-600 px-6 py-3"
          >
            Skip Wheel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SpinWheel;

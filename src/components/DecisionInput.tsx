import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';
import MoodSelector from './MoodSelector';
import { Mood } from '../types';

interface DecisionInputProps {
  onModeSelect: (mode: string, options: string[], context: string, mood?: Mood) => void;
  onBack: () => void;
  initialOptions?: string[];
  initialContext?: string;
  initialMood?: Mood;
  chaosMode?: boolean;
}

const DecisionInput = ({ onModeSelect, onBack, initialOptions, initialContext, initialMood, chaosMode }: DecisionInputProps) => {
  const [options, setOptions] = useState(initialOptions || ['', '']);
  const [context, setContext] = useState(initialContext || '');
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>(initialMood);
  const [showMoodSelector, setShowMoodSelector] = useState(true);

  useEffect(() => {
    if (initialOptions && initialOptions.length > 0) {
      setOptions(initialOptions);
    }
    if (initialContext) {
      setContext(initialContext);
    }
  }, [initialOptions, initialContext]);

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleModeSelect = (mode: string) => {
    const validOptions = options.filter(option => option.trim() !== '');
    if (validOptions.length >= 2) {
      // Chaos mode effect - shuffle options randomly
      if (chaosMode) {
        const shuffled = [...validOptions].sort(() => Math.random() - 0.5);
        onModeSelect(mode, shuffled, context, selectedMood);
      } else {
        onModeSelect(mode, validOptions, context, selectedMood);
      }
    }
  };

  const bgClass = chaosMode 
    ? "min-h-screen bg-gradient-to-br from-red-100 via-yellow-100 to-pink-100" 
    : "min-h-screen bg-gradient-to-br from-purple-50 to-pink-50";

  const validOptions = options.filter(option => option.trim() !== '');
  const canProceed = validOptions.length >= 2;

  return (
    <div className={`${bgClass} p-4`}>
      <div className="max-w-2xl mx-auto pt-4 md:pt-8">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-4 md:mb-6 text-purple-600 hover:text-purple-800"
        >
          ← Back to Home
        </Button>

        {chaosMode && (
          <div className="mb-4 p-3 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg border-2 border-dashed border-red-400 animate-wiggle">
            <p className="text-center font-bold text-red-800">
              🌪️ CHAOS MODE: Your options might get shuffled! 🌪️
            </p>
          </div>
        )}

        {showMoodSelector && (
          <MoodSelector
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
            onSkip={() => setShowMoodSelector(false)}
          />
        )}

        <Card className="p-4 md:p-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            What Are Your Options? 🤷‍♀️
          </h2>
          <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base">
            Enter at least 2 options you're considering
          </p>

          {/* Context Input */}
          <div className="mb-4 md:mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Context (Optional) 💭
            </label>
            <Textarea
              placeholder="e.g., 'What to have for dinner tonight' or 'Which subject to study first'"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="resize-none text-sm md:text-base"
              rows={2}
            />
          </div>

          {/* Options Input */}
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <label className="block text-sm font-medium text-gray-700">
              Your Options ⚡
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-shrink-0 w-6 h-8 md:w-8 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-semibold text-xs md:text-sm">
                  {index + 1}
                </div>
                <Input
                  placeholder={`Option ${index + 1}...`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1 text-sm md:text-base"
                />
                {options.length > 2 && (
                  <Button
                    onClick={() => removeOption(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                  >
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {options.length < 6 && (
              <Button
                onClick={addOption}
                variant="ghost"
                className="w-full border-2 border-dashed border-gray-300 text-gray-500 hover:border-purple-300 hover:text-purple-600 py-2 md:py-3 text-sm md:text-base"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Add Another Option
              </Button>
            )}
          </div>

          {/* Decision Mode Selection */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-center mb-3 md:mb-4">
              Choose Your Decision Mode 🎯
            </h3>
            
            {selectedMood && (
              <div className="text-center mb-4 p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <span className="text-sm font-medium text-purple-700">
                  Current vibe: <span className="capitalize">{selectedMood}</span> ✨
                </span>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Button
                onClick={() => handleModeSelect('random')}
                disabled={!canProceed}
                className="h-auto p-3 md:p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">🎲</div>
                  <div className="font-semibold text-xs md:text-sm">Random Pick</div>
                  <div className="text-xs opacity-90 hidden md:block">Let fate decide!</div>
                </div>
              </Button>

              <Button
                onClick={() => handleModeSelect('ai')}
                disabled={!canProceed}
                className="h-auto p-3 md:p-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">🤖</div>
                  <div className="font-semibold text-xs md:text-sm">AI Assistant</div>
                  <div className="text-xs opacity-90 hidden md:block">Smart recommendations</div>
                </div>
              </Button>

              <Button
                onClick={() => handleModeSelect('logic')}
                disabled={!canProceed}
                className="h-auto p-3 md:p-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">📊</div>
                  <div className="font-semibold text-xs md:text-sm">Logic Mode</div>
                  <div className="text-xs opacity-90 hidden md:block">Data-driven choice</div>
                </div>
              </Button>

              <Button
                onClick={() => handleModeSelect('sassy')}
                disabled={!canProceed}
                className="h-auto p-3 md:p-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">😂</div>
                  <div className="font-semibold text-xs md:text-sm">Sassy Mode</div>
                  <div className="text-xs opacity-90 hidden md:block">With personality!</div>
                </div>
              </Button>
            </div>

            {!canProceed && (
              <p className="text-center text-red-500 text-xs md:text-sm mt-4">
                Please enter at least 2 options to continue
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DecisionInput;

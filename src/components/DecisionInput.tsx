import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Lightbulb } from 'lucide-react';
import MoodSelector from './MoodSelector';
import PersonalityQuiz from './PersonalityQuiz';
import ChaosSlider from './ChaosSlider';
import DailyDilemma from './DailyDilemma';
import SpinWheel from './SpinWheel';
import { Mood, DailyDilemma as DailyDilemmaType } from '../types';
import { useUserProfile } from '../hooks/useUserProfile';
import { generateAIOptions } from '../utils/aiOptionsGenerator';

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
  const [showPersonalityQuiz, setShowPersonalityQuiz] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showDailyDilemma, setShowDailyDilemma] = useState(true);
  const [pressureMode, setPressureMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const { profile, updateArchetype, updateChaosLevel } = useUserProfile();

  useEffect(() => {
    if (initialOptions && initialOptions.length > 0) {
      setOptions(initialOptions);
    }
    if (initialContext) {
      setContext(initialContext);
    }
    
    // Show personality quiz if not completed
    if (!profile.completedQuiz) {
      setShowPersonalityQuiz(true);
    }
  }, [initialOptions, initialContext, profile.completedQuiz]);

  // Pressure mode timer
  useEffect(() => {
    if (pressureMode && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (pressureMode && timeLeft === 0) {
      handleModeSelect('random'); // Auto-select random mode
    }
  }, [pressureMode, timeLeft]);

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
      // Show spin wheel for random mode if not in pressure mode
      if (mode === 'random' && !pressureMode) {
        setShowSpinWheel(true);
        return;
      }

      // Apply chaos mode effects
      if (chaosMode || profile.chaosLevel > 75) {
        const shuffled = [...validOptions].sort(() => Math.random() - 0.5);
        onModeSelect(mode, shuffled, context, selectedMood);
      } else {
        onModeSelect(mode, validOptions, context, selectedMood);
      }
    }
  };

  const handleSpinWheelResult = (selectedOption: string) => {
    setShowSpinWheel(false);
    // Simulate random mode selection with the spun result
    onModeSelect('random', [selectedOption], context, selectedMood);
  };

  const handleAddAIOptions = () => {
    const aiSuggestions = generateAIOptions(context, options.filter(o => o.trim()));
    const newOptions = [...options];
    
    aiSuggestions.forEach(suggestion => {
      if (newOptions.length < 6) {
        const emptyIndex = newOptions.findIndex(opt => opt.trim() === '');
        if (emptyIndex !== -1) {
          newOptions[emptyIndex] = suggestion;
        } else {
          newOptions.push(suggestion);
        }
      }
    });
    
    setOptions(newOptions);
  };

  const handleDailyDilemmaChallenge = (dilemma: DailyDilemmaType) => {
    setOptions(dilemma.options);
    setContext(dilemma.question);
    setShowDailyDilemma(false);
  };

  const handleSurpriseMe = () => {
    const surpriseOptions = [
      "Do a little dance 💃",
      "Text your mom 📱💜",
      "Eat something with your non-dominant hand 🍴",
      "Google something random 🔍❓",
      "Make a weird face in the mirror 😵‍💫"
    ];
    const randomOption = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    onModeSelect('surprise', [randomOption], "The universe has spoken through chaos!", selectedMood);
  };

  const getMascotForArchetype = () => {
    return profile.mascot || '✨';
  };

  const getArchetypeAdvice = () => {
    const advice = {
      'vibe-chaser': "Trust your gut, bestie! ✨",
      'spreadsheet-queen': "Have you considered making a pros/cons list? 📊",
      'procrastination-warrior': "No rush, take your time... or don't 🛋️",
      'chaos-agent': "Why not flip a coin and add some chaos? 🌪️",
      'overthinking-genius': "I see those gears turning! 🧠⚙️"
    };
    return profile.archetype ? advice[profile.archetype] : "You've got this! 💪";
  };

  const bgClass = chaosMode 
    ? "min-h-screen bg-gradient-to-br from-red-100 via-yellow-100 to-pink-100" 
    : "min-h-screen bg-gradient-to-br from-purple-50 to-pink-50";

  const validOptions = options.filter(option => option.trim() !== '');
  const canProceed = validOptions.length >= 2;

  if (showPersonalityQuiz) {
    return (
      <PersonalityQuiz
        onComplete={updateArchetype}
        onSkip={() => setShowPersonalityQuiz(false)}
      />
    );
  }

  if (showSpinWheel) {
    return (
      <SpinWheel
        options={validOptions}
        onResult={handleSpinWheelResult}
        onSkip={() => setShowSpinWheel(false)}
      />
    );
  }

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

        {/* Pressure Mode Timer */}
        {pressureMode && (
          <Card className="mb-4 p-4 bg-gradient-to-r from-red-200 to-orange-200 border-2 border-dashed border-red-400 animate-pulse">
            <div className="text-center">
              <h3 className="text-lg font-bold text-red-800 mb-2">
                ⏰ PRESSURE MODE ACTIVATED!
              </h3>
              <p className="text-red-700 mb-2">
                Bestie... the clock's ticking 🫠
              </p>
              <div className="text-3xl font-bold text-red-800">
                {timeLeft}s
              </div>
            </div>
          </Card>
        )}

        {/* Daily Dilemma */}
        {showDailyDilemma && (
          <DailyDilemma
            onTakeChallenge={handleDailyDilemmaChallenge}
            onDismiss={() => setShowDailyDilemma(false)}
          />
        )}

        {/* Chaos Mode Alert */}
        {chaosMode && (
          <div className="mb-4 p-3 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg border-2 border-dashed border-red-400 animate-wiggle">
            <p className="text-center font-bold text-red-800">
              🌪️ CHAOS MODE: Your options might get shuffled! 🌪️
            </p>
          </div>
        )}

        {/* Mascot Advice */}
        {profile.archetype && (
          <Card className="mb-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getMascotForArchetype()}</span>
              <div>
                <p className="text-sm font-medium text-purple-700">
                  Your {profile.archetype.replace('-', ' ')} vibes say:
                </p>
                <p className="text-sm text-purple-600">{getArchetypeAdvice()}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Mood Selector */}
        {showMoodSelector && (
          <MoodSelector
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
            onSkip={() => setShowMoodSelector(false)}
          />
        )}

        {/* Chaos Level Slider */}
        <ChaosSlider
          value={profile.chaosLevel}
          onChange={updateChaosLevel}
          className="mb-6"
        />

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
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Your Options ⚡
              </label>
              <Button
                onClick={handleAddAIOptions}
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:text-purple-800 text-xs"
                disabled={context.trim() === ''}
              >
                <Lightbulb className="w-3 h-3 mr-1" />
                Add AI Suggestions
              </Button>
            </div>
            
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

          {/* Fun Mode Buttons */}
          <div className="mb-6 flex gap-2 justify-center flex-wrap">
            <Button
              onClick={() => setPressureMode(true)}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-600 hover:bg-red-50 text-xs"
              disabled={pressureMode || !canProceed}
            >
              ⏰ Pressure Mode
            </Button>
            <Button
              onClick={handleSurpriseMe}
              variant="outline"
              size="sm"
              className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 text-xs"
            >
              🪄 Surprise Me!
            </Button>
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

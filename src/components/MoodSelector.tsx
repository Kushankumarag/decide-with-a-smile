
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood?: Mood;
  onMoodSelect: (mood: Mood) => void;
  onSkip: () => void;
}

const moods = [
  { 
    id: 'chaotic' as Mood, 
    emoji: '🌪️', 
    label: 'Chaotic', 
    description: 'Embrace the chaos, bestie!',
    color: 'from-red-500 to-orange-500'
  },
  { 
    id: 'chill' as Mood, 
    emoji: '😌', 
    label: 'Chill', 
    description: 'Taking it easy today',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'productivity' as Mood, 
    emoji: '💪', 
    label: 'Productive', 
    description: 'Getting stuff done!',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'sassy' as Mood, 
    emoji: '💅', 
    label: 'Sassy', 
    description: 'Main character energy',
    color: 'from-pink-500 to-rose-500'
  },
  { 
    id: 'logical' as Mood, 
    emoji: '🤓', 
    label: 'Logical', 
    description: 'Facts over feelings',
    color: 'from-purple-500 to-indigo-500'
  },
];

const MoodSelector = ({ selectedMood, onMoodSelect, onSkip }: MoodSelectorProps) => {
  return (
    <Card className="p-6 md:p-8 shadow-xl mb-6">
      <h3 className="text-xl md:text-2xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        What's Your Vibe Today? 🧘‍♀️
      </h3>
      <p className="text-gray-600 text-center mb-6 text-sm md:text-base">
        Your mood affects how we present your decision
      </p>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
        {moods.map((mood) => (
          <Button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            variant="outline"
            className={`h-auto p-3 md:p-4 transition-all duration-300 hover:scale-105 ${
              selectedMood === mood.id 
                ? `bg-gradient-to-r ${mood.color} text-white border-transparent` 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl mb-2">{mood.emoji}</div>
              <div className="font-semibold text-xs md:text-sm">{mood.label}</div>
              <div className="text-xs opacity-75 hidden md:block">{mood.description}</div>
            </div>
          </Button>
        ))}
      </div>

      <Button
        onClick={onSkip}
        variant="ghost"
        className="w-full text-gray-500 hover:text-gray-700"
      >
        Skip for now ⏭️
      </Button>
    </Card>
  );
};

export default MoodSelector;

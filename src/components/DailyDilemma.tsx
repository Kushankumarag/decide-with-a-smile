
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DailyDilemma as DailyDilemmaType } from '../types';

interface DailyDilemmaProps {
  onTakeChallenge: (dilemma: DailyDilemmaType) => void;
  onDismiss: () => void;
}

const DailyDilemma = ({ onTakeChallenge, onDismiss }: DailyDilemmaProps) => {
  const [todaysDilemma, setTodaysDilemma] = useState<DailyDilemmaType | null>(null);

  const dilemmas = [
    {
      id: 'breakfast-chaos',
      question: "Pick your chaotic breakfast combo! 🍳",
      options: ['🥞 Pancakes with hot sauce', '🌮 Breakfast burrito with ice cream', '🍣 Sushi for breakfast', '🍩 Donut sandwich'],
      category: 'Food Adventures'
    },
    {
      id: 'vibe-check',
      question: "Choose your main character energy for today! ✨",
      options: ['💼 Corporate baddie', '🛋️ Cozy goblin mode', '🎧 Mysterious background character', '🌪️ Chaotic good energy'],
      category: 'Daily Vibes'
    },
    {
      id: 'social-dilemma',
      question: "Pick your weekend social battery level! 🔋",
      options: ['🎉 Party animal mode', '👥 Small group hangout', '📱 Virtual socializing only', '🏠 Hermit crab lifestyle'],
      category: 'Social Energy'
    },
    {
      id: 'creative-chaos',
      question: "Choose your creative outlet for the week! 🎨",
      options: ['📝 Write terrible poetry', '🎵 Learn a weird instrument', '🧶 Crochet something questionable', '🎭 Practice dramatic monologues'],
      category: 'Creative Expression'
    }
  ];

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDilemma = localStorage.getItem('daily-dilemma-date');
    
    if (savedDilemma !== today) {
      const randomDilemma = dilemmas[Math.floor(Math.random() * dilemmas.length)];
      const dilemma: DailyDilemmaType = {
        ...randomDilemma,
        date: today
      };
      setTodaysDilemma(dilemma);
      localStorage.setItem('daily-dilemma-date', today);
      localStorage.setItem('daily-dilemma', JSON.stringify(dilemma));
    } else {
      const saved = localStorage.getItem('daily-dilemma');
      if (saved) {
        setTodaysDilemma(JSON.parse(saved));
      }
    }
  }, []);

  if (!todaysDilemma) return null;

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-dashed border-orange-300">
      <div className="text-center">
        <h3 className="text-lg font-bold text-orange-800 mb-2">
          🌅 Daily Dilemma Challenge
        </h3>
        <p className="text-sm text-orange-700 mb-3">
          {todaysDilemma.question}
        </p>
        <p className="text-xs text-orange-600 mb-4">
          Category: {todaysDilemma.category}
        </p>
        
        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => onTakeChallenge(todaysDilemma)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2"
          >
            🎯 Take Challenge
          </Button>
          <Button
            onClick={onDismiss}
            variant="ghost"
            className="text-orange-600 text-sm px-4 py-2"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DailyDilemma;

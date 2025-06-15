
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DecisionArchetype } from '../types';

interface PersonalityQuizProps {
  onComplete: (archetype: DecisionArchetype, mascot: string) => void;
  onSkip: () => void;
}

const PersonalityQuiz = ({ onComplete, onSkip }: PersonalityQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "When ordering at a restaurant, you:",
      options: [
        { text: "Order the same thing every time 🍕", value: "A" },
        { text: "Ask the waiter what's good 💁‍♀️", value: "B" },
        { text: "Close my eyes and point 🎯", value: "C" },
        { text: "Spend 20 minutes analyzing the menu 📊", value: "D" }
      ]
    },
    {
      question: "Your ideal weekend plans:",
      options: [
        { text: "Netflix and procrastinate 🛋️", value: "A" },
        { text: "Whatever feels right in the moment ✨", value: "B" },
        { text: "Something completely random 🎲", value: "C" },
        { text: "Color-coded itinerary 📅", value: "D" }
      ]
    },
    {
      question: "When facing a big life decision:",
      options: [
        { text: "Sleep on it... for weeks 😴", value: "A" },
        { text: "Trust my gut vibes 🧘‍♀️", value: "B" },
        { text: "Flip a coin and embrace chaos 🪙", value: "C" },
        { text: "Make a pros/cons spreadsheet 📈", value: "D" }
      ]
    },
    {
      question: "Your friends describe you as:",
      options: [
        { text: "The one who overthinks everything 🤔", value: "A" },
        { text: "The free spirit who goes with the flow 🌊", value: "B" },
        { text: "The wild card who keeps things interesting 🃏", value: "C" },
        { text: "The organized planner 📋", value: "D" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateArchetype(newAnswers);
    }
  };

  const calculateArchetype = (finalAnswers: string[]) => {
    const counts = finalAnswers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominant = Object.entries(counts).sort(([,a], [,b]) => b - a)[0][0];
    
    const archetypes: Record<string, { type: DecisionArchetype, mascot: string }> = {
      'A': { type: 'procrastination-warrior', mascot: '🛋️' },
      'B': { type: 'vibe-chaser', mascot: '✨' },
      'C': { type: 'chaos-agent', mascot: '🌪️' },
      'D': { type: 'spreadsheet-queen', mascot: '📊' }
    };

    const result = archetypes[dominant] || { type: 'overthinking-genius', mascot: '🧠' };
    onComplete(result.type, result.mascot);
  };

  const getArchetypeName = (type: DecisionArchetype) => {
    const names = {
      'vibe-chaser': 'The Vibe Chaser',
      'spreadsheet-queen': 'The Spreadsheet Queen',
      'procrastination-warrior': 'The Procrastination Warrior',
      'chaos-agent': 'The Chaos Agent',
      'overthinking-genius': 'The Overthinking Genius'
    };
    return names[type];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-md w-full bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🧬 What's Your Decision DNA?
          </h2>
          <p className="text-gray-600 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full p-4 h-auto text-left hover:bg-purple-50 border-2"
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={onSkip} className="text-gray-500">
            Skip Quiz
          </Button>
          <div className="flex space-x-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentQuestion ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PersonalityQuiz;

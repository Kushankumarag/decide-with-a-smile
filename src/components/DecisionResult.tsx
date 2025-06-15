
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import confetti from 'canvas-confetti';

interface DecisionResultProps {
  mode: string;
  options: string[];
  context: string;
  onDecideAgain: () => void;
  onStartOver: () => void;
}

const DecisionResult = ({ mode, options, context, onDecideAgain, onStartOver }: DecisionResultProps) => {
  const [result, setResult] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateDecision();
      setIsRevealing(false);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [mode, options]);

  const generateDecision = () => {
    let selectedOption: string;
    let decisionMessage: string;

    switch (mode) {
      case 'random':
        selectedOption = options[Math.floor(Math.random() * options.length)];
        decisionMessage = "The universe has spoken! 🌟";
        break;
        
      case 'ai':
        selectedOption = options[Math.floor(Math.random() * options.length)];
        decisionMessage = "Based on my analysis, this seems like the best choice! 🤖✨";
        break;
        
      case 'logic':
        selectedOption = options[0]; // For demo, pick first option
        decisionMessage = "After weighing all factors, this is the most logical choice! 📊";
        break;
        
      case 'sassy':
        selectedOption = options[Math.floor(Math.random() * options.length)];
        const sassyMessages = [
          "Seriously? You needed me to decide this? 😏",
          "Oh honey, this one's obvious! 💅",
          "I can't believe you're overthinking this! 🙄",
          "Trust me on this one, bestie! 💖"
        ];
        decisionMessage = sassyMessages[Math.floor(Math.random() * sassyMessages.length)];
        break;
        
      default:
        selectedOption = options[0];
        decisionMessage = "Here's your pick!";
    }

    setResult(selectedOption);
    setMessage(decisionMessage);
  };

  const getModeEmoji = () => {
    switch (mode) {
      case 'random': return '🎲';
      case 'ai': return '🤖';
      case 'logic': return '📊';
      case 'sassy': return '😂';
      default: return '✨';
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'random': return 'Random Pick';
      case 'ai': return 'AI Assistant';
      case 'logic': return 'Logic Mode';
      case 'sassy': return 'Sassy Mode';
      default: return 'Decision';
    }
  };

  if (isRevealing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="p-12 text-center max-w-md mx-auto">
          <div className="text-6xl mb-6 animate-spin">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Making Your Decision...
          </h2>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-slow">{getModeEmoji()}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getModeTitle()} Says...
          </h1>
          {context && (
            <p className="text-gray-600 italic">"{context}"</p>
          )}
        </div>

        <Card className="p-8 shadow-2xl border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 transform animate-scale-in">
          <div className="text-center">
            <div className="text-5xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {result}
            </h2>
            <p className="text-xl text-gray-700 mb-8 font-medium">
              {message}
            </p>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onDecideAgain}
                  className="gradient-primary text-white font-semibold py-3 px-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  🔄 Decide Again
                </Button>
                <Button
                  onClick={onStartOver}
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-600 font-semibold py-3 px-6 hover:bg-purple-50 transition-all duration-300"
                >
                  🏠 Start Over
                </Button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">Your options were:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {options.map((option, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        option === result
                          ? 'bg-purple-200 text-purple-800 font-semibold'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Remember: This is just for fun! Trust your instincts too. 😊
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecisionResult;

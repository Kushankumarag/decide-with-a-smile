
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight, Heart, X, Shuffle, Home } from 'lucide-react';

interface WYRQuestion {
  id: string;
  optionA: string;
  optionB: string;
  theme: string;
  emoji: string;
}

interface WouldYouRatherProps {
  onClose: () => void;
}

const WouldYouRather = ({ onClose }: WouldYouRatherProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: 'A' | 'B' }>({});
  
  const questions: WYRQuestion[] = [
    // Food Theme
    { id: '1', optionA: 'Only eat pizza for the rest of your life', optionB: 'Never eat pizza again', theme: 'Food', emoji: '🍕' },
    { id: '2', optionA: 'Have unlimited sushi but it\'s always cold', optionB: 'Have perfect temperature food but only once a week', theme: 'Food', emoji: '🍣' },
    { id: '3', optionA: 'Taste everything as incredibly spicy', optionB: 'Taste everything as flavorless', theme: 'Food', emoji: '🌶️' },
    { id: '4', optionA: 'Only drink bubble tea forever', optionB: 'Never have caffeine again', theme: 'Food', emoji: '🧋' },
    { id: '5', optionA: 'Eat a cake that tastes like vegetables', optionB: 'Eat vegetables that taste like cake', theme: 'Food', emoji: '🥕' },
    
    // Career Theme
    { id: '6', optionA: 'Dream job but you can never take vacation', optionB: 'Boring job but 6 months vacation per year', theme: 'Career', emoji: '💼' },
    { id: '7', optionA: 'Be famous but everyone hates you', optionB: 'Be unknown but everyone loves you', theme: 'Career', emoji: '⭐' },
    { id: '8', optionA: 'Work from home forever but never leave your house', optionB: 'Work in office but have 2-hour commute each way', theme: 'Career', emoji: '🏠' },
    { id: '9', optionA: 'Be CEO of a company you hate', optionB: 'Be entry-level at a company you love', theme: 'Career', emoji: '👔' },
    { id: '10', optionA: 'Have a job that pays amazingly but is soul-crushing', optionB: 'Have a fulfilling job that barely pays bills', theme: 'Career', emoji: '💰' },
    
    // Relationships Theme
    { id: '11', optionA: 'Date someone who\'s perfect but has terrible breath', optionB: 'Date someone who\'s okay but smells amazing', theme: 'Romance', emoji: '💕' },
    { id: '12', optionA: 'Be in a relationship where you love them more', optionB: 'Be in a relationship where they love you more', theme: 'Romance', emoji: '💖' },
    { id: '13', optionA: 'Have your ex become super successful and famous', optionB: 'Have your ex become your boss', theme: 'Romance', emoji: '💔' },
    { id: '14', optionA: 'Never be able to say "I love you"', optionB: 'Have to say "I love you" to everyone you meet', theme: 'Romance', emoji: '❤️' },
    { id: '15', optionA: 'Find your soulmate but they live on another continent', optionB: 'Find someone perfect but they\'re taken', theme: 'Romance', emoji: '🌍' },
    
    // Chaos Theme
    { id: '16', optionA: 'Fight one horse-sized duck', optionB: 'Fight 100 duck-sized horses', theme: 'Chaos', emoji: '🦆' },
    { id: '17', optionA: 'Always speak in rhymes', optionB: 'Always speak in questions?', theme: 'Chaos', emoji: '🎭' },
    { id: '18', optionA: 'Have fingers as long as legs', optionB: 'Have legs as short as fingers', theme: 'Chaos', emoji: '🦵' },
    { id: '19', optionA: 'Sweat maple syrup', optionB: 'Cry glitter', theme: 'Chaos', emoji: '✨' },
    { id: '20', optionA: 'Be able to time travel but only to embarrassing moments', optionB: 'Read minds but only negative thoughts about you', theme: 'Chaos', emoji: '⏰' },
    
    // Technology Theme
    { id: '21', optionA: 'Have super fast internet but no privacy', optionB: 'Have complete privacy but dial-up speed', theme: 'Tech', emoji: '💻' },
    { id: '22', optionA: 'Use only voice commands for all devices', optionB: 'Use only gesture controls for everything', theme: 'Tech', emoji: '📱' },
    { id: '23', optionA: 'Have unlimited storage but everything auto-deletes after 24 hours', optionB: 'Have tiny storage but everything lasts forever', theme: 'Tech', emoji: '💾' },
    { id: '24', optionA: 'AI that reads your texts but never makes mistakes', optionB: 'Type everything manually but autocorrect is perfect', theme: 'Tech', emoji: '🤖' },
    
    // Lifestyle Theme
    { id: '25', optionA: 'Live in a mansion but never leave', optionB: 'Live in a tiny apartment but travel everywhere', theme: 'Lifestyle', emoji: '🏰' },
    { id: '26', optionA: 'Always be 10 minutes late', optionB: 'Always be 20 minutes early', theme: 'Lifestyle', emoji: '⏱️' },
    { id: '27', optionA: 'Have an amazing wardrobe but never take photos', optionB: 'Look terrible but be incredibly photogenic', theme: 'Lifestyle', emoji: '👗' },
    { id: '28', optionA: 'Sleep 4 hours but feel fully rested', optionB: 'Need 12 hours of sleep but wake up tired', theme: 'Lifestyle', emoji: '😴' },
    
    // Superpowers Theme
    { id: '29', optionA: 'Fly but only 2 feet off the ground', optionB: 'Teleport but always land in awkward situations', theme: 'Powers', emoji: '🦸' },
    { id: '30', optionA: 'Be invisible but can\'t turn it off', optionB: 'Read minds but can\'t turn it off', theme: 'Powers', emoji: '👻' },
    { id: '31', optionA: 'Have super strength but break everything you touch', optionB: 'Have super speed but can\'t stop quickly', theme: 'Powers', emoji: '💪' },
    { id: '32', optionA: 'Speak any language but only in whispers', optionB: 'Understand any language but only when screaming', theme: 'Powers', emoji: '🗣️' },
    
    // Money Theme
    { id: '33', optionA: 'Win the lottery but can only spend it on others', optionB: 'Be broke but everyone always pays for you', theme: 'Money', emoji: '💸' },
    { id: '34', optionA: 'Have unlimited money but everything costs 10x more', optionB: 'Have limited money but everything is free on weekends', theme: 'Money', emoji: '💳' },
    { id: '35', optionA: 'Get $1 million but work 80 hours/week forever', optionB: 'Get $50k but work 20 hours/week forever', theme: 'Money', emoji: '💵' },
    
    // Social Media Theme
    { id: '36', optionA: 'Have 10 million followers but they all hate your content', optionB: 'Have 10 followers but they absolutely love everything you post', theme: 'Social', emoji: '📸' },
    { id: '37', optionA: 'Go viral for something embarrassing', optionB: 'Never get any likes or engagement ever', theme: 'Social', emoji: '📺' },
    { id: '38', optionA: 'Always have perfect selfies but terrible personality online', optionB: 'Always look awful in photos but have amazing online personality', theme: 'Social', emoji: '🤳' },
    
    // Random Weird Theme
    { id: '39', optionA: 'Have to wear socks on your hands', optionB: 'Have to wear gloves on your feet', theme: 'Weird', emoji: '🧦' },
    { id: '40', optionA: 'Sneeze confetti', optionB: 'Hiccup the sound of dial-up internet', theme: 'Weird', emoji: '🎊' },
    { id: '41', optionA: 'Always smell like your favorite food', optionB: 'Always taste your least favorite food', theme: 'Weird', emoji: '👃' },
    { id: '42', optionA: 'Have your thoughts appear as subtitles above your head', optionB: 'Have a laugh track play every time you speak', theme: 'Weird', emoji: '💭' },
    
    // Education Theme
    { id: '43', optionA: 'Know the answer to every test but forget it immediately after', optionB: 'Never know the answer but always guess correctly', theme: 'School', emoji: '📚' },
    { id: '44', optionA: 'Be the smartest person but everyone thinks you\'re dumb', optionB: 'Be average but everyone thinks you\'re brilliant', theme: 'School', emoji: '🧠' },
    
    // Travel Theme
    { id: '45', optionA: 'Travel anywhere instantly but only stay for 1 hour', optionB: 'Take forever to get anywhere but stay as long as you want', theme: 'Travel', emoji: '✈️' },
    { id: '46', optionA: 'Visit every country but never remember the trip', optionB: 'Visit one perfect place and remember every detail forever', theme: 'Travel', emoji: '🌎' },
    
    // Gaming Theme
    { id: '47', optionA: 'Be the best gamer but only play games you hate', optionB: 'Be terrible at games but only play games you love', theme: 'Gaming', emoji: '🎮' },
    { id: '48', optionA: 'Have unlimited gaming time but lag constantly', optionB: 'Have perfect connection but only 30 minutes per day', theme: 'Gaming', emoji: '⚡' },
    
    // Weather Theme
    { id: '49', optionA: 'It\'s always perfect weather but only when you\'re inside', optionB: 'Weather is always terrible but you love being outside', theme: 'Weather', emoji: '🌤️' },
    { id: '50', optionA: 'Control the weather but it\'s always the opposite of what you want', optionB: 'Perfect weather sense but can never change it', theme: 'Weather', emoji: '🌈' }
  ];

  const [shuffledQuestions] = useState(() => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const currentQuestion = shuffledQuestions[currentIndex];
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100;

  const handleChoice = (choice: 'A' | 'B', direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: choice
    }));
    
    setSwipeDirection(direction);
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reset to beginning for infinite loop
        setCurrentIndex(0);
      }
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 300);
  };

  const shuffleQuestions = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
  };

  const getThemeColor = (theme: string) => {
    const colors = {
      'Food': 'bg-orange-100 text-orange-700 border-orange-200',
      'Career': 'bg-blue-100 text-blue-700 border-blue-200',
      'Romance': 'bg-pink-100 text-pink-700 border-pink-200',
      'Chaos': 'bg-purple-100 text-purple-700 border-purple-200',
      'Tech': 'bg-green-100 text-green-700 border-green-200',
      'Lifestyle': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Powers': 'bg-red-100 text-red-700 border-red-200',
      'Money': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Social': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Weird': 'bg-violet-100 text-violet-700 border-violet-200',
      'School': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'Travel': 'bg-teal-100 text-teal-700 border-teal-200',
      'Gaming': 'bg-rose-100 text-rose-700 border-rose-200',
      'Weather': 'bg-sky-100 text-sky-700 border-sky-200'
    };
    return colors[theme as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      {/* Header with Progress Slider */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onClose} variant="ghost" size="sm">
            <Home className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Would You Rather? 🤔🔥
          </h1>
          <Button onClick={shuffleQuestions} variant="ghost" size="sm">
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentIndex + 1} of {shuffledQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="w-full"
            disabled
          />
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-md mx-auto">
        <div className="relative h-[500px] perspective-1000">
          <Card className={`absolute inset-0 p-6 transition-all duration-300 transform ${
            isAnimating 
              ? swipeDirection === 'left' 
                ? '-translate-x-full rotate-12 opacity-0' 
                : 'translate-x-full -rotate-12 opacity-0'
              : 'translate-x-0 rotate-0 opacity-100'
          } ${isAnimating ? 'scale-95' : 'scale-100'}`}>
            
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{currentQuestion.emoji}</div>
              <Badge className={`${getThemeColor(currentQuestion.theme)} border`}>
                {currentQuestion.theme}
              </Badge>
            </div>

            <div className="space-y-4 mb-8">
              <div 
                className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border-2 border-red-200 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleChoice('A', 'left')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <X className="w-5 h-5 text-red-600 mr-2" />
                      <span className="font-semibold text-red-700">Option A</span>
                    </div>
                    <p className="text-gray-800">{currentQuestion.optionA}</p>
                  </div>
                </div>
              </div>

              <div className="text-center text-2xl font-bold text-gray-400">
                VS
              </div>

              <div 
                className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-2 border-green-200 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleChoice('B', 'right')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Heart className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-700">Option B</span>
                    </div>
                    <p className="text-gray-800">{currentQuestion.optionB}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={() => handleChoice('A', 'left')}
                className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                disabled={isAnimating}
              >
                <ArrowLeft className="w-4 h-4" />
                Choose A
              </Button>
              
              <Button
                onClick={() => handleChoice('B', 'right')}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                disabled={isAnimating}
              >
                Choose B
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            💡 <strong>Tinder-style decision making!</strong>
          </p>
          <p className="text-xs text-gray-500">
            Swipe left for Option A, right for Option B, or tap the buttons
          </p>
        </div>

        {/* Stats */}
        <div className="mt-4 p-4 bg-white/50 rounded-lg">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              Questions Answered: {Object.keys(selectedAnswers).length}
            </p>
            <div className="flex justify-center gap-4 mt-2 text-xs text-gray-600">
              <span>👈 Option A: {Object.values(selectedAnswers).filter(a => a === 'A').length}</span>
              <span>👉 Option B: {Object.values(selectedAnswers).filter(a => a === 'B').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WouldYouRather;

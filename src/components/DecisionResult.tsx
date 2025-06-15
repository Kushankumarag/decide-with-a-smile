import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import confetti from 'canvas-confetti';
import { Mood } from '../types';

interface DecisionResultProps {
  mode: string;
  options: string[];
  context: string;
  mood?: Mood;
  onDecideAgain: () => void;
  onStartOver: () => void;
  onChangeMode: () => void;
  onDecisionComplete: (selectedOption: string) => void;
  chaosMode?: boolean;
}

const DecisionResult = ({ mode, options, context, mood, onDecideAgain, onStartOver, onChangeMode, onDecisionComplete, chaosMode }: DecisionResultProps) => {
  const [result, setResult] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [memeReaction, setMemeReaction] = useState<string>('');
  const [isRevealing, setIsRevealing] = useState(true);
  const [explanation, setExplanation] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      generateDecision();
      setIsRevealing(false);
      
      // Trigger confetti
      confetti({
        particleCount: chaosMode ? 200 : 100,
        spread: chaosMode ? 100 : 70,
        origin: { y: 0.6 },
        colors: chaosMode ? ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] : undefined
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [mode, options, chaosMode]);

  const generateDecision = () => {
    let selectedOption: string;
    let decisionMessage: string;
    let meme: string;
    let aiExplanation: string = '';

    // Mood-influenced decision messages
    const getMoodInfluencedMessages = (baseMood: string) => {
      if (!mood) return baseMood;
      
      switch (mood) {
        case 'chaotic':
          return baseMood + " Chaos theory approves! 🌪️";
        case 'chill':
          return "Taking it easy with this choice... " + baseMood + " 😌";
        case 'productivity':
          return "Time to get stuff done! " + baseMood + " 💪";
        case 'sassy':
          return baseMood + " Period! 💅";
        case 'logical':
          return "Logic has computed: " + baseMood + " 🤓";
        default:
          return baseMood;
      }
    };

    const memeReactions = [
      "This is the way! 🤌",
      "Big brain energy! 🧠✨",
      "Chef's kiss! 👨‍🍳💋",
      "It's giving main character vibes! 💅",
      "No cap, this is it! 🧢",
      "Periodt! 💯",
      "That's bussin! 🔥",
      "Living your best life! ✨",
      "Slay queen/king! 👑",
      "Touch grass? Nah, touch this decision! 🌱"
    ];

    switch (mode) {
      case 'random':
        selectedOption = options[Math.floor(Math.random() * options.length)];
        const randomMessages = [
          "The RNG gods have spoken! 🎲",
          "Plot twist: The universe picked this! 🌌",
          "Random.exe has executed successfully! 💻",
          "Chaos chose chaos... and this! 🌪️",
          "The dice said 'yeet' and landed on this! 🎯"
        ];
        decisionMessage = getMoodInfluencedMessages(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
        break;
        
      case 'ai':
        selectedOption = options[Math.floor(Math.random() * options.length)];
        const aiMessages = [
          "My neural networks are vibing with this choice! 🤖🧠",
          "After calculating 42 million possibilities... this! 🔢",
          "Beep boop... optimal choice detected! 🤖✨",
          "My AI brain says: 'This one sparks joy!' 🎯",
          "Processing... Processing... EUREKA! This is it! 💡"
        ];
        decisionMessage = getMoodInfluencedMessages(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
        
        // Generate AI explanation
        const explanations = [
          "Based on a 0.0001% increase in serotonin levels when you read this option.",
          "My algorithms detected superior vibes emanating from this choice.",
          "After consulting the universal probability matrix, this scored highest.",
          "Neural pathway analysis suggests this option will cause 23% more happiness.",
          "Quantum mechanics and pure luck both pointed to this one."
        ];
        aiExplanation = explanations[Math.floor(Math.random() * explanations.length)];
        break;
        
      case 'logic':
        selectedOption = options[0];
        const logicMessages = [
          "The data doesn't lie... unlike my ex! 📊💔",
          "Science says this is the move! 🔬",
          "Logic has entered the chat! 🧮",
          "Math is mathing perfectly here! ➕➖",
          "My spreadsheet is crying tears of joy! 📈😭"
        ];
        decisionMessage = getMoodInfluencedMessages(logicMessages[Math.floor(Math.random() * logicMessages.length)]);
        break;
        
      case 'sassy':
        selectedOption = options[Math.floor(Math.random() * options.length)];
        const sassyMessages = [
          "Bestie, were you really gonna pick anything else? 💅",
          "Not me having to explain basic decisions! 🙄💖",
          "The audacity to doubt this choice! 😤✨",
          "Main character energy is choosing this! 🌟",
          "Sorry not sorry, but this is THE choice! 💋"
        ];
        decisionMessage = getMoodInfluencedMessages(sassyMessages[Math.floor(Math.random() * sassyMessages.length)]);
        break;
        
      default:
        selectedOption = options[0];
        decisionMessage = "Here's your pick!";
    }

    meme = memeReactions[Math.floor(Math.random() * memeReactions.length)];
    setResult(selectedOption);
    setMessage(decisionMessage);
    setMemeReaction(meme);
    setExplanation(aiExplanation);
    
    // Notify parent component
    onDecisionComplete(selectedOption);
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

  const bgClass = chaosMode 
    ? "min-h-screen bg-gradient-to-br from-red-100 via-yellow-100 to-pink-100" 
    : "min-h-screen bg-gradient-to-br from-purple-50 to-pink-50";

  if (isRevealing) {
    const loadingMemes = [
      "Calculating the vibes... 🧮✨",
      "Asking the universe... 🌌",
      "Consulting the meme council... 🏛️",
      "Loading wisdom.exe... 💻",
      "Summoning decision energy... ⚡"
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="p-8 md:p-12 text-center max-w-xs md:max-w-md mx-auto">
          <div className="text-4xl md:text-6xl mb-4 md:mb-6 animate-spin">🎯</div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
            {loadingMemes[Math.floor(Math.random() * loadingMemes.length)]}
          </h2>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`${bgClass} p-4`}>
      <div className="max-w-2xl mx-auto pt-4 md:pt-8">
        {chaosMode && (
          <div className="mb-4 p-3 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg border-2 border-dashed border-red-400 animate-wiggle">
            <p className="text-center font-bold text-red-800">
              🌪️ CHAOS MODE RESULT! 🌪️
            </p>
          </div>
        )}

        <div className="text-center mb-6 md:mb-8">
          <div className="text-4xl md:text-6xl mb-3 md:mb-4 animate-bounce-slow">{getModeEmoji()}</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {getModeTitle()} Says...
          </h1>
          {context && (
            <p className="text-gray-600 italic text-sm md:text-base px-2">"{context}"</p>
          )}
        </div>

        <Card className="p-6 md:p-8 shadow-2xl border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 transform animate-scale-in">
          <div className="text-center">
            <div className="text-3xl md:text-5xl mb-4 md:mb-6">🎉</div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent break-words">
              {result}
            </h2>
            <p className="text-base md:text-xl text-gray-700 mb-3 md:mb-4 font-medium px-2">
              {message}
            </p>
            <div className="text-lg md:text-2xl mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-dashed border-orange-300">
              {memeReaction}
            </div>

            {explanation && (
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border-2 border-dashed border-blue-300">
                <h4 className="font-semibold text-blue-800 mb-2">🤖 AI Explanation:</h4>
                <p className="text-sm text-blue-700">{explanation}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button
                  onClick={onDecideAgain}
                  className="gradient-primary text-white font-semibold py-2 md:py-3 px-4 md:px-6 hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base w-full sm:w-auto"
                >
                  🔄 Run It Back!
                </Button>
                <Button
                  onClick={onChangeMode}
                  variant="outline"
                  className="border-2 border-orange-300 text-orange-600 font-semibold py-2 md:py-3 px-4 md:px-6 hover:bg-orange-50 transition-all duration-300 text-sm md:text-base w-full sm:w-auto"
                >
                  🎯 Switch Vibes
                </Button>
                <Button
                  onClick={onStartOver}
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-600 font-semibold py-2 md:py-3 px-4 md:px-6 hover:bg-purple-50 transition-all duration-300 text-sm md:text-base w-full sm:w-auto"
                >
                  🏠 Fresh Start
                </Button>
              </div>
              
              <div className="pt-3 md:pt-4 border-t border-gray-200">
                <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">Your options were:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {options.map((option, index) => (
                    <span
                      key={index}
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm break-words max-w-full ${
                        option === result
                          ? 'bg-purple-200 text-purple-800 font-semibold animate-pulse'
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

        <div className="mt-6 md:mt-8 text-center">
          <p className="text-xs md:text-sm text-gray-500 px-4">
            Remember: This is just for fun! Trust your gut too, bestie! 😊✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecisionResult;

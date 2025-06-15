
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SoundEffectPlayer from "./SoundEffectPlayer";
import FeedbackPopup from "./FeedbackPopup";
import { Mood } from "../types";
import { SoundMode } from "../hooks/useSoundEffects";
import { useState } from "react";

interface DecisionResultCardProps {
  mode: string;
  options: string[];
  context: string;
  mood?: Mood;
  result: string;
  message: string;
  memeReaction: string;
  explanation: string;
  getSoundMode: () => SoundMode;
  onDecideAgain: () => void;
  onStartOver: () => void;
  onChangeMode: () => void;
  chaosMode?: boolean;
}

export default function DecisionResultCard({
  mode,
  options,
  context,
  mood,
  result,
  message,
  memeReaction,
  explanation,
  getSoundMode,
  onDecideAgain,
  onStartOver,
  onChangeMode,
  chaosMode
}: DecisionResultCardProps) {
  const [showFeedback, setShowFeedback] = useState(false);

  const getModeEmoji = () => {
    switch (mode) {
      case 'random': return '🎲';
      case 'ai': return '🤖';
      case 'logic': return '📊';
      case 'sassy': return '😂';
      case 'reverse': return '🙃';
      case 'party': return '🎉';
      default: return '✨';
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'random': return 'Random Pick';
      case 'ai': return 'AI Assistant';
      case 'logic': return 'Logic Mode';
      case 'sassy': return 'Sassy Mode';
      case 'reverse': return 'Reverse Psychology';
      case 'party': return 'Party Mode';
      default: return 'Decision';
    }
  };

  const bgClass = chaosMode 
    ? "min-h-screen bg-gradient-to-br from-red-100 via-yellow-100 to-pink-100" 
    : "min-h-screen bg-gradient-to-br from-purple-50 to-pink-50";

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
            
            <div className="mb-4">
              <SoundEffectPlayer 
                mode={getSoundMode()} 
                autoPlay={true}
                onSoundPlayed={(soundName) => {
                  console.log(`Played sound: ${soundName} for mode: ${mode}`);
                }}
              />
            </div>

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

        <div className="mt-6 md:mt-8 text-center flex flex-col items-center">
          <p className="text-xs md:text-sm text-gray-500 px-4">
            Remember: This is just for fun! Trust your gut too, bestie! 😊✨
          </p>
          <button
            className="mt-3 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-sm font-semibold hover:bg-purple-100 hover:text-purple-900 transition-all"
            onClick={() => setShowFeedback(true)}
            aria-label="Give feedback"
            type="button"
          >
            Give us a feedback 💬
          </button>
        </div>
      </div>
      {showFeedback && (
        <FeedbackPopup
          answer={result}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
}

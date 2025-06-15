import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HowItWorksModal from './HowItWorksModal';
import WouldYouRather from './WouldYouRather';
import HamburgerMenu from './HamburgerMenu';
import ThemeToggle from './ThemeToggle'; // <-- Add import

interface HeroProps {
  onStartDeciding: () => void;
  onViewHistory: () => void;
  chaosMode?: boolean;
}

const Hero = ({
  onStartDeciding,
  onViewHistory,
  chaosMode
}: HeroProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWouldYouRather, setShowWouldYouRather] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<string | null>(null);

  // Fun floating memes that appear randomly
  const floatingMemes = ['🤔', '✨', '🎯', '🎲', '🧠', '💡', '🎪', '🎭'];
  const [currentMemes, setCurrentMemes] = useState([{
    emoji: '🤔',
    position: 'top-20 left-4 md:left-10'
  }, {
    emoji: '✨',
    position: 'top-32 right-4 md:right-20'
  }, {
    emoji: '🎯',
    position: 'bottom-40 left-4 md:left-20'
  }, {
    emoji: '🎲',
    position: 'bottom-60 right-4 md:right-10'
  }]);

  const bgClass = chaosMode ? "min-h-screen bg-gradient-to-br from-red-100 via-yellow-100 to-pink-100 animate-pulse" : "min-h-screen bg-gradient-to-br from-purple-50 to-pink-50";

  const handleFeatureSelect = (featureId: string) => {
    switch (featureId) {
      case 'decision-maker':
        onStartDeciding();
        break;
      case 'would-you-rather':
        setShowWouldYouRather(true);
        break;
      case 'daily-horoscope':
        // Placeholder for future feature
        alert('🔮 Daily Vibe Horoscope coming soon! Stay tuned for cosmic decision guidance! ✨');
        break;
      case 'roast-my-day':
        // Placeholder for future feature
        alert('📓 Roast My Day feature coming soon! Get ready for some savage AI commentary! 🔥');
        break;
      case 'personality-quiz':
        // Placeholder for future feature
        alert('🎭 Decision Personality Quiz coming soon! Discover your unique decision-making style! 🧠');
        break;
      default:
        console.log('Unknown feature:', featureId);
    }
  };

  if (showWouldYouRather) {
    return <WouldYouRather onClose={() => setShowWouldYouRather(false)} />;
  }

  return (
    <div className={`${bgClass} flex items-center justify-center p-4 relative overflow-hidden`}>
      <ThemeToggle />
      {/* Hamburger Menu */}
      <HamburgerMenu onFeatureSelect={handleFeatureSelect} />

      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Floating emoji decorations with meme energy - hidden on very small screens */}
        {currentMemes.map((meme, index) => (
          <div
            key={index}
            className={`absolute ${meme.position} text-2xl md:text-4xl animate-float hover:scale-125 transition-transform cursor-pointer hidden sm:block z-0`}
            style={{ animationDelay: `${index * 0.5}s` }}
            onClick={() => {
              // Randomize memes when clicked
              const newMemes = [...currentMemes];
              newMemes[index].emoji = floatingMemes[Math.floor(Math.random() * floatingMemes.length)];
              setCurrentMemes(newMemes);
            }}
          >
            {meme.emoji}
          </div>
        ))}

        {/* Main content */}
        <div className="relative z-10">
          {chaosMode && (
            <div className="mb-4 p-3 md:p-4 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg border-2 border-dashed border-red-400 max-w-sm md:max-w-md mx-auto animate-wiggle">
              <p className="text-sm md:text-lg font-bold text-red-800">
                🌪️ CHAOS MODE ACTIVATED! Reality.exe has stopped working! 🌪️
              </p>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 md:mb-6 px-2">
            Can't Decide?
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-3 md:mb-4 px-2">
            Let Me Pick For You! 🎯
          </h2>
          <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Enter your options, and let our decision assistant guide you with logic, randomness, or a friendly chat bot.
          </p>
          
          {/* Meme-style encouragement */}
          <div className="mb-6 md:mb-8 p-3 md:p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-dashed border-orange-300 max-w-sm md:max-w-md mx-auto">
            <p className="text-sm md:text-lg font-bold text-orange-800">
              POV: You're about to make the best decision of your life! 💯
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 px-2">
            <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 animate-wiggle">
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">🎲</div>
              <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Random Pick</h3>
              <p className="text-gray-600 text-xs md:text-sm">Let chaos choose with a fun spinning animation</p>
              <p className="text-xs text-purple-600 font-bold mt-1 md:mt-2">*Chef's kiss* 👨‍🍳💋</p>
            </Card>
            <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 animate-wiggle">
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">🤖</div>
              <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">AI Assistant</h3>
              <p className="text-gray-600 text-xs md:text-sm">Get big brain recommendations based on your needs</p>
              <p className="text-xs text-blue-600 font-bold mt-1 md:mt-2">It's giving genius vibes! 🧠✨</p>
            </Card>
            <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 animate-wiggle col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">📊</div>
              <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Logic Mode</h3>
              <p className="text-gray-600 text-xs md:text-sm">Score options on different factors for data-driven decisions</p>
              <p className="text-xs text-green-600 font-bold mt-1 md:mt-2">Math is mathing! 🔢</p>
            </Card>
            
            <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 animate-wiggle col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">🤔</div>
              <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Would You Rather?</h3>
              <p className="text-gray-600 text-xs md:text-sm">Swipe through fun dilemmas Tinder-style</p>
              <p className="text-xs text-red-600 font-bold mt-1 md:mt-2">Choose your chaos! 🔥</p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Button onClick={onStartDeciding} size="lg" className="gradient-primary text-white font-semibold py-3 md:py-4 px-6 md:px-8 text-base md:text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              Let's Gooo! ✨🚀
            </Button>
            
            <Button onClick={() => setIsModalOpen(true)} variant="outline" size="lg" className="border-2 border-purple-300 text-purple-600 font-semibold py-3 md:py-4 px-6 md:px-8 text-base md:text-lg hover:bg-purple-50 transition-all duration-300 w-full sm:w-auto">
              How It Works 🔍
            </Button>
            <Button onClick={onViewHistory} variant="outline" size="lg" className="border-2 border-orange-300 text-orange-600 font-semibold py-3 md:py-4 px-6 md:px-8 text-base md:text-lg hover:bg-orange-50 transition-all duration-300 w-full sm:w-auto">
              My Decisions 🕰️
            </Button>
          </div>
          
          {/* Bottom meme */}
          <div className="mt-6 md:mt-8 text-xs md:text-sm text-gray-500 px-4">
            <p>No cap, this will change your life! 🧢✨</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <HowItWorksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Hero;

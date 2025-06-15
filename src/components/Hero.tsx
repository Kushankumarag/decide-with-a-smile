
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HowItWorksModal from './HowItWorksModal';

interface HeroProps {
  onStartDeciding: () => void;
}

const Hero = ({ onStartDeciding }: HeroProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fun floating memes that appear randomly
  const floatingMemes = ['🤔', '✨', '🎯', '🎲', '🧠', '💡', '🎪', '🎭'];
  const [currentMemes, setCurrentMemes] = useState([
    { emoji: '🤔', position: 'top-20 left-10' },
    { emoji: '✨', position: 'top-32 right-20' },
    { emoji: '🎯', position: 'bottom-40 left-20' },
    { emoji: '🎲', position: 'bottom-60 right-10' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Floating emoji decorations with meme energy */}
        {currentMemes.map((meme, index) => (
          <div 
            key={index}
            className={`absolute ${meme.position} text-4xl animate-float hover:scale-125 transition-transform cursor-pointer`}
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
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Can't Decide?
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Let Me Pick For You! 🎯
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Enter your options, and let our decision assistant guide you with logic, randomness, or a friendly chat bot.
          </p>
          
          {/* Meme-style encouragement */}
          <div className="mb-8 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-dashed border-orange-300 max-w-md mx-auto">
            <p className="text-lg font-bold text-orange-800">
              POV: You're about to make the best decision of your life! 💯
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50">
              <div className="text-3xl mb-3">🎲</div>
              <h3 className="font-semibold text-lg mb-2">Random Pick</h3>
              <p className="text-gray-600 text-sm">Let chaos choose with a fun spinning animation</p>
              <p className="text-xs text-purple-600 font-bold mt-2">*Chef's kiss* 👨‍🍳💋</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
              <p className="text-gray-600 text-sm">Get big brain recommendations based on your needs</p>
              <p className="text-xs text-blue-600 font-bold mt-2">It's giving genius vibes! 🧠✨</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-lg mb-2">Logic Mode</h3>
              <p className="text-gray-600 text-sm">Score options on different factors for data-driven decisions</p>
              <p className="text-xs text-green-600 font-bold mt-2">Math is mathing! 🔢</p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onStartDeciding}
              size="lg" 
              className="gradient-primary text-white font-semibold py-4 px-8 text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Let's Gooo! ✨🚀
            </Button>
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline" 
              size="lg" 
              className="border-2 border-purple-300 text-purple-600 font-semibold py-4 px-8 text-lg hover:bg-purple-50 transition-all duration-300"
            >
              How It Works 🔍
            </Button>
          </div>
          
          {/* Bottom meme */}
          <div className="mt-8 text-sm text-gray-500">
            <p>No cap, this will change your life! 🧢✨</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <HowItWorksModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Hero;

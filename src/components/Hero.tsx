
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HowItWorksModal from './HowItWorksModal';

interface HeroProps {
  onStartDeciding: () => void;
}

const Hero = ({ onStartDeciding }: HeroProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Floating emoji decorations */}
        <div className="absolute top-20 left-10 text-4xl animate-float">🤔</div>
        <div className="absolute top-32 right-20 text-3xl animate-bounce-slow">✨</div>
        <div className="absolute bottom-40 left-20 text-3xl animate-float" style={{ animationDelay: '1s' }}>🎯</div>
        <div className="absolute bottom-60 right-10 text-2xl animate-bounce-slow" style={{ animationDelay: '2s' }}>🎲</div>

        {/* Main content */}
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Can't Decide?
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Let Me Pick For You! 🎯
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Enter your options, and let our decision assistant guide you with logic, randomness, or a friendly chat bot.
          </p>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🎲</div>
              <h3 className="font-semibold text-lg mb-2">Random Pick</h3>
              <p className="text-gray-600 text-sm">Let chance decide with a fun spinning animation</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
              <p className="text-gray-600 text-sm">Get reasoned recommendations based on your needs</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-lg mb-2">Logic Mode</h3>
              <p className="text-gray-600 text-sm">Score options on different factors for data-driven decisions</p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onStartDeciding}
              size="lg" 
              className="gradient-primary text-white font-semibold py-4 px-8 text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Deciding ✨
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

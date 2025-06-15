
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal = ({ isOpen, onClose }: HowItWorksModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-8 relative animate-scale-in w-full mx-4">
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-4 md:mb-6 pr-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            How PickForMe Works! 🎯
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Your personal decision-making companion</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Step 1 */}
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm md:text-base">
              1
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">🤔 Tell Us Your Dilemma</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Start by entering your tough choices! Whether it's "Pizza vs Burger" or "Study Math vs History", 
                just type in your options. You can add up to 6 different choices and even give us some context 
                about your situation.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm md:text-base">
              2
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">🎲 Choose Your Adventure</h3>
              <p className="text-gray-600 mb-2 md:mb-3 text-sm md:text-base">
                Pick one of our four super-powered decision modes:
              </p>
              <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-lg">🎲</span>
                  <span><strong>Random Pick:</strong> Let the universe decide with pure chance!</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-lg">🤖</span>
                  <span><strong>AI Assistant:</strong> Get smart recommendations based on logic</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-lg">📊</span>
                  <span><strong>Logic Mode:</strong> Data-driven decisions for the analytical mind</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-lg">😂</span>
                  <span><strong>Sassy Mode:</strong> Get your answer with a side of attitude!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm md:text-base">
              3
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">✨ Watch the Magic Happen</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Sit back and enjoy the suspense! We'll analyze your options, spin our decision wheel, 
                and reveal your answer with a burst of confetti. Each mode has its own personality 
                and way of presenting results.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm md:text-base">
              4
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">🎉 Get Your Answer & More!</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Receive your personalized decision with a fun message! Not satisfied? Try again with 
                the same options, switch to a different mode, or start completely over. The choice is yours!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <h4 className="font-semibold text-center mb-2 text-sm md:text-base">🧠 Pro Tips!</h4>
          <ul className="text-xs md:text-sm text-gray-600 space-y-1">
            <li>• The more context you provide, the better our AI can help</li>
            <li>• Try different modes for the same decision - you might be surprised!</li>
            <li>• Remember: This is for fun! Trust your gut feeling too 😊</li>
            <li>• Perfect for breaking ties, sparking creativity, or just having a laugh</li>
          </ul>
        </div>

        <div className="text-center mt-4 md:mt-6">
          <Button
            onClick={onClose}
            className="gradient-primary text-white font-semibold px-6 md:px-8 py-2 text-sm md:text-base w-full sm:w-auto"
          >
            Got It! Let's Decide! 🚀
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HowItWorksModal;

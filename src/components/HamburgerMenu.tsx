
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Menu, X, Brain, Shuffle, Sparkles, BookOpen, Users } from 'lucide-react';
import SoundSettings from './SoundSettings';
import { useNavigate } from "react-router-dom";

interface HamburgerMenuProps {
  onFeatureSelect: (feature: string) => void;
}

const HamburgerMenu = ({ onFeatureSelect }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'decision-maker',
      title: 'Main Decision Maker',
      description: 'Get help with your tough choices',
      icon: Brain,
      emoji: '🧠',
      isDefault: true,
      onClick: () => onFeatureSelect('decision-maker')
    },
    {
      id: 'would-you-rather',
      title: 'Would You Rather?',
      description: 'Fun dilemmas to swipe through',
      icon: Shuffle,
      emoji: '🤔',
      onClick: () => onFeatureSelect('would-you-rather')
    },
    {
      id: 'daily-horoscope',
      title: 'Daily Vibe Horoscope',
      description: 'Get your decision-making energy reading',
      icon: Sparkles,
      emoji: '🔮',
      onClick: () => navigate("/horoscope")
    },
    {
      id: 'roast-my-day',
      title: 'Roast My Day',
      description: 'Let AI roast your daily decisions',
      icon: BookOpen,
      emoji: '📓',
      onClick: () => navigate("/roast")
    },
    {
      id: 'personality-quiz',
      title: 'Decision Personality Quiz',
      description: 'Discover your decision-making style',
      icon: Users,
      emoji: '🎭',
      onClick: () => navigate("/quiz")
    }
  ];

  const handleItemClick = (itemId: string, onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader className="text-center border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ✨ Extra Features
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Explore more ways to make decisions!
            </p>
          </DrawerHeader>

          <div className="p-6 space-y-4 overflow-y-auto">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="outline"
                  className={`w-full p-4 h-auto text-left justify-start hover:scale-105 transition-transform ${
                    item.isDefault ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200' : ''
                  }`}
                  onClick={() => handleItemClick(item.id, item.onClick)}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base flex items-center gap-2">
                        {item.title}
                        {item.isDefault && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Default</span>}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <IconComponent className="h-5 w-5 text-gray-400" />
                  </div>
                </Button>
              );
            })}

            {/* Replace the old sound toggle with the new SoundSettings component */}
            <SoundSettings />

            {/* Fun Footer */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3" />
                More features coming soon!
                <Sparkles className="h-3 w-3" />
              </p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;

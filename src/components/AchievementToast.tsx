
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Achievement } from '../types';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementToast = ({ achievement, onClose }: AchievementToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg border-0 max-w-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{achievement.emoji}</span>
          <div>
            <h4 className="font-bold text-sm">Achievement Unlocked!</h4>
            <p className="text-xs opacity-90">{achievement.title}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AchievementToast;

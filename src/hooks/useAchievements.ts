
import { useLocalStorage } from './useLocalStorage';
import { Achievement } from '../types';

const defaultAchievements: Achievement[] = [
  {
    id: 'first-decision',
    title: 'First Decision Made',
    description: 'Made your very first decision!',
    emoji: '🎉',
    unlocked: false,
  },
  {
    id: 'sassy-user',
    title: 'Went Full Sassy',
    description: 'Used Sassy Mode like the icon you are',
    emoji: '😏',
    unlocked: false,
  },
  {
    id: 'indecisive',
    title: 'Undecided Even After Picking',
    description: 'Hit "Run It Back" 5 times in a row',
    emoji: '🤔',
    unlocked: false,
  },
  {
    id: 'chaos-lover',
    title: 'Chaos Enjoyer',
    description: 'Used Random mode 10 times',
    emoji: '🎲',
    unlocked: false,
  },
  {
    id: 'logical-thinker',
    title: 'Big Brain Energy',
    description: 'Used Logic mode consistently',
    emoji: '🧠',
    unlocked: false,
  },
];

export function useAchievements() {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('achievements', defaultAchievements);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      )
    );
  };

  const getUnlockedCount = () => achievements.filter(a => a.unlocked).length;

  return { achievements, unlockAchievement, getUnlockedCount };
}

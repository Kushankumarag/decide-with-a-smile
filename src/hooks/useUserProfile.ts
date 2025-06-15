
import { useLocalStorage } from './useLocalStorage';
import { UserProfile, DecisionArchetype } from '../types';

export function useUserProfile() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('user-profile', {
    chaosLevel: 50,
    completedQuiz: false,
  });

  const updateArchetype = (archetype: DecisionArchetype, mascot: string) => {
    setProfile(prev => ({
      ...prev,
      archetype,
      mascot,
      completedQuiz: true,
    }));
  };

  const updateChaosLevel = (chaosLevel: number) => {
    setProfile(prev => ({ ...prev, chaosLevel }));
  };

  const resetProfile = () => {
    setProfile({
      chaosLevel: 50,
      completedQuiz: false,
    });
  };

  return {
    profile,
    updateArchetype,
    updateChaosLevel,
    resetProfile,
  };
}

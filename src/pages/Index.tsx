import { useState } from 'react';
import FeatureMenuBar from '@/components/FeatureMenuBar';
import Hero from '@/components/Hero';
import DecisionInput from '@/components/DecisionInput';
import DecisionResult from '@/components/DecisionResult';
import DecisionHistory from '@/components/DecisionHistory';
import { Mood } from '../types';
import { useDecisionHistory } from '../hooks/useDecisionHistory';
import { useAchievements } from '../hooks/useAchievements';
import AchievementToast from '@/components/AchievementToast';
import SecretModeUnlocker from '@/components/SecretModeUnlocker';

type AppState = 'hero' | 'input' | 'result' | 'history';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [decisionData, setDecisionData] = useState({
    mode: '',
    options: [] as string[],
    context: '',
    mood: undefined as Mood | undefined,
  });
  const [decisionKey, setDecisionKey] = useState(0);
  const [chaosMode, setChaosMode] = useState(false);
  const [newAchievement, setNewAchievement] = useState<any>(null);
  const [runItBackCount, setRunItBackCount] = useState(0);

  const { addDecision } = useDecisionHistory();
  const { achievements, unlockAchievement } = useAchievements();

  const handleStartDeciding = () => {
    setCurrentState('input');
  };

  const handleModeSelect = (mode: string, options: string[], context: string, mood?: Mood) => {
    setDecisionData({ mode, options, context, mood });
    setDecisionKey(prev => prev + 1);
    setRunItBackCount(0);
    setCurrentState('result');

    // Track achievements
    if (achievements.find(a => a.id === 'first-decision' && !a.unlocked)) {
      unlockAchievement('first-decision');
      setNewAchievement(achievements.find(a => a.id === 'first-decision'));
    }

    if (mode === 'sassy' && achievements.find(a => a.id === 'sassy-user' && !a.unlocked)) {
      unlockAchievement('sassy-user');
      setNewAchievement(achievements.find(a => a.id === 'sassy-user'));
    }
  };

  const handleDecideAgain = () => {
    setDecisionKey(prev => prev + 1);
    setRunItBackCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5 && achievements.find(a => a.id === 'indecisive' && !a.unlocked)) {
        unlockAchievement('indecisive');
        setNewAchievement(achievements.find(a => a.id === 'indecisive'));
      }
      return newCount;
    });
  };

  const handleDecisionComplete = (selectedOption: string) => {
    addDecision({
      options: decisionData.options,
      context: decisionData.context,
      selectedOption,
      mode: decisionData.mode,
      mood: decisionData.mood,
    });
  };

  const handleChangeMode = () => {
    setCurrentState('input');
  };

  const handleStartOver = () => {
    setDecisionData({ mode: '', options: [], context: '', mood: undefined });
    setDecisionKey(0);
    setRunItBackCount(0);
    setChaosMode(false);
    setCurrentState('hero');
  };

  const handleBack = () => {
    setCurrentState('hero');
  };

  const handleViewHistory = () => {
    setCurrentState('history');
  };

  const handleSecretModeUnlocked = () => {
    setChaosMode(true);
    // Could add more chaos mode effects here
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'hero':
        return (
          <SecretModeUnlocker onSecretModeUnlocked={handleSecretModeUnlocked}>
            <Hero 
              onStartDeciding={handleStartDeciding} 
              onViewHistory={handleViewHistory}
              chaosMode={chaosMode}
            />
          </SecretModeUnlocker>
        );
      case 'input':
        return (
          <DecisionInput 
            onModeSelect={handleModeSelect} 
            onBack={handleBack}
            initialOptions={decisionData.options.length > 0 ? decisionData.options : undefined}
            initialContext={decisionData.context}
            initialMood={decisionData.mood}
            chaosMode={chaosMode}
          />
        );
      case 'result':
        return (
          <DecisionResult
            key={decisionKey}
            mode={decisionData.mode}
            options={decisionData.options}
            context={decisionData.context}
            mood={decisionData.mood}
            onDecideAgain={handleDecideAgain}
            onStartOver={handleStartOver}
            onChangeMode={handleChangeMode}
            onDecisionComplete={handleDecisionComplete}
            chaosMode={chaosMode}
          />
        );
      case 'history':
        return <DecisionHistory onClose={handleBack} />;
      default:
        return (
          <Hero 
            onStartDeciding={handleStartDeciding} 
            onViewHistory={handleViewHistory}
            chaosMode={chaosMode}
          />
        );
    }
  };

  return (
    <>
      <FeatureMenuBar />
      {renderCurrentState()}
      {newAchievement && (
        <AchievementToast
          achievement={newAchievement}
          onClose={() => setNewAchievement(null)}
        />
      )}
    </>
  );
};

export default Index;

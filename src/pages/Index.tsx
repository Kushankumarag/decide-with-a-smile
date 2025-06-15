
import { useState } from 'react';
import Hero from '@/components/Hero';
import DecisionInput from '@/components/DecisionInput';
import DecisionResult from '@/components/DecisionResult';

type AppState = 'hero' | 'input' | 'result';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [decisionData, setDecisionData] = useState({
    mode: '',
    options: [] as string[],
    context: '',
  });

  const handleStartDeciding = () => {
    setCurrentState('input');
  };

  const handleModeSelect = (mode: string, options: string[], context: string) => {
    setDecisionData({ mode, options, context });
    setCurrentState('result');
  };

  const handleDecideAgain = () => {
    setCurrentState('result');
    // Force a re-render by updating the key
    setTimeout(() => setCurrentState('result'), 100);
  };

  const handleStartOver = () => {
    setDecisionData({ mode: '', options: [], context: '' });
    setCurrentState('hero');
  };

  const handleBack = () => {
    setCurrentState('hero');
  };

  switch (currentState) {
    case 'hero':
      return <Hero onStartDeciding={handleStartDeciding} />;
    case 'input':
      return <DecisionInput onModeSelect={handleModeSelect} onBack={handleBack} />;
    case 'result':
      return (
        <DecisionResult
          key={Date.now()} // Force re-render for decide again
          mode={decisionData.mode}
          options={decisionData.options}
          context={decisionData.context}
          onDecideAgain={handleDecideAgain}
          onStartOver={handleStartOver}
        />
      );
    default:
      return <Hero onStartDeciding={handleStartDeciding} />;
  }
};

export default Index;

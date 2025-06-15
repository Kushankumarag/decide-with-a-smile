
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
  const [decisionKey, setDecisionKey] = useState(0);

  const handleStartDeciding = () => {
    setCurrentState('input');
  };

  const handleModeSelect = (mode: string, options: string[], context: string) => {
    setDecisionData({ mode, options, context });
    setDecisionKey(prev => prev + 1);
    setCurrentState('result');
  };

  const handleDecideAgain = () => {
    setDecisionKey(prev => prev + 1);
  };

  const handleChangeMode = () => {
    setCurrentState('input');
  };

  const handleStartOver = () => {
    setDecisionData({ mode: '', options: [], context: '' });
    setDecisionKey(0);
    setCurrentState('hero');
  };

  const handleBack = () => {
    setCurrentState('hero');
  };

  switch (currentState) {
    case 'hero':
      return <Hero onStartDeciding={handleStartDeciding} />;
    case 'input':
      return (
        <DecisionInput 
          onModeSelect={handleModeSelect} 
          onBack={handleBack}
          initialOptions={decisionData.options.length > 0 ? decisionData.options : undefined}
          initialContext={decisionData.context}
        />
      );
    case 'result':
      return (
        <DecisionResult
          key={decisionKey}
          mode={decisionData.mode}
          options={decisionData.options}
          context={decisionData.context}
          onDecideAgain={handleDecideAgain}
          onStartOver={handleStartOver}
          onChangeMode={handleChangeMode}
        />
      );
    default:
      return <Hero onStartDeciding={handleStartDeciding} />;
  }
};

export default Index;

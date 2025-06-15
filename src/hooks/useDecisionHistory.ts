
import { useLocalStorage } from './useLocalStorage';
import { DecisionHistoryItem } from '../types';

export function useDecisionHistory() {
  const [history, setHistory] = useLocalStorage<DecisionHistoryItem[]>('decision-history', []);

  const addDecision = (decision: Omit<DecisionHistoryItem, 'id' | 'timestamp'>) => {
    const newDecision: DecisionHistoryItem = {
      ...decision,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setHistory(prev => [newDecision, ...prev].slice(0, 50)); // Keep last 50 decisions
  };

  const markAsRegretted = (id: string) => {
    setHistory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, regretted: true } : item
      )
    );
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addDecision, markAsRegretted, clearHistory };
}

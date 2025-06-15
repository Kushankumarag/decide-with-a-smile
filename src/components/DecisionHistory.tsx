
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDecisionHistory } from '../hooks/useDecisionHistory';
import { formatDistanceToNow } from 'date-fns';

interface DecisionHistoryProps {
  onClose: () => void;
}

const DecisionHistory = ({ onClose }: DecisionHistoryProps) => {
  const { history, markAsRegretted, clearHistory } = useDecisionHistory();

  const getModeEmoji = (mode: string) => {
    switch (mode) {
      case 'random': return '🎲';
      case 'ai': return '🤖';
      case 'logic': return '📊';
      case 'sassy': return '😂';
      default: return '✨';
    }
  };

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case 'chaotic': return 'text-red-500';
      case 'chill': return 'text-blue-500';
      case 'productivity': return 'text-green-500';
      case 'sassy': return 'text-pink-500';
      case 'logical': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto pt-4 md:pt-8">
        <Button 
          onClick={onClose}
          variant="ghost" 
          className="mb-4 md:mb-6 text-purple-600 hover:text-purple-800"
        >
          ← Back
        </Button>

        <Card className="p-4 md:p-8 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              My Questionable Past Decisions 🤡
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Your decision-making journey so far
            </p>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🤷‍♀️</div>
              <p className="text-gray-500">No decisions yet! Go make some choices!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {history.slice(0, 10).map((decision) => (
                  <Card key={decision.id} className={`p-4 ${decision.regretted ? 'bg-red-50 border-red-200' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{getModeEmoji(decision.mode)}</span>
                          <span className="font-semibold text-sm text-gray-700">
                            {decision.mode.charAt(0).toUpperCase() + decision.mode.slice(1)} Mode
                          </span>
                          {decision.mood && (
                            <span className={`text-xs font-medium ${getMoodColor(decision.mood)}`}>
                              • {decision.mood}
                            </span>
                          )}
                        </div>
                        
                        <div className="mb-2">
                          <span className="font-semibold text-purple-600">Picked: </span>
                          <span className="text-gray-800">{decision.selectedOption}</span>
                        </div>
                        
                        {decision.context && (
                          <p className="text-sm text-gray-600 mb-2">"{decision.context}"</p>
                        )}
                        
                        <div className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(decision.timestamp), { addSuffix: true })}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {!decision.regretted ? (
                          <Button
                            onClick={() => markAsRegretted(decision.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Regret this? 😅
                          </Button>
                        ) : (
                          <span className="text-red-500 text-xs font-medium">Regretted 🤡</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {history.length > 0 && (
                <div className="text-center">
                  <Button
                    onClick={clearHistory}
                    variant="outline"
                    className="text-red-500 border-red-300 hover:bg-red-50"
                  >
                    Clear All History 🗑️
                  </Button>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DecisionHistory;

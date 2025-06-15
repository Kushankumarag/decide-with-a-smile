
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PartyModeSession, PartyModePlayer } from '../types';
import { Users, Crown, Plus, Trash2 } from 'lucide-react';

interface PartyModeProps {
  onComplete: (options: string[], context: string) => void;
  onCancel: () => void;
  initialContext?: string;
}

const PartyMode = ({ onComplete, onCancel, initialContext }: PartyModeProps) => {
  const [session, setSession] = useState<PartyModeSession>({
    players: [{ name: '', isHost: true }],
    currentPlayerIndex: 0,
    suggestedOptions: [],
    isActive: false
  });
  const [currentOption, setCurrentOption] = useState('');
  const [context, setContext] = useState(initialContext || '');
  const [setupComplete, setSetupComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const addPlayer = () => {
    if (session.players.length < 6) {
      setSession(prev => ({
        ...prev,
        players: [...prev.players, { name: '', isHost: false }]
      }));
    }
  };

  const removePlayer = (index: number) => {
    if (session.players.length > 1 && !session.players[index].isHost) {
      setSession(prev => ({
        ...prev,
        players: prev.players.filter((_, i) => i !== index)
      }));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    setSession(prev => ({
      ...prev,
      players: prev.players.map((player, i) => 
        i === index ? { ...player, name } : player
      )
    }));
  };

  const startParty = () => {
    const validPlayers = session.players.filter(p => p.name.trim() !== '');
    if (validPlayers.length >= 2) {
      setSession(prev => ({
        ...prev,
        players: validPlayers,
        isActive: true
      }));
      setSetupComplete(true);
    }
  };

  const addOption = () => {
    if (currentOption.trim() !== '') {
      setSession(prev => ({
        ...prev,
        suggestedOptions: [...prev.suggestedOptions, currentOption.trim()]
      }));
      setCurrentOption('');
      nextPlayer();
    }
  };

  const nextPlayer = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSession(prev => ({
        ...prev,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length
      }));
      setIsAnimating(false);
    }, 500);
  };

  const finishParty = () => {
    if (session.suggestedOptions.length >= 2) {
      onComplete(session.suggestedOptions, context);
    }
  };

  const currentPlayer = session.players[session.currentPlayerIndex];

  if (!setupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎉 Party Mode Setup
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What are you deciding? 💭
            </label>
            <Input
              placeholder="e.g., Where should we go for dinner?"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                <Users className="inline w-4 h-4 mr-1" />
                Players ({session.players.length})
              </label>
              <Button
                onClick={addPlayer}
                variant="ghost"
                size="sm"
                disabled={session.players.length >= 6}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {session.players.map((player, index) => (
                <div key={index} className="flex gap-2 items-center">
                  {player.isHost && <Crown className="w-4 h-4 text-yellow-500" />}
                  <Input
                    placeholder={`Player ${index + 1} name...`}
                    value={player.name}
                    onChange={(e) => updatePlayerName(index, e.target.value)}
                    className="flex-1"
                  />
                  {!player.isHost && (
                    <Button
                      onClick={() => removePlayer(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={startParty}
              disabled={session.players.filter(p => p.name.trim() !== '').length < 2 || context.trim() === ''}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Start Party! 🎉
            </Button>
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className={`p-6 max-w-lg w-full transition-all duration-500 ${isAnimating ? 'scale-105 rotate-1' : ''}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            📱 Pass the Phone!
          </h2>
          <p className="text-gray-600">"{context}"</p>
        </div>

        <div className={`text-center mb-6 p-4 rounded-lg border-2 border-dashed transition-all duration-300 ${
          isAnimating ? 'border-yellow-400 bg-yellow-50' : 'border-purple-300 bg-purple-50'
        }`}>
          <div className="text-3xl mb-2">
            {currentPlayer?.isHost ? '👑' : '🎭'}
          </div>
          <h3 className="text-xl font-bold text-purple-700">
            {currentPlayer?.name}'s Turn!
          </h3>
          <p className="text-sm text-purple-600 mt-2">
            Suggest an option for the group
          </p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Your suggestion..."
            value={currentOption}
            onChange={(e) => setCurrentOption(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addOption()}
            className="text-center text-lg"
          />
        </div>

        {session.suggestedOptions.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Suggestions so far ({session.suggestedOptions.length}):
            </h4>
            <div className="flex flex-wrap gap-2">
              {session.suggestedOptions.map((option, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={addOption}
            disabled={currentOption.trim() === ''}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
          >
            Add & Pass 📱
          </Button>
          {session.suggestedOptions.length >= 2 && (
            <Button
              onClick={finishParty}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Decide! 🎯
            </Button>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {session.players.length - session.currentPlayerIndex - 1} players left this round
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PartyMode;

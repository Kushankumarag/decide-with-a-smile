
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';

interface DecisionInputProps {
  onModeSelect: (mode: string, options: string[], context: string) => void;
  onBack: () => void;
}

const DecisionInput = ({ onModeSelect, onBack }: DecisionInputProps) => {
  const [options, setOptions] = useState(['', '']);
  const [context, setContext] = useState('');

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleModeSelect = (mode: string) => {
    const validOptions = options.filter(option => option.trim() !== '');
    if (validOptions.length >= 2) {
      onModeSelect(mode, validOptions, context);
    }
  };

  const validOptions = options.filter(option => option.trim() !== '');
  const canProceed = validOptions.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-purple-600 hover:text-purple-800"
        >
          ← Back to Home
        </Button>

        <Card className="p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            What Are Your Options? 🤷‍♀️
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Enter at least 2 options you're considering
          </p>

          {/* Context Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Context (Optional) 💭
            </label>
            <Textarea
              placeholder="e.g., 'What to have for dinner tonight' or 'Which subject to study first'"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>

          {/* Options Input */}
          <div className="space-y-4 mb-8">
            <label className="block text-sm font-medium text-gray-700">
              Your Options ⚡
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-shrink-0 w-8 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-semibold">
                  {index + 1}
                </div>
                <Input
                  placeholder={`Option ${index + 1}...`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1"
                />
                {options.length > 2 && (
                  <Button
                    onClick={() => removeOption(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {options.length < 6 && (
              <Button
                onClick={addOption}
                variant="ghost"
                className="w-full border-2 border-dashed border-gray-300 text-gray-500 hover:border-purple-300 hover:text-purple-600 py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Option
              </Button>
            )}
          </div>

          {/* Decision Mode Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">
              Choose Your Decision Mode 🎯
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                onClick={() => handleModeSelect('random')}
                disabled={!canProceed}
                className="h-auto p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎲</div>
                  <div className="font-semibold">Random Pick</div>
                  <div className="text-xs opacity-90">Let fate decide!</div>
                </div>
              </Button>

              <Button
                onClick={() => handleModeSelect('ai')}
                disabled={!canProceed}
                className="h-auto p-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🤖</div>
                  <div className="font-semibold">AI Assistant</div>
                  <div className="text-xs opacity-90">Smart recommendations</div>
                </div>
              </Button>

              <Button
                onClick={() => handleModeSelect('logic')}
                disabled={!canProceed}
                className="h-auto p-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold">Logic Mode</div>
                  <div className="text-xs opacity-90">Data-driven choice</div>
                </div>
              </Button>

              <Button
                onClick={() => handleModeSelect('sassy')}
                disabled={!canProceed}
                className="h-auto p-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">😂</div>
                  <div className="font-semibold">Sassy Mode</div>
                  <div className="text-xs opacity-90">With personality!</div>
                </div>
              </Button>
            </div>

            {!canProceed && (
              <p className="text-center text-red-500 text-sm mt-4">
                Please enter at least 2 options to continue
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DecisionInput;


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const sampleRoasts = [
  "Wow, that’s a new level of questionable decision-making. Did you consult a goldfish or just your vibes?",
  "If overthinking was an Olympic sport, you'd win gold (then second-guess yourself about accepting it). 🤔",
  "You’re killing it! (No, really, you’re killing my faith in humanity.) 😅",
  "If your day was a meme, it’d be 'This is fine' dog. 🔥",
  "Next time, just flip a coin. It’ll probably have more confidence."
];

function getRandomRoast() {
  return sampleRoasts[Math.floor(Math.random() * sampleRoasts.length)];
}

export default function RoastMyDay() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [roast, setRoast] = useState<string | null>(null);
  const [showInputError, setShowInputError] = useState(false);

  // Simulated roast generator
  const handleRoast = () => {
    if (input.trim().length === 0) {
      setShowInputError(true);
      setRoast(null);
      return;
    }
    setRoast(`${getRandomRoast()} [About: ${input}]`);
    setShowInputError(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 via-pink-50 to-rose-50 p-4">
      <Card className="max-w-lg w-full mx-auto p-6 md:p-10 shadow-xl text-center border-2 border-orange-200 bg-white/70">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
          📓 Roast My Day
        </h1>
        <p className="text-md text-gray-600 mb-4">
          Enter something you did, a decision you made, or just how your day’s going.
        </p>
        <Textarea 
          value={input}
          placeholder="e.g., Ate cereal with water, or spent 2 hours watching cat videos"
          rows={2}
          className="mb-2"
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        {showInputError && (
          <div className="text-xs text-red-500 mb-2">Type something to roast 👈</div>
        )}
        <Button className="mb-2 w-full" onClick={handleRoast}>
          🔥 Roast me!
        </Button>
        {roast && (
          <Card className="bg-rose-50 border-2 border-rose-200 py-6 px-3 my-4 animate-wiggle">
            <p className="text-rose-700 font-semibold">{roast}</p>
          </Card>
        )}
        <Button onClick={() => navigate(-1)} variant="outline" className="mt-2 text-orange-700">
          ← Back
        </Button>
      </Card>
    </div>
  );
}

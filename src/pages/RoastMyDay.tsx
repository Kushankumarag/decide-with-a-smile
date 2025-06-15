import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useHuggingFaceApiKey } from "../hooks/useHuggingFaceApiKey";
import { fetchDeepSeekRoast } from "../utils/fetchDeepSeekRoast";
import { useRef } from "react";

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
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { apiKey, setApiKey } = useHuggingFaceApiKey();
  const apiInputRef = useRef<HTMLInputElement>(null);

  const handleGetRoast = async () => {
    setApiError(null);
    if (input.trim().length === 0) {
      setShowInputError(true);
      setRoast(null);
      return;
    }
    if (!apiKey) {
      setApiError("Please enter your Hugging Face API key to generate a roast.");
      return;
    }
    setLoading(true);
    try {
      const systemPrompt = `You're an internet comedian roasting people for fun. Craft a clever, light-hearted roast for: "${input}". Keep it under 3 sentences.`;
      const roastText = await fetchDeepSeekRoast({ prompt: systemPrompt, apiKey });
      setRoast(`${roastText} [About: ${input}]`);
      setShowInputError(false);
    } catch (err: any) {
      setApiError(
        err.message?.includes("401")
          ? "Invalid or expired Hugging Face API key."
          : `Failed to generate roast: ${err.message}`
      );
      setRoast(null);
    }
    setLoading(false);
  };

  // UI for setting Hugging Face API key
  const renderApiKeyInput = () => (
    <div className="bg-yellow-50 border border-yellow-300 p-4 rounded mb-4 text-left shadow flex flex-col items-start">
      <label className="font-semibold text-yellow-700 mb-1" htmlFor="hf-api-key">
        Enter your Hugging Face API Key:
      </label>
      <div className="w-full flex gap-2">
        <input
          id="hf-api-key"
          ref={apiInputRef}
          className="border rounded px-2 py-1 flex-1"
          type="password"
          autoComplete="off"
          placeholder="hf_..."
          defaultValue={apiKey ?? ""}
          style={{ minWidth: 0 }}
        />
        <Button
          type="button"
          onClick={() => {
            const value = apiInputRef.current?.value.trim();
            if (value) {
              setApiKey(value);
            }
          }}
          size="sm"
        >
          Save
        </Button>
        {apiKey && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setApiKey(null)}
            size="sm"
            className="text-red-700 border-red-300"
          >
            Clear
          </Button>
        )}
      </div>
      <span className="text-xs text-yellow-700 mt-2">
        Get your key at{" "}
        <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline">
          huggingface.co/settings/tokens
        </a>{" "}
        (requires a free account).
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 via-pink-50 to-rose-50 p-4">
      <Card className="max-w-lg w-full mx-auto p-6 md:p-10 shadow-xl text-center border-2 border-orange-200 bg-white/70">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
          📓 Roast My Day
        </h1>
        <p className="text-md text-gray-600 mb-4">
          Enter something you did, a decision you made, or just how your day’s going.
        </p>
        {renderApiKeyInput()}
        <Textarea 
          value={input}
          placeholder="e.g., Ate cereal with water, or spent 2 hours watching cat videos"
          rows={2}
          className="mb-2"
          onChange={e => setInput(e.target.value)}
          autoFocus
          disabled={loading}
        />
        {showInputError && (
          <div className="text-xs text-red-500 mb-2">Type something to roast 👈</div>
        )}
        <Button className="mb-2 w-full" onClick={handleGetRoast} disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">🔥</span> Roasting...
            </span>
          ) : (
            <>🔥 Roast me!</>
          )}
        </Button>
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded my-2">
            {apiError}
          </div>
        )}
        {roast && (
          <Card className="bg-rose-50 border-2 border-rose-200 py-6 px-3 my-4 animate-wiggle">
            <p className="text-rose-700 font-semibold whitespace-pre-line">{roast}</p>
          </Card>
        )}
        <Button onClick={() => navigate(-1)} variant="outline" className="mt-2 text-orange-700">
          ← Back
        </Button>
      </Card>
    </div>
  );
}

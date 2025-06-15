
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Share } from "lucide-react";

interface FeedbackPopupProps {
  answer: string;
  onClose: () => void;
}

const encouragements = [
  "Slay! Your feedback is iconic 💅",
  "TYSM for rating, bestie! 😘",
  "Sending virtual high fives! ✋✨",
  "Yasss, you’re a real one! 🙌",
  "W vibe detected! 💯"
];

const shareMessages = [
  "Check out what I got: ",
  "Spilled my decision tea: ",
  "Big brain choice unlocked: ",
  "What would you pick? ",
  "Brb, letting the universe decide: "
];

export default function FeedbackPopup({ answer, onClose }: FeedbackPopupProps) {
  const [rating, setRating] = useState(7);
  const [sent, setSent] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleRatingSubmit = () => {
    setSent(true);
    toast({
      title: encouragements[Math.floor(Math.random() * encouragements.length)],
      description: `You rated us ${rating}/10!`
    });
    setTimeout(onClose, 1700);
  };

  const handleShare = async () => {
    const message =
      shareMessages[Math.floor(Math.random() * shareMessages.length)] +
      `"${answer}" via Can't Decide 🤔 https://your-website-url.com`;

    if (navigator.share) {
      try {
        await navigator.share({ text: message });
        toast({ title: "Shared! 🚀", description: "Link sent!" });
      } catch {
        // ignored
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(message);
      toast({ title: "Copied to clipboard!", description: "Now go flex!" });
    }
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <Card className="w-full max-w-xs p-6 shadow-2xl border-2 border-purple-200 bg-white/90 text-center relative animate-scale-in">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 text-gray-400 hover:text-purple-500"
          onClick={onClose}
          aria-label="Close feedback"
        >
          ✖
        </Button>
        <h3 className="font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Drop your vibe check 🔥
        </h3>
        <p className="text-sm text-gray-500 mb-4">How would you rate this site out of 10?</p>
        <div className="mb-2 flex flex-col items-center gap-2">
          <Slider
            min={1}
            max={10}
            step={1}
            value={[rating]}
            onValueChange={val => setRating(val[0])}
            className="w-36"
          />
          <span className="font-semibold text-xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {rating}{" "}
            <span>
              {rating >= 9
                ? "🥵"
                : rating >= 7
                ? "😎"
                : rating >= 5
                ? "🤔"
                : rating >= 3
                ? "😅"
                : "💀"}
            </span>
          </span>
        </div>
        <Button
          onClick={handleRatingSubmit}
          className="w-full mt-4"
          disabled={sent}
        >
          {sent ? "Sent!" : "Send Rating"}
        </Button>
        <p className="text-xs text-gray-400 mt-5 mb-2">or</p>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 justify-center"
          onClick={handleShare}
          disabled={shareSuccess}
        >
          <Share className="h-4 w-4" />
          {shareSuccess ? "Shared!" : "Share your vibe"}
        </Button>
      </Card>
    </div>
  );
}


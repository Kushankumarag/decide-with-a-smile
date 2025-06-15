
// Removed FeatureMenuBar import
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const horoscopes = [
  {
    sign: "🌞 Decision Sun",
    text: "The stars align in your favor today—unless you choose pizza over tacos. Trust your intuition, but expect surprise plot twists!"
  },
  {
    sign: "✨ Cosmic Vibes",
    text: "Today’s vibe: chaotic good. Don’t overthink your decisions—your first instinct is probably correct (or at least funnier)."
  },
  {
    sign: "🪐 Saturn’s Spin",
    text: "It’s a perfect day for bold moves. But beware of indecision—prolonged hesitation may trigger spontaneous dance breaks."
  },
  {
    sign: "🌈 Lucky Juice",
    text: "Colorful socks and weird snack combos will bring you clarity. If in doubt, consult a rubber ducky."
  },
  {
    sign: "🔥 Spicy Energy",
    text: "One of your options is secretly the spiciest. Choose like no one’s watching (but your phone camera probably is)."
  }
];

export default function DailyHoroscope() {
  const navigate = useNavigate();

  // Randomly pick a horoscope for each mount
  const { sign, text } = useMemo(
    () => horoscopes[Math.floor(Math.random() * horoscopes.length)],
    []
  );

  return (
    <>
      {/* FeatureMenuBar removed from here */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4">
        <Card className="max-w-md w-full mx-auto p-6 md:p-10 shadow-xl text-center border-2 border-purple-200 bg-white/80">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🔮 Daily Vibe Horoscope
          </h1>
          <div className="text-5xl mb-2">{sign}</div>
          <p className="text-lg md:text-xl text-purple-700 font-medium mb-6">{text}</p>
          <Button onClick={() => navigate(-1)} variant="outline" className="mt-2 text-purple-700">
            ← Back
          </Button>
        </Card>
      </div>
    </>
  );
}

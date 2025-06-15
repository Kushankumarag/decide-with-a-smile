
import { Card } from "@/components/ui/card";

export default function DecisionLoading() {
  const loadingMemes = [
    "Calculating the vibes... 🧮✨",
    "Asking the universe... 🌌",
    "Consulting the meme council... 🏛️",
    "Loading wisdom.exe... 💻",
    "Summoning decision energy... ⚡"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="p-8 md:p-12 text-center max-w-xs md:max-w-md mx-auto">
        <div className="text-4xl md:text-6xl mb-4 md:mb-6 animate-spin">🎯</div>
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
          {loadingMemes[Math.floor(Math.random() * loadingMemes.length)]}
        </h2>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </Card>
    </div>
  )
}

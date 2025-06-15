
export const generateAIOptions = (context: string, existingOptions: string[]): string[] => {
  const contextLower = context.toLowerCase();
  const suggestions: string[] = [];

  // Food-related suggestions
  if (contextLower.includes('eat') || contextLower.includes('food') || contextLower.includes('dinner') || contextLower.includes('lunch')) {
    const foodSuggestions = [
      "Try something spicy and regret it later 🌶️💀",
      "Order from that place you've been avoiding 🤔",
      "Make a weird fusion combo 🌮🍕",
      "Go full goblin mode with snacks 🧌🍿",
      "Cook something you can't pronounce 👨‍🍳❓"
    ];
    suggestions.push(...foodSuggestions);
  }

  // Activity suggestions
  if (contextLower.includes('do') || contextLower.includes('activity') || contextLower.includes('today') || contextLower.includes('weekend')) {
    const activitySuggestions = [
      "Touch grass (literally go outside) 🌱",
      "Learn a completely useless skill 🎪",
      "Text that person you've been avoiding 📱👻",
      "Reorganize something unnecessarily 📦✨",
      "Have a solo dance party 💃🕺"
    ];
    suggestions.push(...activitySuggestions);
  }

  // Fashion/clothing suggestions
  if (contextLower.includes('wear') || contextLower.includes('outfit') || contextLower.includes('clothes')) {
    const fashionSuggestions = [
      "Dress like your favorite fictional character 🎭",
      "Wear something that sparks joy ✨👗",
      "Go full cottagecore aesthetic 🌻🧺",
      "Channel your inner villain era 😈🖤",
      "Comfort over style (valid choice) 🛋️👕"
    ];
    suggestions.push(...fashionSuggestions);
  }

  // Purchase/shopping suggestions
  if (contextLower.includes('buy') || contextLower.includes('purchase') || contextLower.includes('shopping')) {
    const shoppingSuggestions = [
      "Buy something completely impractical 🦄",
      "Invest in your future self 📈💪",
      "Get something that brings chaos 🌪️",
      "Support a small business instead 🏪💜",
      "Wait and see if you still want it tomorrow ⏰🤔"
    ];
    suggestions.push(...shoppingSuggestions);
  }

  // Travel/location suggestions
  if (contextLower.includes('go') || contextLower.includes('travel') || contextLower.includes('visit')) {
    const travelSuggestions = [
      "Go somewhere you've never been 🗺️✨",
      "Take the scenic route 🌄🚗",
      "Visit that place your friend recommended 👥📍",
      "Stay local and explore like a tourist 📸🏠",
      "Follow your GPS to somewhere random 🧭❓"
    ];
    suggestions.push(...travelSuggestions);
  }

  // Generic chaos suggestions
  const genericSuggestions = [
    "Do the opposite of what you'd normally do 🙃",
    "Ask a stranger for their opinion 👥❓",
    "Make it a group decision 🗳️",
    "Sleep on it (procrastination is valid) 😴",
    "Close your eyes and point 👆✨"
  ];

  suggestions.push(...genericSuggestions);

  // Filter out suggestions that are too similar to existing options
  const filteredSuggestions = suggestions.filter(suggestion => 
    !existingOptions.some(option => 
      suggestion.toLowerCase().includes(option.toLowerCase()) || 
      option.toLowerCase().includes(suggestion.toLowerCase())
    )
  );

  // Return 2 random suggestions
  const shuffled = filteredSuggestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
};

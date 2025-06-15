import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import DecisionResultCard from './DecisionResultCard';
import DecisionLoading from './DecisionLoading';
import { Mood } from '../types';
import { SoundMode } from '../hooks/useSoundEffects';

interface DecisionResultProps {
  mode: string;
  options: string[];
  context: string;
  mood?: Mood;
  onDecideAgain: () => void;
  onStartOver: () => void;
  onChangeMode: () => void;
  onDecisionComplete: (selectedOption: string) => void;
  chaosMode?: boolean;
}

const DecisionResult = (props: DecisionResultProps) => {
  const [result, setResult] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [memeReaction, setMemeReaction] = useState<string>('');
  const [isRevealing, setIsRevealing] = useState(true);
  const [explanation, setExplanation] = useState<string>('');
  const [soundTriggered, setSoundTriggered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Map decision modes to sound modes
  const getSoundMode = (): SoundMode => {
    switch (props.mode) {
      case 'random': return 'random';
      case 'ai': return 'ai';
      case 'logic': return 'logic';
      case 'sassy': return 'sassy';
      case 'reverse': return 'reverse';
      case 'party': return 'party';
      default: return 'random';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateDecision();
      setIsRevealing(false);
      
      // Trigger confetti with enhanced effects for sound modes
      const confettiOptions = {
        particleCount: props.chaosMode ? 200 : 100,
        spread: props.chaosMode ? 100 : 70,
        origin: { y: 0.6 },
        colors: props.chaosMode ? ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] : undefined
      };
      
      // Add screen shake effect for dramatic modes
      if (['party', 'sassy', 'random'].includes(props.mode)) {
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 500);
      }
      
      confetti(confettiOptions);
    }, 2000);

    return () => clearTimeout(timer);
  }, [props.mode, props.options, props.chaosMode]);

  const generateDecision = () => {
    let selectedOption: string;
    let decisionMessage: string;
    let meme: string;
    let aiExplanation: string = '';

    // Mood-influenced decision messages
    const getMoodInfluencedMessages = (baseMood: string) => {
      if (!props.mood) return baseMood;
      
      switch (props.mood) {
        case 'chaotic':
          return baseMood + " Chaos theory approves! 🌪️";
        case 'chill':
          return "Taking it easy with this choice... " + baseMood + " 😌";
        case 'productivity':
          return "Time to get stuff done! " + baseMood + " 💪";
        case 'sassy':
          return baseMood + " Period! 💅";
        case 'logical':
          return "Logic has computed: " + baseMood + " 🤓";
        default:
          return baseMood;
      }
    };

    const memeReactions = [
      "This is the way! 🤌",
      "Big brain energy! 🧠✨",
      "Chef's kiss! 👨‍🍳💋",
      "It's giving main character vibes! 💅",
      "No cap, this is it! 🧢",
      "Periodt! 💯",
      "That's bussin! 🔥",
      "Living your best life! ✨",
      "Slay queen/king! 👑",
      "Touch grass? Nah, touch this decision! 🌱"
    ];

    switch (props.mode) {
      case 'random':
        selectedOption = props.options[Math.floor(Math.random() * props.options.length)];
        const randomMessages = [
          "The RNG gods have spoken! 🎲",
          "Plot twist: The universe picked this! 🌌",
          "Random.exe has executed successfully! 💻",
          "Chaos chose chaos... and this! 🌪️",
          "The dice said 'yeet' and landed on this! 🎯"
        ];
        decisionMessage = getMoodInfluencedMessages(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
        break;
        
      case 'ai':
        selectedOption = props.options[Math.floor(Math.random() * props.options.length)];
        const aiMessages = [
          "My neural networks are vibing with this choice! 🤖🧠",
          "After calculating 42 million possibilities... this! 🔢",
          "Beep boop... optimal choice detected! 🤖✨",
          "My AI brain says: 'This one sparks joy!' 🎯",
          "Processing... Processing... EUREKA! This is it! 💡"
        ];
        decisionMessage = getMoodInfluencedMessages(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
        
        // Generate AI explanation
        const explanations = [
          "Based on a 0.0001% increase in serotonin levels when you read this option.",
          "My algorithms detected superior vibes emanating from this choice.",
          "After consulting the universal probability matrix, this scored highest.",
          "Neural pathway analysis suggests this option will cause 23% more happiness.",
          "Quantum mechanics and pure luck both pointed to this one."
        ];
        aiExplanation = explanations[Math.floor(Math.random() * explanations.length)];
        break;
        
      case 'logic':
        selectedOption = props.options[0];
        const logicMessages = [
          "The data doesn't lie... unlike my ex! 📊💔",
          "Science says this is the move! 🔬",
          "Logic has entered the chat! 🧮",
          "Math is mathing perfectly here! ➕➖",
          "My spreadsheet is crying tears of joy! 📈😭"
        ];
        decisionMessage = getMoodInfluencedMessages(logicMessages[Math.floor(Math.random() * logicMessages.length)]);
        break;
        
      case 'sassy':
        selectedOption = props.options[Math.floor(Math.random() * props.options.length)];
        const sassyMessages = [
          "Bestie, were you really gonna pick anything else? 💅",
          "Not me having to explain basic decisions! 🙄💖",
          "The audacity to doubt this choice! 😤✨",
          "Main character energy is choosing this! 🌟",
          "Sorry not sorry, but this is THE choice! 💋"
        ];
        decisionMessage = getMoodInfluencedMessages(sassyMessages[Math.floor(Math.random() * sassyMessages.length)]);
        break;

      case 'reverse':
        selectedOption = props.options[0]; // Always pick the first (intended as "worst") option
        const reverseMessages = [
          "What if we were wrong... but confidently? 🙃",
          "Sometimes the worst choice is the best choice! 🤪",
          "Plot twist: Going against the grain! 🌾",
          "Reverse psychology activated! This is definitely NOT what you should do... 😉",
          "Breaking news: We're doing the opposite! 📰🙃"
        ];
        decisionMessage = getMoodInfluencedMessages(reverseMessages[Math.floor(Math.random() * reverseMessages.length)]);
        aiExplanation = "Based on advanced reverse psychology algorithms, this is probably the choice you're trying to avoid... which makes it perfect! 🧠🙃";
        break;

      case 'party':
        selectedOption = props.options[Math.floor(Math.random() * props.options.length)];
        const partyMessages = [
          "The squad has spoken! 🎉👥",
          "Party mode collective wisdom activated! 🧠✨",
          "Your friends know what's up! 👯‍♀️",
          "Group chat energy chose this! 💬🔥",
          "The people have decided! Democracy wins! 🗳️✨"
        ];
        decisionMessage = getMoodInfluencedMessages(partyMessages[Math.floor(Math.random() * partyMessages.length)]);
        aiExplanation = "Multiple minds came together to suggest this option. The power of friendship and collective decision-making! 👥💪";
        break;
        
      default:
        selectedOption = props.options[0];
        decisionMessage = "Here's your pick!";
    }

    meme = memeReactions[Math.floor(Math.random() * memeReactions.length)];
    setResult(selectedOption);
    setMessage(decisionMessage);
    setMemeReaction(meme);
    setExplanation(aiExplanation);
    
    // Notify parent component
    props.onDecisionComplete(selectedOption);
  };

  if (isRevealing) {
    return <DecisionLoading />;
  }

  return (
    <DecisionResultCard
      {...props}
      result={result}
      message={message}
      memeReaction={memeReaction}
      explanation={explanation}
      getSoundMode={getSoundMode}
    />
  );
};

export default DecisionResult;

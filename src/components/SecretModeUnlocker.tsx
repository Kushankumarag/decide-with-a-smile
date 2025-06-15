
import { useState, useEffect } from 'react';

interface SecretModeUnlockerProps {
  onSecretModeUnlocked: () => void;
  children: React.ReactNode;
}

const SecretModeUnlocker = ({ onSecretModeUnlocked, children }: SecretModeUnlockerProps) => {
  const [emojiSequence, setEmojiSequence] = useState<string[]>([]);
  const secretSequence = ['🎲', '💡', '🤖'];

  useEffect(() => {
    if (emojiSequence.length === 3) {
      if (JSON.stringify(emojiSequence) === JSON.stringify(secretSequence)) {
        onSecretModeUnlocked();
      }
      setEmojiSequence([]);
    }
  }, [emojiSequence, onSecretModeUnlocked]);

  const handleEmojiClick = (emoji: string) => {
    setEmojiSequence(prev => [...prev, emoji].slice(-3));
  };

  return (
    <div onClick={(e) => {
      const target = e.target as HTMLElement;
      const emoji = target.textContent;
      if (emoji && /[\u{1F300}-\u{1F9FF}]/u.test(emoji)) {
        handleEmojiClick(emoji);
      }
    }}>
      {children}
    </div>
  );
};

export default SecretModeUnlocker;

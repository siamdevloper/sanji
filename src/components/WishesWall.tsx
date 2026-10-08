import React, { useState } from 'react';
import { Send, MessageCircleHeart, Heart, Sparkles, Star, Crown } from 'lucide-react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';

interface WishesWallProps {
  theme: 'glass' | 'brutalism';
}

interface Wish {
  id: number;
  sender: string;
  text: string;
  badge: string;
  icon: typeof Heart;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: 1,
    sender: 'Siam',
    text: 'Happiest Birthday to the one and only Queen! May your year be as bright and sparkling as your soul!',
    badge: 'SIAM',
    icon: Sparkles,
  },
  {
    id: 2,
    sender: 'Siam',
    text: 'May Allah shower your life with infinite blessings, health, smiles and happiness on this 26th of September!',
    badge: 'SIAM',
    icon: Crown,
  },
  {
    id: 3,
    sender: 'With Endless Love',
    text: 'Shamsunnahar, SANJI, SHIMPANJI — 3 names, infinite charisma! Keep rocking and conquering the world!',
    badge: 'SPECIAL',
    icon: Star,
  },
];

const PRESET_BLESSINGS = [
  'Stay Happy Always!',
  'Queen Forever!',
  'Happy 26 September!',
  'Keep Shining Bright!',
  'You Are The Best!',
];

export const WishesWall: React.FC<WishesWallProps> = ({ theme }) => {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [customWish, setCustomWish] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleSendWish = (textToSend?: string) => {
    const text = textToSend || customWish.trim();
    if (!text) return;

    audioSynth.playFanfare();
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#ff3388', '#00f0ff', '#ffe600', '#ffffff'],
    });

    const newWish: Wish = {
      id: Date.now(),
      sender: senderName.trim() || 'Well Wisher',
      text: text,
      badge: 'NEW BLESSING',
      icon: Heart,
    };

    setWishes([newWish, ...wishes]);
    setCustomWish('');
  };

  return (
    <section id="wishes" className="py-6 px-4 w-full max-w-md mx-auto">
      <div
        className={`p-4 sm:p-6 rounded-3xl transition-all duration-500 ${
          theme === 'glass'
            ? 'ultra-glass border-cyan-400/40 shadow-glass-lg'
            : 'neo-card bg-white'
        }`}
      >
        {/* Title */}
        <div className="text-center mb-5">
          <span
            className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 ${
              theme === 'glass'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'neo-tag bg-[#00f0ff] text-black'
            }`}
          >
            <MessageCircleHeart className="w-3.5 h-3.5 shrink-0" />
            <span>Interactive Wishes Wall</span>
          </span>
          <h3
            className={`text-base sm:text-xl font-extrabold mt-2 ${
              theme === 'glass' ? 'text-white text-glow-cyan' : 'text-black font-brutal'
            }`}
          >
            Leave a Birthday Blessing
          </h3>
        </div>

        {/* Quick Tap Blessing Pills */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-4">
          {PRESET_BLESSINGS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendWish(p)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 ${
                theme === 'glass'
                  ? 'bg-white/10 hover:bg-white/20 text-pink-200 border border-white/25 hover:border-pink-300'
                  : 'bg-[#ffe600] border-2 border-black text-black font-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500 shrink-0" />
              <span>{p}</span>
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="space-y-2 mb-5">
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your Name (e.g. Siam / Friend)..."
            className={`w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-semibold outline-none transition-all ${
              theme === 'glass'
                ? 'bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:border-cyan-400'
                : 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_#000]'
            }`}
          />

          <div className="flex gap-1.5 sm:gap-2">
            <input
              type="text"
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendWish()}
              placeholder="Type your heartfelt wish..."
              className={`flex-1 min-w-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-semibold outline-none transition-all ${
                theme === 'glass'
                  ? 'bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:border-pink-400'
                  : 'bg-white border-2 border-black text-black shadow-[2px_2px_0px_#000]'
              }`}
            />
            <button
              onClick={() => handleSendWish()}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-black flex items-center justify-center gap-1 transition-all active:scale-95 shrink-0 ${
                theme === 'glass'
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-glass-pink'
                  : 'bg-[#ff3388] text-white border-2 border-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Send className="w-3.5 h-3.5 shrink-0" />
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Wishes Feed */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {wishes.map((w) => {
            const Icon = w.icon;
            return (
              <div
                key={w.id}
                className={`p-3.5 rounded-2xl transition-all ${
                  theme === 'glass'
                    ? 'ultra-glass border-white/20'
                    : 'bg-[#fff0f6] border-2 border-black shadow-[3px_3px_0px_#000]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-black ${theme === 'glass' ? 'text-cyan-300' : 'text-black'}`}>
                    {w.sender}
                  </span>
                  <Icon className="w-4 h-4 text-pink-400" />
                </div>
                <p className={`text-xs ${theme === 'glass' ? 'text-pink-100' : 'text-zinc-800 font-medium'}`}>
                  {w.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

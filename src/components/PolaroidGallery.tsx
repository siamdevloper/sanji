import React, { useState } from 'react';
import { Heart, Sparkles, RefreshCw, Flower2, Gem, Crown, Camera, Mail } from 'lucide-react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PolaroidGalleryProps {
  theme: 'glass' | 'brutalism';
}

interface MemoryCard {
  id: number;
  name: string;
  nameFont: string;
  nameColor: string;
  subtitle: string;
  quote: string;
  secretBackNote: string;
  icon: typeof Flower2;
  accent: string;
  likes: number;
}

const MEMORIES: MemoryCard[] = [
  {
    id: 1,
    name: 'Shamsunnahar',
    nameFont: 'font-shamsunnahar text-2xl sm:text-3xl font-bold',
    nameColor: 'text-[#ff3388]',
    subtitle: 'The Sweet Soul',
    quote: 'Bringing endless warmth, soft laughs, and kindness wherever you go.',
    secretBackNote: 'Secret Note: Shamsunnahar, your heart is pure gold. Never stop spreading that beautiful gentle smile of yours!',
    icon: Flower2,
    accent: '#ff3388',
    likes: 128,
  },
  {
    id: 2,
    name: 'SANJI',
    nameFont: 'font-sanji italic text-2xl font-black',
    nameColor: 'text-[#00f0ff]',
    subtitle: 'The Brightest Star',
    quote: 'Graceful, high-spirited, elegant, and reaching for the highest skies.',
    secretBackNote: 'Secret Note: SANJI, your potential has no limits. This 26 September marks the beginning of your biggest victories!',
    icon: Gem,
    accent: '#00f0ff',
    likes: 240,
  },
  {
    id: 3,
    name: 'SHIMPANJI',
    nameFont: 'font-shimpanji text-lg sm:text-xl font-black tracking-widest uppercase',
    nameColor: 'text-white',
    subtitle: 'The Queen of September',
    quote: 'Unstoppable, irreplaceable, unique, and deeply celebrated by Siam.',
    secretBackNote: 'Secret Note: SHIMPANJI, always remember how truly special and cherished you are. Happy Birthday Queen!',
    icon: Crown,
    accent: '#ffe600',
    likes: 365,
  },
];

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ theme }) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [likesState, setLikesState] = useState<{ [key: number]: number }>({
    1: 128,
    2: 240,
    3: 365,
  });

  const toggleFlip = (id: number) => {
    audioSynth.playSparkle();
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    audioSynth.playHeartPop();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#ff3388', '#00f0ff', '#ffffff'],
    });
    setLikesState((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <section id="memories" className="py-6 px-4 w-full max-w-md mx-auto">
      <div
        className={`p-4 sm:p-6 rounded-3xl transition-all duration-500 ${
          theme === 'glass'
            ? 'ultra-glass border-white/25 shadow-glass-lg'
            : 'neo-card bg-white'
        }`}
      >
        {/* Title */}
        <div className="text-center mb-5">
          <span
            className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 ${
              theme === 'glass'
                ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40'
                : 'neo-tag bg-[#ffe600] text-black'
            }`}
          >
            <Camera className="w-3.5 h-3.5 shrink-0" />
            <span>Interactive 3D Polaroid Wall</span>
          </span>
          <h3
            className={`text-base sm:text-xl font-extrabold mt-2 ${
              theme === 'glass' ? 'text-white text-glow-pink' : 'text-black font-brutal'
            }`}
          >
            Tap Cards to Flip Secret Notes!
          </h3>
          <p
            className={`text-[11px] mt-1 ${
              theme === 'glass' ? 'text-cyan-200' : 'text-zinc-600 font-bold'
            }`}
          >
            3 special identities of the Queen • Flip to read what's on the back
          </p>
        </div>

        {/* 3D Flip Polaroid Cards */}
        <div className="space-y-3.5 sm:space-y-4">
          {MEMORIES.map((card, idx) => {
            const isFlipped = flippedCards.includes(card.id);
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="perspective-1000 cursor-pointer select-none"
              >
                {/* Washi Tape Header */}
                <div className="flex justify-center -mb-3 relative z-20">
                  <div
                    className={`h-3.5 sm:h-4 w-20 sm:w-24 rounded-sm transform ${
                      idx % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'
                    } ${
                      theme === 'glass'
                        ? 'bg-pink-400/40 backdrop-blur-md border border-white/50 shadow-sm'
                        : 'bg-[#ffe600] border-2 border-black'
                    }`}
                  />
                </div>

                {/* Card Container */}
                <div
                  className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-500 transform active:scale-98 ${
                    idx % 2 === 0 ? 'rotate-[-0.8deg]' : 'rotate-[0.8deg]'
                  } ${
                    theme === 'glass'
                      ? 'ultra-glass border-white/30 hover:border-pink-300'
                      : 'bg-[#fff0f6] border-2 sm:border-3 border-black shadow-[4px_4px_0px_#18181b] sm:shadow-[6px_6px_0px_#18181b]'
                  }`}
                >
                  {!isFlipped ? (
                    /* Front Side */
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Avatar / Holographic Polaroid Frame with SVG Vector */}
                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center shadow-inner relative overflow-hidden shrink-0 ${
                          theme === 'glass'
                            ? 'bg-gradient-to-tr from-pink-500/30 via-white/10 to-cyan-400/30 border border-white/40 text-white'
                            : 'bg-[#00f0ff] border-2 border-black shadow-[2px_2px_0px_#000] text-black'
                        }`}
                      >
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider mt-0.5 sm:mt-1 opacity-80">
                          SEP 26
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <h4
                            className={`${card.nameFont} ${card.nameColor} truncate`}
                            style={theme === 'brutalism' && card.id === 3 ? { color: '#000' } : {}}
                          >
                            {card.name}
                          </h4>

                          <button
                            onClick={(e) => handleLike(e, card.id)}
                            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-black transition-transform active:scale-125 shrink-0 ${
                              theme === 'glass'
                                ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40'
                                : 'bg-[#ff3388] text-white border border-black'
                            }`}
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            <span>{likesState[card.id]}</span>
                          </button>
                        </div>

                        <p
                          className={`text-xs font-bold ${
                            theme === 'glass' ? 'text-cyan-200' : 'text-zinc-700'
                          }`}
                        >
                          {card.subtitle}
                        </p>

                        <p
                          className={`text-xs mt-1.5 italic ${
                            theme === 'glass' ? 'text-pink-50' : 'text-zinc-800 font-medium'
                          }`}
                        >
                          "{card.quote}"
                        </p>

                        <div className="mt-2 flex items-center gap-1 text-[10px] text-pink-300 font-semibold">
                          <RefreshCw className="w-3 h-3" />
                          <span>Tap to flip card</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Back Side (Secret Handwritten Note) */
                    <div className="p-2 space-y-2 animate-float-fast">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-cyan-300 inline-flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Back of {card.name}'s Polaroid</span>
                        </span>
                        <Mail className="w-4 h-4 text-pink-400" />
                      </div>
                      <p
                        className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                          theme === 'glass' ? 'text-pink-100' : 'text-black font-bold'
                        }`}
                      >
                        {card.secretBackNote}
                      </p>
                      <div className="pt-2 border-t border-pink-400/20 flex items-center justify-between text-[11px] opacity-80">
                        <span>Tap again to flip back</span>
                        <span>26 Sep Queen</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Gem, Flower2, Crown, Gift } from 'lucide-react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SurpriseGiftsProps {
  theme: 'glass' | 'brutalism';
}

interface GiftItem {
  id: number;
  title: string;
  icon: typeof Gem;
  badge: string;
  reward: string;
  description: string;
  colorClass: string;
  brutalClass: string;
}

const GIFTS: GiftItem[] = [
  {
    id: 1,
    title: 'Surprise Box #1',
    icon: Gem,
    badge: 'LUCKY CHARM',
    reward: 'Infinite Good Luck & Radiant Sunshine!',
    description: 'A magical token of luck and joy for every day of your 26 September year.',
    colorClass: 'ultra-glass-pink border-pink-400/50',
    brutalClass: 'neo-yellow',
  },
  {
    id: 2,
    title: 'Surprise Box #2',
    icon: Flower2,
    badge: 'PURE HAPPINESS',
    reward: '100,000 Reasons to Smile Every Day!',
    description: 'Guaranteed laughter, fun memories, and sweet moments around every corner.',
    colorClass: 'ultra-glass-cyan border-cyan-400/50',
    brutalClass: 'neo-cyan',
  },
  {
    id: 3,
    title: 'Surprise Box #3',
    icon: Crown,
    badge: 'ROYAL TREATMENT',
    reward: 'VIP Pampering & Lifetime Support from Siam!',
    description: 'Unconditional love, encouragement, protection, and cheerleading forever.',
    colorClass: 'ultra-glass-white border-white/60',
    brutalClass: 'neo-pink',
  },
];

export const SurpriseGifts: React.FC<SurpriseGiftsProps> = ({ theme }) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);

  const handleOpenGift = (id: number) => {
    if (!openedGifts.includes(id)) {
      audioSynth.playFanfare();
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#ff3388', '#00f0ff', '#ffe600', '#ffffff'],
      });
      setOpenedGifts([...openedGifts, id]);
    } else {
      audioSynth.playTone(700, 0.1);
    }
  };

  const handleOpenAll = () => {
    audioSynth.playFanfare();
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ff3388', '#00f0ff', '#ffe600', '#ffffff'],
    });
    setOpenedGifts([1, 2, 3]);
  };

  return (
    <section id="gifts" className="py-6 px-4 w-full max-w-md mx-auto">
      <div
        className={`p-4 sm:p-6 rounded-3xl transition-all duration-500 ${
          theme === 'glass'
            ? 'ultra-glass border-pink-400/40 shadow-glass-lg'
            : 'neo-card bg-white'
        }`}
      >
        {/* Title & Progress Bar */}
        <div className="text-center mb-5">
          <span
            className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 ${
              theme === 'glass'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'neo-tag bg-[#ff3388] text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5 shrink-0" />
            <span>Birthday Gift Unboxing</span>
          </span>
          <h3
            className={`text-base sm:text-xl font-extrabold mt-2 ${
              theme === 'glass' ? 'text-white text-glow-cyan' : 'text-black font-brutal'
            }`}
          >
            Unwrap Your 3 Virtual Gifts!
          </h3>

          {/* Progress Pill */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="w-32 sm:w-36 h-2.5 rounded-full bg-black/20 overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${(openedGifts.length / 3) * 100}%` }}
              />
            </div>
            <span className={`text-[11px] font-black ${theme === 'glass' ? 'text-pink-200' : 'text-zinc-700'}`}>
              {openedGifts.length}/3 Opened
            </span>
          </div>
        </div>

        {/* Gift Boxes */}
        <div className="space-y-3 sm:space-y-3.5">
          {GIFTS.map((item) => {
            const isOpened = openedGifts.includes(item.id);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenGift(item.id)}
                className={`p-3.5 sm:p-4.5 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 active:scale-95 ${
                  theme === 'glass'
                    ? isOpened
                      ? `${item.colorClass} shadow-glass-cyan`
                      : 'ultra-glass hover:border-pink-400/60'
                    : isOpened
                    ? `${item.brutalClass} border-3 border-black shadow-[5px_5px_0px_#000] sm:shadow-[6px_6px_0px_#000]`
                    : 'bg-[#fff0f6] border-2 sm:border-3 border-black shadow-[4px_4px_0px_#18181b] sm:shadow-[5px_5px_0px_#18181b]'
                }`}
              >
                <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                  <div className="flex items-start gap-2.5 sm:gap-3.5 flex-1 min-w-0">
                    {/* Gift Icon Box */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform shrink-0 ${
                        !isOpened ? 'animate-wiggle' : 'scale-110'
                      } ${
                        theme === 'glass'
                          ? 'bg-white/15 border border-white/30 backdrop-blur-md shadow-inner text-white'
                          : 'border-2 border-black bg-white shadow-[2px_2px_0px_#000] text-black'
                      }`}
                    >
                      {isOpened ? (
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
                      ) : (
                        <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-pink-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            theme === 'glass'
                              ? 'bg-pink-500/30 text-pink-200 border border-pink-400/30'
                              : 'neo-tag bg-[#ffe600] text-black text-[9px] py-0 px-2'
                          }`}
                        >
                          {item.badge}
                        </span>
                        {isOpened && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        )}
                      </div>

                      <h4
                        className={`text-sm sm:text-base font-black mt-1 truncate ${
                          theme === 'glass' ? 'text-white' : 'text-inherit font-brutal'
                        }`}
                      >
                        {item.title}
                      </h4>

                      <p
                        className={`text-[11px] sm:text-xs mt-0.5 font-bold ${
                          theme === 'glass'
                            ? isOpened ? 'text-cyan-200' : 'text-pink-200/80'
                            : isOpened ? 'text-inherit font-black' : 'text-zinc-600'
                        }`}
                      >
                        {isOpened ? item.reward : 'Tap to reveal surprise contents!'}
                      </p>

                      {isOpened && (
                        <p className={`text-[10px] sm:text-[11px] mt-1 italic ${theme === 'glass' ? 'text-pink-100/80' : 'text-zinc-800'}`}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-xs font-black shrink-0">
                    {isOpened ? (
                      <span className="opacity-80">Unboxed</span>
                    ) : (
                      <span
                        className={`px-3 py-1.5 rounded-xl text-[10px] uppercase font-black ${
                          theme === 'glass'
                            ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-md'
                            : 'bg-black text-white'
                        }`}
                      >
                        OPEN
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unlock All Button */}
        {openedGifts.length < 3 && (
          <div className="mt-4 text-center">
            <button
              onClick={handleOpenAll}
              className={`text-xs font-black px-4 py-2 rounded-full transition-all active:scale-95 inline-flex items-center gap-1.5 ${
                theme === 'glass'
                  ? 'bg-white/10 hover:bg-white/20 text-pink-200 border border-white/20'
                  : 'neo-tag bg-[#ffe600] text-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open All Gifts at Once</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';
import { PartyPopper, RefreshCw, Sparkles, Heart, Star, Crown, Gem, Flower2 } from 'lucide-react';

interface BalloonPopperProps {
  theme: 'glass' | 'brutalism';
}

interface Balloon {
  id: number;
  color: string;
  label: string;
  wish: string;
  icon: typeof Heart;
  popped: boolean;
}

export const BalloonPopper: React.FC<BalloonPopperProps> = ({ theme }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([
    { id: 1, color: '#ff3388', label: 'Joy', wish: 'Unlimited Smiles!', icon: Flower2, popped: false },
    { id: 2, color: '#00f0ff', label: 'Sparkle', wish: 'Eternal Radiance!', icon: Gem, popped: false },
    { id: 3, color: '#ffe600', label: 'Success', wish: 'Grand Triumphs!', icon: Star, popped: false },
    { id: 4, color: '#ff70a6', label: 'Love', wish: 'Endless Warmth!', icon: Heart, popped: false },
    { id: 5, color: '#a0c4ff', label: 'Peace', wish: 'Tranquil Heart!', icon: Crown, popped: false },
  ]);

  const [poppedCount, setPoppedCount] = useState(0);
  const [lastWish, setLastWish] = useState<string | null>(null);

  const popBalloon = (id: number) => {
    const target = balloons.find((b) => b.id === id);
    if (target) {
      setLastWish(target.wish);
    }
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setPoppedCount((c) => c + 1);
    audioSynth.playSparkle();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ff3388', '#00f0ff', '#ffe600', '#ffffff'],
    });
  };

  const resetBalloons = () => {
    setBalloons((prev) => prev.map((b) => ({ ...b, popped: false })));
    setPoppedCount(0);
    setLastWish(null);
    audioSynth.playTone(880, 0.2);
  };

  return (
    <section id="games" className="py-6 px-4 w-full max-w-md mx-auto">
      <div
        className={`p-4 sm:p-6 rounded-3xl text-center transition-all duration-500 ${
          theme === 'glass'
            ? 'ultra-glass border-pink-400/40 shadow-glass-lg'
            : 'neo-cyan'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1 ${
              theme === 'glass'
                ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40'
                : 'neo-tag bg-[#ffe600] text-black'
            }`}
          >
            <PartyPopper className="w-3.5 h-3.5 shrink-0" />
            <span>Mini Game</span>
          </span>

          <span className={`text-xs font-black ${theme === 'glass' ? 'text-cyan-300' : 'text-black'}`}>
            Popped: {poppedCount}/5
          </span>
        </div>

        <h3
          className={`text-base sm:text-lg font-extrabold mb-1 ${
            theme === 'glass' ? 'text-white text-glow-pink' : 'text-black font-brutal'
          }`}
        >
          Pop the Birthday Wish Balloons!
        </h3>
        <p
          className={`text-[11px] mb-3 sm:mb-4 ${
            theme === 'glass' ? 'text-pink-100' : 'text-zinc-700 font-bold'
          }`}
        >
          Tap each floating balloon to unleash a birthday blessing!
        </p>

        {/* Balloons Flex Row */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 py-2 sm:py-3">
          {balloons.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                onClick={() => !b.popped && popBalloon(b.id)}
                className={`flex flex-col items-center cursor-pointer transition-all transform active:scale-90 ${
                  b.popped ? 'opacity-35 scale-75 pointer-events-none' : 'hover:scale-110'
                } ${idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-medium'}`}
              >
                {/* Balloon SVG body */}
                <div
                  className={`w-11 sm:w-14 h-14 sm:h-16 rounded-full relative flex flex-col items-center justify-center shadow-lg ${
                    theme === 'glass'
                      ? 'border border-white/50 backdrop-blur-md text-white'
                      : 'border-2 border-black text-black'
                  }`}
                  style={{
                    backgroundColor: theme === 'glass' ? `${b.color}d9` : b.color,
                    boxShadow: theme === 'glass' ? `0 10px 25px ${b.color}80` : '3px 3px 0px #000',
                  }}
                >
                  {b.popped ? (
                    <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-amber-200" />
                  ) : (
                    <Icon className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                  )}
                </div>
                <div className="w-[1.5px] h-3 sm:h-3.5 bg-zinc-400" />
                <span className={`text-[9px] sm:text-[10px] font-black mt-0.5 sm:mt-1 truncate max-w-[50px] sm:max-w-none ${theme === 'glass' ? 'text-pink-100' : 'text-black'}`}>
                  {b.popped ? 'Popped!' : b.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Active Wish Pill */}
        {lastWish && (
          <div className="mt-3 p-2.5 rounded-2xl text-xs font-bold animate-float-fast inline-flex items-center gap-1.5 ultra-glass-cyan border border-cyan-400/50 text-cyan-100 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Wish: <b className="text-white">{lastWish}</b></span>
          </div>
        )}

        {balloons.every((b) => b.popped) && (
          <div className="mt-4 animate-bounce flex justify-center">
            <button
              onClick={resetBalloons}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                theme === 'glass'
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-glass-pink'
                  : 'neo-tag bg-[#ff3388] text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5 shrink-0" />
              <span>Inflate New Balloons!</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

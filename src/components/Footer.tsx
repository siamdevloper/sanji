import React from 'react';
import { ArrowUp, Sparkles, Crown, Heart, Star } from 'lucide-react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';

interface FooterProps {
  theme: 'glass' | 'brutalism';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const scrollToTop = () => {
    audioSynth.playSparkle();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
      colors: ['#ff3388', '#00f0ff', '#ffffff'],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerLoveExplosion = () => {
    audioSynth.playFanfare();
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.8 },
      colors: ['#ff3388', '#00f0ff', '#ffe600', '#ffffff', '#fb71a4'],
    });
  };

  return (
    <footer className="pt-8 pb-32 sm:pb-36 px-3 sm:px-4 text-center relative z-10 max-w-md mx-auto">
      <div
        className={`p-4 sm:p-6 rounded-3xl transition-all duration-500 ${
          theme === 'glass'
            ? 'ultra-glass border-pink-400/30 shadow-glass-lg text-pink-200'
            : 'neo-card bg-white text-black'
        }`}
      >
        <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider mb-2">
          <Crown className="w-4 h-4 text-amber-300" />
          <span>Made With Infinite Love For</span>
          <Crown className="w-4 h-4 text-amber-300" />
        </div>

        {/* 3 Names in their distinct signature styles */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 my-3">
          <span className={`font-shamsunnahar text-2xl sm:text-3xl ${theme === 'glass' ? 'text-[#ff3388] text-glow-pink' : 'text-[#ff1493] font-black'}`}>
            Shamsunnahar
          </span>
          <span className="text-xs opacity-50">•</span>
          <span className={`font-sanji italic text-2xl sm:text-3xl ${theme === 'glass' ? 'text-[#00f0ff] text-glow-cyan' : 'text-[#0284c7] font-black'}`}>
            SANJI
          </span>
          <span className="text-xs opacity-50">•</span>
          <span className={`font-shimpanji text-sm sm:text-lg font-black tracking-widest uppercase ${theme === 'glass' ? 'text-white text-glow-white' : 'text-black'}`}>
            SHIMPANJI
          </span>
        </div>

        <p className={`text-xs mt-2 font-bold inline-flex items-center justify-center gap-1 ${theme === 'glass' ? 'text-pink-100' : 'text-zinc-700'}`}>
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>Happiest 26th September Birthday!</span>
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
        </p>

        {/* Wishes from Siam */}
        <div className="mt-4 pt-3 border-t border-pink-400/20 flex flex-col items-center justify-center text-sm">
          <span className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'glass' ? 'text-pink-300' : 'text-zinc-600'} mb-1`}>
            With Endless Love From
          </span>
          <span className={`font-siam text-2xl sm:text-3xl font-bold inline-flex items-center gap-1.5 ${theme === 'glass' ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`}>
            <span>Siam</span>
            <Heart className="w-4 h-4 fill-cyan-400 text-cyan-400" />
          </span>
        </div>

        {/* Buttons: Confetti Explosion & Scroll Top */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2">
          <button
            onClick={triggerLoveExplosion}
            className={`px-4 py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition-all active:scale-90 ${
              theme === 'glass'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-glass-pink'
                : 'neo-tag bg-[#ff3388] text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Send Massive Love</span>
          </button>

          <button
            onClick={scrollToTop}
            className={`p-2 rounded-full text-xs font-bold flex items-center justify-center transition-all active:scale-90 ${
              theme === 'glass'
                ? 'bg-white/10 hover:bg-white/20 border border-white/30 text-white'
                : 'bg-[#ffe600] border-2 border-black text-black shadow-[2px_2px_0px_#000]'
            }`}
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

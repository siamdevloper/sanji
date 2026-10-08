import React, { useState } from 'react';
import { MailOpen, Heart, Quote, Volume2, Sparkles, CheckCircle2, Mail } from 'lucide-react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SecretLetterProps {
  theme: 'glass' | 'brutalism';
}

export const SecretLetter: React.FC<SecretLetterProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSeal = () => {
    if (!isOpen) {
      audioSynth.playWaxSeal();
      setTimeout(() => {
        audioSynth.playFanfare();
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff3388', '#00f0ff', '#ffe600', '#ffffff'],
        });
      }, 200);
      setIsOpen(true);
    } else {
      audioSynth.playTone(500, 0.15);
      setIsOpen(false);
    }
  };

  const playVoiceChime = () => {
    audioSynth.playSparkle();
  };

  return (
    <section id="letter" className="py-6 px-4 w-full max-w-md mx-auto">
      <div
        className={`p-4 sm:p-6 rounded-3xl transition-all duration-500 relative overflow-hidden ${
          theme === 'glass'
            ? 'ultra-glass border-cyan-400/40 shadow-glass-lg'
            : 'neo-card bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`p-1.5 sm:p-2 rounded-2xl shrink-0 ${
                theme === 'glass'
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40'
                  : 'bg-[#ff3388] text-white border-2 border-black'
              }`}
            >
              <MailOpen className="w-4 sm:w-5 h-4 sm:h-5" />
            </span>
            <div className="min-w-0">
              <h3
                className={`text-sm sm:text-base font-extrabold truncate ${
                  theme === 'glass' ? 'text-white' : 'text-black font-brutal'
                }`}
              >
                Secret Love Letter
              </h3>
              <p
                className={`text-[10px] sm:text-[11px] truncate ${
                  theme === 'glass' ? 'text-cyan-200' : 'text-zinc-600 font-bold'
                }`}
              >
                Handwritten with love from Siam
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenSeal}
            className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-transform active:scale-90 inline-flex items-center gap-1 shrink-0 ${
              theme === 'glass'
                ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-glass-pink'
                : 'neo-tag bg-[#ffe600] text-black text-[11px] sm:text-xs py-1 px-2.5'
            }`}
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>{isOpen ? 'Fold' : 'Break Seal'}</span>
          </button>
        </div>

        {/* Closed Envelope with Wax Seal View */}
        {!isOpen && (
          <div
            onClick={handleOpenSeal}
            className={`cursor-pointer p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-300 active:scale-95 group relative ${
              theme === 'glass'
                ? 'ultra-glass-pink border border-pink-400/50 hover:border-pink-300'
                : 'bg-[#fff0f6] border-3 border-black shadow-[6px_6px_0px_#18181b]'
            }`}
          >
            {/* Wax Seal Stamp */}
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-yellow-400 flex flex-col items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform border-2 border-white/60">
                <Heart className="w-7 h-7 fill-white drop-shadow-md animate-pulse" />
                <span className="text-[9px] font-black tracking-widest uppercase mt-0.5">
                  SEALED
                </span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
              </span>
            </div>

            <h4
              className={`text-base font-black mb-1 inline-flex items-center gap-1.5 ${
                theme === 'glass' ? 'text-white text-glow-pink' : 'text-black font-brutal'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tap the Wax Seal to Open!</span>
            </h4>
            <p
              className={`text-xs max-w-[260px] ${
                theme === 'glass' ? 'text-pink-100' : 'text-zinc-600 font-semibold'
              }`}
            >
              Special personal letter written exclusively for Shamsunnahar, SANJI & SHIMPANJI.
            </p>
          </div>
        )}

        {/* Opened Letter Content */}
        {isOpen && (
          <div className="space-y-4 animate-float-fast">
            {/* Letter Content Card */}
            <div
              className={`p-4 sm:p-6 rounded-3xl transition-all relative ${
                theme === 'glass'
                  ? 'ultra-glass border-white/30 text-white'
                  : 'bg-white border-3 border-black shadow-[6px_6px_0px_#18181b]'
              }`}
            >
              <Quote className="w-8 sm:w-10 h-8 sm:h-10 text-pink-400/25 absolute top-3 right-3" />

              {/* Siam's Message */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 pr-6">
                    <h4 className="font-siam text-xl sm:text-3xl text-[#00f0ff] font-bold leading-snug break-words">
                      Dearest Shamsunnahar / SANJI / SHIMPANJI,
                    </h4>
                    <p className="text-[10px] text-cyan-200 font-semibold uppercase tracking-wider">
                      From Siam • With boundless love & happiness
                    </p>
                  </div>

                  <button
                    onClick={playVoiceChime}
                    className={`p-2 rounded-full ${
                      theme === 'glass' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'bg-[#00f0ff] border-2 border-black'
                    }`}
                    title="Play blessing chime"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    theme === 'glass' ? 'text-pink-50' : 'text-zinc-800 font-medium'
                  }`}
                >
                  “Happy 26th September Birthday! You are one of the purest, kindest, and most special souls in our lives. May every road you take lead to success, may your smile never fade, and may this new year bring you all the love, peace, and dreams your heart desires. Always keep shining bright!”
                </p>

                <div className="pt-3 border-t border-pink-400/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-cyan-400 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-bold text-[11px]">Always here for you</span>
                  </div>
                  <span className="font-siam text-2xl text-[#00f0ff] font-bold inline-flex items-center gap-1">
                    <span>— Siam</span>
                    <Heart className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

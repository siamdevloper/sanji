import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Crown, Calendar, Flame, Award, Star, Cake, Gem, Flower2 } from 'lucide-react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  theme: 'glass' | 'brutalism';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme }) => {
  const [activeName, setActiveName] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthday: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Target: 26 September
      let targetDate = new Date(currentYear, 8, 26, 0, 0, 0);
      const endOfBirthday = new Date(currentYear, 8, 26, 23, 59, 59);
      const isToday = now.getMonth() === 8 && now.getDate() === 26;
      
      if (now > endOfBirthday) {
        targetDate = new Date(currentYear + 1, 8, 26, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();

      if (isToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
      } else if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isBirthday: false });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerNameCelebration = (name: string, toneFreq: number, colors: string[]) => {
    setActiveName(name);
    audioSynth.playTone(toneFreq, 0.4, 'triangle', 0.2);
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.35 },
      colors: colors,
    });
    setTimeout(() => setActiveName(null), 1000);
  };

  return (
    <section id="hero" className="relative pt-20 sm:pt-24 pb-6 sm:pb-8 px-3 sm:px-4 flex flex-col items-center justify-center text-center overflow-hidden max-w-full">
      {/* Neo-Brutalist Live Marquee Ticker */}
      {theme === 'brutalism' && (
        <div className="w-full max-w-md sm:max-w-lg mb-4 overflow-hidden bg-[#ffe600] border-2 sm:border-3 border-black py-1.5 shadow-[3px_3px_0px_#000] rotate-[-0.8deg]">
          <div className="animate-marquee font-brutal font-black text-xs uppercase tracking-widest text-black flex items-center space-x-6">
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-black" /> HAPPY BIRTHDAY 26 SEPTEMBER</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> SHAMSUNNAHAR • SANJI • SHIMPANJI</span>
            <span className="flex items-center gap-1.5"><Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> QUEEN OF THE DAY</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" /> WITH LOVE FROM SIAM</span>
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-black" /> HAPPY BIRTHDAY 26 SEPTEMBER</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> SHAMSUNNAHAR • SANJI • SHIMPANJI</span>
          </div>
        </div>
      )}

      {/* Top Floating Badge */}
      <div className="mb-4">
        {theme === 'glass' ? (
          <div 
            onClick={() => triggerNameCelebration('Crown', 880, ['#ff3388', '#00f0ff', '#ffffff'])}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full ultra-glass border border-pink-400/50 text-pink-200 text-xs font-bold shadow-glass-pink cursor-pointer active:scale-95 transition-all hover:scale-105"
          >
            <Crown className="w-4 h-4 text-amber-300 animate-wiggle shrink-0" />
            <span className="tracking-widest uppercase text-[11px] sm:text-xs font-black bg-gradient-to-r from-pink-300 via-white to-cyan-300 bg-clip-text text-transparent">
              The Birthday Queen's Special Day
            </span>
            <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow shrink-0" />
          </div>
        ) : (
          <div 
            onClick={() => triggerNameCelebration('Crown', 880, ['#ff3388', '#00f0ff', '#ffe600'])}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 neo-tag bg-[#00f0ff] text-black text-xs cursor-pointer active:scale-95 transition-transform"
          >
            <Crown className="w-4 h-4 text-black animate-wiggle shrink-0" />
            <span className="text-[11px] sm:text-xs">OFFICIAL BIRTHDAY CELEBRATION</span>
            <Flame className="w-4 h-4 fill-[#ff3388] text-[#ff3388] shrink-0" />
          </div>
        )}
      </div>

      {/* Date Ribbon (26 September) */}
      <div className="mb-4 max-w-full">
        {theme === 'glass' ? (
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl ultra-glass-cyan border border-cyan-400/50 shadow-glass-cyan text-white">
            <Calendar className="w-4 h-4 text-cyan-300 animate-pulse shrink-0" />
            <span className="font-display font-black text-sm sm:text-lg tracking-wider">
              26 September
            </span>
            <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-sm inline-flex items-center gap-1">
              <Flower2 className="w-3 h-3 shrink-0" />
              <span>Today & Forever Special</span>
            </span>
          </div>
        ) : (
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 neo-pink rotate-[0.8deg]">
            <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-white shrink-0" />
            <span className="font-brutal font-black text-sm sm:text-lg tracking-wider uppercase text-white">
              26 September • Birthday Extravaganza
            </span>
          </div>
        )}
      </div>

      {/* Main Intro Title */}
      <h2
        className={`text-xs sm:text-sm font-black tracking-widest uppercase mb-4 inline-flex items-center gap-1.5 ${
          theme === 'glass' ? 'text-pink-300 text-glow-pink' : 'text-black font-brutal bg-[#ffe600] px-3 py-1 border-2 border-black rotate-[-1deg] shadow-[2px_2px_0px_#000]'
        }`}
      >
        <Cake className="w-4 h-4" />
        <span>Wishing the Most Beautiful Soul</span>
        <Cake className="w-4 h-4" />
      </h2>

      {/* THE THREE NAMES OF THE BIRTHDAY GIRL WITH 3 DIFFERENT FONTS & 3 DIFFERENT COLORS */}
      <div className="w-full max-w-md my-2 space-y-3.5">
        
        {/* Name 1: SHAMSUNNAHAR (Dancing Script / Cursive in Vibrant Hot Pink Glow) */}
        <div
          onClick={() => triggerNameCelebration('Shamsunnahar', 523.25, ['#ff3388', '#ff70a6', '#ffffff'])}
          className={`p-3.5 sm:p-4 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-95 group ${
            activeName === 'Shamsunnahar' ? 'scale-105' : 'hover:scale-[1.02]'
          } ${
            theme === 'glass'
              ? 'ultra-glass-pink border border-pink-400/50 shadow-glass-pink'
              : 'neo-card bg-[#fff0f6]'
          }`}
        >
          <div className="flex items-center justify-between px-2 mb-1">
            <span className={`text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${theme === 'glass' ? 'text-pink-200' : 'text-zinc-600'}`}>
              <Flower2 className="w-3 h-3 text-pink-400" />
              <span>Name I • Sweet & Caring</span>
            </span>
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
          </div>
          <h1
            className={`font-shamsunnahar text-3xl sm:text-5xl font-bold tracking-normal sm:tracking-wide transition-all break-words ${
              theme === 'glass'
                ? 'text-[#ff3388] text-glow-pink drop-shadow-[0_4px_30px_rgba(255,51,136,0.8)]'
                : 'text-[#ff1493] font-black drop-shadow-[3px_3px_0px_#000]'
            }`}
          >
            Shamsunnahar
          </h1>
          <p className={`text-xs mt-1 italic ${theme === 'glass' ? 'text-pink-100/90' : 'text-zinc-700 font-medium'}`}>
            “Soft-hearted, adorable, and radiating pure warmth”
          </p>
        </div>

        {/* Name 2: SANJI (Playfair Display / Chic Serif Italic in Cyber Cyan / Aqua Glow) */}
        <div
          onClick={() => triggerNameCelebration('SANJI', 659.25, ['#00f0ff', '#22d3ee', '#ffffff'])}
          className={`p-3.5 sm:p-4 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-95 group ${
            activeName === 'SANJI' ? 'scale-105' : 'hover:scale-[1.02]'
          } ${
            theme === 'glass'
              ? 'ultra-glass-cyan border border-cyan-400/50 shadow-glass-cyan'
              : 'neo-card bg-[#e6fcff]'
          }`}
        >
          <div className="flex items-center justify-between px-2 mb-1">
            <span className={`text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${theme === 'glass' ? 'text-cyan-200' : 'text-zinc-600'}`}>
              <Gem className="w-3 h-3 text-cyan-400" />
              <span>Name II • Heavenly & Radiant</span>
            </span>
            <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow" />
          </div>
          <h1
            className={`font-sanji italic text-3xl sm:text-5xl font-black tracking-wider transition-all ${
              theme === 'glass'
                ? 'text-[#00f0ff] text-glow-cyan drop-shadow-[0_4px_30px_rgba(0,240,255,0.8)]'
                : 'text-[#0284c7] font-black drop-shadow-[3px_3px_0px_#000]'
            }`}
          >
            SANJI
          </h1>
          <p className={`text-xs mt-1 italic ${theme === 'glass' ? 'text-cyan-100/90' : 'text-zinc-700 font-medium'}`}>
            “From the throne of skies, bright, graceful and brilliant”
          </p>
        </div>

        {/* Name 3: SHIMPANJI (Syne / Modern Bold Display in Pearlescent White & Shimmer) */}
        <div
          onClick={() => triggerNameCelebration('SHIMPANJI', 783.99, ['#ffffff', '#ffe600', '#ff3388'])}
          className={`p-3.5 sm:p-4 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-95 group ${
            activeName === 'SHIMPANJI' ? 'scale-105' : 'hover:scale-[1.02]'
          } ${
            theme === 'glass'
              ? 'ultra-glass-white border border-white/60 shadow-glass-lg'
              : 'neo-card bg-[#ffffff]'
          }`}
        >
          <div className="flex items-center justify-between px-2 mb-1">
            <span className={`text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${theme === 'glass' ? 'text-white/80' : 'text-zinc-600'}`}>
              <Crown className="w-3 h-3 text-amber-300" />
              <span>Name III • Iconic & Unique</span>
            </span>
            <Star className="w-4 h-4 fill-amber-300 text-amber-300 animate-wiggle" />
          </div>
          <h1
            className={`font-shimpanji text-2xl sm:text-4xl font-extrabold tracking-wider sm:tracking-widest uppercase transition-all ${
              theme === 'glass'
                ? 'text-white text-glow-white drop-shadow-[0_4px_35px_rgba(255,255,255,0.9)]'
                : 'text-black font-black drop-shadow-[3px_3px_0px_#ff3388]'
            }`}
          >
            SHIMPANJI
          </h1>
          <p className={`text-xs mt-1 italic ${theme === 'glass' ? 'text-pink-100/90' : 'text-zinc-700 font-medium'}`}>
            “One-of-a-kind queen, making every single moment magical”
          </p>
        </div>
      </div>

      {/* Countdown Timer or Birthday Live Card */}
      <div className="w-full max-w-md mx-auto my-4">
        {timeLeft.isBirthday ? (
          <div
            className={`p-4 sm:p-5 rounded-3xl text-center transition-all animate-pulse-glow ${
              theme === 'glass'
                ? 'ultra-glass-pink border-pink-400/60 shadow-glass-pink'
                : 'neo-pink'
            }`}
          >
            <div className="text-xl sm:text-3xl font-black mb-1 flex items-center justify-center gap-2">
              <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-amber-300" />
              <span>IT'S YOUR BIRTHDAY!</span>
              <Cake className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-300" />
            </div>
            <p className={`text-xs sm:text-sm font-semibold ${theme === 'glass' ? 'text-pink-100' : 'text-white'}`}>
              Happy 26 September to Shamsunnahar • SANJI • SHIMPANJI! May your day be filled with endless magic, laughs, and blessings!
            </p>
          </div>
        ) : (
          <div
            className={`p-3.5 sm:p-4 rounded-3xl ${
              theme === 'glass'
                ? 'ultra-glass border-white/25 text-white'
                : 'neo-card bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                theme === 'glass' ? 'text-pink-200' : 'text-zinc-800'
              }`}>
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Midnight Countdown to 26 Sep</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl flex flex-col items-center transition-all ${
                    theme === 'glass'
                      ? 'bg-white/10 border border-white/20 backdrop-blur-md'
                      : 'bg-[#ffe600] border-2 border-black shadow-[2px_2px_0px_#000]'
                  }`}
                >
                  <span className={`text-base sm:text-xl font-black ${
                    theme === 'glass' ? 'text-cyan-300 text-glow-cyan' : 'text-black'
                  }`}>
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className={`text-[8px] sm:text-[9px] uppercase font-black tracking-wider ${
                    theme === 'glass' ? 'text-pink-200/80' : 'text-black/70'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WISH FROM: SIAM */}
      <div
        className={`w-full max-w-md mx-auto p-4 sm:p-5 rounded-3xl transition-all duration-300 ${
          theme === 'glass'
            ? 'ultra-glass border-cyan-400/40 shadow-glass-sm'
            : 'neo-yellow'
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3">
          <Heart className={`w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current ${theme === 'glass' ? 'text-pink-400' : 'text-black'}`} />
          <span className={`text-[11px] sm:text-xs uppercase font-black tracking-widest ${
            theme === 'glass' ? 'text-pink-100' : 'text-black'
          }`}>
            Heartfelt Birthday Wish From
          </span>
          <Heart className={`w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current ${theme === 'glass' ? 'text-pink-400' : 'text-black'}`} />
        </div>

        <div className="flex justify-center pt-1">
          {/* Wish From: SIAM (Font: Caveat / Urban Script, Color: Electric Cyan / Ice Blue) */}
          <div
            onClick={() => triggerNameCelebration('Siam', 659.25, ['#00f0ff', '#38bdf8'])}
            className={`w-full p-3.5 sm:p-4 rounded-2xl cursor-pointer flex flex-col items-center justify-center transition-all active:scale-95 ${
              theme === 'glass'
                ? 'ultra-glass-cyan border border-cyan-300/40 hover:border-cyan-300'
                : 'bg-white border-2 border-black shadow-[3px_3px_0px_#000]'
            }`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Award className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400 shrink-0" />
              <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${theme === 'glass' ? 'text-cyan-200' : 'text-zinc-600'}`}>
                With Endless Love & Blessings
              </span>
            </div>
            <span
              className={`font-siam text-3xl sm:text-4xl font-bold tracking-wide transition-all ${
                theme === 'glass'
                  ? 'text-[#00f0ff] text-glow-cyan drop-shadow-[0_2px_15px_rgba(0,240,255,0.8)]'
                  : 'text-[#0284c7] font-black drop-shadow-[2px_2px_0px_#000]'
              }`}
            >
              Siam
            </span>
            <span className={`text-[11px] sm:text-xs font-bold inline-flex items-center gap-1 mt-0.5 sm:mt-1 ${theme === 'glass' ? 'text-cyan-100/90' : 'text-black'}`}>
              <span>Always With You</span>
              <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-cyan-400 text-cyan-400 shrink-0" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

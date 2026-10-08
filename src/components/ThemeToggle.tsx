import React, { useState } from 'react';
import { Sparkles, Box, Volume2, VolumeX, PartyPopper } from 'lucide-react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ThemeToggleProps {
  theme: 'glass' | 'brutalism';
  onToggleTheme: (theme: 'glass' | 'brutalism') => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggleTheme }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleMusicToggle = () => {
    audioSynth.toggleBgm((playing) => {
      setIsPlayingMusic(playing);
    });
  };

  const triggerMegaConfetti = () => {
    audioSynth.playSparkle();
    
    // Multi-stage confetti burst
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#ff3388', '#22d3ee', '#ffe600', '#ffffff', '#fb71a4'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="fixed top-3 left-0 right-0 z-40 px-3 flex items-center justify-between max-w-lg mx-auto pointer-events-auto">
      {/* Theme Switcher Segment */}
      <div
        className={`flex items-center p-1 rounded-full transition-all duration-300 ${
          theme === 'glass'
            ? 'liquid-glass shadow-glass-pink'
            : 'bg-white border-2 border-black shadow-[3px_3px_0px_#18181b]'
        }`}
      >
        <button
          onClick={() => {
            audioSynth.playTone(600, 0.15, 'sine', 0.20);
            onToggleTheme('glass');
          }}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 ${
            theme === 'glass'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
              : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Glass</span>
        </button>

        <button
          onClick={() => {
            audioSynth.playTone(800, 0.15, 'sine', 0.20);
            onToggleTheme('brutalism');
          }}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-all duration-300 ${
            theme === 'brutalism'
              ? 'bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
              : 'text-zinc-300 hover:text-white'
          }`}
        >
          <Box className="w-3.5 h-3.5 shrink-0" />
          <span>Brutal</span>
        </button>
      </div>

      {/* Right Action Icons: Music & Confetti Popper */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Music Player */}
        <button
          onClick={handleMusicToggle}
          title={isPlayingMusic ? "Pause BGM" : "Play Birthday BGM"}
          className={`p-2 rounded-full transition-all duration-200 active:scale-95 ${
            theme === 'glass'
              ? isPlayingMusic
                ? 'liquid-glass-cyan text-cyan-300 shadow-glass-cyan animate-pulse'
                : 'liquid-glass text-white/80 hover:text-white'
              : isPlayingMusic
              ? 'bg-[#00f0ff] border-2 border-black text-black shadow-[3px_3px_0px_#000] animate-bounce'
              : 'bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000]'
          }`}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-400" />
          )}
        </button>

        {/* Confetti Explosion Button */}
        <button
          onClick={triggerMegaConfetti}
          title="Celebrate with Confetti!"
          className={`p-2 rounded-full transition-all duration-200 active:scale-95 ${
            theme === 'glass'
              ? 'liquid-glass-pink text-pink-300 shadow-glass-pink hover:scale-105'
              : 'bg-[#ff3388] border-2 border-black text-white shadow-[3px_3px_0px_#000] hover:scale-105'
          }`}
        >
          <PartyPopper className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

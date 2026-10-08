import React, { useState, useEffect } from 'react';
import { Crown, Cake, Mail, Gift, Camera, PartyPopper, MessageCircleHeart } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface NavigationDockProps {
  theme: 'glass' | 'brutalism';
}

export const NavigationDock: React.FC<NavigationDockProps> = ({ theme }) => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Queen', icon: Crown },
    { id: 'cake', label: 'Cake', icon: Cake },
    { id: 'letter', label: 'Letters', icon: Mail },
    { id: 'gifts', label: 'Gifts', icon: Gift },
    { id: 'memories', label: 'Moments', icon: Camera },
    { id: 'wishes', label: 'Wishes', icon: MessageCircleHeart },
    { id: 'games', label: 'Pop', icon: PartyPopper },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    audioSynth.playHeartPop();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-40 px-2 sm:px-3 flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
      <nav
        className={`pointer-events-auto flex items-center justify-around sm:justify-center gap-0.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all duration-300 max-w-[calc(100vw-1rem)] overflow-x-auto no-scrollbar ${
          theme === 'glass'
            ? 'ultra-glass border-white/30 shadow-glass-pink backdrop-blur-2xl'
            : 'bg-white border-2 sm:border-3 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 sm:px-2.5 sm:py-1.5 rounded-full transition-all duration-200 active:scale-90 shrink-0 ${
                isActive
                  ? theme === 'glass'
                    ? 'bg-gradient-to-tr from-pink-500 to-cyan-400 text-white shadow-md scale-105 sm:scale-110'
                    : 'bg-[#ffe600] text-black border-2 border-black -translate-y-0.5 sm:-translate-y-1'
                  : theme === 'glass'
                  ? 'text-white/60 hover:text-white'
                  : 'text-zinc-500 hover:text-black'
              }`}
              title={item.label}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[9px] font-black hidden md:block">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

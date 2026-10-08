import { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { FloatingHeartsClick } from './components/FloatingHeartsClick';
import { ThemeToggle } from './components/ThemeToggle';
import { HeroSection } from './components/HeroSection';
import { InteractiveCake } from './components/InteractiveCake';
import { SecretLetter } from './components/SecretLetter';
import { SurpriseGifts } from './components/SurpriseGifts';
import { PolaroidGallery } from './components/PolaroidGallery';
import { WishesWall } from './components/WishesWall';
import { BalloonPopper } from './components/BalloonPopper';
import { Footer } from './components/Footer';
import { NavigationDock } from './components/NavigationDock';

export function App() {
  const [theme, setTheme] = useState<'glass' | 'brutalism'>('brutalism');

  useEffect(() => {
    if (theme === 'glass') {
      document.body.className = 'bg-[#080512] text-white selection:bg-pink-500 selection:text-white antialiased overflow-x-hidden';
    } else {
      document.body.className = 'bg-[#fff5f8] text-black selection:bg-[#ff3388] selection:text-white antialiased overflow-x-hidden';
    }
  }, [theme]);

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative font-sans transition-colors duration-500 ${theme === 'glass' ? 'text-white' : 'text-black'}`}>
      {/* Background ambient visuals */}
      <BackgroundEffects theme={theme} />

      {/* Tap/Click to spawn love particles */}
      <FloatingHeartsClick />

      {/* Top Floating Control Bar (Liquid Glass vs Brutalism Switcher, Music & Confetti) */}
      <ThemeToggle theme={theme} onToggleTheme={setTheme} />

      {/* Main Content Container - Mobile Optimized */}
      <main className="relative z-10 max-w-lg mx-auto pb-24 sm:pb-28 px-1 sm:px-0 overflow-x-hidden">
        {/* Hero Banner with the 3 names, date 26 Sep, countdown, and Siam wishes */}
        <HeroSection theme={theme} />

        {/* Interactive Cake with Candle Blowing and Confetti */}
        <InteractiveCake theme={theme} />

        {/* Secret Envelope & Heartfelt Letter from Siam */}
        <SecretLetter theme={theme} />

        {/* Surprise Gift Boxes to Unwrap */}
        <SurpriseGifts theme={theme} />

        {/* Polaroid Memory Cards for Shamsunnahar • SANJI • SHIMPANJI */}
        <PolaroidGallery theme={theme} />

        {/* Interactive Wishes Wall */}
        <WishesWall theme={theme} />

        {/* Balloon Popper Mini-Game */}
        <BalloonPopper theme={theme} />

        {/* Footer with love signatures */}
        <Footer theme={theme} />
      </main>

      {/* Bottom Floating Navigation Dock */}
      <NavigationDock theme={theme} />
    </div>
  );
}

export default App;

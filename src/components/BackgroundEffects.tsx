import React from 'react';

interface BackgroundEffectsProps {
  theme: 'glass' | 'brutalism';
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ theme }) => {
  if (theme === 'glass') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#070512] transition-colors duration-700">
        {/* Iridescent Aurora Liquid Mesh Gradients - Deep Velvet Dreamscape */}
        <div className="absolute -top-[20%] -left-[10%] w-[85vw] h-[85vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tr from-pink-600/30 to-rose-400/15 blur-[110px] animate-pulse-glow" />
        <div className="absolute top-[30%] -right-[15%] w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-bl from-cyan-400/25 to-blue-600/15 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[5%] left-[5%] w-[75vw] h-[75vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-t from-fuchsia-600/20 to-pink-300/10 blur-[100px] animate-float-medium" />
        <div className="absolute top-[65%] right-[20%] w-[55vw] h-[55vw] max-w-[450px] max-h-[450px] rounded-full bg-gradient-to-r from-purple-500/15 to-cyan-300/10 blur-[90px] animate-pulse-glow" />

        {/* Ethereal Micro-Starfield Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#070512]/60" />
      </div>
    );
  }

  // Neo-Brutalism / Pop Aesthetic Background
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#fff9fa] transition-colors duration-700">
      {/* Clean, Elegant Architectural Grid (Modern Editorial Neo-Brutalist Look) */}
      <div 
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #18181b 1px, transparent 1px),
            linear-gradient(to bottom, #18181b 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Soft Ambient Pastel Glows (Zero harsh borders, zero clashing stickers) */}
      <div className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-pink-300/25 via-rose-200/15 to-transparent blur-[80px]" />
      <div className="absolute top-[40%] -left-[15%] w-[75vw] h-[75vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-tr from-cyan-300/20 via-sky-200/15 to-transparent blur-[90px]" />
      <div className="absolute -bottom-[10%] right-[10%] w-[65vw] h-[65vw] max-w-[480px] max-h-[480px] rounded-full bg-gradient-to-t from-amber-200/25 via-yellow-100/15 to-transparent blur-[80px]" />
    </div>
  );
};

import React, { useState } from 'react';
import { Wand2, RefreshCw, Utensils, Heart, Cake } from 'lucide-react';
import { audioSynth } from '../utils/audio';
import confetti from 'canvas-confetti';

interface InteractiveCakeProps {
  theme: 'glass' | 'brutalism';
}

const CAKE_FORTUNES = [
  "Strawberry Bliss Slice: May your 26th September year be overflowing with laughter, success, and pure joy!",
  "Chocolate Delight Slice: A year filled with unforgettable sweet adventures and dreams fulfilled!",
  "Vanilla Velvet Slice: You are loved, admired, and cherished beyond measure by Siam and everyone!",
  "Cherry Sparkle Slice: Unlimited good luck, shining health, and endless blessings in everything you do!"
];

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({ theme }) => {
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [wishesCount, setWishesCount] = useState(0);
  const [slicedFortune, setSlicedFortune] = useState<string | null>(null);

  const handleBlowCandle = () => {
    if (isCandleLit) {
      setIsCandleLit(false);
      setWishesCount((prev) => prev + 1);

      audioSynth.playBlowSound();

      setTimeout(() => {
        audioSynth.playFanfare();
        confetti({
          particleCount: 90,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#ff3388', '#00f0ff', '#ffe600', '#ffffff', '#fb71a4'],
        });
      }, 350);
    } else {
      setIsCandleLit(true);
      audioSynth.playTone(880, 0.2);
    }
  };

  const handleCutSlice = () => {
    audioSynth.playSparkle();
    const pick = CAKE_FORTUNES[Math.floor(Math.random() * CAKE_FORTUNES.length)];
    setSlicedFortune(pick);
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.58 },
      colors: ['#ff3388', '#00f0ff', '#ffe600', '#ffffff'],
    });
  };

  const isBrutal = theme === 'brutalism';

  return (
    <section id="cake" className="py-6 px-3 sm:px-4 w-full max-w-md mx-auto">
      <div
        className={`p-4 sm:p-6 rounded-3xl text-center relative overflow-hidden transition-all duration-500 ${
          theme === 'glass'
            ? 'ultra-glass border-pink-400/40 shadow-glass-lg'
            : 'neo-card bg-white'
        }`}
      >
        {/* Header Tag & Title */}
        <div className="mb-3">
          <span
            className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 ${
              theme === 'glass'
                ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40'
                : 'neo-tag bg-[#ffe600] text-black'
            }`}
          >
            <Cake className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span>Interactive Birthday Cake</span>
          </span>
          <h3
            className={`text-base sm:text-xl font-extrabold mt-2 ${
              theme === 'glass' ? 'text-white text-glow-pink' : 'text-black font-brutal'
            }`}
          >
            {isCandleLit ? 'Make a Wish & Blow the Candle!' : 'Candle Blown! Wish Sent to Universe!'}
          </h3>
          <p className="text-[11px] sm:text-xs opacity-75 mt-0.5">
            Tap the cake or candle to blow it out!
          </p>
        </div>

        {/* The Illustrated Celebration Cake */}
        <div
          onClick={handleBlowCandle}
          className="relative my-2 sm:my-4 flex flex-col items-center justify-center cursor-pointer select-none active:scale-[0.98] transition-transform"
          title="Click to blow or relight candle"
        >
          <svg
            viewBox="0 0 340 320"
            className="w-full max-w-[310px] sm:max-w-[340px] h-auto drop-shadow-md overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Flame Gradients */}
              <radialGradient id="flameHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffdd00" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#ff5500" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff0055" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ff3300" />
                <stop offset="45%" stopColor="#ffaa00" />
                <stop offset="85%" stopColor="#ffee55" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              {/* Glass Gradients */}
              <linearGradient id="glassTier1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="glassTier2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="glassTier3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.85" />
              </linearGradient>

              {/* Candle Striped Pattern */}
              <pattern id="candleStripe" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="5" height="10" fill={isBrutal ? '#ff3388' : '#ec4899'} />
                <rect x="5" width="5" height="10" fill={isBrutal ? '#00f0ff' : '#67e8f9'} />
              </pattern>
            </defs>

            {/* --- 1. CAKE PEDESTAL STAND --- */}
            {/* Stand Base Foot */}
            <ellipse
              cx="170"
              cy="300"
              rx="64"
              ry="9"
              fill={isBrutal ? '#ffffff' : 'rgba(255,255,255,0.25)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.7)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />
            {/* Stand Stem */}
            <path
              d="M 158 274 C 158 288 144 293 144 299 L 196 299 C 196 293 182 288 182 274 Z"
              fill={isBrutal ? '#ffffff' : 'rgba(255,255,255,0.3)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.7)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />
            {/* Plate Rim & Base */}
            <ellipse
              cx="170"
              cy="274"
              rx="142"
              ry="14"
              fill={isBrutal ? '#ffffff' : 'rgba(255,255,255,0.4)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.8)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />

            {/* --- 2. TIER 3 (BOTTOM TIER: 26 SEPTEMBER QUEEN) --- */}
            {/* Tier 3 Body */}
            <path
              d="M 45 214 L 45 258 C 45 273 295 273 295 258 L 295 214 Z"
              fill={isBrutal ? '#ffe600' : 'url(#glassTier3)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.6)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />
            {/* Tier 3 Top Surface Ellipse */}
            <ellipse
              cx="170"
              cy="214"
              rx="125"
              ry="13"
              fill={isBrutal ? '#fff04d' : 'rgba(255,255,255,0.45)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.7)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />
            {/* Tier 3 Wavy Frosting Drips */}
            <path
              d="M 45 214 C 45 228 58 232 68 221 C 78 234 94 234 104 220 C 114 236 132 236 142 220 C 154 237 172 237 184 220 C 196 236 214 236 226 220 C 238 234 254 234 264 221 C 274 232 295 228 295 214 Z"
              fill={isBrutal ? '#ffffff' : 'rgba(255,255,255,0.8)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.9)'}
              strokeWidth={isBrutal ? 2.5 : 1}
            />
            {/* Tier 3 Festive Decorative Pearls */}
            {[62, 86, 110, 134, 158, 182, 206, 230, 254, 278].map((px, idx) => (
              <circle
                key={`p3-${idx}`}
                cx={px}
                cy={258 + Math.sin(idx * 0.7) * 4}
                r="3.5"
                fill={isBrutal ? '#ff3388' : '#ffffff'}
                stroke={isBrutal ? '#18181b' : 'none'}
                strokeWidth={isBrutal ? 1.5 : 0}
              />
            ))}
            {/* Tier 3 Dedication Ribbon Pill Banner */}
            <g transform="translate(170, 244)">
              <rect
                x="-112"
                y="-13"
                width="224"
                height="26"
                rx="13"
                fill={isBrutal ? '#18181b' : 'rgba(0,0,0,0.45)'}
                stroke={isBrutal ? '#ffe600' : 'rgba(255,255,255,0.6)'}
                strokeWidth={isBrutal ? 2 : 1}
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fill={isBrutal ? '#ffe600' : '#ffffff'}
                fontSize="11"
                fontWeight="900"
                fontFamily="'Space Grotesk', sans-serif"
                letterSpacing="1"
              >
                ★ 26 SEPTEMBER QUEEN ★
              </text>
            </g>

            {/* --- 3. TIER 2 (MIDDLE TIER: THREE NAMES) --- */}
            {/* Tier 2 Body */}
            <path
              d="M 75 154 L 75 204 C 75 218 265 218 265 204 L 265 154 Z"
              fill={isBrutal ? '#00f0ff' : 'url(#glassTier2)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.6)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />
            {/* Tier 2 Top Surface Ellipse */}
            <ellipse
              cx="170"
              cy="154"
              rx="95"
              ry="11"
              fill={isBrutal ? '#55f5ff' : 'rgba(255,255,255,0.4)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.7)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />
            {/* Tier 2 Wavy Frosting Drips */}
            <path
              d="M 75 154 C 75 168 88 172 96 161 C 106 175 122 175 132 160 C 144 177 162 177 174 160 C 186 177 204 177 216 160 C 226 175 242 175 252 161 C 260 171 265 167 265 154 Z"
              fill={isBrutal ? '#ffffff' : 'rgba(255,255,255,0.85)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.9)'}
              strokeWidth={isBrutal ? 2.5 : 1}
            />
            {/* Decorative Sprinkles on Tier 2 */}
            <rect x="86" y="178" width="8" height="4" rx="2" fill="#ff3388" transform="rotate(25, 90, 180)" />
            <rect x="246" y="178" width="8" height="4" rx="2" fill="#ffe600" transform="rotate(-30, 250, 180)" />
            <circle cx="94" cy="196" r="3" fill="#ffe600" />
            <circle cx="246" cy="196" r="3" fill="#ff3388" />
            {/* Tier 2 Name Ribbon Pill Banner */}
            <g transform="translate(170, 188)">
              <rect
                x="-102"
                y="-11"
                width="204"
                height="22"
                rx="11"
                fill={isBrutal ? '#ffffff' : 'rgba(255,255,255,0.25)'}
                stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.8)'}
                strokeWidth={isBrutal ? 2.5 : 1}
              />
              <text
                x="0"
                y="4.5"
                textAnchor="middle"
                fill={isBrutal ? '#18181b' : '#ffffff'}
                fontSize="8.5"
                fontWeight="900"
                fontFamily="'Space Grotesk', sans-serif"
                letterSpacing="0.6"
              >
                SHAMSUNNAHAR • SANJI • SHIMPANJI
              </text>
            </g>

            {/* --- 4. TIER 1 (TOP TIER: STRAWBERRIES & CREAM) --- */}
            {/* Tier 1 Body */}
            <path
              d="M 110 98 L 110 144 C 110 156 230 156 230 144 L 230 98 Z"
              fill={isBrutal ? '#ff3388' : 'url(#glassTier1)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.6)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />
            {/* Tier 1 Top Surface Ellipse */}
            <ellipse
              cx="170"
              cy="98"
              rx="60"
              ry="8"
              fill={isBrutal ? '#ff5c9d' : 'rgba(255,255,255,0.45)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.7)'}
              strokeWidth={isBrutal ? 3 : 1.5}
            />
            {/* Tier 1 Wavy Frosting Drips */}
            <path
              d="M 110 98 C 110 110 118 114 126 104 C 134 118 146 118 154 103 C 164 120 176 120 186 103 C 194 118 206 118 214 104 C 222 114 230 110 230 98 Z"
              fill={isBrutal ? '#ffffff' : 'rgba(255,255,255,0.9)'}
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.95)'}
              strokeWidth={isBrutal ? 2.5 : 1}
            />
            {/* Whipped Cream Swirls on Top */}
            <circle cx="130" cy="95" r="7" fill="#ffffff" stroke={isBrutal ? '#18181b' : 'none'} strokeWidth={isBrutal ? 1.5 : 0} />
            <circle cx="210" cy="95" r="7" fill="#ffffff" stroke={isBrutal ? '#18181b' : 'none'} strokeWidth={isBrutal ? 1.5 : 0} />

            {/* Left Strawberry */}
            <g transform="translate(130, 84)">
              <path
                d="M 0 12 C 5 9 8 5 8 0 C 8 -4 4 -6 0 -5 C -4 -6 -8 -4 -8 0 C -8 5 -5 9 0 12 Z"
                fill="#ff1155"
                stroke={isBrutal ? '#18181b' : '#ffffff'}
                strokeWidth={isBrutal ? 1.5 : 0.8}
              />
              {/* Green Calyx Leaves */}
              <path d="M 0 -5 L -3 -9 L 0 -7 L 3 -9 Z" fill="#22c55e" stroke={isBrutal ? '#18181b' : 'none'} strokeWidth={1} />
              {/* Seed Specks */}
              <circle cx="-3" cy="1" r="0.8" fill="#ffe600" />
              <circle cx="3" cy="1" r="0.8" fill="#ffe600" />
              <circle cx="0" cy="6" r="0.8" fill="#ffe600" />
            </g>

            {/* Right Strawberry */}
            <g transform="translate(210, 84)">
              <path
                d="M 0 12 C 5 9 8 5 8 0 C 8 -4 4 -6 0 -5 C -4 -6 -8 -4 -8 0 C -8 5 -5 9 0 12 Z"
                fill="#ff1155"
                stroke={isBrutal ? '#18181b' : '#ffffff'}
                strokeWidth={isBrutal ? 1.5 : 0.8}
              />
              <path d="M 0 -5 L -3 -9 L 0 -7 L 3 -9 Z" fill="#22c55e" stroke={isBrutal ? '#18181b' : 'none'} strokeWidth={1} />
              <circle cx="-3" cy="1" r="0.8" fill="#ffe600" />
              <circle cx="3" cy="1" r="0.8" fill="#ffe600" />
              <circle cx="0" cy="6" r="0.8" fill="#ffe600" />
            </g>

            {/* Center Golden Crown / Star Charm on Top Tier */}
            <g transform="translate(170, 128)">
              <polygon
                points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                fill="#ffe600"
                stroke={isBrutal ? '#18181b' : '#ffffff'}
                strokeWidth={isBrutal ? 1.5 : 0.8}
              />
            </g>

            {/* --- 5. THE BIRTHDAY CANDLE --- */}
            {/* Candle Stick */}
            <rect
              x="164"
              y="52"
              width="12"
              height="44"
              rx="3"
              fill="url(#candleStripe)"
              stroke={isBrutal ? '#18181b' : 'rgba(255,255,255,0.8)'}
              strokeWidth={isBrutal ? 2.5 : 1}
            />
            {/* Candle Wick */}
            <path
              d="M 170 52 L 170 45"
              stroke={isBrutal ? '#18181b' : '#ffffff'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Candle Flame (When Lit) or Smoke (When Blown) */}
            {isCandleLit ? (
              <g className="animate-wiggle" style={{ transformOrigin: '170px 45px' }}>
                {/* Flame Ambient Glow Halo */}
                <circle cx="170" cy="30" r="18" fill="url(#flameHalo)" className="animate-pulse" />
                {/* Outer Teardrop Flame */}
                <path
                  d="M 170 14 C 160 25 161 36 170 45 C 179 36 180 25 170 14 Z"
                  fill="url(#flameGrad)"
                  filter={isBrutal ? 'drop-shadow(0px 0px 4px #ffbb00)' : 'drop-shadow(0px 0px 8px #ffdd00)'}
                />
                {/* Inner White Hot Core */}
                <path
                  d="M 170 24 C 165 31 166 38 170 44 C 174 38 175 31 170 24 Z"
                  fill="#ffffff"
                />
              </g>
            ) : (
              <g className="animate-float-slow">
                {/* Smoke Wisps gently rising */}
                <path
                  d="M 170 44 C 165 36 172 28 166 18 C 162 12 168 6 164 1"
                  stroke={isBrutal ? '#71717a' : 'rgba(255,255,255,0.7)'}
                  strokeWidth="2.5"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 172 42 C 177 34 171 25 176 16"
                  stroke={isBrutal ? '#a1a1aa' : 'rgba(255,255,255,0.5)'}
                  strokeWidth="2"
                  strokeDasharray="2 2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Little Sparkle */}
                <circle cx="170" cy="45" r="2" fill="#22d3ee" className="animate-ping" />
              </g>
            )}
          </svg>
        </div>

        {/* Buttons Grid: Blow Candle & Slice Cake */}
        <div className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleBlowCandle}
              className={`py-3 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                theme === 'glass'
                  ? isCandleLit
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-glass-pink hover:brightness-110'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-glass-cyan hover:brightness-110'
                  : isCandleLit
                  ? 'bg-[#ffe600] text-black border-2 border-black shadow-[3px_3px_0px_#000]'
                  : 'bg-[#00f0ff] text-black border-2 border-black shadow-[3px_3px_0px_#000]'
              }`}
            >
              {isCandleLit ? (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Blow Candle</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Relight Candle</span>
                </>
              )}
            </button>

            <button
              onClick={handleCutSlice}
              className={`py-3 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                theme === 'glass'
                  ? 'ultra-glass-cyan text-white hover:border-cyan-300 shadow-glass-cyan'
                  : 'bg-[#ff3388] text-white border-2 border-black shadow-[3px_3px_0px_#000]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Slice Cake</span>
            </button>
          </div>

          {/* Sliced Cake Fortune Card */}
          {slicedFortune && (
            <div
              className={`p-3.5 rounded-2xl text-xs font-bold animate-float-fast flex items-start gap-2.5 text-left ${
                theme === 'glass'
                  ? 'ultra-glass-cyan border border-cyan-400/50 text-cyan-100'
                  : 'neo-cyan'
              }`}
            >
              <span className="text-xl shrink-0">🍰</span>
              <div>
                <div className="text-[10px] uppercase font-black tracking-wider text-pink-600">Fresh Birthday Slice Served!</div>
                <div className="mt-0.5">{slicedFortune}</div>
              </div>
            </div>
          )}

          {/* Birthday Wish Counter */}
          {wishesCount > 0 && (
            <div
              className={`p-3 rounded-2xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 w-full ${
                theme === 'glass'
                  ? 'bg-pink-500/20 text-pink-200 border border-pink-400/40'
                  : 'neo-yellow'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 shrink-0" />
              <span>
                <b>{wishesCount}</b> Birthday {wishesCount === 1 ? 'wish' : 'wishes'} sent to the universe for <b>Shamsunnahar SANJI SHIMPANJI</b>!
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        love: {
          50: '#fff1f6',
          100: '#ffe4ee',
          200: '#fecddf',
          300: '#fda4c6',
          400: '#fb71a4',
          500: '#f43f82',
          600: '#e11d67',
          700: '#be1250',
          800: '#9e1344',
          900: '#84153d',
        },
        cyanGlow: {
          DEFAULT: '#22d3ee',
          light: '#67e8f9',
          dark: '#0891b2',
        },
        brutalPink: '#ff3388',
        brutalCyan: '#00f0ff',
        brutalYellow: '#ffe600',
        brutalBlack: '#121212',
      },
      fontFamily: {
        shamsunnahar: ['"Dancing Script"', 'cursive'],
        tanha: ['"Dancing Script"', 'cursive'],
        sanji: ['"Playfair Display"', 'serif'],
        arshi: ['"Playfair Display"', 'serif'],
        shimpanji: ['"Syne"', 'sans-serif'],
        taisin: ['"Syne"', 'sans-serif'],
        siam: ['"Caveat"', 'cursive'],
        brutal: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 8px 32px 0 rgba(255, 105, 180, 0.15)',
        'glass-lg': '0 16px 48px 0 rgba(34, 211, 238, 0.2), 0 8px 24px 0 rgba(244, 63, 130, 0.25)',
        'glass-cyan': '0 8px 32px 0 rgba(34, 211, 238, 0.3)',
        'glass-pink': '0 8px 32px 0 rgba(244, 63, 130, 0.35)',
        'glass-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.2)',
        'brutal': '4px 4px 0px #121212',
        'brutal-lg': '6px 6px 0px #121212',
        'brutal-cyan': '4px 4px 0px #00f0ff',
        'brutal-pink': '4px 4px 0px #ff3388',
        'brutal-white': '4px 4px 0px #ffffff',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bnf: {
          white: '#ffffff',
          bg: '#fafaf7',
          paper: '#f5f3ec',
          ink: '#0a0a0a',
          gray: {
            700: '#404040',
            500: '#737373',
            400: '#a3a3a3',
            300: '#d4d4d4',
            200: '#e5e5e5',
          },
          gold: '#b8935a',
          'gold-deep': '#8b6f3f',
          navy: '#0a2540',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-noto-serif-kr)', 'Noto Serif KR', 'Garamond', 'serif'],
        mono: ['var(--font-space-grotesk)', 'Space Grotesk', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.025em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
};

export default config;

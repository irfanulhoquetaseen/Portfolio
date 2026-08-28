/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Soft warm/cool white substrate
        void: '#fafaf8',
        abyss: '#f2f6f3',
        moss: '#e5ede7',
        fern: '#d3e2d9',
        // Rich emerald/forest green accents
        signal: '#0a7a4f',
        signal2: '#0d9c5e',
        signal3: '#086843',
        // Text
        bone: '#10201a',
        haze: '#476156',
        dim: '#647b71',
      },
      fontFamily: {
        display: ['"Clash Display"', '"Space Grotesk"', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        widest2: '0.28em',
      },
      maxWidth: {
        shell: '1440px',
      },
      screens: {
        xs: '420px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(10,122,79,0.18), 0 10px 32px -10px rgba(10,122,79,0.22)',
        'glow-lg': '0 0 0 1px rgba(10,122,79,0.28), 0 20px 48px -12px rgba(10,122,79,0.28)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.85)',
      },
      backgroundImage: {
        'signal-grad': 'linear-gradient(100deg, #0a7a4f 0%, #0d9c5e 50%, #086843 100%)',
        'fade-b': 'linear-gradient(to bottom, transparent, #fafaf8)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        power: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        'pulse-slow': 'pulseSlow 3.2s cubic-bezier(0.4,0,0.6,1) infinite',
        drift: 'drift 22s linear infinite',
        blink: 'blink 1.15s steps(2, start) infinite',
        'spin-slow': 'spin 9s linear infinite',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.86)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,-50%,0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

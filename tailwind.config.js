/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-accent-500',
    'bg-accent-600',
    'to-accent-500',
    { pattern: /bg-accent-(500|600)/, variants: ['hover'] },
    { pattern: /ring-primary-(400)/, variants: ['focus'] },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e0f7f7',
          100: '#b3ebeb',
          200: '#80dfdf',
          300: '#4dd3d3',
          400: '#26c9c9',
          500: '#00b0b0',
          600: '#008c8c',
          700: '#006666',
          800: '#004040',
          900: '#001a1a',
        },
        navy: {
          50:  '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        accent: {
          50:  '#f0f7fc',
          100: '#d9ebf7',
          200: '#b3d6f0',
          300: '#8cc2e8',
          400: '#70b0e0',
          500: '#4da1d9',
          600: '#398abf',
          700: '#266b99',
          800: '#134666',
          900: '#062133',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        heading: ['Raleway', 'system-ui', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.14)',
        'nav': '0 2px 20px rgba(0, 0, 0, 0.10)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #102a43 0%, #00b0b0 55%, #4da1d9 100%)',
        'card-gradient': 'linear-gradient(135deg, #00b0b0 0%, #102a43 100%)',
        'section-gradient': 'linear-gradient(180deg, #e0f7f7 0%, #ffffff 100%)',
      },
      borderRadius: {
        '5': '5px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

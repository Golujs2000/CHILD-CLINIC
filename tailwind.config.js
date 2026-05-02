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
          50:  '#edf7f0',
          100: '#ccebd4',
          200: '#9dd9b1',
          300: '#65c485',
          400: '#2db05b',
          500: '#0e9b42',
          600: '#0a7c33',
          700: '#075d26',
          800: '#043e19',
          900: '#01200d',
        },
        navy: {
          50:  '#e8efea',
          100: '#bed4c2',
          200: '#8eb698',
          300: '#5b976a',
          400: '#2c793e',
          500: '#0e5e25',
          600: '#08491c',
          700: '#053514',
          800: '#02220b',
          900: '#011105',
        },
        accent: {
          50:  '#f0f9f4',
          100: '#d4eedc',
          200: '#a8dcbd',
          300: '#77c898',
          400: '#44b370',
          500: '#1a9d4d',
          600: '#127d3b',
          700: '#0b5e2c',
          800: '#063e1c',
          900: '#021f0e',
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
        'hero-gradient': 'linear-gradient(135deg, #053514 0%, #0e9b42 55%, #1a9d4d 100%)',
        'card-gradient': 'linear-gradient(135deg, #0e9b42 0%, #053514 100%)',
        'section-gradient': 'linear-gradient(180deg, #edf7f0 0%, #ffffff 100%)',
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

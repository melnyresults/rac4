/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy-primary': '#001a3d',
        'navy-secondary': '#002952',
        'gold-primary': '#d4af37',
        'gold-secondary': '#e6c547',
        'gold-light': '#faf6e8',
      },
      fontFamily: {
        'garamond': ['EB Garamond', 'serif'],
        'sans': ['EB Garamond', 'serif'],
        'serif': ['EB Garamond', 'serif'],
      },
      animation: {
        'stamp': 'stamp 0.6s ease-out',
        'page-turn': 'pageTurn 0.8s ease-out',
      },
      keyframes: {
        stamp: {
          '0%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(-5deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        pageTurn: {
          '0%': { transform: 'rotateY(-90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
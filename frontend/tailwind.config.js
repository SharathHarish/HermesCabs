/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#FFF8E1',
          DEFAULT: '#FFD700',
          dark: '#B8860B',
        },
        accent: {
          light: '#FFECB3',
          DEFAULT: '#FFC107',
          dark: '#FFA000',
        },
        neutral: {
          light: '#FFFFFF',
          DEFAULT: '#FDF6E3',
          dark: '#E0C97B',
        },
        text: {
          light: '#4B3F2F',
          DEFAULT: '#3E2F1C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        gold: '0 4px 12px rgba(255, 215, 0, 0.4)',
      }
    },
  },
  plugins: [],
};

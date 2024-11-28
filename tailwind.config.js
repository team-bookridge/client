/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          from: {
            transform: 'translateY(100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        slideUpAndFadeIn: 'slideUp 0.4s ease-in-out, fadeIn 0.4s ease-in-out',
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
      screens: {
        vs: '450px',
      },
    },
  },
  plugins: [],
};

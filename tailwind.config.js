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
        w450px: '450px',
        w519px: '519px',
        w590px: '590px',
      },
    },
  },
  plugins: [],
};

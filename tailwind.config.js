// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",   // include Angular templates
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        cardEntry: {
          '0%': { opacity: 0, transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        card: 'cardEntry 0.8s ease-out forwards',
      },
    },
  },
  safelist: [
    'animate-fadeInUp',
    'animate-card',
    'delay-200',
    'delay-400',
    'delay-600',
  ],
  plugins: [],
};

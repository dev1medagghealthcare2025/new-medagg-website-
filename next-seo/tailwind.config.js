module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    '../src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#2c5282',
        accent: '#4299e1',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
  corePlugins: {
    preflight: true,
  },
};

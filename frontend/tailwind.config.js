/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f9f785',
        darkbackground: '#0B0C23',
        lightbackground: '#fffcfe',
        text: '#fffcfe',
        darktext: '#0B0C23',
        decorateorange: '#e86d33',
        decorateblack: '#0B0C23',
        error: '#FF2222',
      },
    },
  },
  plugins: [],
};

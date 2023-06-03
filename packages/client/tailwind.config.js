/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#f9f785",
        background: "#15202b",
        grayLight: "#1e2732",
        light: "#1e2732",
        orange: "#e86d33",
        error: "#fa0d20",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [],
};

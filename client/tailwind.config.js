/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#f9f785",
        bluedark: "#0B0C23",
        orange: "#e86d33",
        error: "#FF2222",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [],
};

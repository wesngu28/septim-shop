/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "fjord": "Fjord One"
      }
    },
  },
  plugins: [],
};

module.exports = config;

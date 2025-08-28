
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { display: ["ui-serif","Georgia","serif"] },
      colors: { brand: { DEFAULT: "#ffffff" } }
    },
  },
  plugins: [],
};

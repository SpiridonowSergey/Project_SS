/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  // NativeWind web: 'media' throws if anything sets colorScheme; we stay light via classes only.
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  // Light-only product theme. Keep class strategy to avoid NativeWind web media crash.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-brand)",
          soft: "var(--color-brand-soft)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          soft: "var(--color-danger-soft)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          soft: "var(--color-warning-soft)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          elevated: "var(--color-surface-elevated)",
        },
        label: {
          DEFAULT: "var(--color-label)",
          secondary: "var(--color-label-secondary)",
          muted: "var(--color-label-muted)",
        },
        border: "var(--color-border)",
        onTint: "var(--color-on-tint)",
      },
    },
  },
  plugins: [],
};

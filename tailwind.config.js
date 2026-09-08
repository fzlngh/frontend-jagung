/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  safelist: [
    "bg-leaf",
    "bg-slate",
    "bg-rust",
    "bg-corn-dark",
    "text-leaf-dark",
    "text-slate",
    "text-rust-dark",
    "text-corn-dark",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F2E9",
        ink: "#1F2A1A",
        leaf: {
          DEFAULT: "#3C6E47",
          dark: "#2A4E33",
          light: "#6E9C79",
        },
        rust: {
          DEFAULT: "#B5502D",
          dark: "#8A3B20",
          light: "#D98259",
        },
        corn: {
          DEFAULT: "#E8B23D",
          dark: "#C08F26",
        },
        slate: {
          DEFAULT: "#5A6B72",
        },
        line: "#D8CFBC",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-plex)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

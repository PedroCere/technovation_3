/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#06B6D4",
        accent: "#F472B6",
        background: "#0F172A",
        text: "#FFFFFF",
        secondary: "#94A3B8",
        success: "#22C55E",
        danger: "#EF4444",
      },
    },
  },
  plugins: [],
};

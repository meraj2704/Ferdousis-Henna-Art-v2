/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        smS: "320px",
        smM: "375px",
        smL: "425px",
        xs: "475px",
      },
      colors: {
        background: "#E7F0DC",
        textLight: "#E7F0DC",
        accent: "#729762",
        primary: "#597445",
        secondary: "#658147",
        textColor: "#000000",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

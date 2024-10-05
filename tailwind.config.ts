/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#3498db',
        secondary: '#f1c40f',
        danger: '#e74c3c',
        success: '#2ecc71',
        warning: '#ff9f43',
        info: '#34495e',
        light: '#ecf0f1',
        dark: '#34495e'
      }
    },
  },
  plugins: [],
};

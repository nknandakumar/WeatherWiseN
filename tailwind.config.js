/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
         backgroundColor: {
        'custom-light': '#C0E6BA',
        'custom-dark': '#333333', 
      },
      colors: {
              'custom-light': '#4CA771',
              'custom-dark': '#edf6eb', 
            },
    },
  },
  plugins: [],
}

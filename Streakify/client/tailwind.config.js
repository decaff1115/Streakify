/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@mui/**/*.{js,jsx,ts,tsx}', // Include MUI components if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarHide,
  ],
};

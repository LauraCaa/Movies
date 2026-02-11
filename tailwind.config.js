/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mabi-black': '#050505',
        'mabi-orange': '#f39c12',
      },
    },
  },
  plugins: [],
}
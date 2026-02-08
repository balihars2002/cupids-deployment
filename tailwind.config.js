/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      colors: {
        'rose-red': '#E53E3E',
        'soft-pink': '#FFF5F5',
        'deep-blue': '#1a202c',
      },
    },
  },
  plugins: [],
}

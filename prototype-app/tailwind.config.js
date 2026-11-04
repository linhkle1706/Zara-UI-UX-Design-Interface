/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Didot"', '"Bodoni MT"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        zara: {
          black: '#000000',
          dark: '#111111',
          gray: '#767676',
          lightgray: '#E5E5E5',
          border: '#CCCCCC',
          offwhite: '#F9F9F9',
        }
      }
    },
  },
  plugins: [],
}

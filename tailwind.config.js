/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1c1917',
          charcoal: '#292524',
          muted: '#78716c',
          cream: '#faf8f5',
          sand: '#f5f0e6',
          beige: '#eae3d5',
          gold: {
            DEFAULT: '#c5a059',
            light: '#dec28f',
            dark: '#a88038',
            hover: '#b58f48',
          },
          border: '#e7dfd3',
          card: '#ffffff'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.25em',
      }
    },
  },
  plugins: [],
}

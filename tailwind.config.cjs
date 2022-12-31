/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Rubik, sans-serif',
      },

      fontSize: {
        '2xs': '0.625rem',
      },

      backgroundImage: {
        'top-pattern': 'url(/top-pattern.png)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

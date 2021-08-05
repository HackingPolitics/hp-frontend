const colors = require('tailwindcss/colors')

module.exports = {
  fontFamily: {
    display: ['Roboto Slab', 'sans-serif'],
    body: ['Inria Sans', 'sans-serif'],
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'helpers/*.js',
      'plugins/**/*.js',
      'nuxt.config.js',
      'formulate.config.js',
      'utils/*.ts',
    ],
  },
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-blue': colors.sky,
        teal: colors.teal,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

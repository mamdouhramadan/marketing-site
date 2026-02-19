/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dev/**/*.pug',
    './dist/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#bb8939',
        secondary: '#42415b',
        page: '#f7f7f7',
      },
      fontSize: {
        'section': ['38px', { lineHeight: '48px' }],
      },
      margin: {
        'section-title': '25px',
      },
    },
  },
  plugins: [],
};

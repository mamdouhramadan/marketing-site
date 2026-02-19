/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        light: '#f3f3ff',
      },
      fontSize: {
        'section': ['38px', { lineHeight: '48px' }],
      },
      margin: {
        'section-title': '25px',
      },
      backgroundImage: {
        hero: 'linear-gradient(rgba(66,65,91,0.65), rgba(66,65,91,0.55)), url("../images/heroimg.jpg")',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary:   '#23A6F0',
        'primary-hover': '#2A7CC7',
        secondary: '#23856D',
        dark:      '#252B42',
        muted:     '#737373',
        light:     '#FAFAFA',
        border:    '#E8E8E8',
        danger:    '#E74040',
        alert:     '#E77C40',
        'dark-bg': '#252B42',
      },
    },
  },
  plugins: [],
}


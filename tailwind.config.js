/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5733', // orange corail
        secondary: '#333333', // dark grey
        background: '#FAFAFA', // off-white
        accent: '#F5F5F5', // light grey
        textPrimary: '#333333',
        textSecondary: '#666666',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'opensans': ['"Open Sans"', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      lineHeight: {
        'reading': '1.6',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E90064',
        accent: '#060047',
        bgsoft: '#F7F7F9',
        ink: '#111114',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

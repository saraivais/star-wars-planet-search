/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      'bright-yellow': '#facc15',
      'almost-black': '#18181b',
      'black-ish': '#171717',
      'dark-blue': '#075985',
      'medium-blue': '#1d4ed8',
      'light-gray-blue': '#e0f2fe',
      'light-gray': '#f5f5f5',
      'medium-gray': '#a1a1aa',
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard-Regular', 'sans-serif'],
      BMJUA: ['BMJUA', 'sans-serif'],
    },
    extend: {
      colors: {
        broccoli: '#4CAF50',
        inactive: '#B8B8B8',
      },
    },
    boxShadow: {
      button: '0 2px 4px rgba(0,0,0,0.25) ',
    },
  },
  plugins: [],
};

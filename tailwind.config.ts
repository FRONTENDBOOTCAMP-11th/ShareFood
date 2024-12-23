/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#4CAF50',
        second: '#F2AB58',
        sub: '#FEF7EC',
        text: '#2F2E36',
        subText: '#B8B8B8',
        broccoli: '#4CAF50',
        inactive: '#B8B8B8',
        pumpkin: '#F2AB58',
      },
    },
    fontFamily: {
      sans: ['Pretendard', 'Arial', 'sans-serif'],
      BMJUA: ['BMJUA', 'sans-serif'],
    },
    boxShadow: {
      button: '0 2px 4px rgba(0,0,0,0.25) ',
    },
  },
  plugins: [],
};

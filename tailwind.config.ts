/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#4CAF50',
        second: '#F2AB58',
        sub: '#FEF7EC',
        white: '#FFFFFF',
        gray100: '#BBBBBB',
        mainText: '#2F2E36',
        subText: '#B8B8B8',
      },
      backgroundImage: {
        'prev-icon': "url('/images/icons/prev.svg')",
        'next-icon': "url('/images/icons/next.svg')",
      },
    },
    fontFamily: {
      sans: ['Pretendard', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
};

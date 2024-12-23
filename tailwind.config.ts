/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
        broccoli: '#4CAF50',
        inactive: '#B8B8B8',
        pumpkin: '#F2AB58',
      },
      backgroundImage: {
        'prev-icon': "url('/images/icons/prev.svg')",
        'next-icon': "url('/images/icons/next.svg')",
      },
      boxShadow: {
        custom: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        // 모달 창 등장 애니메이션
        revealDown: {
          '0%': {
            // 어디서부터 등장하는지?
            transform: 'translate(-50%, 50%)',
          },
        },
      },
      animation: {
        revealDown: 'revealDown 1s ease-in-out',
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
